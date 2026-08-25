// ============================================================
// Cross-device sync for checkmarks.
// Paste the Google Apps Script web-app URL between the quotes to turn it on
// (setup steps in SYNC-SETUP.md). Left empty, checkmarks stay in this
// browser only.
// ============================================================
(function () {
  window.SYNC_URL = "";

  var KEY = "jamie-checked";
  var pushTimer = null;
  var lastPull = 0;
  var lastWrite = 0;

  window.loadChecked = function () {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  };

  window.saveChecked = function (m) {
    localStorage.setItem(KEY, JSON.stringify(m));
    lastWrite = Date.now();
    if (!window.SYNC_URL) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(function () {
      pushTimer = null;
      // text/plain avoids a CORS preflight, which Apps Script can't answer
      fetch(window.SYNC_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ checked: m, updated: new Date().toISOString() })
      }).catch(function () {});
    }, 1200);
  };

  function pull(onUpdate) {
    if (!window.SYNC_URL) return;
    var now = Date.now();
    // don't pull while a push is pending or right after a local change,
    // and don't hammer the endpoint on rapid focus flips
    if (pushTimer || now - lastWrite < 8000 || now - lastPull < 15000) return;
    lastPull = now;
    fetch(window.SYNC_URL).then(function (r) { return r.json(); }).then(function (d) {
      if (d && d.checked && JSON.stringify(d.checked) !== localStorage.getItem(KEY)) {
        localStorage.setItem(KEY, JSON.stringify(d.checked));
        if (onUpdate) onUpdate();
      }
    }).catch(function () {});
  }

  window.initSync = function (onUpdate) {
    pull(onUpdate);
    window.addEventListener("focus", function () { pull(onUpdate); });
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) pull(onUpdate);
    });
  };
})();

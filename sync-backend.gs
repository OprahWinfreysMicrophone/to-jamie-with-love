// Google Apps Script backend for Jamie's Sacred Space checkmark sync.
// Paste this whole file into https://script.new and deploy as a Web app
// (Execute as: Me · Who has access: Anyone). See SYNC-SETUP.md.
//
// It stores one small JSON blob (which checkboxes are ticked) in the
// script's own storage, chunked because a single property caps at ~9KB.

var CHUNK = 8000;

function doGet() {
  var p = PropertiesService.getScriptProperties();
  var n = Number(p.getProperty("chunks") || 0);
  var s = "";
  for (var i = 0; i < n; i++) s += p.getProperty("state" + i) || "";
  if (!s) s = '{"checked":{}}';
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var s = (e && e.postData && e.postData.contents) || "";
  if (s.length > 0 && s.length < 100000) {
    var p = PropertiesService.getScriptProperties();
    var old = Number(p.getProperty("chunks") || 0);
    var n = Math.ceil(s.length / CHUNK);
    for (var i = 0; i < n; i++) p.setProperty("state" + i, s.substr(i * CHUNK, CHUNK));
    for (var j = n; j < old; j++) p.deleteProperty("state" + j);
    p.setProperty("chunks", String(n));
  }
  return ContentService.createTextOutput('{"ok":true}').setMimeType(ContentService.MimeType.JSON);
}

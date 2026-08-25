// ============================================================
// Schedule builder — turns due dates into a gentle day-by-day plan.
// Rules (set by Jamie):
//   - Tuesdays are rest days (only used if truly no other option)
//   - Per-class daily cap: at most 3 items from one class on a Thursday,
//     at most 2 on any other day (relaxed only when a deadline crunch
//     leaves no legal day)
//   - Thursdays carry the most; Saturdays and Sundays share the load
//   - Everything finishes at least 1 day before it's due
//   - Big same-day batches spread across the 10 days prior
//   - "Takes N days" items run as an N-day streak ending the day before due
//   - Casebook items get a "have the casebook ready" reminder ahead of time
//   - Exams get study sessions on the two days before
//   - "Counts a lot" items claim the earlier, calmer slots
//   - P324 discussions split into syllabus parts: initial post Wednesday,
//     reply #1 Thursday, reply #2 Friday (never before Thursday, and Friday
//     satisfies every version of the contradictory syllabus). P324 takes
//     no late work, so these parts are fixed, not movable.
// The plan rebuilds itself from today's date every time the page loads.
// ============================================================
(function () {
  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
  }
  function parse(d) { var p = d.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function iso(dt) {
    return dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
  }
  function addDays(dt, n) { return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n); }
  function isTue(dt) { return dt.getDay() === 2; }
  function dayWeight(dt) { var w = dt.getDay(); return w === 4 ? 3 : (w === 0 || w === 6) ? 2 : 1; }

  window.itemId = function (row) { return row[1] + ":" + slug(row[3]); };

  // checked: {id:true}; today: Date (midnight)
  window.buildSchedule = function (today, checked) {
    var byDay = {};     // iso -> tasks
    var load = {};      // iso -> count
    var classLoad = {}; // iso -> {course: count}
    var overdue = [];   // unchecked tasks whose planned day already passed

    function capFor(dt) { return dt.getDay() === 4 ? 3 : 2; }
    function courseCount(k, course) { return (classLoad[k] && classLoad[k][course]) || 0; }
    function put(dt, task, countsLoad) {
      var k = iso(dt);
      (byDay[k] = byDay[k] || []).push(task);
      if (countsLoad) {
        load[k] = (load[k] || 0) + 1;
        (classLoad[k] = classLoad[k] || {})[task.course] = courseCount(k, task.course) + 1;
      }
    }
    // fixed-date task: lands on that exact day, or catch-up if it has passed
    function putFixed(dt, task) {
      if (checked[task.id]) return false;
      if (dt < today) { overdue.push(task); return false; }
      put(dt, task, true);
      return true;
    }
    function place(task, dueDt) {
      // window: [max(today, due-10), due-1], skip Tuesdays unless cornered
      var end = addDays(dueDt, -1);
      if (end < today) { overdue.push(task); return null; }
      var start = addDays(dueDt, -10);
      if (start < today) start = today;
      // prefer days under the per-class cap; fall back to any non-Tuesday,
      // then a Tuesday, only when a crunch leaves no legal day
      var best = null, bestScore = Infinity;
      var bestAny = null, bestAnyScore = Infinity;
      var cursor = start, fallback = null;
      while (cursor <= end) {
        if (isTue(cursor)) { fallback = fallback || new Date(cursor); }
        else {
          var k = iso(cursor);
          var score = ((load[k] || 0) + 1) / dayWeight(cursor);
          if (score <= bestAnyScore) { bestAnyScore = score; bestAny = new Date(cursor); } // ties → later day
          if (courseCount(k, task.course) < capFor(cursor) && score <= bestScore) {
            bestScore = score; best = new Date(cursor);
          }
        }
        cursor = addDays(cursor, 1);
      }
      var chosen = best || bestAny || fallback;
      if (!chosen) { overdue.push(task); return null; }
      put(chosen, task, true);
      return chosen;
    }
    function casebookReminder(base, id, anchorDay) {
      var rd = addDays(anchorDay, -3);
      if (isTue(rd)) rd = addDays(rd, -1);
      if (rd >= today && !checked["remind:" + id]) {
        put(rd, Object.assign({}, base, { id: "remind:" + id, kind: "remind",
          label: "Have the casebook in hand — " + base.title + " coming up" }), false);
      }
    }

    var rows = window.COURSEWORK.items.filter(function (r) { return r[0]; });
    // majors first so they land on the calmer, earlier slots; then by due date
    rows = rows.slice().sort(function (a, b) {
      if (a[0] !== b[0]) return a[0] < b[0] ? -1 : 1;
      return (b[4] ? 1 : 0) - (a[4] ? 1 : 0);
    });

    // Two passes: fixed-date tasks (exams, streaks, split discussions) land
    // first so movable work schedules around them without breaking the caps.
    function handleRow(r, fixedPass) {
      var id = window.itemId(r);
      if (checked[id]) return; // marked done on the checklist → drop every part
      var due = parse(r[0]);
      var isFixed = r[2] === "Exam" || /Takes (\d+) days/i.test(r[5] || "") ||
                    (r[1] === "apsy" && r[2] === "Discussion" && due.getDay() === 6);
      if (isFixed !== fixedPass) return;
      var base = { itemId: id, course: r[1], type: r[2], title: r[3], major: r[4], note: r[5], src: r[6] || "", due: r[0] };

      if (r[2] === "Exam") {
        // study sessions on the two days before (nudged off Tuesdays)
        for (var s = 1; s <= 2; s++) {
          var sd = addDays(due, -s);
          if (isTue(sd)) sd = addDays(sd, -1);
          putFixed(sd, Object.assign({}, base, { id: "study:" + id + ":" + s, kind: "study",
            label: "Study for " + r[3] + (s === 2 ? " (session 1)" : " (session 2)") }));
        }
        putFixed(due, Object.assign({}, base, { id: id, kind: "exam", label: r[3] + " — exam day" }));
        return;
      }

      var streak = /Takes (\d+) days/i.exec(r[5] || "");
      if (streak) {
        // N-day streak ending the day before it's due (streaks don't skip Tuesdays)
        var n = +streak[1];
        for (var j = 1; j <= n; j++) {
          putFixed(addDays(due, j - n - 1), Object.assign({}, base, { id: "streak:" + id + ":" + j, kind: "journal",
            label: r[3] + " — day " + j + " of " + n }));
        }
        return;
      }

      // P324 discussions: split into syllabus parts (Canvas Saturday = module close)
      if (r[1] === "apsy" && r[2] === "Discussion" && due.getDay() === 6) {
        var postDay = addDays(due, -3); // Wednesday
        putFixed(postDay, Object.assign({}, base, { id: id + ":post", kind: "work", label: r[3] + " — initial post (due Wed)" }));
        putFixed(addDays(due, -2), Object.assign({}, base, { id: id + ":r1", kind: "work", label: r[3] + " — reply #1" }));
        putFixed(addDays(due, -1), Object.assign({}, base, { id: id + ":r2", kind: "work", label: r[3] + " — reply #2" }));
        if (/Casebook/i.test(r[5] || "")) casebookReminder(base, id, postDay);
        return;
      }

      var task = Object.assign({}, base, { id: id, kind: "work", label: r[3] });
      var workDay = place(task, due);
      if (workDay && /Casebook/i.test(r[5] || "")) casebookReminder(base, id, workDay);
    }
    rows.forEach(function (r) { handleRow(r, true); });
    rows.forEach(function (r) { handleRow(r, false); });

    Object.keys(byDay).forEach(function (k) {
      byDay[k].sort(function (a, b) {
        var rank = { remind: 0, study: 1, exam: 1, journal: 2, work: 3 };
        if ((b.major ? 1 : 0) !== (a.major ? 1 : 0)) return (b.major ? 1 : 0) - (a.major ? 1 : 0);
        return (rank[a.kind] || 9) - (rank[b.kind] || 9);
      });
    });

    return { byDay: byDay, overdue: overdue };
  };

  window.schedIso = iso;
  window.schedAddDays = addDays;
})();

// Works Log - Google Sheets backup (optional)
// 1. Create a Google Sheet. Extensions > Apps Script. Paste this whole file.
// 2. Deploy > New deployment > type "Web app".
//    Execute as: Me.   Who has access: Anyone.
// 3. Copy the Web app URL (ends with /exec) into Works Log > Data > Google Sheets backup.
var SHEET = 'Works';
var HEAD = ['id','updated','shift_date','shift','time','flight','reg','aircraft','route','city','bay','jobs','equipment','notes','json'];

function sh_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s = ss.getSheetByName(SHEET);
  if (!s) { s = ss.insertSheet(SHEET); s.appendRow(HEAD); s.setFrozenRows(1); }
  return s;
}
function idx_(s) {
  var n = s.getLastRow(), m = {};
  if (n > 1) s.getRange(2, 1, n - 1, 1).getValues().forEach(function (r, i) { m[r[0]] = i + 2; });
  return m;
}
function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function doGet(e) {
  var s = sh_(), n = s.getLastRow(), rows = [];
  if (n > 1) rows = s.getRange(2, 1, n - 1, HEAD.length).getValues().map(function (r) {
    return { id: r[0], u: r[1], json: r[HEAD.length - 1] };
  });
  return out_({ rows: rows });
}
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    var b = JSON.parse(e.postData.contents), s = sh_();
    if (b.action === 'push') {
      var m = idx_(s), add = [];
      b.rows.forEach(function (w) {
        var row = [w.id, w.u, w.sd, w.shift, w.time, w.flight, w.reg, w.type, w.iata, w.city, w.bay, w.jobs, w.refs, w.notes, w.json];
        if (m[w.id]) s.getRange(m[w.id], 1, 1, HEAD.length).setValues([row]); else add.push(row);
      });
      if (add.length) s.getRange(s.getLastRow() + 1, 1, add.length, HEAD.length).setValues(add);
    }
    if (b.action === 'delete') {
      var m2 = idx_(s);
      b.ids.map(function (i) { return m2[i]; }).filter(Boolean).sort(function (a, c) { return c - a; })
        .forEach(function (r) { s.deleteRow(r); });
    }
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

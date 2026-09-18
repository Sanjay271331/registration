// ==============================================================================
// NEXTGEN BUILDATHON 2026 - GOOGLE APPS SCRIPT WEB APP HANDLER
// ==============================================================================
// INSTRUCTIONS TO UPDATE YOUR GOOGLE APPS SCRIPT:
// 1. In your Google Sheet ("NEXTGEN BUILDATHON 2"), go to: Extensions > Apps Script
// 2. In the "Code.gs" editor, replace ALL code with this entire file.
// 3. Click "Save" (disk icon).
// 4. IMPORTANT - CREATE A NEW VERSION DEPLOYMENT:
//    - Click: Deploy > Manage deployments
//    - Click the pencil icon (Edit) on your active deployment
//    - Under "Version", select: "New version"
//    - Click: "Deploy"
//    - Click: "Done"
// ==============================================================================

const SHEET_NAME = 'Sheet1';

function doGet(e) {
  return ContentService
    .createTextOutput("NextGen Buildathon registration webhook is active and ready to receive submissions!")
    .setMimeType(ContentService.MimeType.TEXT);
}

// Clean and normalize header strings (removes smart quotes, apostrophes, non-alphanumerics)
function normalizeHeader(str) {
  return String(str || '')
    .toUpperCase()
    .replace(/[\u2018\u2019'`]/g, '') // remove straight & curly apostrophes
    .replace(/[^A-Z0-9]/g, '');       // keep only letters and numbers
}

function doPost(e) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = doc.getSheets()[0]; // Fallback to the first tab if Sheet1 was renamed
    }

    // Read current headers from Row 1
    const lastCol = Math.max(sheet.getLastColumn(), 1);
    let headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

    // Determine the chosen team size (2, 3, or 4 members)
    const teamSize = parseInt(e.parameter.teamSize, 10) || 4;

    // Next row number and serial number
    const nextRow = sheet.getLastRow() + 1;
    const slNo = nextRow - 1;

    // Check if essential columns are present; if not, automatically append them to row 1
    const normalizedExisting = headers.map(normalizeHeader);
    const requiredExtraHeaders = [
      { key: 'TEAMSIZE', title: 'TEAM SIZE' },
      { key: 'SEMESTER', title: 'SEMESTER' },
      { key: 'STATE', title: 'STATE' },
      { key: 'DOMAIN', title: 'DOMAIN' },
      { key: 'TIMESTAMP', title: 'TIMESTAMP' }
    ];

    let headersUpdated = false;
    requiredExtraHeaders.forEach(req => {
      const exists = normalizedExisting.some(h => h.includes(req.key));
      if (!exists) {
        headers.push(req.title);
        sheet.getRange(1, headers.length).setValue(req.title);
        headersUpdated = true;
      }
    });

    if (headersUpdated) {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }

    // Map each column header to its corresponding submitted value
    const newRow = headers.map(function (header, index) {
      const norm = normalizeHeader(header);

      // Serial Number (matches SL NO, SNO, SERIAL NO, or if first column header is blank)
      if (norm.includes('SLNO') || norm.includes('SNO') || norm.includes('SERIAL') || (index === 0 && norm === '')) {
        return slNo;
      }

      // Timestamp
      if (norm.includes('TIMESTAMP') || norm.includes('TIME') || norm.includes('DATE')) {
        return new Date();
      }

      // Team Name
      if (norm === 'TEAMNAME' || norm.includes('TEAMNAME')) {
        return e.parameter.teamName || '';
      }

      // Team Size
      if (norm.includes('TEAMSIZE') || norm.includes('TOTALMEMBERS') || norm.includes('NOOFMEMBERS')) {
        return teamSize;
      }

      // --- TEAM LEADER ---
      if (norm.includes('LEADER') && (norm.includes('NAME') || norm.includes('FULLNAME'))) {
        return e.parameter.leaderName || '';
      }
      if (norm.includes('LEADER') && norm.includes('EMAIL')) {
        return e.parameter.leaderEmail || e.parameter.email || '';
      }
      if (norm.includes('LEADER') && (norm.includes('PHONE') || norm.includes('MOBILE') || norm.includes('CONTACT'))) {
        return e.parameter.leaderPhone || '';
      }
      if (norm.includes('LEADER') && (norm.includes('COLLEGE') || norm.includes('INSTITUTE') || norm.includes('UNIVERSITY'))) {
        return e.parameter.leaderCollege || '';
      }
      if (norm.includes('LEADER') && norm.includes('SEMESTER')) {
        return e.parameter.leaderSemester || e.parameter.semester || '';
      }

      // --- TEAM MEMBER 2 (for size >= 2) ---
      if (norm.includes('MEMBER2') || norm.includes('MEMBER 2')) {
        if (teamSize < 2) return '';
        if (norm.includes('EMAIL')) return e.parameter.member2Email || '';
        if (norm.includes('PHONE') || norm.includes('MOBILE')) return e.parameter.member2Phone || '';
        if (norm.includes('COLLEGE') || norm.includes('INSTITUTE')) return e.parameter.member2College || '';
        if (norm.includes('SEMESTER')) return e.parameter.member2Semester || '';
        return e.parameter.member2Name || '';
      }

      // --- TEAM MEMBER 3 (for size >= 3) ---
      if (norm.includes('MEMBER3') || norm.includes('MEMBER 3')) {
        if (teamSize < 3) return '';
        if (norm.includes('EMAIL')) return e.parameter.member3Email || '';
        if (norm.includes('PHONE') || norm.includes('MOBILE')) return e.parameter.member3Phone || '';
        if (norm.includes('COLLEGE') || norm.includes('INSTITUTE')) return e.parameter.member3College || '';
        if (norm.includes('SEMESTER')) return e.parameter.member3Semester || '';
        return e.parameter.member3Name || '';
      }

      // --- TEAM MEMBER 4 (for size 4) ---
      if (norm.includes('MEMBER4') || norm.includes('MEMBER 4')) {
        if (teamSize < 4) return '';
        if (norm.includes('EMAIL')) return e.parameter.member4Email || '';
        if (norm.includes('PHONE') || norm.includes('MOBILE')) return e.parameter.member4Phone || '';
        if (norm.includes('COLLEGE') || norm.includes('INSTITUTE')) return e.parameter.member4College || '';
        if (norm.includes('SEMESTER')) return e.parameter.member4Semester || '';
        return e.parameter.member4Name || '';
      }

      // --- GENERAL FIELDS ---
      if (norm.includes('SEMESTER')) {
        return e.parameter.leaderSemester || e.parameter.semester || '';
      }
      if (norm.includes('STATE') || norm.includes('STRATE')) {
        return e.parameter.state || '';
      }
      if (norm.includes('DOMAIN') || norm.includes('TRACK')) {
        return e.parameter.domain || '';
      }

      return '';
    });

    // Write row to sheet
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

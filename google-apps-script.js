// 1. Create a new Google Sheet
// 2. Add headers to the first row matching these (copy and paste into row 1):
// SL NO | TEAM NAME | TEAM SIZE | TEAM LEADER'S NAME | LEADER'S EMAIL | LEADER'S PHONE NUMBER | TEAM LEADER COLLEGE | TEAM MEMBER 2 | TEAM MEMBER 2 EMAIL | TEAM MEMBER 2 PHONE NUMBER | TEAM MEMBER 2 COLLEGE | TEAM MEMBER 3 | TEAM MEMBER 3 EMAIL | TEAM MEMBER 3 PHONE NUMBER | TEAM MEMBER 3 COLLEGE | TEAM MEMBER 4 | TEAM MEMBER 4 EMAIL | TEAM MEMBER 4 PHONE NUMBER | TEAM MEMBER 4 COLLEGE | SEMESTER | STATE | DOMAIN | TIMESTAMP
// (Note: TEAM SIZE column is optional. STATE also accepts STRATE)
// 3. Go to Extensions > Apps Script
// 4. Paste this entire code into Code.gs (replace any existing code)
// 5. Click Deploy > New Deployment
// 6. Select Type: Web App
// 7. Execute as: Me
// 8. Who has access: Anyone
// 9. Click Deploy, Authorize access, and copy the Web App URL
// 10. Paste the URL into the script.js file in your code!

const sheetName = 'Sheet1'; // Change this if your sheet name is different

function doGet(e) {
  return ContentService
    .createTextOutput("NextGen Build-A-Thon Registration Webhook is active and ready to receive form submissions!")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(sheetName);
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Get the next row number
    const nextRow = sheet.getLastRow() + 1;
    
    // Auto-generate SL NO (Serial Number) based on the row number
    const slNo = nextRow - 1;
    
    // Determine the chosen team size (2, 3, or 4 members)
    const teamSize = parseInt(e.parameter.teamSize, 10) || 4;
    
    // Build the row data based on the sheet headers
    const newRow = headers.map(function(header) {
      const h = String(header).trim().toUpperCase();
      
      if (h === 'TIMESTAMP') return new Date();
      if (h === 'SL NO') return slNo;
      
      // Map sheet headers to form input names
      switch(h) {
        case 'TEAM NAME': 
          return e.parameter.teamName || '';
          
        case 'TEAM SIZE':
        case 'TOTAL MEMBERS':
        case 'NO OF MEMBERS': 
          return teamSize;
        
        // Team Leader (Member 1 - Always recorded)
        case "TEAM LEADER'S NAME":
        case 'LEADER\'S NAME':
        case 'LEADER NAME': 
          return e.parameter.leaderName || '';
        case "LEADER'S EMAIL":
        case 'LEADER EMAIL': 
          return e.parameter.leaderEmail || '';
        case "LEADER'S PHONE NUMBER":
        case 'LEADER PHONE': 
          return e.parameter.leaderPhone || '';
        case 'TEAM LEADER COLLEGE':
        case 'LEADER COLLEGE': 
          return e.parameter.leaderCollege || '';
        
        // Team Member 2 (Recorded for team sizes 2, 3, and 4)
        case 'TEAM MEMBER 2':
        case 'MEMBER 2 NAME': 
          return (teamSize >= 2) ? (e.parameter.member2Name || '') : '';
        case 'TEAM MEMBER 2 EMAIL':
        case 'MEMBER 2 EMAIL': 
          return (teamSize >= 2) ? (e.parameter.member2Email || '') : '';
        case 'TEAM MEMBER 2 PHONE NUMBER':
        case 'MEMBER 2 PHONE': 
          return (teamSize >= 2) ? (e.parameter.member2Phone || '') : '';
        case 'TEAM MEMBER 2 COLLEGE':
        case 'MEMBER 2 COLLEGE': 
          return (teamSize >= 2) ? (e.parameter.member2College || '') : '';
        
        // Team Member 3 (Only recorded if team size is 3 or 4)
        case 'TEAM MEMBER 3':
        case 'MEMBER 3 NAME': 
          return (teamSize >= 3) ? (e.parameter.member3Name || '') : '';
        case 'TEAM MEMBER 3 EMAIL':
        case 'MEMBER 3 EMAIL': 
          return (teamSize >= 3) ? (e.parameter.member3Email || '') : '';
        case 'TEAM MEMBER 3 PHONE NUMBER':
        case 'MEMBER 3 PHONE': 
          return (teamSize >= 3) ? (e.parameter.member3Phone || '') : '';
        case 'TEAM MEMBER 3 COLLEGE':
        case 'MEMBER 3 COLLEGE': 
          return (teamSize >= 3) ? (e.parameter.member3College || '') : '';
        
        // Team Member 4 (Only recorded if team size is 4)
        case 'TEAM MEMBER 4':
        case 'MEMBER 4 NAME': 
          return (teamSize >= 4) ? (e.parameter.member4Name || '') : '';
        case 'TEAM MEMBER 4 EMAIL':
        case 'MEMBER 4 EMAIL': 
          return (teamSize >= 4) ? (e.parameter.member4Email || '') : '';
        case 'TEAM MEMBER 4 PHONE NUMBER':
        case 'MEMBER 4 PHONE': 
          return (teamSize >= 4) ? (e.parameter.member4Phone || '') : '';
        case 'TEAM MEMBER 4 COLLEGE':
        case 'MEMBER 4 COLLEGE': 
          return (teamSize >= 4) ? (e.parameter.member4College || '') : '';
        
        // Additional Details: Semester, State, and Domain at the end
        case 'SEMESTER': 
          return e.parameter.semester || '';
        case 'STATE':
        case 'STRATE': 
          return e.parameter.state || '';
        case 'DOMAIN': 
          return e.parameter.domain || '';
        
        default: 
          return '';
      }
    });
    
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

// Configuration
const SPREADSHEET_ID = '1nZRmnENL2Yy-WlrXXH2EkXBhsrkNibQzYZIpSwRVCw8';
const SHEET_NAME = 'Dealer Applications';

// Column headers for the spreadsheet
const HEADERS = [
  'Timestamp',
  'Company Name',
  'Company Website',
  'Years in Business',
  'Company Address',
  'LinkedIn Page',
  'Owner/Contact Email',
  'Owner/Contact Phone',
  'Total Seats',
  'Ready Agents',
  'Operation Hours',
  'Campaign Experience',
  'Other Campaign Experience',
  'Lead Generation Methods',
  'Other Lead Generation',
  'Has QA Team',
  'Provides Recordings',
  'Uses VPN',
  'Dialer & CRM',
  'Compliance Process',
  'Agrees to Video Call',
  'Agrees to Provide Recording',
  'Status',
  'Notes'
];

function doPost(e) {
  // Handle preflight OPTIONS request
  if (e.method === 'OPTIONS') {
    return ContentService.createTextOutput('')
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.companyName || !data.ownerEmail || !data.ownerPhone) {
      return createErrorResponse('Required fields missing');
    }

    // Get the spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.setFrozenRows(1);
    }

    // Prepare row data
    const rowData = [
      new Date(), // Timestamp
      data.companyName,
      data.companyWebsite || '',
      data.yearsInBusiness,
      data.companyAddress,
      data.linkedinPage || '',
      data.ownerEmail,
      data.ownerPhone,
      data.totalSeats,
      data.readyAgents,
      data.operationHours,
      (data.campaignExperience || []).join(', '),
      data.otherCampaignExperience || '',
      (data.leadGeneration || []).join(', '),
      data.otherLeadGeneration || '',
      data.hasQaTeam,
      data.providesRecordings,
      data.usesVpn,
      data.dialerCrm,
      data.complianceProcess,
      data.agreesToVideoCall,
      data.agreesToProvideRecording,
      'New', // Initial status
      '' // Notes
    ];

    // Append the data
    sheet.appendRow(rowData);

    // Format the new row
    const lastRow = sheet.getLastRow();
    const range = sheet.getRange(lastRow, 1, 1, HEADERS.length);
    
    // Apply formatting
    range.setWrap(true);
    range.setVerticalAlignment('top');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, HEADERS.length);

    // Send email notification
    sendNotificationEmail(data);

    return createSuccessResponse('Application submitted successfully');
    
  } catch (error) {
    console.error(error);
    return createErrorResponse('An error occurred while processing the application');
  }
}

function createSuccessResponse(message) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: message
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

function createErrorResponse(message) {
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    message: message
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

function sendNotificationEmail(data) {
  const emailAddress = 'vela956abel@gmail.com';
  const subject = `New Dealer Application: ${data.companyName}`;
  
  const body = `
    New dealer application received:
    
    Company: ${data.companyName}
    Contact Email: ${data.ownerEmail}
    Contact Phone: ${data.ownerPhone}
    Years in Business: ${data.yearsInBusiness}
    Total Seats: ${data.totalSeats}
    Ready Agents: ${data.readyAgents}
    
    View the full application in the spreadsheet:
    https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}
  `;
  
  MailApp.sendEmail(emailAddress, subject, body);
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    message: 'This endpoint only accepts POST requests'
  }))
  .setMimeType(ContentService.MimeType.JSON);
}
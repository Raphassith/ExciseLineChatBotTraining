function doPost(e){
  let data = JSON.parse(e.postData.contents);
  let func = parseInt(data.queryResult.parameters.func);
  if(func==1) return jobStatus(e);
  else if (func==2) return saveRate(e);
}

function saveRate(e) {
  let data = JSON.parse(e.postData.contents);
  let rate = parseInt(data.queryResult.queryText);
  if (rate >= 1 && rate <= 5) {
    let date = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd");
    let time = Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss");
    SpreadsheetApp.getActive().getSheetByName('satisfaction').appendRow([date, time, rate]);
  }

  let result = {
    "fulfillmentMessages": [
      {
        "platform": "line",
        "type": 4,
        "payload": {
          "line": {
            "type": "text",
            "text": "ขอขอบคุณอย่างสูงที่ร่วมให้คะแนนความพึ่งพอใจในการให้บริการของเราค่ะ"
          }
        }
      }
    ]
  };

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function jobStatus(e) {
  let data = JSON.parse(e.postData.contents);
  let id = data.queryResult.queryText;

  let jobs = SpreadsheetApp.getActive().getSheetByName('jobs').getDataRange().getDisplayValues().slice(1)
    .filter(row => row[0] == id);
  let msg = 'ไม่พบข้อมูล';
  if (jobs.length > 0) msg = 'งานเลขที่ ' + jobs[0][0] + '\nอยู่ในสถานะ ' + jobs[0][1];

  let result = {
    "fulfillmentMessages": [
      {
        "platform": "line",
        "type": 4,
        "payload": {
          "line": {
            "type": "text",
            "text": msg
          }
        }
      }
    ]
  };

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

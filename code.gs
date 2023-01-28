function doPost(e) {
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
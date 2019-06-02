var ss = SpreadsheetApp.getActiveSpreadsheet()

function onOpen(e) {
    SpreadsheetApp.getUi()
      .createMenu('スクリプト')
      .addItem('wikiからデータを取得', 'file_open_dialog')
      .addToUi();
}

function getSheet(name) {
    var sheet = ss.getSheetByName(name)
    if (sheet == null) {
        sheet = ss.insertSheet(name)
    }

    return sheet
}

function file_open_dialog() {
    var html = HtmlService.createHtmlOutputFromFile("file_open_dialog")
    SpreadsheetApp.getUi().showModalDialog(html, "HTMLファイル読み込み")
}

function recordData(form) {
    var $ = Cheerio.load(form.htmlFile.getDataAsString("euc-jp"))
    var list = getList($)
    var items = getItemTable($)
    var data = mergeData(list, items)
    var sheet = getSheet("definition")
    sheet.getRange(2, 1, data.length, data[0].length).setValues(data)

    Browser.msgBox("保存完了！")
    console.log("completed");
}

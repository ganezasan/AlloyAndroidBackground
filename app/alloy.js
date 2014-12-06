// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.updateNow = false;
Alloy.Globals.activeFlg = true;
Alloy.Globals.activity = null;
Alloy.Globals.service = null;
Alloy.Globals.serviceIntent = null;
Alloy.Globals.lastClosed = Ti.App.Properties.getObject("lastClosed", new Date());   // アプリが最後に閉じられた時間
Alloy.Globals.serviceOften = 3000;  // サービス起動間隔
Alloy.Globals.updateOften = 10000;  // 最後にアプリを閉じてから新しいデータを読み込むまでの時間
Alloy.Globals.serviceStatus = false;

/**
* date型を hh:mi 形式に変換
*/
function to_hhmi(date) {
  var date_obj = new Date(date);
  var hh = date_obj.getHours();
  var mi = toDoubleDigits(date_obj.getMinutes());
  return hh + ':' + mi;
}

/**
*  0パディング
*/
function toDoubleDigits(num) {
  num += "";
  if (num.length === 1) {
   num = "0" + num;
  }
  return num;
}
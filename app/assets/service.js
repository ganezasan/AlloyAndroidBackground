Ti.API.info("service is running");
Ti.API.info(to_hhmi(Alloy.Globals.lastClosed));
Ti.API.info("service activeFlg :" + Alloy.Globals.activeFlg);

// 現在時刻
var now = new Date();

// 最後にアプリを閉じてからXX分経っているか確認し、経っている場合処理を開始
if (!Alloy.Globals.updateNow
  && !Alloy.Globals.activeFlg 
  && (now.getTime() - Alloy.Globals.lastClosed.getTime() > Alloy.Globals.updateOften)) {

  Ti.API.info("============================");
  Ti.API.info("service Start!!!!");
  Ti.API.info("============================");
  Alloy.Globals.updateNow = true;

  //データ取得等の処理を記載する


  //処理終了の時刻を登録
  Alloy.Globals.lastClosed = now;   // データ取得時刻を保存
  //処理中に再度サービスの処理が起動されないようにするため
  Alloy.Globals.updateNow = false;
}

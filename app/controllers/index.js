function doClick(e) {
    if(Alloy.Globals.serviceStatus){
      Alloy.Globals.service.stop();
      Alloy.Globals.serviceStatus = false;
      $.label.text = "サービスを開始する";
      $.label.color = "green"
      alert("サービズを停止しました");
    }else{
      Alloy.Globals.service.start();
      Alloy.Globals.serviceStatus = true;
      $.label.text = "サービスを停止する";
      $.label.color = "red"
      alert("サービズを開始しました");
    }
}

$.index.open();

//Activityのライフサイクルに応じてイベントを設定
$.index.addEventListener("open", function () {
  Ti.API.info("open");
  Alloy.Globals.activity = $.index.activity;
  Alloy.Globals.page = "index";
  Alloy.Globals.activeFlg = true;

  Alloy.Globals.activity.addEventListener("resume", function(d) {
    Ti.API.info("************************ Activity was resumed（再開したよ） ************************");
    Ti.API.info(Alloy.Globals.page);

    Alloy.Globals.activeFlg = true;
    Ti.API.info("activeFlg: true");
    Ti.API.info(Alloy.Globals.activeFlg);
  });
  Alloy.Globals.activity.addEventListener("pause", function(d) {
    Ti.API.info("************************ Activity was paused（バックグラウンドにはいったよ） ************************");
    Ti.API.info(Alloy.Globals.page);
    Ti.API.info(Alloy.Globals.activeFlg);

    if(Alloy.Globals.page == "index" && Alloy.Globals.activeFlg ){
      Alloy.Globals.activeFlg = false;
      // アプリが閉じた時の時間を保存
      Alloy.Globals.lastClosed = new Date();
      Ti.API.info("lastClosed: " + to_hhmi(Alloy.Globals.lastClosed));
    }
  });
  Alloy.Globals.activity.addEventListener("destroy", function() {
    Ti.API.info("Activity was destroied");
    Ti.API.info(Alloy.Globals.service);
    Ti.API.info(Alloy.Globals.serviceIntent);
  });
  // サービスを起動(Androidのみ)
  if (OS_ANDROID && Alloy.Globals.service == null) {
    Ti.API.info("************************ Service Start ************************");
    var intent = Titanium.Android.createServiceIntent({url: "service.js"});
    intent.putExtra("interval", Alloy.Globals.serviceOften);
    var service = Titanium.Android.createService(intent);
    service.start();
    Alloy.Globals.serviceStatus = true;
    Alloy.Globals.service = service;
    Alloy.Globals.serviceIntent = intent;
    $.index.addEventListener('android:back', function(){
      var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_MAIN
      });
      intent.addCategory(Ti.Android.CATEGORY_HOME);
      Ti.Android.currentActivity.startActivity(intent);
    });
  }
});


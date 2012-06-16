<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, maximum-scale=1.0" />
    <title>WILD GUNMAN</title>
    <link href="{$app_url}assets/css/reset.css" rel="stylesheet" type="text/css" />
    <link href="{$app_url}assets/css/style.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
  <div id='fb-root'></div>
    <!-- [ END OF TEMPLATE ] -->
    
  <div id="wrapper" class="backgroundWithGunner">
      <div id="wgLogo"></div>
      
      <div id="howToPlayFrame" style='background-color: #FFF; color: #000'>
       
          <span id='searching'>Searching for players...</span>
       
        <div class="gun"></div>
        <div class="clickable playNow" data-href="#"></div>
      </div>
    
    <!-- [ BEGIN OF TEMPLATE ] -->

    <script type='text/javascript' src='{$app_url}js/qloader/qloader.js'></script>
    <script type='text/javascript'>
     srcs = [
       'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
       'http://connect.facebook.net/en_US/all.js',
       '{$app_url}assets/js/hide-address-bar.js',
       '{$app_url}assets/js/jquery.timer.js',
       '{$app_url}assets/js/hammer.js',
       '{$app_url}assets/js/jquery.hammer.js',
       '{$app_url}assets/js/bHive-1.0.7-min.js',
       '{$app_url}assets/js/main.js',
       '{$app_url}js/jquery/jquery.facebook.js',
       '{$app_url}js/quantum/Quantum.js'
		   ];
	   
	   QLoader.init(srcs, function() {
			   App.boot();
			   
			   App.Config.setAppId('{$app_config->app_id}');
			   App.Config.setAppUrl('{$app_url}');
			   
			   App.Pages.Play.boot();
	   });
	   QLoader.load();
     </script>
    
    
  </body>
</html>
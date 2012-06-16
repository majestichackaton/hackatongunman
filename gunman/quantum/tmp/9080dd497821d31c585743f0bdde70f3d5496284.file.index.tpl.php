<?php /* Smarty version Smarty-3.0.7, created on 2012-06-16 21:43:17
         compiled from "/var/www/gunman/app/../quantum/app/views/game/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:10147091844fdcfdf5ef5188-25299416%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '9080dd497821d31c585743f0bdde70f3d5496284' => 
    array (
      0 => '/var/www/gunman/app/../quantum/app/views/game/index.tpl',
      1 => 1339882995,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '10147091844fdcfdf5ef5188-25299416',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, maximum-scale=1.0" />
    <title>WILD GUNMAN</title>
    <link href="<?php echo $_smarty_tpl->getVariable('app_url')->value;?>
assets/css/reset.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo $_smarty_tpl->getVariable('app_url')->value;?>
assets/css/style.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
  <div id='fb-root'></div>
    <!-- [ END OF TEMPLATE ] -->
    
    <div id="wrapper" class="backgroundWithGunner">
      <div id="wgLogo"></div>
      
      <div class="clickable" id="playNowButton" style='display: none' data-href="play" href='play'></div>
      <div class="clickable" id="inviteFriendsButton" style='display: none' data-href="invite"></div>
      <div class="clickable" id="leaderboardsButton" style='display: none' data-href="high_scores"></div>
      <div class="clickable" id="howToPlayButton" style='display: none' data-href="instructions"></div>
      
      
      <div class="clickable" id="facebookConnect" style='display: none'></div>
      
      <div id="footer" style='display: none'>
        <div class="name">JOHN RAMBO</div>
        <div class="points">000</div>
        <div class="rank">000</div>
      </div>
    </div>
    
    <!-- [ BEGIN OF TEMPLATE ] -->

    <script type='text/javascript' src='<?php echo $_smarty_tpl->getVariable('app_url')->value;?>
js/qloader/qloader.js'></script>
    <script type='text/javascript'>
     srcs = [
       'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
       'http://connect.facebook.net/en_US/all.js',
       '<?php echo $_smarty_tpl->getVariable('app_url')->value;?>
assets/js/hide-address-bar.js',
       '<?php echo $_smarty_tpl->getVariable('app_url')->value;?>
assets/js/jquery.timer.js',
       '<?php echo $_smarty_tpl->getVariable('app_url')->value;?>
assets/js/hammer.js',
       '<?php echo $_smarty_tpl->getVariable('app_url')->value;?>
assets/js/jquery.hammer.js',
       '<?php echo $_smarty_tpl->getVariable('app_url')->value;?>
assets/js/bHive-1.0.7-min.js',
       '<?php echo $_smarty_tpl->getVariable('app_url')->value;?>
assets/js/main.js',
       '<?php echo $_smarty_tpl->getVariable('app_url')->value;?>
js/jquery/jquery.facebook.js',
       '<?php echo $_smarty_tpl->getVariable('app_url')->value;?>
js/quantum/Quantum.js'
		   ];
	   
	   QLoader.init(srcs, function() {
			   App.boot();
			   
			   App.Config.setAppId('<?php echo $_smarty_tpl->getVariable('app_config')->value->app_id;?>
');
			   App.Config.setAppUrl('<?php echo $_smarty_tpl->getVariable('app_url')->value;?>
');
			   
			   App.Pages.Welcome.boot();
	   });
	   QLoader.load();
     </script>
    
    
  </body>
</html>
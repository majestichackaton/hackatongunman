<?php /* Smarty version Smarty-3.0.7, created on 2012-06-03 03:19:13
         compiled from "/var/www/app/webroot/webservices/api/../quantum/app/views/tests/channel_listener.tpl" */ ?>
<?php /*%%SmartyHeaderCode:456813604fcad7b1d70480-23978765%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '99f1302be4f0eb963e24ec1369fc6843186cbf2c' => 
    array (
      0 => '/var/www/app/webroot/webservices/api/../quantum/app/views/tests/channel_listener.tpl',
      1 => 1338693552,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '456813604fcad7b1d70480-23978765',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<!DOCTYPE html>
<html>
<head>
  <meta name="charset" content="utf-8">
  <title>Juggernaut</title>
  <script src="http://htgame.socialapps.co:8080/application.js" type="text/javascript" charset="utf-8"></script>
  
  <style type="text/css" media="screen">
    h1 {
      margin: 1em 0;
    }
    
    #log {
      padding: 5px;
      background: #CCC;
      height: 500px;
      width: 400px;
    }
  
  </style>
</head>
<body>

  <h1>Juggernaut - Hello World!</h1>
  
  <textarea id="log" readonly></textarea>
  
  <script type="text/javascript" charset="utf-8">
    var logElement = document.getElementById("log");
    logElement.value = "";
    var log = function(data){
      logElement.value += (data + "\n");
    };
    
    var channel_id = '<?php echo $_smarty_tpl->getVariable('channel_id')->value;?>
';
    
    var jug = new Juggernaut({
      secure: ('https:' == document.location.protocol),
      host: document.location.hostname,
      port: document.location.port || 8080
    });
    
    jug.on("connect", function(){ log("Connected") });
    jug.on("disconnect", function(){ log("Disconnected") });
    jug.on("reconnect", function(){ log("Reconnecting") });
    
    log("Subscribing to channel: "+channel_id);
    
    jug.subscribe(channel_id, function(data){
      log("Got data: " + data);
      console.log(data);
    });
  </script>
  
</body>
</html>
<?php /* Smarty version Smarty-3.0.7, created on 2012-06-03 05:34:13
         compiled from "/var/www/app/webroot/webservices/api/../quantum/app/views/tests/start_playing.tpl" */ ?>
<?php /*%%SmartyHeaderCode:4559341674fcaf75508b215-90928893%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ab554a32fa1f9bdc8193ad0df817a825d30c953a' => 
    array (
      0 => '/var/www/app/webroot/webservices/api/../quantum/app/views/tests/start_playing.tpl',
      1 => 1338701635,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '4559341674fcaf75508b215-90928893',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<head>
  <title>START PLAYING</title>
</head>
<body>
  <h1>START PLAYING NOW.!! --SIMPLE IMPLEMENTATION </h1>
  
  <h2>Player Ready</h2>
  <form method="get" action='http://htgame.socialapps.co/webservices/api/tests/play'>
    <p>player_id: <input type='text' name='player_id' /></p>
    <p><input type='submit' value='start_playing' ></p>
  </form>
 
  
</body>
</html>

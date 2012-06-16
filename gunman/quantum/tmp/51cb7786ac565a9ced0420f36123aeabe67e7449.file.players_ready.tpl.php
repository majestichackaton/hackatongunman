<?php /* Smarty version Smarty-3.0.7, created on 2012-06-03 02:35:50
         compiled from "/var/www/app/webroot/webservices/api/../quantum/app/views/tests/players_ready.tpl" */ ?>
<?php /*%%SmartyHeaderCode:8092492254fcacd86855e52-42058383%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '51cb7786ac565a9ced0420f36123aeabe67e7449' => 
    array (
      0 => '/var/www/app/webroot/webservices/api/../quantum/app/views/tests/players_ready.tpl',
      1 => 1338690945,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '8092492254fcacd86855e52-42058383',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<head>
  <title>PLAYER READY</title>
</head>
<body>
  <h1>MARK PLAYER AS READY</h1>
  
  <h2>Player Ready</h2>
  <form method="get" action='http://htgame.socialapps.co/webservices/api/match/ready'>
    <p>match_id: <input type='text' name='match_id' /></p>
    <p>player_secret: <input type='text' name='player_secret' /></p>
    <p><input type='submit' value='create match' ></p>
  </form>
 
  
</body>
</html>

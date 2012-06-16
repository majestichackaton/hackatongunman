<?php /* Smarty version Smarty-3.0.7, created on 2012-06-03 04:12:51
         compiled from "/var/www/app/webroot/webservices/api/../quantum/app/views/tests/send_player_response.tpl" */ ?>
<?php /*%%SmartyHeaderCode:11261185214fcae4435e4855-57388370%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '245c4020e57ab21e5b7f48005213c407843e9589' => 
    array (
      0 => '/var/www/app/webroot/webservices/api/../quantum/app/views/tests/send_player_response.tpl',
      1 => 1338696768,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '11261185214fcae4435e4855-57388370',
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
  <h1>SEND PLAYER RESPONSE (SHOOT)</h1>
  
  <h2>Player Ready</h2>
  <form method="get" action='http://htgame.socialapps.co/webservices/api/match/shoot'>
    <p>match_id: <input type='text' name='match_id' /></p>
    <p>player_secret: <input type='text' name='player_secret' /></p>
    <p>received_shoot_message_time: <input type='text' name='received_shoot_message_time' /></p>
    <p>player_shoot_time: <input type='text' name='player_shoot_time' /></p>
    <p><input type='submit' value='create match' ></p>
  </form>
 
  
</body>
</html>

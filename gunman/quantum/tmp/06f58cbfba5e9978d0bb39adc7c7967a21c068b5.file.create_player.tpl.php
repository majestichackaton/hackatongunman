<?php /* Smarty version Smarty-3.0.7, created on 2012-06-03 02:01:29
         compiled from "/var/www/app/webroot/webservices/api/../quantum/app/views/tests/create_player.tpl" */ ?>
<?php /*%%SmartyHeaderCode:9659686874fcac579b3e043-50291948%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '06f58cbfba5e9978d0bb39adc7c7967a21c068b5' => 
    array (
      0 => '/var/www/app/webroot/webservices/api/../quantum/app/views/tests/create_player.tpl',
      1 => 1338688884,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '9659686874fcac579b3e043-50291948',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<head>
  <title>CREATE PLAYER MESSAGE</title>
</head>
<body>
  <h1>CREATE PLAYER MESSAGE</h1>
  
  <form method="post" action='http://htgame.socialapps.co/webservices/api/player/create'>
    <p>facebook_id: <input type='text' name='facebook_id'></p>
    <p>facebook_secret: <input type='text' name='facebook_token'></p
    <p>name: <input type='text' name='name'></p>
    <input type='submit' value='create player' >
  </form>
  
</body>
</html>

<?php /* Smarty version Smarty-3.0.7, created on 2012-06-16 17:30:48
         compiled from "/var/www/webservices/api/../quantum/app/views/tests/create_match.tpl" */ ?>
<?php /*%%SmartyHeaderCode:6848542734fdcc2c811e292-15702605%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'c3dfe464f4177b087ad909d0cd58e171954881c5' => 
    array (
      0 => '/var/www/webservices/api/../quantum/app/views/tests/create_match.tpl',
      1 => 1338689942,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '6848542734fdcc2c811e292-15702605',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<head>
  <title>CREATE PLAYER MATCH</title>
</head>
<body>
  <h1>CREATE PLAYER MATCH</h1>
  
  <form method="post" action='http://htgame.socialapps.co/webservices/api/match/create'>
    <p>first_player_id: <input type='text' name='first_player_id' /></p>
    <p>second_player_id: <input type='text' name='second_player_id' /></p>
    <p><input type='submit' value='create match' ></p>
  </form>
  
</body>
</html>

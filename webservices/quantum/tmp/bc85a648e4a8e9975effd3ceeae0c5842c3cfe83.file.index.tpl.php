<?php /* Smarty version Smarty-3.0.7, created on 2012-05-31 08:44:46
         compiled from "app/views/registry/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:20983186604fc767be006360-02338558%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'bc85a648e4a8e9975effd3ceeae0c5842c3cfe83' => 
    array (
      0 => 'app/views/registry/index.tpl',
      1 => 1338404013,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '20983186604fc767be006360-02338558',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>

        <form method="post" name="reg" action="">
          <fieldset>
            <ul class="pageitem">
                <li class="smallfield"><span class="name">C&oacute;digo de barras:</span><input placeholder="requerido" type="text" pattern="[0-9]*" name="barcode"/></li>
                <li class="smallfield"><span class="name">Nombre:</span><input placeholder="requerido" type="text" name="name" /></li>
                <li class="smallfield"><span class="name">Alias:</span><input placeholder="requerido" type="text" name="nickname" /></li>
                <li class="smallfield"><span class="name">Edad:</span><input placeholder="requerido" type="text"  pattern="[0-9]*" name="age"/></li>
                <li class="smallfield"><span class="name">Correo electr&oacute;nico:</span><input placeholder="requerido" type="email" name="email" /></li>
                <li class="smallfield"><span class="name">C&oacute;digo postal:</span><input placeholder="requerido" type="text" pattern="[0-9]*" name="zip_code" /></li>
                <li class="button"><input type="submit" value="Enviar datos"  class="blue" name="submitButton"/></li>
            </ul>
           </fieldset>
        </form>
        
    
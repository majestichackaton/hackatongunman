<?php /* Smarty version Smarty-3.0.7, created on 2012-06-03 08:04:03
         compiled from "/var/www/app/webroot/webservices/api/../quantum/app/views/tests/logplayer.tpl" */ ?>
<?php /*%%SmartyHeaderCode:9190563014fcb1a735f04b4-02388619%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '24ed1c06d7dded1db02279352d3b735ea00cc720' => 
    array (
      0 => '/var/www/app/webroot/webservices/api/../quantum/app/views/tests/logplayer.tpl',
      1 => 1338710634,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '9190563014fcb1a735f04b4-02388619',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset=utf-8>
<title>Sample HTML5 Structure</title>


</head>
<body>
<div id="container">
    <header>
     <h1>Sample HTML5 Structure</h1>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </nav>
    </header>
    <section>
     <hgroup>
         <h1>Main Section</h1>
            <h2>This is a sample HTML5 Page</h2>
        </hgroup>
     <article>
         <p>This is the content for the first article</p>
        </article>
        <article>
         <p>This is the content for the second article</p>
        </article>
    </section>
    <footer>
     <p>This is the Footer</p>
    </footer>
</div>
<script type='text/javascript' src='http://htgame.socialapps.co/webservices/quantum/js/qloader.js'></script>
<script>
  srcs = [
            'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
            'http://htgame.socialapps.co:8080/application.js',
            'http://htgame.socialapps.co/webservices/quantum/js/Quantum.js'
            ];
        
        QLoader.init(srcs, function() {
           
          Quantum.Bootloader.boot();
          Quantum.Gunman.init();
          Quantum.Gunman.Player.init('<?php echo $_smarty_tpl->getVariable('player')->value->id;?>
', '<?php echo $_smarty_tpl->getVariable('player')->value->secret;?>
', function(player) {
                console.log(player);
             });
          }
        );
        QLoader.load();
          
</script>

</body>
</html>
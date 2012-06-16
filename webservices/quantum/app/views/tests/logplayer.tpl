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
          Quantum.Gunman.Player.init('{$player->id}', '{$player->secret}', function(player) {
                console.log(player);
             });
          }
        );
        QLoader.load();
          
</script>

</body>
</html>
<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset=utf-8>
<title>Sample HTML5 Structure</title>


</head>
<body>
<div id="container">
    <article>
        <header>
            <h1 id='main_header'>Are You ready player: {if $match->first_player_id eq $player->id}1{else}2{/if}?</h1>
        </header>
        
        <section id='get_ready_button'>
            <input type='submit' value='Ready for duel' onclick='Quantum.Gunman.Match.playerReady();'>
        </section>
            
        <section id='shoot_button' style='display: none'>
            <input type='submit' value='Shoot..!!!' onclick='Quantum.Gunman.Match.shootNow();'>
        </section>
            
    </article>
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
          
          Quantum.Gunman.Match.init('{$match->id}', '{$match->secret}', function(match) {
            
                console.log(match);
                
                
            });
          
          Quantum.Gunman.Match.setCallback('player_ready', function() {
               
                $('#main_header').text('GET READY');
                $('#get_ready_button').hide();
                
            });
          
          Quantum.Gunman.Match.setCallback('other_player_ready', function() {
               
                $('#main_header').text('YOUR OPPONENT IS READY');
                
                setTimeout(function() {
                    $('#main_header').text('GET READY');
                    },3000);
                
            });
          
          
          Quantum.Gunman.Match.setCallback('shoot_now', function() {
               
                $('#main_header').text('SHOOT NOW');
                $('#shoot_button').show();
                
                
            });
          
          
          Quantum.Gunman.Match.setCallback('before_shoot', function() {
          
                $('#shoot_button').hide();
          
          });
          
          
          
          Quantum.Gunman.Match.setCallback('after_shoot', function() {
          
                $('#main_header').text('RESOLVING MATCH');
          });
          
          
          
          Quantum.Gunman.Match.setCallback('player_won', function() {
            
                $('#main_header').text('YOU WIN');
                
            });
          
          
          Quantum.Gunman.Match.setCallback('player_lost', function() {
            
                console.log('Player lost callback executed');
                $('#main_header').text('YOU LOSE');
                
            });
          
          
          
          }
        );
        
          
          
          QLoader.load();
          
</script>

</body>
</html>
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

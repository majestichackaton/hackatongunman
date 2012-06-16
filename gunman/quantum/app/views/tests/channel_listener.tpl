<!DOCTYPE html>
<html>
<head>
  <meta name="charset" content="utf-8">
  <title>Juggernaut</title>
  <script src="http://htgame.socialapps.co:8080/application.js" type="text/javascript" charset="utf-8"></script>
  {literal}
  <style type="text/css" media="screen">
    h1 {
      margin: 1em 0;
    }
    
    #log {
      padding: 5px;
      background: #CCC;
      height: 500px;
      width: 400px;
    }
  {/literal}
  </style>
</head>
<body>

  <h1>Juggernaut - Hello World!</h1>
  
  <textarea id="log" readonly></textarea>
  {literal}
  <script type="text/javascript" charset="utf-8">
    var logElement = document.getElementById("log");
    logElement.value = "";
    var log = function(data){
      logElement.value += (data + "\n");
    };
    
    var channel_id = '{/literal}{$channel_id}{literal}';
    
    var jug = new Juggernaut({
      secure: ('https:' == document.location.protocol),
      host: document.location.hostname,
      port: document.location.port || 8080
    });
    
    jug.on("connect", function(){ log("Connected") });
    jug.on("disconnect", function(){ log("Disconnected") });
    jug.on("reconnect", function(){ log("Reconnecting") });
    
    log("Subscribing to channel: "+channel_id);
    
    jug.subscribe(channel_id, function(data){
      log("Got data: " + data);
      console.log(data);
    });
  </script>
  {/literal}
</body>
</html>
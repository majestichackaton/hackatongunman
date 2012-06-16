
Quantum.provide('Pubnub', {
 
  Channel: '',
  
  _keys: {
    publish: 'pub-97f307a9-9106-4f70-9669-1f39baebaf4b',
    subscribe:  'sub-e7711140-84c5-11e1-9cee-cb71e91be0d6'
  },
  
  _channelName: '',
    
  init: function(userChannel) {
    
    Quantum.Pubnub._channelName = userChannel;
  
    Quantum.Pubnub.Channel = PUBNUB.init({
		publish_key   : Quantum.Pubnub._keys.publish,
		subscribe_key : Quantum.Pubnub._keys.subscribe,
		ssl           : false,
		origin        : 'pubsub.pubnub.com'
	});
    

  },
  
  subscribe: function() {
	
     Quantum.Pubnub.Channel.subscribe({
		
	channel    : Quantum.Pubnub._channelName,
		
	callback : function(message) {
            console.log('Message Received'+message);
            Quantum.Datalink.processPushMessage(message);
        },
        
         error : function() {
            // The internet is gone.
            console.log("Connection Lost");
        },
        
        connect    : function() {        // CONNECTION ESTABLISHED.

          console.log('Connected to User Channel via Quantum.Pubnub.Channel: '+Quantum.Pubnub._channelName);
          //Quantum.Pubnub.getHistory(100);
        },
        
        disconnect : function() {        // LOST CONNECTION.
            alert(
                "Connection Lost." +
                "Will auto-reconnect when Online."
            )
        },
       
        reconnect  : function() {        // CONNECTION RESTORED.
            alert("And we're Back!")
        }
	
      
      })
	
	
	
  },
  
  publish: function(message) {
    
    Quantum.Pubnub.Channel.publish ({ 
                channel : Quantum.Pubnub._channelName,
                message : message
            })

  },
  
  getHistory: function(limit) {
    console.log('Getting channel history for: '+Quantum.Pubnub._channelName+' Limit: '+limit);
    Quantum.Pubnub.Channel.history( {
	    channel : Quantum.Pubnub._channelName,
	    limit   : limit
	}, function(messages) {
	    Quantum.Datalink.processHistory(messages);
	    
	} );
    
  },
  
  unsubscribe: function() {
    
    Quantum.Pubnub.Channel.unsubscribe({ channel : Quantum.Pubnub._channelName });
    
    
  }





});


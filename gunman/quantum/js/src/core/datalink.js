/**
 * Copyright Quantum Foundation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 * Contains the public method ``Quantum.Datalink.processPushMessage`` for receiving pushed messages from pubsub
 *
 * @provides fbp.datalink
 * @requires fbp.prelude
 */

/**

 * @class Quantum.Datalink
 * @static
 * @access private
 */
Quantum.provide('Datalink', {
	
	
	


  
 
  processPushMessage: function(message) {
      
      
   switch(message.t) {
	
	case '1': // msg
	  
	  Quantum.UIConnector.injectMessage(message);
	  if (message.been_read != 1) {
		Quantum.UIConnector.increaseMessagesCount(1);
		Quantum.UIConnector.titleStatusManager();	
	  }
	
	break;
      
        case '2': // not
	  
	  Quantum.UIConnector.injectNotification(message);
	  if (message.been_read != 1) {
		Quantum.UIConnector.increaseNotificationsCount(1);
		Quantum.UIConnector.titleStatusManager();	
	  }
	 
	break;
      
      
      
      }
      
      
    },
    
  connect: function() {
	
	//Quantum.Pubnub.init(Quantum.User.secret);
	//Quantum.Pubnub.subscribe();
	
	Quantum.Realtime.init(Quantum.User.secret);
	Quantum.Realtime.connect();
	
  },
  
  processHistory: function(messages) {
	
	console.log(messages);
	
  },
  
  

  
  
  Send: {
	
	
	notification: function(name) {
		
		console.log('Hey, i must send a notification:'+name);
		
		var response = {
		
		action: 'notification_update',
		type: name
		
		};
		
		url = Quantum._domain.xd+'internal_proxy/notifications';
	
		Quantum.Datalink.XDGET(url, response, function(srvResp) { Quantum.Datalink.ResponseReceiver.notification(srvResp) } );	
			
		
		
		
	}
	
	
  },
  
  XDGET: function(url, data, callback) {
	
	$.ajax({
		url: url,
		dataType: 'jsonp',
		data: data,
		success: callback
	      });
  
  },
  
  ResponseReceiver: {
	
	notification: function(response) {
		
		
		if (response.status == 'ok' && response.type == Quantum.Notification._names.messages && response.change == true) {
			
			Quantum.UIConnector.setText("#fbp-messages-count", '');
			Quantum.UIConnector.titleStatusManager();
			Quantum.UIConnector.clearUnreadMessages();
			
		}
		
		else if (response.status == 'ok' && response.type == Quantum.Notification._names.notifications && response.change == true){
			
			Quantum.UIConnector.setText("#fbp-notifications-count", '');
			Quantum.UIConnector.titleStatusManager();
			Quantum.UIConnector.clearUnreadNotifications();
		}
		
		console.log(response);
		
		
	}
	
	
  },
  
  StatusManager: {
	
	connected: function() {
		
		console.log('QuantumDatalink Connected to User Channel via Quantum.Realtime.Channel: '+Quantum.Realtime._channelName);
		Quantum.UIConnector.injectConnectionIcons();
		Quantum.Datalink.Hooks.supervisor('connected', false);
	  },
	
	 disconnected: function() {
	
		
		console.log('QuantumDatalink Disconnected');
		Quantum.UIConnector.injectDisconnectionIcons();
		Quantum.Datalink.Hooks.supervisor('disconnected', false);
	  },
	  
	  reconnected: function() {
		
		Quantum.UIConnector.injectConnectionIcons();
		console.log('QuantumDatalink Reconnected');
		Quantum.Datalink.Hooks.supervisor('reconnected', false);
	  },
	  
	  messageReceived: function(message) {
		
		console.log('Message Received'+message);
		Quantum.Datalink.processPushMessage(message);
		Quantum.Datalink.Hooks.supervisor('messageReceived', message);
		
		
	  }
	  
	  
	
	
  },
  
  Hooks: {
	
	
	//this is a tricky one, it allows us to set callback functions that will be fired on the different statuses of the datalink connection.
	
	set: function(type, functionToFire){
	 	
		Quantum.Datalink.Hooks.shouldOverride = true;
		Quantum.Datalink.Hooks.type = type;
		Quantum.Datalink.Hooks.functionToFire = functionToFire;
		
		
	},
	
	supervisor: function(statusType, message) {
		
		if (Quantum.Datalink.Hooks.shouldOverride === true && Quantum.Datalink.Hooks.type === statusType) {
			
			Quantum.Datalink.Hooks.functionToFire(message);
			return true;
		}
		
		return false;
		
	}
	
	
	
  },
  
  MessageSystem: {
	
	getMessages: function(_limit) {
		
		url = Quantum._domain.xd+'internal_proxy/get_user_messages';
		
		params = { limit: _limit };
	
		Quantum.Datalink.XDGET(url, params, function(serverResponse) {
			
			_msgs = serverResponse.messages;
			
			_a = new Array();
			
			Quantum.Array.forEach(_msgs, function(_msg) {
				_a.push(_msg);
			}, false);
			
			_a.reverse();
			
			Quantum.Array.forEach(_a, function(_msg) {
				Quantum.Datalink.processPushMessage(_msg);
			}, false);
		})
		
	},
	
	getNotifications: function(_limit) {
		
		url = Quantum._domain.xd+'internal_proxy/get_user_notifications';
		
		params = { limit: _limit };
	
		Quantum.Datalink.XDGET(url, params, function(serverResponse) {
			
		_msgs = serverResponse.notifications;
			
			_a = new Array();
			
			Quantum.Array.forEach(_msgs, function(_msg) {
				_a.push(_msg);
			}, false);
			
			_a.reverse();
			
			Quantum.Array.forEach(_a, function(_msg) {
				Quantum.Datalink.processPushMessage(_msg);
			}, false);
		})
		
	}
	
	
	
  }
  
 
  
 


	


});


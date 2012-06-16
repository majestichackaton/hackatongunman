/**
 * Copyright Majestic Media
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
 * Contains methods for launch after document ready.
 *
 * @provides fbp.bootloader
 * @requires fbp.prelude
 */

/**

 * @class Quantum.Gunman
 * @static
 * @access private
 */

Quantum.provide('Gunman', {
 
    playerId: '',
    playerSecret: '',
    player: '',
    matchId: '',
    match: '',
    matchChannelId: '',
    playerInitCallbacks: [],
    matchInitCallbacks: [],
    shootMessageReceivedTime:'',
    shootTime:'',
    matchPhaseCallbacks:[],
 
 
    init: function(url, callback) {
		
        console.log('Here we can initialize whatever is needed by gunman');
		
		
	},
        
    Player: {
        
        init: function(playerId, playerSecret, callback) {
            Quantum.Gunman.playerId = playerId;
            Quantum.Gunman.playerSecret = playerSecret;
            if (typeof(callback) === 'function') {
                console.log('you passed me afunction');
                    callback.playerInitCallback = true;
                    Quantum.Gunman.playerInitCallbacks.push(callback);
                    console.log(Quantum.Gunman.playerInitCallbacks);
            } else {
                console.log('callback is not a function: '+callback);
            }
            Quantum.Gunman.Api.setPlayerData();
        
        },
        
        loadComplete: function(player) {
            Quantum.Gunman.player = player;
            console.log('User data loaded complete: '+player);
            Quantum.Gunman.executeInitCallbacks(Quantum.Gunman.playerInitCallbacks);
        }
            
            
        
    },
    
    Match: {
        
        init: function(match_id, channel_id, callback) {
            Quantum.Gunman.matchId = match_id;
            Quantum.Gunman.matchChannelId = channel_id;
            if (typeof(callback) === 'function') {
                callback.matchInitCallback = true;
                Quantum.Gunman.matchInitCallbacks.push(callback);
            }
            Quantum.Gunman.Api.setMatchData();
        
        },
        
        loadComplete: function(match) {
            Quantum.Gunman.match = match;
            console.log('Match data loaded complete: '+match);
            
            
	    
            Quantum.Realtime.init(match.channel_id);
            Quantum.Realtime.connect();
	    Quantum.Datalink.Hooks.set('messageReceived', function(message) {
			   Quantum.Gunman.Process.pushMessage(message);
	    });
            
            Quantum.Gunman.executeInitCallbacks(Quantum.Gunman.matchInitCallbacks);
        },
        
        playerReady: function() {
            Quantum.Gunman.Api.playerIsReady();
        },
	
	shootNow: function() {
	    Quantum.Gunman.shootTime = new Date().getTime();
	    Quantum.Gunman.Api.playerShoot();
	},
	
	setCallback:function(phase, callback) {
	    
	    if (phase == 'player_ready') {
		callback.phase = 'player_ready';
		Quantum.Gunman.matchPhaseCallbacks.push(callback);
	    }
	    
	    if (phase == 'other_player_ready') {
		callback.phase = 'other_player_ready';
		Quantum.Gunman.matchPhaseCallbacks.push(callback);
	    }
	    
	    if (phase == 'before_shoot') {
		callback.phase = 'after_shoot';
		Quantum.Gunman.matchPhaseCallbacks.push(callback);
	    }
	    
	    if (phase == 'after_shoot') {
		callback.phase = 'after_shoot';
		Quantum.Gunman.matchPhaseCallbacks.push(callback);
	    }
	    
	    if (phase == 'shoot_now') {
		callback.phase = 'shoot_now';
		Quantum.Gunman.matchPhaseCallbacks.push(callback);
	    }
	    
	    if (phase == 'player_won') {
		callback.phase = 'player_won';
		Quantum.Gunman.matchPhaseCallbacks.push(callback);
	    }
	    
	    if (phase == 'player_lost') {
		callback.phase = 'player_lost';
		Quantum.Gunman.matchPhaseCallbacks.push(callback);
	    }
	
	}
            
            
        
    },
    
    Api: {
        
        setPlayerData: function(callback) {
            
            Quantum.Datalink.XDGET(Quantum._domain.api+'/player/profile', {id:Quantum.Gunman.playerId}, function(player) {
                Quantum.Gunman.Player.loadComplete(player);
                });
           
        },
        
        setMatchData: function(callback) {
            
            var requestData = {match_id: Quantum.Gunman.matchId, channel_id: Quantum.Gunman.matchChannelId};
            Quantum.Datalink.XDGET(Quantum._domain.api+'/match', requestData, function(match) {
                Quantum.Gunman.Match.loadComplete(match);
                });
           
        },
        
        playerIsReady: function() {
            
            var data = {match_id: Quantum.Gunman.matchId, player_secret: Quantum.Gunman.playerSecret};
            Quantum.Datalink.XDGET(Quantum._domain.api+'/match/ready', data, function(match) {
			Quantum.Gunman.UI.fireCallbacks('player_ready');
                });
        },
	
	playerShoot: function() {
	   
	    
	    Quantum.Gunman.UI.fireCallbacks('before_shoot');
	    
	     var data = {
		match_id: Quantum.Gunman.matchId,
		player_secret: Quantum.Gunman.playerSecret,
		received_shoot_message_time: Quantum.Gunman.shootMessageReceivedTime,
		player_shoot_time: Quantum.Gunman.shootTime
		
		};
           
	    Quantum.Datalink.XDGET(Quantum._domain.api+'/match/shoot', data, function(match) {
		Quantum.Gunman.UI.fireCallbacks('after_shoot');
               
                });
	    
	}
        
        
    },
    
    executeInitCallbacks: function(callbacks) {
        console.log('executing callbacks');
        if (callbacks !== undefined && callbacks.length > 0) {

            for (var i = 0; i < callbacks.length; i++) {
                console.log('processing a callback:');
                Quantum.Gunman.runInitCallback(callbacks[i]);
            }
        }
    },
    
    runInitCallback: function(callback) {
        console.log(callback);
        if (typeof callback === 'function' && !callback.done) {
                if (callback.playerInitCallback) {
                    callback(Quantum.Gunman.player);
                }
                if (callback.matchInitCallback) {
                    callback(Quantum.Gunman.match);
                }
                callback.done = true;
        }
    },
    
    
    Process: {
        
        pushMessage: function(message) {
            
	    if (message.event_type == "shoot_now") {
		Quantum.Gunman.shootMessageReceivedTime = new Date().getTime();
		Quantum.Gunman.UI.fireCallbacks('shoot_now');
	    }
	    
	    if (message.event_type == "winner_resolution") {
		
		if (message.winner_id == Quantum.Gunman.playerId) {
		    Quantum.Gunman.UI.fireCallbacks('player_won');
		}
		
		if (message.winner_id != Quantum.Gunman.playerId) {
		    Quantum.Gunman.UI.fireCallbacks('player_lost');
		}
		
	    }
	    
	    if (message.event_type == "player_ready" && message.player_id != Quantum.Gunman.playerId) {
		Quantum.Gunman.UI.fireCallbacks('other_player_ready');
	    }
            console.log(message);
            
        }
        
    },
    
    UI: {
	
	
	fireCallbacks: function(phase) {
	    console.log('firing callbacks for:'+phase);
	    console.log('Callbacks array length:'+Quantum.Gunman.matchPhaseCallbacks.length);
	     for (var i = 0; i < Quantum.Gunman.matchPhaseCallbacks.length; i++) {
                if (Quantum.Gunman.matchPhaseCallbacks[i].phase == phase) {
			Quantum.Gunman.matchPhaseCallbacks[i].call();
		} 
            }
	}
        
    }
   
   
   
    
   
   
            
            

            
            
});


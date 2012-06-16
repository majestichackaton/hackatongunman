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
 * Contains methods for launch after document ready.
 *
 * @provides fbp.bootloader
 * @requires fbp.prelude
 */

/**

 * @class Quantum.Realtime
 * @static
 * @access private
 */

Quantum.provide('Realtime', {
    
    Channel : '',
    
    _channelName : '',
 
    init: function(userChannel) {
        
        Quantum.Realtime._channelName =  userChannel;
       
        window.WEB_SOCKET_SWF_LOCATION = Quantum._domain.rt+"WebSocketMain.swf";
        
        Quantum.Realtime.Channel = new Juggernaut({
          secure: ('https:' == ''+Quantum._domain.rtHost+''),
          host: ''+Quantum._domain.rtHost+'',
          port: ''+Quantum._domain.rtPort+''
        });
      
        
        
    },
    
    
    connect: function() {
        
          
        Quantum.Realtime.Channel.on("connect", function(){
            
            Quantum.Datalink.StatusManager.connected();
           
            });
     
        Quantum.Realtime.Channel.on("disconnect", function(){
            
            Quantum.Datalink.StatusManager.disconnected();
            
            
            });
      
        Quantum.Realtime.Channel.on("reconnect", function(){
            
            Quantum.Datalink.StatusManager.reconnected();
          
            
            });
    
        Quantum.Realtime.Channel.subscribe(Quantum.Realtime._channelName, function(message){
         
            Quantum.Datalink.StatusManager.messageReceived(message);
         
        });
        
        
        
    }
    
   
   
   
            
            

            
            
});


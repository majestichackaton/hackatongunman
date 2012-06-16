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

 * @class Quantum.Bootloader
 * @static
 * @access private
 */

Quantum.provide('Bootloader', {
 
 
 
 
    boot: function() {
        
       
        
        console.log('Hello from Bootloader.boot');
        
        Quantum.Bootloader.UI.General.template();
        
        Quantum.UIConnector.Document.originalTitle = document.title;
        
        
        
    },
    
   
   
    js: function() {
        
        
   
   
   
    },
    
   
   
    events: function() {
        
        
        
    },
    
    
    User: {
        
        
        init: function(id, secret) {
            
            
            Quantum.User.id = id;
            Quantum.User.secret = secret;
            
            console.log('user initialized:'+Quantum.User.id+" - "+Quantum.User.secret);
            
        }
        
    },
    
    App: {
        
        
        initClientServices: function(id) {
            
            
            Quantum.App.id = id;
            console.log('App data initialized:'+Quantum.App.id);
            
        }
        
    },
    
    UI: {
        
        
        
        Specific: {
            
            
            notificationService: function() {
                
              
                
                
            }
            
        },
            
        
        
        
        General: {
            
            
            template: function() {
                
                
               
               
               
             
              }
            
        },
            
        Pages: {
                
                
                apps: function() {
                    
                    
                    
                },
                
                welcome: function() {
                   
                },
                
                instructions: function() {
                    
                  
                    
                },
                
                highScores: function() {
                    
                   
                },
                
                matchRoom: function() {
                    
               
                    
                },
                
                developers: function() {
                    
                   
                   srcs = [
                           Quantum._domain.my+'/public/pagedown/Markdown.Converter.js',
                           Quantum._domain.my+'/public/pagedown/Markdown.Sanitizer.js',
                           Quantum._domain.my+'/public/pagedown/Markdown.Editor.js'];
                   
                   setTimeout(function() {
                    
                    QLoader.require(srcs, function() {
                            renderEditor();
                        });
                    }, 1);
                    
                    
                }
              
        }
        
        
         
    },
    
    Datalink: {
        
        init: function(){
            
              Quantum.JS.load(Quantum._domain.rt+'rt.js', function() {
                
                Quantum.Datalink.connect();
                
                });
            
            
        }
        
    }
    
   
            
            

            
            
});


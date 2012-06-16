

Quantum.provide('App', {
 
 
 
    boot: function() {
        
       
        //alert('holaaaaa');
      
        
        
        
    },
    
    Pages: {
        
        Welcome: {
            
            boot: function() {
                
                
               Quantum.App.Facebook.init();
                
            
                $('#facebookConnect').click(function(){
                    $.facebook('connect', function(r, logged_in){
                       if (loged_in) {
                        alert('thanks for registering');
                        }
                        
                    }, 'email');
                });
                
                
                FB.Event.subscribe('auth.login', function(response) {
                                            
                      //window.location = App.Config.url+'game/menu?access_token='+$.facebook('accessToken')+'&authorized=1';
                        App.UIConnector.showUserMenu();
                        App.UIConnector.hideConnectButton();
                        
                });
               
            
            }   
            
            
        },
        
        Play: {
            
            boot: function() {
                
                
               Quantum.App.Facebook.init();
                
            
                App.Datalink.XDGET()
               
            
            }   
            
            
        }
        
        
       
        
        
        
        
    },
    
    Config: {
        
        
        setLanguage: function(language) {
            App.Config.language = language;
        },
        
        
        setAppId: function(id) {
            App.Config.appId = id;
        },
        
        setAppUrl: function(url) {
            App.Config.url = url;
        },
        
        setAppPageUrl: function(url) {
            App.Config.pageUrl = url;
        },
        
        setPromoCode: function(code) {
            App.Config.promoCode = code;
        },
        
        setFacebookUserId: function(id) {
            App.Config.fbuid = id;
        }
        
        
        
    },
    
    Facebook: {
        
        
        init: function() {
            
            
            FB.init({
                appId      : App.Config.appId,
                channelUrl : App.Config.url+'/app/channel', // Channel File
                locale: 'en_US',
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true,  // parse XFBML
                frictionlessRequests : true
            });
            
             
             
             
             FB.getLoginStatus(function( response ) {
                App.Facebook.StatusManager.process(response);
            });
             
             
            $.facebook({
                appId: App.Config.appId,
                xfbml: true,
                locale: 'en_US',
                channelUrl: App.Config.url+'/app/channel',
                onInit: function(){
                    FB.getLoginStatus(function(response){
                      if (response.authResponse)
                      {
                        access_token = response.authResponse.accessToken;
          
                        if (typeof processRequests !== 'undefined')
                        {
                          FB.api('/me/apprequests', function(r){
                            if (r.data)
                            {
                              if (r.data.length > 0)
                              {
                                $.each(r.data, function(i,o){
                                  FB.api('/'+o.id, 'delete', function(r){});
                                });
                              }
                            }
                          });
                        }
                      }
                    });
                }
            });
            
            
           
            
        },
        
        
        StatusManager: {
            
            
            process: function(response) {
                
                console.log(response);
                
                if (response.status == 'not_authorized') {
                    App.UIConnector.showConnectButton();
                } else if (response.status == 'connected'){
                    App.UIConnector.showUserMenu();
                }
                
                
            }
            
        }
    },
    
    /*
     
       <div class="clickable" id="playNowButton" data-href="#"></div>
      <div class="clickable" id="inviteFriendsButton" data-href="#"></div>
      <div class="clickable" id="leaderboardsButton" data-href="#"></div>
      <div class="clickable" id="howToPlayButton" data-href="#"></div>
      
      <div class="clickable" id="facebookConnect"></div>
     
    */
    
    
    
    UIConnector : {
        
        
        hideUserMenu: function() {
            
            
            $('#playNowButton').hide();
            $('#inviteFriendsButton').hide();
            $('#leaderboardsButton').hide();
            $('#howToPlayButton').hide();
     
        },
        
        
        showUserMenu: function() {
            
            $('#playNowButton').show();
            $('#inviteFriendsButton').show();
            $('#leaderboardsButton').show();
            $('#howToPlayButton').show();
        },
        
        showConnectButton: function() {
            
            $('#facebookConnect').show();
            
        },
        
        hideConnectButton: function() {
            
            $('#facebookConnect').hide();
            
        }
        
        
        
        
        
        
        
        
        
        
    },
    

    
    
    
    UI: {
        
        shootOut: function() {
            
            FB.ui({
                method: 'feed',
                link: App.Config.url+'/app/fanpage/ref-shootout',
                name: App.Config.language == 'fr' ? 'Aide-moi à t’aider!' : 'Help me help you!',
                caption: App.Config.language == 'fr' ? 'Recommandez un ami à Virgin Mobile' : 'Refer a Friend to Virgin Mobile',
                picture: App.Config.url+'/img/75x75.jpg',
                description: App.Config.language == 'fr' ? 'Hé! Es-tu un Membre Virgin Mobile? Recommande-moi pour que je me joigne à Virgin Mobile et on profitera tous les deux d’une carte-cadeau de 50 $! Génial!' : 'Hey, are you a Virgin Mobile Member?  Refer me to join Virgin Mobile and we both score a $50 gift card! Sweet.'
            });
            
        },
        
        shareWithSelectedFriends: function(r) {
            alert (r.to);
           
            console.log(r.to);
            
            FB.ui({
                method: 'apprequests',
                link: App.Config.url+'/app/fanpage/website-virgin-'+App.Config.language,
                to: r.to,
                display: 'page',
                name: App.Config.language == 'fr' ? 'Wow! Une offre d’enfer de Virgin Mobile!' : 'OMG!  Awesome offer from Virgin Mobile!',
                caption: App.Config.language == 'fr' ? 'Recommandez un ami à Virgin Mobile' : 'Refer a Friend to Virgin Mobile',
                picture: App.Config.url+'/img/75x75.jpg',
                message: App.Config.language == 'fr' ? 'Hé! J’adore les avantages de Membre auxquels j’ai droit chez Virgin Mobile. En te branchant en ligne avec ce code promo : '+App.Config.promoCode+', on profitera tous les deux d’une carte-cadeau de 50 $ de la part de marques extraordinaires. Ainsi, tout le monde est génial! Jettes-y un œil!' : 'Hey!  I love the Member benefits I get from Virgin Mobile. If you hook up online using this promo code: '+App.Config.promoCode+' we’ll both get  to choose a $50 gift card from some awesome brands.  Then we can all be awesome together.  Check it out!'
            });
                
        },
        
        
        sharePromoCodeWithFriends: function() {
            FB.ui({
                caption: App.Config.language == 'fr' ? 'Recommandez un ami à Virgin Mobile' : 'Refer a Friend to Virgin Mobile',
                picture: App.Config.url+'/img/75x75.jpg',
                method: 'apprequests',
                message: App.Config.language == 'fr' ? 'Hé! J’adore les avantages de Membre auxquels j’ai droit chez Virgin Mobile. En te branchant en ligne avec ce code promo : '+App.Config.promoCode+', on profitera tous les deux d’une carte-cadeau de 50 $ de la part de marques extraordinaires.' : 'Hey!  I love the Member benefits I get from Virgin Mobile. If you hook up online using this promo code: '+App.Config.promoCode+' we’ll both get  to choose a $50 gift card from some awesome brands.  Then we can all be awesome together.  Check it out!',
            },function(response) {
                if (response.to != undefined) {
                    console.log(response.to);
                    App.UI.sendRequestToManyRecipients(response.to);
                }
                
                });
            
            
        
        },
        
        sendRequestToManyRecipients: function(user_ids) {
           console.log(user_ids);
            FB.ui({
              method: 'apprequests',
              link: App.Config.url+'/app/fanpage/website-virgin-'+App.Config.language,
              message: App.Config.language == 'fr' ? 'Hé! J’adore les avantages de Membre auxquels j’ai droit chez Virgin Mobile. En te branchant en ligne avec ce code promo : '+App.Config.promoCode+', on profitera tous les deux d’une carte-cadeau de 50 $ de la part de marques extraordinaires.' : 'Hey!  I love the Member benefits I get from Virgin Mobile. If you hook up online using this promo code: '+App.Config.promoCode+' we’ll both get  to choose a $50 gift card from some awesome brands.  Then we can all be awesome together.  Check it out!',
              to: user_ids
            }, Quantum.App.UI.requestCallback);
        
        },

        
        requestCallback: function(response) {
         console.log(response);
        },
        
        shareOnOwnWall: function() {
            
            FB.ui({
                method: 'feed',
                link: App.Config.url+'/application/fanpage/website-virgin-'+App.Config.language,
                name: App.Config.language == 'fr' ? 'Wow! Des cartes-cadeaux de 50 $ pour mes amis!' : 'OMG!  $50 gift cards for my friends!',
                caption: App.Config.language == 'fr' ? 'Recommandez un ami à Virgin Mobile' : 'Refer a Friend to Virgin Mobile',
                picture: App.Config.url+'/img/75x75.jpg',
                description: App.Config.language == 'fr' ? 'Hé! J’adore les avantages de Membre auxquels j’ai droit chez Virgin Mobile. En te branchant en ligne avec ce code promo : '+App.Config.promoCode+', on profitera tous les deux d’une carte-cadeau de 50 $ de la part de marques extraordinaires. Ainsi, tout le monde est génial! Jettes-y un œil!' : 'Hey!  I love the Member benefits I get from Virgin Mobile. If you hook up online using this promo code: '+App.Config.promoCode+' we’ll both get  to choose a $50 gift card from some awesome brands.  Then we can all be awesome together.  Check it out!'      
            });
    
        }
   
    },
    
    Datalink: {
            
            
            registerPlayerForMatch: function() {
                
                params = {code:Store.codeToCheck.toUpperCase()};
                
                Quantum.App.Datalink.XDGET('/api/register', params, function(data) {
                    if (data.error) {
                       
                        Store.showErrorMessage();
                        
                    } else if (data.first_name){
                        
                        Store.showOkMessage();
                        
                    }
                    
                    });
                
            },
            
            checkPhoneNumber: function() {
                
                
            },
            
            
            submitStoreForm: function() {
                
              console.log('submitting....');
                
              Store.codeToCheck = $('#promo_code_field').val();
              
              phone1 = $('#phone1').val();
              phone2 = $('#phone2').val();
              phone3 = $('#phone3').val();
              
              phone = phone1+phone2+phone3;
              
              Store.phoneToCheck = phone;
              
              params = {code:Store.codeToCheck.toUpperCase(), phone: Store.phoneToCheck, activation:'in_store'};
              
               Quantum.App.Datalink.POST('/store/', params, function(data) {
                    
                    if (data.error) {
                       
                        e = $.parseJSON(data.responseText)
                        
                        console.log(e);
                        
                        if (e.error == 'invalid_phone') {
                            alert('Invalid Phone Number');
                        }
                        
                         if (e.error == 'invalid_promo_code') {
                            Store.showErrorMessage();
                        }
                       
                        
                    } else if (data.first_name){
                        
                        Store.promoCodePdfUrl = data.pdf_url;
                        Store.validPromoCode = data.promo_code;
                        
                        console.log(data);
                        Store.goPageTwo();
                    }
                    
              });
                
            },
            
            XDGET: function(url, data, callback) {
                
                $.ajax({
                    url: url,
                    dataType: 'json',
                    data: data,
                    success: callback,
                    
                    error:function (error){
                        callback(error);
                    }
                });
            },
            
            POST: function(url, data, callback) {
                
                $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: 'json',
                    data: data,
                    success: callback,
                    
                    error:function (error){
                        console.log(error);
                        callback(error);
                    }
                });
            }
            
            
    },
    
    
        
        
   
    
    
            
            

            
            
});

window.App = Quantum.App;
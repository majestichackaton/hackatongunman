
Quantum.provide('UIConnector', {
    
    
    
    Document: {
        
        
        originalTitle: ''
        
    },
 
 
    Process: {
	
	notificationClick: function(name) {
		
		
		
		return false;
		
	},
        
        /**
         * Here we can define individual overrides for pages.... should rewrite but for now it's ok, because actually the set override function allows
         * us to set any function as callback for the specified override, we just put this here for now.
         */
        
        pagesOverrides: function(page, message) {
            
            switch(page) {
                
                 case "apps":
                    
                    console.log('The apps page hook for receiving messages viar the datalink is ready..., the message type received is:'+message.t);
                    
                    if (message.t == "resize_canvas" && message.app_id == Quantum.App.id) {
                        
                         if (message.hasOwnProperty('height')) {
                                console.log('i should resize the iframe height to:'+message.height);
                                $('#canvas').height(message.height);
                            }
                            
                        if (message.hasOwnProperty('width')) {
                                console.log('i should resize the iframe width to:'+message.width);
                                
                                if (message.width >= 740) {
                                    
                                   var pos = $('#canvas_box').position();
                                    //alert("POSITION: nLeft: "+pos.left + "nTop: " + pos.top);
                                                                       
                                    $('#canvas_box').css( { 
                                        position: 'absolute'
                                       // left: '0px'  TODO
                                        
                                        
                                    } );
                                }
                                
                                $('#canvas_box').width(message.width);
                                $('#canvas').width(message.width);
                            }
                            
                    }
                    
                     if (message.t == "open_app_dialog" && message.app_id == Quantum.App.id) {
                        
                        if (message.hasOwnProperty('html')) {
                            console.log('I ve got to open an html dialog');
                            $.colorbox({html: message.html, width: message.width, height: message.height});
                        }
                        if (message.hasOwnProperty('iframe_url')) {
                            console.log('I ve got to open an iframe dialog');
                            $.colorbox({iframe:true, href: message.iframe_url, width: message.width, height: message.height});
                        }
                        
                        
                        
                       
                    }
                    
                   break;
                
                
            }
            
            
        }
	
  },
      
      
      
  
    increaseNotificationsCount: function(count) {
	
	x = this.getNotificationsCount();
	
	$("#fbp-notifications-count").text(x+count);
	
      },
      
    
  
  
    getNotificationsCount: function() {
	
	
	x = $("#fbp-notifications-count").text();
        
	if (x !== '') {
            
            return parseInt(x);
        }
        
        else {
            
            return 0;
        }
        
      },
      
    
    
    
    injectMessage: function(msg) {
	
	html = this.generateMessageHtml(msg);
	$("#fbp-messages-list").prepend(html);
	
	
      },
      
    
    
    injectNotification: function(msg) {
	
	html = this.generateMessageHtml(msg);
	$("#fbp-notifications-list").prepend(html);
	
	
      },
      
      
    setText: function(_id, _text) {
        
        $(_id).text(_text);
        
      
    },
    
    
    
    generateMessageHtml: function(msg) {
	
	var html = "";
        
            if (msg.been_read != 1) {
              html += "<li class='fbp-notification-box-unread-content'><a href='"+msg.url+"'  >";  
            }
            
            else {
              html += "<li class='fbp-notification-box-read-content'><a href='"+msg.url+"'  >"; 
            }
	
	    html += "<img src='"+msg.i+"' align='left' class='fbp-message-box-image' />";
	  
	    html += msg.b;
	    
	    html += "</a></li>";
	    
	    return html;
	    
	    
      },
      
      
    setNotificationsLinkEvent: function() {
        
        
        
        
    },
    
    setEventListener: function(id, type, fn) {
   
        console.log('I should set a '+type+' event for: '+id+' callback: '+fn);
        
    
        $(id).on(type, function() { fn(); });
 
    },
    
    titleStatusManager: function() {
        
        console.log('YOUR FRIEND THE TSM IS ALIVE');
        
        x = Quantum.UIConnector.getMessagesCount()+Quantum.UIConnector.getNotificationsCount();
        
       if (x > 0) {

            newTitle = '('+ x.toString()+') '+Quantum.UIConnector.Document.originalTitle;
            
        }
        
        else {
            
            newTitle = Quantum.UIConnector.Document.originalTitle;
        }
        
        
    
        $(document).attr('title', newTitle);
        
        
    },
    
    
    
    injectDisconnectionIcons: function() {
        
          _attrs = {
                src: Quantum._domain.my+'/public/images/icons/n_disconnect.png',
                title: 'Datalink disconnected',
                alt: 'Datalink disconnected'
                 };
                
         $("#fbp-messages-image").attr(_attrs);
         
         $("#fbp-notifications-image").attr(_attrs);
        
        
        
    },
    
    injectConnectionIcons: function() {
                
         $("#fbp-messages-image").attr("src", Quantum._domain.my+'/public/images/icons/n_messages.png');
         
         $("#fbp-notifications-image").attr("src", Quantum._domain.my+'/public/images/icons/n_notifications.png');
        
        
        
    },
    
    
    clearUnreadMessages: function() {
        
        console.log('i should clear the color of the unread messages now');
        //nw $("#fbp-messages-list").animate({backgroundColor:"white"},  100);
        $("#fbp-messages-list").children().animate({backgroundColor: '#FFFFFF'}, 4000);
      //  $("#fbp-messages-list").children().css('background-color', '#FFF');
    },
    
    clearUnreadNotifications: function() {
        
        console.log('i should clear the color of the unread notifications now');
        $("#fbp-notifications-list").children().animate({backgroundColor: '#FFFFFF'}, 4000);
    },
    
  
    
    showHubCommentReplyForm: function(id) {
            
            $('#reply_comment_'+id).show("fast");
            return false;
    },

    hideHubCommentReplyForm: function(id) {
            
            $('#reply_comment_'+id).hide("fast");
            return false;
    },

    showHubCommentEditForm: function(id) {
            
            $('#edit_comment_'+id).show("fast");
            return false;
    },

    hideHubCommentEditForm: function(id) {
	
	$('#edit_comment_'+id).hide("fast");
	return false;
    },

    submitChangeGraphForm: function(id) {
	
	$('#change_graph_form').submit();
	return false;
    },

    showHubCommentManagementModal: function(id) {
            
            $.colorbox({inline:true, href:'#manage_comment_'+id, width:"auto", height:"auto"});
            return false;
    },
    
    launchGeocodeModal: function(ip) {
            
            url = "http://api.ipinfodb.com/v3/ip-city/?key=fd2acf736479283bc5aedfef348ef2557567866f7ae45bf385bbaa22541f309a%20&ip="+ip+"&format=json&callback=?";
            
             $.getJSON(url, function(data) {
                    
                     countryCode = data['countryCode'];
                     countryName = data['countryName'];
                     city = data['cityName'];
                     timezone = data['timeZone'];
                     latitude = data['latitude'];
                     longitude = data['longitude'];
                     
                    htmlContent = "<div class='comment-management-modal-content'>";
                    htmlContent = htmlContent+"<b>Ip Geolocation for: "+ip+"</b>";
                    htmlContent = htmlContent+"<p><b>Country Code: </b>"+countryCode+"</p>";
                    htmlContent = htmlContent+"<p><b>Country Name: </b>"+countryName+"</p>";
                    htmlContent = htmlContent+"<p><b>City: </b>"+city+"</p>";
                    htmlContent = htmlContent+"<p><b>Timezone: </b>"+timezone+"</p>";
                    htmlContent = htmlContent+"<p><b>Latitude: </b>"+latitude+"</p>";
                    htmlContent = htmlContent+"<p><b>Longitude: </b>"+longitude+"</p>";
                    htmlContent = htmlContent+"</div>";
                   
                    $().colorbox({html:htmlContent, width:"auto", height:"auto"});
            });
            
            
            
            return false;
            
        },
	
	
        
    chartCategoryChanged: function() {
	
	try {
		var chartform = document.getElementById("update_chart_category");
		chartform.submit();
		
	} catch (ex) {
		alert("Error submitting form");
	}
	
    },
    
    
    //this comes from devs.js
    
    showWebsiteAppForm: function() {
	
	
	$('#websiteAppFormContainer').show();
	$('#canvasAppFormContainer').hide();
	$('#desktopAppFormContainer').hide();
	$('#pluginAppFormContainer').hide();
	
    },
	
    showCanvasAppForm: function() {
	    
	    
	    $('#canvasAppFormContainer').show();
	    $('#websiteAppFormContainer').hide();
	    $('#desktopAppFormContainer').hide();
	    $('#pluginAppFormContainer').hide();
	    
    },
    
    showDesktopAppForm: function() {
	    
	    
	    $('#desktopAppFormContainer').show();
	    $('#canvasAppFormContainer').hide();
	    $('#websiteAppFormContainer').hide();
	    $('#pluginAppFormContainer').hide();
	    
    },
	    
    showHubPluginAppForm: function() {
	    
	    
	    $('#pluginAppFormContainer').show();
	    $('#canvasAppFormContainer').hide();
	    $('#websiteAppFormContainer').hide();
	    $('#desktopAppFormContainer').hide();
	    
	    },
    
    openChangePasswordDialog: function(id) {
            
            $.colorbox({inline:true, href:'#change_password_dialog', width:"auto", height:"auto"});
            return false;
    },
    
    openChangeAliasDialog: function(id) {
            
            $.colorbox({inline:true, href:'#change_alias_dialog', width:"auto", height:"auto"});
            return false;
    },
    
    showConfirmPlanModal: function(id) {
            
            $.colorbox({inline:true, href:'#confirm_plan_'+id, width:"auto", height:"auto"});
            return false;
    },
    
    showConfirmOfferModal: function(id) {
            console.log('wtf');
            $.colorbox({inline:true, href:'#confirm_offer_'+id, width:"auto", height:"auto"});
            return false;
    }
    
    
    
    
  







});


this.JSON||(this.JSON={});
(function(){function a(a){return a<10?"0"+a:a}function b(a){e.lastIndex=0;return e.test(a)?'"'+a.replace(e,function(a){var b=m[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function c(a,d){var e,i,j,n,o=f,h,g=d[a];g&&(typeof g==="object"&&typeof g.toJSON==="function")&&(g=g.toJSON(a));typeof l==="function"&&(g=l.call(d,a,g));switch(typeof g){case "string":return b(g);case "number":return isFinite(g)?""+g:"null";case "boolean":case "null":return""+g;
case "object":if(!g)return"null";f=f+k;h=[];if(Object.prototype.toString.apply(g)==="[object Array]"){n=g.length;for(e=0;e<n;e=e+1)h[e]=c(e,g)||"null";j=h.length===0?"[]":f?"[\n"+f+h.join(",\n"+f)+"\n"+o+"]":"["+h.join(",")+"]";f=o;return j}if(l&&typeof l==="object"){n=l.length;for(e=0;e<n;e=e+1){i=l[e];if(typeof i==="string")(j=c(i,g))&&h.push(b(i)+(f?": ":":")+j)}}else for(i in g)if(Object.hasOwnProperty.call(g,i))(j=c(i,g))&&h.push(b(i)+(f?": ":":")+j);j=h.length===0?"{}":f?"{\n"+f+h.join(",\n"+
f)+"\n"+o+"}":"{"+h.join(",")+"}";f=o;return j}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+a(this.getUTCMonth()+1)+"-"+a(this.getUTCDate())+"T"+a(this.getUTCHours())+":"+a(this.getUTCMinutes())+":"+a(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var d=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
e=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,f,k,m={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},l;if(typeof JSON.stringify!=="function")JSON.stringify=function(a,b,d){var e;k=f="";if(typeof d==="number")for(e=0;e<d;e=e+1)k=k+" ";else typeof d==="string"&&(k=d);if((l=b)&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number"))throw Error("JSON.stringify");return c("",
{"":a})};if(typeof JSON.parse!=="function")JSON.parse=function(a,b){function c(a,d){var e,f,g=a[d];if(g&&typeof g==="object")for(e in g)if(Object.hasOwnProperty.call(g,e)){f=c(g,e);f!==void 0?g[e]=f:delete g[e]}return b.call(a,d,g)}var e;d.lastIndex=0;d.test(a)&&(a=a.replace(d,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){e=eval("("+a+")");return typeof b==="function"?c({"":e},""):e}throw new SyntaxError("JSON.parse");}})();
window.Quantum||(Quantum={_apiKey:null,_session:null,_userStatus:"unknown",_logging:!0,_inCanvas:-1<window.location.search.indexOf("fbp_sig_in_iframe=1")||-1<window.location.search.indexOf("session="),_domain:{api:"http://api.flightbackpack.com/",ws:"http://ws.flightbackpack.com/",oauth:"http://oauth.flightbackpack.com/",my:"https:"==window.location.protocol?"https://my.flightbackpack.com/":"http://my.flightbackpack.com",insights:"https://insights.flightbackpack.com/",staticfbp:"http://static.ak.flightbackpack.com/",
dev:"http://dev.flightbackpack.com",m:"http://m.flightbackpack.com",dispatch:"http://dispatch.flightbackpack.com",apps:"http://apps.flightbackpack.com",hangar:"http://apphangar.flightbackpack.com",airlines:"http://airlines.flightbackpack.com",xd:"http://xd.flightbackpack.com/",rt:"http://realtime.flightbackpack.com/",www:window.location.protocol+"//www.flightbackpack.com/"},_locale:null,_localeIsRtl:!1,copy:function(a,b,c,d){for(var e in b)if(c||typeof a[e]==="undefined")a[e]=d?d(b[e]):b[e];return a},
create:function(a,b){for(var c=window.Quantum,d=a?a.split("."):[],e=d.length,f=0;f<e;f++){var k=d[f],m=c[k];if(!m){m=b&&f+1==e?b:{};c[k]=m}c=m}return c},provide:function(a,b,c){return Quantum.copy(typeof a=="string"?Quantum.create(a):a,b,c)},guid:function(){return"f"+(Math.random()*1073741824).toString(16).replace(".","")},log:function(a){Quantum._logging&&(window.Debug&&window.Debug.writeln?window.Debug.writeln(a):window.console&&window.console.log(a));Quantum.Event&&Quantum.Event.fire("fbp.log",a)},$:function(a){return document.getElementById(a)}});
Quantum.provide("",{bind:function(){var a=Array.prototype.slice.call(arguments),b=a.shift(),c=a.shift();return function(){return b.apply(c,a.concat(Array.prototype.slice.call(arguments)))}},Class:function(a,b,c){if(Quantum.CLASSES[a])return Quantum.CLASSES[a];b=b||function(){};b.prototype=c;b.prototype.bind=function(a){return Quantum.bind(a,this)};b.prototype.constructor=b;Quantum.create(a,b);return Quantum.CLASSES[a]=b},subclass:function(a,b,c,d){if(Quantum.CLASSES[a])return Quantum.CLASSES[a];var e=Quantum.create(b);Quantum.copy(d,e.prototype);
d._base=e;d._callBase=function(a){var b=Array.prototype.slice.call(arguments,1);return e.prototype[a].apply(this,b)};return Quantum.Class(a,c?c:function(){e.apply&&e.apply(this,arguments)},d)},CLASSES:{}});Quantum.provide("Type",{isType:function(a,b){for(;a;){if(a.constructor===b||a===b)return true;a=a._base}return false}});
Quantum.provide("Array",{indexOf:function(a,b){if(a.indexOf)return a.indexOf(b);var c=a.length;if(c)for(var d=0;d<c;d++)if(a[d]===b)return d;return-1},merge:function(a,b){for(var c=0;c<b.length;c++)Quantum.Array.indexOf(a,b[c])<0&&a.push(b[c]);return a},filter:function(a,b){for(var c=[],d=0;d<a.length;d++)b(a[d])&&c.push(a[d]);return c},keys:function(a,b){var c=[],d;for(d in a)(b||a.hasOwnProperty(d))&&c.push(d);return c},map:function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(b(a[d]));return c},forEach:function(a,
b,c){if(a)if(Object.prototype.toString.apply(a)==="[object Array]"||!(a instanceof Function)&&typeof a.length=="number")if(a.forEach)a.forEach(b);else for(var c=0,d=a.length;c<d;c++)b(a[c],c,a);else for(d in a)(c||a.hasOwnProperty(d))&&b(a[d],d,a)}});
Quantum.provide("JSON",{stringify:function(a){return window.Prototype&&Object.toJSON?Object.toJSON(a):JSON.stringify(a)},parse:function(a){return JSON.parse(a)},flatten:function(a){var b={},c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];null===d||void 0===d||(b[c]=typeof d=="string"?d:Quantum.JSON.stringify(d))}return b}});Quantum.provide("JS",{load:function(a,b){QLoader.js(a,b)}});
Quantum.provide("Realtime",{Channel:"",_channelName:"",init:function(a){Quantum.Realtime._channelName=a;window.WEB_SOCKET_SWF_LOCATION=Quantum._domain.rt+"WebSocketMain.swf";Quantum.Realtime.Channel=new Juggernaut({secure:false,host:"realtime.flightbackpack.com",port:8080})},connect:function(){Quantum.Realtime.Channel.on("connect",function(){Quantum.Datalink.StatusManager.connected()});Quantum.Realtime.Channel.on("disconnect",function(){Quantum.Datalink.StatusManager.disconnected()});Quantum.Realtime.Channel.on("reconnect",function(){Quantum.Datalink.StatusManager.reconnected()});
Quantum.Realtime.Channel.subscribe(Quantum.Realtime._channelName,function(a){Quantum.Datalink.StatusManager.messageReceived(a)})}});
Quantum.provide("Content",{_root:null,_hiddenRoot:null,_callbacks:{},append:function(a,b){if(!b)if(Quantum.Content._root)b=Quantum.Content._root;else if(Quantum.Content._root=b=Quantum.$("fbp-root"))b.className=b.className+" fbp_reset";else{Quantum.log('The "fbp-root" div has not been created.');return}if(typeof a=="string"){var c=document.createElement("div");b.appendChild(c).innerHTML=a;return c}return b.appendChild(a)},appendHidden:function(a){if(!Quantum.Content._hiddenRoot){var b=document.createElement("div"),c=b.style;
c.position="absolute";c.top="-10000px";c.width=c.height=0;Quantum.Content._hiddenRoot=Quantum.Content.append(b)}return Quantum.Content.append(a,Quantum.Content._hiddenRoot)},insertIframe:function(a){a.id=a.id||Quantum.guid();a.name=a.name||Quantum.guid();var b=Quantum.guid(),c=false,d=false;Quantum.Content._callbacks[b]=function(){if(c&&!d){d=true;a.onload&&a.onload(a.root.firstChild)}};if(document.attachEvent){var e='<iframe id="'+a.id+'" name="'+a.name+'"'+(a.className?' class="'+a.className+'"':"")+' style="border:none;'+(a.width?
"width:"+a.width+"px;":"")+(a.height?"height:"+a.height+"px;":"")+'" src="'+a.url+'" frameborder="0" scrolling="no" allowtransparency="true" onload="Quantum.Content._callbacks.'+b+'()"></iframe>';a.root.innerHTML='<iframe src="javascript:false" frameborder="0" scrolling="no" style="height:1px"></iframe>';c=true;window.setTimeout(function(){a.root.innerHTML=e},0)}else{var f=document.createElement("iframe");f.id=a.id;f.name=a.name;f.onload=Quantum.Content._callbacks[b];f.style.border="none";f.style.overflow=
"hidden";if(a.className)f.className=a.className;if(a.height)f.style.height=a.height+"px";if(a.width)f.style.width=a.width+"px";a.root.appendChild(f);c=true;f.src=a.url}},postTarget:function(a){var b=document.createElement("form");b.action=a.url;b.target=a.target;b.method="POST";Quantum.Content.appendHidden(b);Quantum.Array.forEach(a.params,function(a,d){if(a!==null&&a!==void 0){var e=document.createElement("input");e.name=d;e.value=a;b.appendChild(e)}});b.submit();b.parentNode.removeChild(b)},preloadImage:function(a){var b=
new Image;b.src=a;return b}});Quantum.provide("QS",{encode:function(a,b,c){var b=b===void 0?"&":b,c=c===false?function(a){return a}:encodeURIComponent,d=[];Quantum.Array.forEach(a,function(a,b){a!==null&&typeof a!="undefined"&&d.push(c(b)+"="+c(a))});d.sort();return d.join(b)},decode:function(a){var b=decodeURIComponent,c={},a=a.split("&"),d,e;for(d=0;d<a.length;d++)(e=a[d].split("=",2))&&e[0]&&(c[b(e[0])]=b(e[1]));return c}});Quantum.provide("User",{id:"string",secret:"string",unread_messages_count:0,unread_notifications_count:0});
Quantum.provide("App",{id:"string"});Quantum.provide("Notification",{_names:{messages:"messagesRead",notifications:"notificationsRead"}});
Quantum.provide("Clock",{tS:function(){x=new Date(Quantum.Clock.tN().getUTCFullYear(),Quantum.Clock.tN().getUTCMonth(),Quantum.Clock.tN().getUTCDate(),Quantum.Clock.tN().getUTCHours(),Quantum.Clock.tN().getUTCMinutes(),Quantum.Clock.tN().getUTCSeconds());x.setTime(x.getTime());return x},tN:function(){return new Date},leftZero:function(a){return a>9?a:"0"+a},y4:function(a){return a<500?a+1900:a},months:"January February March April May June July August September October November December".split(" "),oT:"Quantum.Clock.months[Quantum.Clock.tS().getMonth()]+' '+Quantum.Clock.tS().getDate()+','+' '+Quantum.Clock.y4(Quantum.Clock.tS().getYear())+' '+' '+Quantum.Clock.leftZero(Quantum.Clock.tS().getHours())+':'+Quantum.Clock.leftZero(Quantum.Clock.tS().getMinutes())+':'+Quantum.Clock.leftZero(Quantum.Clock.tS().getSeconds())+' '+'U'+'T'+'C'+' '+Quantum.Clock.leftZero(Quantum.Clock.tS().getHours())+''+Quantum.Clock.leftZero(Quantum.Clock.tS().getMinutes())+'Z '",
render:function(){document.getElementById("utc_clock").innerHTML=eval(Quantum.Clock.oT);setTimeout("Quantum.Clock.render()",1E3)}});
Quantum.provide("Datalink",{processPushMessage:function(a){switch(a.t){case "1":Quantum.UIConnector.injectMessage(a);if(a.been_read!=1){Quantum.UIConnector.increaseMessagesCount(1);Quantum.UIConnector.titleStatusManager()}break;case "2":Quantum.UIConnector.injectNotification(a);if(a.been_read!=1){Quantum.UIConnector.increaseNotificationsCount(1);Quantum.UIConnector.titleStatusManager()}}},connect:function(){Quantum.Realtime.init(Quantum.User.secret);Quantum.Realtime.connect()},processHistory:function(a){console.log(a)},Send:{notification:function(a){console.log("Hey, i must send a notification:"+
a);a={action:"notification_update",type:a};url=Quantum._domain.xd+"internal_proxy/notifications";Quantum.Datalink.XDGET(url,a,function(a){Quantum.Datalink.ResponseReceiver.notification(a)})}},XDGET:function(a,b,c){$.ajax({url:a,dataType:"jsonp",data:b,success:c})},ResponseReceiver:{notification:function(a){if(a.status=="ok"&&a.type==Quantum.Notification._names.messages&&a.change==true){Quantum.UIConnector.setText("#fbp-messages-count","");Quantum.UIConnector.titleStatusManager();Quantum.UIConnector.clearUnreadMessages()}else if(a.status==
"ok"&&a.type==Quantum.Notification._names.notifications&&a.change==true){Quantum.UIConnector.setText("#fbp-notifications-count","");Quantum.UIConnector.titleStatusManager();Quantum.UIConnector.clearUnreadNotifications()}console.log(a)}},StatusManager:{connected:function(){console.log("QuantumDatalink Connected to User Channel via Quantum.Realtime.Channel: "+Quantum.Realtime._channelName);Quantum.UIConnector.injectConnectionIcons();Quantum.Datalink.Hooks.supervisor("connected",false)},disconnected:function(){console.log("QuantumDatalink Disconnected");
Quantum.UIConnector.injectDisconnectionIcons();Quantum.Datalink.Hooks.supervisor("disconnected",false)},reconnected:function(){Quantum.UIConnector.injectConnectionIcons();console.log("QuantumDatalink Reconnected");Quantum.Datalink.Hooks.supervisor("reconnected",false)},messageReceived:function(a){console.log("Message Received"+a);Quantum.Datalink.processPushMessage(a);Quantum.Datalink.Hooks.supervisor("messageReceived",a)}},Hooks:{set:function(a,b){Quantum.Datalink.Hooks.shouldOverride=true;Quantum.Datalink.Hooks.type=a;Quantum.Datalink.Hooks.functionToFire=
b},supervisor:function(a,b){if(Quantum.Datalink.Hooks.shouldOverride==true&&Quantum.Datalink.Hooks.type==a){Quantum.Datalink.Hooks.functionToFire(b);return true}return false}},MessageSystem:{getMessages:function(a){url=Quantum._domain.xd+"internal_proxy/get_user_messages";params={limit:a};Quantum.Datalink.XDGET(url,params,function(a){_msgs=a.messages;_a=[];Quantum.Array.forEach(_msgs,function(a){_a.push(a)},false);_a.reverse();Quantum.Array.forEach(_a,function(a){Quantum.Datalink.processPushMessage(a)},false)})},getNotifications:function(a){url=
Quantum._domain.xd+"internal_proxy/get_user_notifications";params={limit:a};Quantum.Datalink.XDGET(url,params,function(a){_msgs=a.notifications;_a=[];Quantum.Array.forEach(_msgs,function(a){_a.push(a)},false);_a.reverse();Quantum.Array.forEach(_a,function(a){Quantum.Datalink.processPushMessage(a)},false)})}}});
Quantum.provide("UIConnector",{Document:{originalTitle:""},increaseMessagesCount:function(a){x=this.getMessagesCount();$("#fbp-messages-count").text(x+a)},getMessagesCount:function(){x=$("#fbp-messages-count").text();return x!==""?parseInt(x):0},Process:{notificationClick:function(a){switch(a){case Quantum.Notification._names.messages:_mc=Quantum.UIConnector.getMessagesCount();if(_mc>0){Quantum.Datalink.Send.notification(a);return true}console.log("no new messages");break;case Quantum.Notification._names.notifications:_nc=
Quantum.UIConnector.getNotificationsCount();if(_nc>0){Quantum.Datalink.Send.notification(a);return true}console.log("no new notifications")}return false},pagesOverrides:function(a,b){switch(a){case "apps":console.log("The apps page hook for receiving messages viar the datalink is ready..., the message type received is:"+b.t);if(b.t=="resize_canvas"&&b.app_id==Quantum.App.id){if(b.hasOwnProperty("height")){console.log("i should resize the iframe height to:"+b.height);$("#canvas").height(b.height)}if(b.hasOwnProperty("width")){console.log("i should resize the iframe width to:"+
b.width);if(b.width>=740){$("#canvas_box").position();$("#canvas_box").css({position:"absolute"})}$("#canvas_box").width(b.width);$("#canvas").width(b.width)}}if(b.t=="open_app_dialog"&&b.app_id==Quantum.App.id){if(b.hasOwnProperty("html")){console.log("I ve got to open an html dialog");$.colorbox({html:b.html,width:b.width,height:b.height})}if(b.hasOwnProperty("iframe_url")){console.log("I ve got to open an iframe dialog");$.colorbox({iframe:true,href:b.iframe_url,width:b.width,height:b.height})}}}}},
increaseNotificationsCount:function(a){x=this.getNotificationsCount();$("#fbp-notifications-count").text(x+a)},getNotificationsCount:function(){x=$("#fbp-notifications-count").text();return x!==""?parseInt(x):0},injectMessage:function(a){html=this.generateMessageHtml(a);$("#fbp-messages-list").prepend(html)},injectNotification:function(a){html=this.generateMessageHtml(a);$("#fbp-notifications-list").prepend(html)},setText:function(a,b){$(a).text(b)},generateMessageHtml:function(a){var b="",b=a.been_read!=
1?b+("<li class='fbp-notification-box-unread-content'><a href='"+a.url+"'  >"):b+("<li class='fbp-notification-box-read-content'><a href='"+a.url+"'  >"),b=b+("<img src='"+a.i+"' align='left' class='fbp-message-box-image' />"),b=b+a.b;return b+"</a></li>"},setNotificationsLinkEvent:function(){},setEventListener:function(a,b,c){console.log("I should set a "+b+" event for: "+a+" callback: "+c);$(a).on(b,function(){c()})},titleStatusManager:function(){console.log("YOUR FRIEND THE TSM IS ALIVE");x=Quantum.UIConnector.getMessagesCount()+
Quantum.UIConnector.getNotificationsCount();newTitle=x>0?"("+x.toString()+") "+Quantum.UIConnector.Document.originalTitle:Quantum.UIConnector.Document.originalTitle;$(document).attr("title",newTitle)},injectDisconnectionIcons:function(){_attrs={src:Quantum._domain.my+"/public/images/icons/n_disconnect.png",title:"Datalink disconnected",alt:"Datalink disconnected"};$("#fbp-messages-image").attr(_attrs);$("#fbp-notifications-image").attr(_attrs)},injectConnectionIcons:function(){$("#fbp-messages-image").attr("src",
Quantum._domain.my+"/public/images/icons/n_messages.png");$("#fbp-notifications-image").attr("src",Quantum._domain.my+"/public/images/icons/n_notifications.png")},clearUnreadMessages:function(){console.log("i should clear the color of the unread messages now");$("#fbp-messages-list").children().animate({backgroundColor:"#FFFFFF"},4E3)},clearUnreadNotifications:function(){console.log("i should clear the color of the unread notifications now");$("#fbp-notifications-list").children().animate({backgroundColor:"#FFFFFF"},
4E3)},showHubCommentReplyForm:function(a){$("#reply_comment_"+a).show("fast");return false},hideHubCommentReplyForm:function(a){$("#reply_comment_"+a).hide("fast");return false},showHubCommentEditForm:function(a){$("#edit_comment_"+a).show("fast");return false},hideHubCommentEditForm:function(a){$("#edit_comment_"+a).hide("fast");return false},submitChangeGraphForm:function(){$("#change_graph_form").submit();return false},showHubCommentManagementModal:function(a){$.colorbox({inline:true,href:"#manage_comment_"+
a,width:"auto",height:"auto"});return false},launchGeocodeModal:function(a){url="http://api.ipinfodb.com/v3/ip-city/?key=fd2acf736479283bc5aedfef348ef2557567866f7ae45bf385bbaa22541f309a%20&ip="+a+"&format=json&callback=?";$.getJSON(url,function(b){countryCode=b.countryCode;countryName=b.countryName;city=b.cityName;timezone=b.timeZone;latitude=b.latitude;longitude=b.longitude;htmlContent="<div class='comment-management-modal-content'>";htmlContent=htmlContent+"<b>Ip Geolocation for: "+a+"</b>";htmlContent=
htmlContent+"<p><b>Country Code: </b>"+countryCode+"</p>";htmlContent=htmlContent+"<p><b>Country Name: </b>"+countryName+"</p>";htmlContent=htmlContent+"<p><b>City: </b>"+city+"</p>";htmlContent=htmlContent+"<p><b>Timezone: </b>"+timezone+"</p>";htmlContent=htmlContent+"<p><b>Latitude: </b>"+latitude+"</p>";htmlContent=htmlContent+"<p><b>Longitude: </b>"+longitude+"</p>";htmlContent=htmlContent+"</div>";$().colorbox({html:htmlContent,width:"auto",height:"auto"})});return false},chartCategoryChanged:function(){try{document.getElementById("update_chart_category").submit()}catch(a){alert("Error submitting form")}},
showWebsiteAppForm:function(){$("#websiteAppFormContainer").show();$("#canvasAppFormContainer").hide();$("#desktopAppFormContainer").hide();$("#pluginAppFormContainer").hide()},showCanvasAppForm:function(){$("#canvasAppFormContainer").show();$("#websiteAppFormContainer").hide();$("#desktopAppFormContainer").hide();$("#pluginAppFormContainer").hide()},showDesktopAppForm:function(){$("#desktopAppFormContainer").show();$("#canvasAppFormContainer").hide();$("#websiteAppFormContainer").hide();$("#pluginAppFormContainer").hide()},
showHubPluginAppForm:function(){$("#pluginAppFormContainer").show();$("#canvasAppFormContainer").hide();$("#websiteAppFormContainer").hide();$("#desktopAppFormContainer").hide()},openChangePasswordDialog:function(){$.colorbox({inline:true,href:"#change_password_dialog",width:"auto",height:"auto"});return false},openChangeAliasDialog:function(){$.colorbox({inline:true,href:"#change_alias_dialog",width:"auto",height:"auto"});return false},showConfirmPlanModal:function(a){$.colorbox({inline:true,href:"#confirm_plan_"+
a,width:"auto",height:"auto"});return false},showConfirmOfferModal:function(a){console.log("wtf");$.colorbox({inline:true,href:"#confirm_offer_"+a,width:"auto",height:"auto"});return false}});
Quantum.provide("Bootloader",{boot:function(){console.log("Hello from Bootloader.boot");Quantum.Bootloader.UI.General.template();Quantum.UIConnector.Document.originalTitle=document.title;Quantum.Clock.render()},js:function(){},events:function(){},User:{init:function(a,b){Quantum.User.id=a;Quantum.User.secret=b;console.log("user initialized:"+Quantum.User.id+" - "+Quantum.User.secret)}},App:{initClientServices:function(a){Quantum.App.id=a;console.log("App data initialized:"+Quantum.App.id)}},UI:{Specific:{notificationService:function(){Quantum.Content.preloadImage(Quantum._domain.my+
"/public/images/icons/n_disconnect.png");Quantum.Datalink.MessageSystem.getMessages(15);Quantum.Datalink.MessageSystem.getNotifications(15);Quantum.UIConnector.setEventListener("#fbp-messages-count, #fbp-messages-image","click",function(){Quantum.UIConnector.Process.notificationClick(Quantum.Notification._names.messages)});Quantum.UIConnector.setEventListener("#fbp-notifications-count, #fbp-notifications-image","click",function(){Quantum.UIConnector.Process.notificationClick(Quantum.Notification._names.notifications)});Quantum.UIConnector.titleStatusManager();
$("a.fbp-messages-link").colorbox({inline:true,width:"330px",height:"430px"})}},General:{template:function(){$(".box-container").corners("5px bottom");$(".box h4").corners("5px top");$("ul.tab-menu li a").corners("5px top");$("div#sys-messages-container a, div#to-do-list ul li a").colorbox({fixedWidth:"50%",transitionSpeed:"100",inline:true,href:"#sample-modal"});$("a.chart-gallery").colorbox();$("a.flight-gallery").colorbox();$("a.app-management").colorbox({inline:true,width:"30%",height:"30%"});
$("a.plugin-management-link").colorbox({inline:true,width:"auto",height:"auto"});$("a.modal").colorbox({iframe:true,width:"90%",height:"80%"});$("#calendar").datepicker();$("ul.list-links").accordion({event:"mouseover"});$(".comment-container").corners();$("comment-management-button").colorbox({inline:true,width:"50%",height:"30%"});$(".fbp-tabs").tabs()}},Pages:{apps:function(){console.log("Launching specific js actions for app page");$("#canvas_form").submit();$("#sidebar_form").submit();Quantum.Datalink.Hooks.set("messageReceived",
function(a){Quantum.UIConnector.Process.pagesOverrides("apps",a)})},hubSettings:function(){Quantum.JS.load(Quantum._domain.my+"/public/ibutton/lib/jquery.ibutton.min.js",function(){$(":checkbox").iButton();$(".fbp-tabs").css({visibility:"visible"})})},editFlight:function(){$("#departure_airport").autocomplete({source:Quantum._domain.my+"/ajax.php?scope=airport",minLength:2});$("#arrival_airport").autocomplete({source:Quantum._domain.my+"/ajax.php?scope=airport",minLength:2});$("#alternate_airport").autocomplete({source:Quantum._domain.my+
"/ajax.php?scope=airport",minLength:2})},newFlight:function(){$("#departure_airport").autocomplete({source:Quantum._domain.my+"/ajax.php?scope=airport",minLength:2});$("#arrival_airport").autocomplete({source:Quantum._domain.my+"/ajax.php?scope=airport",minLength:2})},editChart:function(){$("#airport_icao").autocomplete({source:Quantum._domain.my+"/ajax.php?scope=airport",minLength:2,select:function(a,b){$("#airport_id").val(b.item.id);$("#airport_icao").val(b.item.value);return false}})},developers:function(){$(".inline_change").colorbox({inline:true,
width:"50%"});srcs=[Quantum._domain.my+"/public/pagedown/Markdown.Converter.js",Quantum._domain.my+"/public/pagedown/Markdown.Sanitizer.js",Quantum._domain.my+"/public/pagedown/Markdown.Editor.js"];setTimeout(function(){QLoader.require(srcs,function(){renderEditor()})},1)},addAircraftToAccount:function(){$("#airline_icao").autocomplete({source:Quantum._domain.my+"/ajax.php?scope=airline",minLength:2,select:function(a,b){$("#airline_id").val(b.item.id);$("#airline_icao").val(b.item.value);return false}})}}},Datalink:{init:function(){Quantum.JS.load(Quantum._domain.rt+
"rt.js",function(){Quantum.Datalink.connect()})}}});

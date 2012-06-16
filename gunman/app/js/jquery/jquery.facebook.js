;(function($) {
  $.extend({
    facebook: function(method)
    {
      
      var defaults = {
        // Facebook settings
        locale: 'en_US',
        status: true,
        cookie: true,
        xfbml: false,

        // Advanced settings
        iframeAutoGrow: true,
        hideOverflow: true,
        wrapperDiv: 'fb-root',
        scriptId: 'facebook-jssdk',

        // Callbacks
        onLoad: $.noop,
        onInit: $.noop,
        onStatusChange: $.noop
      };

      var setDataBasedOnResponse = function(response)
      {
       window.jQueryFacebookAuthData.status = response.status;

        if (response.status === 'connected')
        {
          window.jQueryFacebookAuthData.accessToken = response.authResponse.accessToken;
          window.jQueryFacebookAuthData.expiresIn = response.authResponse.expiresIn;
          window.jQueryFacebookAuthData.signedRequest = response.authResponse.signedRequest;
          window.jQueryFacebookAuthData.userID = response.authResponse.userID;
          standaloneTriggerQueue('onConnection');
        }
        else
        {
          window.jQueryFacebookAuthData.accessToken = null;
          window.jQueryFacebookAuthData.expiresIn = null;
          window.jQueryFacebookAuthData.signedRequest = null;
          window.jQueryFacebookAuthData.userID = null;          
        }

      };

      var checkPluginInit = function()
      {
        if (typeof window._jQueryFacebookInit === 'undefined') {
          $.error('jQuery.facebook: Not initialized');
          return false;
        }
        return true;
      };
      
      var nameCacheAddName = function(id, name) {
      
        if (typeof window._jQueryFacebookNameCache === 'undefined')
        {
          window._jQueryFacebookNameCache = {};
        }
        
        window._jQueryFacebookNameCache[id] = name;
      
      }

      var standaloneTriggerQueue = function(which)
      {

        if (typeof which !== 'string') return false;

        if (typeof window._jQueryFacebookQueue === 'undefined')
        {
          window._jQueryFacebookQueue = {};
        }

        if (typeof window._jQueryFacebookAlreadyHappened === 'undefined')
        {
          window._jQueryFacebookAlreadyHappened = {};
        }

        if (typeof window._jQueryFacebookAlreadyHappened[which] === 'undefined')
        {
          window._jQueryFacebookAlreadyHappened[which] = true;

          if (typeof window._jQueryFacebookQueue[which] !== 'undefined')
          {
            $.each(window._jQueryFacebookQueue[which], function(i,f){
              f();
            });
          }
          
        }
        
      };
      
      var methods = {
        connect: function(callback, scope)
        {
          if (!checkPluginInit()) return false;
          var authData = window.jQueryFacebookAuthData;

          if (typeof callback === 'undefined') var callback = $.noop;
          else if (typeof callback !== 'function') callback = $.noop;
          if (typeof scope === 'undefined') var scope = '';
          else if (typeof scope === 'array') scope = scope.join(',');
          else if (typeof scope !== 'string') scope = '';

          var loginParams = {};
          if (scope.length > 0) {
            loginParams.scope = scope;
          }

          FB.login(function(response){
            setDataBasedOnResponse(response);
            callback(response);
            standaloneTriggerQueue('afterLogin');
          }, loginParams);
          
        },
        authData: function()
        {
          return window.jQueryFacebookAuthData;
        },
        isConnected: function()
        {
          var fbad = window.jQueryFacebookAuthData;
          if ((typeof fbad.status === 'string' ) && (fbad.status == 'connected'))
          {
            return true;
          }
          return false;
        },
        userID: function(){
          var fbad = window.jQueryFacebookAuthData;
          if (typeof fbad.userID === 'string')
          {
            return fbad.userID;
          }
          return false;
        },
        accessToken: function(){
          var fbad = window.jQueryFacebookAuthData;
          if (typeof fbad.accessToken === 'string')
          {
            return fbad.accessToken;
          }
          return false;
        },
        init: function(options)
        {
          if (typeof window._jQueryFacebookInit !== 'undefined')
          {
            $.error('jQuery.facebook: Already initialized');
          }

          var settings = $.extend(defaults, options);

          if (!settings.appId)
          {
            $.error('jQuery.facebook: You must specify an appId');
          }

          window.jQueryFacebookAuthData = {
            status: 'unknown',
            accessToken: null,
            expiresIn: null,
            signedRequest: null,
            userID: null
          }

          if (!$('#'+settings.wrapperDiv).length)
          {
            $('<div></div>').attr({
              id: settings.wrapperDiv
            }).prependTo(document.body);
          }

          // Check if we are inside a frame
          if (top.location !== window.location)
          {
            if (settings.iframeAutoGrow)
            {
              if (settings.hideOverflow)
              {
                $('html,body').css('overflow', 'hidden');
              }
            }
          }

          // Facebook SDK callback
          window.fbAsyncInit = function()
          {
            
            var fbSettings = {
              appId: settings.appId,
              status: settings.status,
              cookie: settings.cookie,
              xfbml: settings.xfbml,
              oauth: true
            };

            if (settings.channelUrl)
            {
              fbSettings.channelUrl = settings.channelUrl;
            }
            
            FB.init(fbSettings);

            // Check if we are inside a frame
            if (top.location !== window.location)
            {
              if (settings.iframeAutoGrow)
              {
                FB.Canvas.setAutoGrow();
              }
            }
            
            if (typeof settings.onLoad === 'function')
            {
              settings.onLoad();
            }

            standaloneTriggerQueue('onFacebook');

            FB.getLoginStatus(function(response) {

              setDataBasedOnResponse(response);
              
              if (typeof settings.onInit === 'function')
              {
                settings.onInit();
              }
              
            });

            FB.Event.subscribe('auth.authResponseChange', function(response) {
              setDataBasedOnResponse(response);
              if (typeof settings.onStatusChange === 'function')
              {
                settings.onStatusChange();
              }
            });
            
          }

          // Create SCRIPT element
          if ($('#'+settings.scriptId).length)
          {
            return false;
          }

          $('<script></script>').attr({
            id: settings.scriptId,
            async: true,
            src: '//connect.facebook.net/'+settings.locale+'/all.js'
          }).appendTo('head');
          
          window._jQueryFacebookInit = true;
          
        },
        getScroll: function(callback) {
          if (typeof callback !== 'function')
          {
            return false;
          }

          if (top.location !== window.location)
          {
            FB.Canvas.getPageInfo(function(info){
              callback(parseInt(info.scrollTop), parseInt(info.scrollTop) + parseInt(info.clientHeight));
            });
          }
          else
          {
            callback($(window).scrollTop(), $(window).scrollTop() + $(window).height());
          }
          
          return true;
        },
        scrollTop: function() {
          if (top.location !== window.location)
          {
            FB.Canvas.scrollTo(0,0);
          }
          else
          {
            $(document.body).scrollTop(0);
          }
        },
        scrollPage: function(where) {
          if (top.location !== window.location)
          {
            FB.Canvas.scrollTo(0,where);
          }
          else
          {
            $(document.body).scrollTop(where);
          }
        },
        queue: function(which, func) {
          if (typeof func !== 'function') return false;
          if (typeof which !== 'string') return false;

          if (typeof window._jQueryFacebookQueue === 'undefined')
          {
            window._jQueryFacebookQueue = {};
          }

          if (typeof window._jQueryFacebookAlreadyHappened === 'undefined')
          {
            window._jQueryFacebookAlreadyHappened = {};
          }

          if (typeof window._jQueryFacebookAlreadyHappened[which] !== 'undefined')
          {
            func();
          }
          else
          {
            if (typeof window._jQueryFacebookQueue[which] === 'undefined')
            {
              window._jQueryFacebookQueue[which] = [];
            }
            window._jQueryFacebookQueue[which].push(func);
          }

          return true;
        },
        triggerQueue: standaloneTriggerQueue,
        getName: function(id) {
          if (typeof window._jQueryFacebookNameCache === 'undefined')
          {
            window._jQueryFacebookNameCache = {};
          }
          if (typeof window._jQueryFacebookNameCache[id] === 'undefined')
          {
            return id;
          }
          else
          {
            return window._jQueryFacebookNameCache[id];
          }
        }, 
        getFriends: function(callback, installed_only) {
          if (typeof callback === 'undefined') var callback = $.noop;
          else if (typeof callback !== 'function') callback = $.noop;
          if (typeof installed_only === 'undefined') var installed_only = false;

          FB.api('/me/friends', {
            fields: 'id, name, installed'
          }, function(response){
            if (response.data)
            {
              $.each(response.data, function(i,o){
                nameCacheAddName(o.id, o.name);
              });
              if (installed_only)
              {
                var filtered = [];
                $.each(response.data, function(i,o){
                  if (o.installed)
                  {
                    filtered.push(o);
                  }
                });
                callback(filtered);
              }
              else {
                callback(response.data);
              }
            }
          });
        }
      }; 
      
      if (methods[method])
      {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      }
      else if (typeof method === 'object' || !method)
      {
        return methods['init'].apply(this, arguments);
      }
      else
      {
        $.error('Method ' +  method + ' does not exist on jQuery.facebook');
      }
      
    }
  });
})(jQuery);

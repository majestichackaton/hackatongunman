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
 * @provides fbp.xd
 * @requires fbp.prelude
 *           fbp.qs
 *           fbp.flash
 */

/**
 * The cross domain communication layer.
 *
 * @class Quantum.XD
 * @static
 * @access private
 */
Quantum.provide('XD', {
  _origin    : null,
  _transport : null,
  _callbacks : {},
  _forever   : {},

  /**
   * Initialize the XD layer. Native postMessage or Flash is required.
   *
   * @param channelUrl {String} optional channel URL
   * @access private
   */
  init: function(channelUrl) {
    // only do init once, if this is set, we're already done
    if (Quantum.XD._origin) {
      return;
    }

    // We currently disable postMessage in IE8 because it does not work with
    // window.opener. We can probably be smarter about it.
//#JSCOVERAGE_IF
    if (window.addEventListener && window.postMessage) {
      // The origin here is used for postMessage security. It needs to be based
      // on the URL of the current window. It is required and validated by
      // Flight Backpack as part of the xd_proxy.php.
      Quantum.XD._origin = (window.location.protocol + '//' +
                       window.location.host + '/' + Quantum.guid());
      Quantum.XD.PostMessage.init();
      Quantum.XD._transport = 'postmessage';
    } else if (!channelUrl && Quantum.Flash.hasMinVersion()) {
      // The origin here is used for Flash XD security. It needs to be based on
      // document.domain rather than the URL of the current window. It is
      // required and validated by Flight Backpack as part of the xd_proxy.php.
      Quantum.XD._origin = (window.location.protocol + '//' + document.domain +
                       '/' + Quantum.guid());
      Quantum.XD.Flash.init();
      Quantum.XD._transport = 'flash';
    } else {
      Quantum.XD._transport = 'fragment';
      Quantum.XD.Fragment._channelUrl = channelUrl || window.location.toString();
    }
  },

  /**
   * Resolve a id back to a node. An id is a string like:
   *   top.frames[5].frames['crazy'].parent.frames["two"].opener
   *
   * @param   id {String}   the string to resolve
   * @returns    {Node}     the resolved window object
   * @throws  SyntaxError   if the id is malformed
   */
  resolveRelation: function(id) {
    var
      pt,
      matches,
      parts = id.split('.'),
      node = window;

    for (var i=0, l=parts.length; i<l; i++) {
      pt = parts[i];

      if (pt === 'opener' || pt === 'parent' || pt === 'top') {
        node = node[pt];
      } else if (matches = /^frames\[['"]?([a-zA-Z0-9-_]+)['"]?\]$/.exec(pt)) {
        // these regex has the `feature' of fixing some badly quoted strings
        node = node.frames[matches[1]];
      } else {
        throw new SyntaxError('Malformed id to resolve: ' + id + ', pt: ' + pt);
      }
    }

    return node;
  },

  /**
   * Builds a url attached to a callback for xd messages.
   *
   * This is one half of the XD layer. Given a callback function, we generate
   * a xd URL which will invoke the function. This allows us to generate
   * redirect urls (used for next/cancel and so on) which will invoke our
   * callback functions.
   *
   * @access private
   * @param cb       {Function} the callback function
   * @param relation {String}   parent or opener to indicate window relation
   * @param forever  {Boolean}  indicate this handler needs to live forever
   * @return        {String}   the xd url bound to the callback
   */
  handler: function(cb, relation, forever) {
    // if for some reason, we end up trying to create a handler on a page that
    // is already being used for XD comm as part of the fragment, we simply
    // return 'javascript:false' to prevent a recursive page load loop
    //
    // the // after it makes any appended things to the url become a JS
    // comment, and prevents JS parse errors. cloWntoWn.
    if (window.location.toString().indexOf(Quantum.XD.Fragment._magic) > 0) {
      return 'javascript:false;//';
    }

    // the ?=& tricks login.php into appending at the end instead
    // of before the fragment as a query string
    // FIXME
    var
      xdProxy =  'http://facebook.com/connect/xd_proxy.php#?=&',
      id = Quantum.guid();

    // in fragment mode, the url is the current page and a fragment with a
    // magic token
    if (Quantum.XD._transport == 'fragment') {
      xdProxy = Quantum.XD.Fragment._channelUrl;
      var poundIndex = xdProxy.indexOf('#');
      if (poundIndex > 0) {
        xdProxy = xdProxy.substr(0, poundIndex);
      }
      xdProxy += (
        (xdProxy.indexOf('?') < 0 ? '?' : '&') +
        Quantum.XD.Fragment._magic + '#?=&'
      );
    }

    if (forever) {
      Quantum.XD._forever[id] = true;
    }

    Quantum.XD._callbacks[id] = cb;
    return xdProxy + Quantum.QS.encode({
      cb        : id,
      origin    : Quantum.XD._origin,
      relation  : relation || 'opener',
      transport : Quantum.XD._transport
    });
  },

  /**
   * Handles the raw or parsed message and invokes the bound callback with
   * the data and removes the related window/frame.
   *
   * @access private
   * @param data {String|Object} the message fragment string or parameters
   */
  recv: function(data) {
    if (typeof data == 'string') {
      data = Quantum.QS.decode(data);
    }

    var cb = Quantum.XD._callbacks[data.cb];
    if (!Quantum.XD._forever[data.cb]) {
      delete Quantum.XD._callbacks[data.cb];
    }
    cb && cb(data);
  },

  /**
   * Provides Native ``window.postMessage`` based XD support.
   *
   * @class Quantum.XD.PostMessage
   * @static
   * @for Quantum.XD
   * @access private
   */
  PostMessage: {
    /**
     * Initialize the native PostMessage system.
     *
     * @access private
     */
    init: function() {
      var H = Quantum.XD.PostMessage.onMessage;
      window.addEventListener
        ? window.addEventListener('message', H, false)
        : window.attachEvent('onmessage', H);
    },

    /**
     * Handles a message event.
     *
     * @access private
     * @param event {Event} the event object
     */
    onMessage: function(event) {
      Quantum.XD.recv(event.data);
    }
  },

  /**
   * Provides Flash Local Connection based XD support.
   *
   * @class Quantum.XD.Flash
   * @static
   * @for Quantum.XD
   * @access private
   */
  Flash: {
    /**
     * Initialize the Flash Local Connection.
     *
     * @access private
     */
    init: function() {
      Quantum.Flash.onReady(function() {
        document.XdComm.postMessage_init('Quantum.XD.Flash.onMessage',
                                         Quantum.XD._origin);
      });
    },

    /**
     * Handles a message received by the Flash Local Connection.
     *
     * @access private
     * @param message {String} the URI encoded string sent by the SWF
     */
    onMessage: function(message) {
      Quantum.XD.recv(decodeURIComponent(message));
    }
  },

  /**
   * Provides XD support via a fragment by reusing the current page.
   *
   * @class Quantum.XD.Fragment
   * @static
   * @for Quantum.XD
   * @access private
   */
  Fragment: {
    _magic: 'fbp_xd_fragment',

    /**
     * Check if the fragment looks like a message, and dispatch if it does.
     */
    checkAndDispatch: function() {
      var
        loc = window.location.toString(),
        fragment = loc.substr(loc.indexOf('#') + 1),
        magicIndex = loc.indexOf(Quantum.XD.Fragment._magic);

      if (magicIndex > 0) {
        // make these no-op to help with performance
        //
        // this works independent of the module being present or not, or being
        // loaded before or after
        Quantum.init = Quantum.getLoginStatus = Quantum.api = function() {};

        // display none helps prevent loading of some stuff
        document.documentElement.style.display = 'none';

        Quantum.XD.resolveRelation(
          Quantum.QS.decode(fragment).relation).Quantum.XD.recv(fragment);
      }
    }
  }
});

// NOTE: self executing code.
//
// if the page is being used for fragment based XD messaging, we need to
// dispatch on load without needing any API calls. it only does stuff if the
// magic token is found in the fragment.
Quantum.XD.Fragment.checkAndDispatch();

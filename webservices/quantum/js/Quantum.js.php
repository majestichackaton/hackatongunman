<?php
//
// Copyright Quantum Foundation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

$JS_FILES = array(
  'src/third-party/json2.js',

  'src/core/prelude.js',
  'src/common/type.js',
  'src/common/array.js',
  
  'src/core/json.js',
  'src/core/js.js',
  'src/core/realtime.js',
  
  
  'src/core/content.js',
  'src/core/qs.js',
  'src/core/user.js',
  'src/core/app.js',
  'src/core/notification.js',
  'src/core/pages.js',
  
  
  'src/core/datalink.js',
  
 
  'src/app/gunman.js',
  
  'src/core/uiconnector.js',
  
   'src/core/bootloader.js'
 
 
  //'src/core/pubnub.js',
  
  
);

header ('Content-type: text/javascript');

foreach ($JS_FILES as $file) {
  echo file_get_contents($file);
}



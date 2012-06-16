<?php

/*
$JS_FILES = array(
  'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
  'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js',
  'http://my.flightbackpack.com/public/colorbox/jquery.colorbox.js',
  'http://my.flightbackpack.com/public/js/jquery.corners.min.js',
    
);

 */

 
$JS_FILES = array(
  'http://my.flightbackpack.com/public/js/framework/v2/thirdparty_loader.js',
    
);

header ('Content-type: text/javascript');

foreach ($JS_FILES as $file) {
  echo file_get_contents($file);
}



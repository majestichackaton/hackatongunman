<?php

function before_filter_facebook_check($context) {
    var_dump($context);
    if(!empty($_POST['signed_request'])) {
        echo 'iM RUNNING ON FACEBOOK';
    } else {
        echo 'iM NOT RUNNING ON FACEBOOK';
    }
    
}

?>

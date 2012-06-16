<?php

require_once ("../quantum/lib/majestic/majestic.php");
require_once ("../quantum/quantum.php");

$majestic = new Majestic();
$quantum = new Quantum();

$current_environment = $majestic->getCurrentEnvironment();
        
switch($current_environment) {
    case 'live':
        $quantum->setConfig('live');
    break;

    case 'staging':
        $quantum->setConfig('staging');
    break;

    case false:
        $quantum->setConfig('development');
    break;
};

$quantum->boot();

?>
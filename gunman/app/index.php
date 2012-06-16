<?php
error_reporting(E_ALL);
//phpinfo();
require_once ("../quantum/lib/majestic/majestic.php");
require_once ("../quantum/quantum.php");

//$majestic = new Majestic();
$quantum = new Quantum();

//$current_environment = $majestic->getCurrentEnvironment();
        
//echo $current_environment;
$quantum->setConfig('development');
$quantum->boot();

?>
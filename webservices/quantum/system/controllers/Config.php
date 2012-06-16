<?php

namespace Quantum;
use Closure;


class Config {
    
    
    public $environment;
  
    function __construct($environment) {
	
	
        $this->setEnvironment($environment);
	
	
    }
    
    public function getEnvironment() {
	
       if (!empty($this->environment)) {
	    return $this->environment;
       }
       
       return false;
       
    }
    
    public function setEnvironment($environment) {
	
	require_once($this->quantum_root.'config/environment.php');
        
	switch($environment) {
            
            case 'live':
                
                $this->environment = $QUANTUM_ENVIRONMENT['production'];
                return true;
            break;
        
            case 'staging':
                
                $this->environment = $QUANTUM_ENVIRONMENT['staging'];
                return true;
            break;
        
            case 'development':
               
                $this->environment = $QUANTUM_ENVIRONMENT['development'];
		return true;
            break;
        }
	
        
        return false;
        
        
    }
    
    public function getSystemSalt() {
	
	return $this->environment['system_salt'];
    }
    

    
    
    
    
}



?>
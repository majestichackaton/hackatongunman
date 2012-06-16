<?

/*
 * class QuantumController
 */

namespace Quantum;
use Closure;


class Engine {
    
    
    function __construct() {
   
    }
    
    public function start() {
        
        $this->requestData = $_REQUEST;
        $this->postData = $_POST;
        $this->getData = $_GET;
        $this->version = '0.1.1';
        
    }
    
    
    
    
    
   
    
    
    
}
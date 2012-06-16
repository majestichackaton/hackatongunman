<?

/*
 * class TestsController
 */

class TestsController extends Quantum {
    
    /*
     * __construct()
     * @param $arg
     */
    
    function __construct() {
         //var_dump($this);
         //$this->template = 'app';
        // var_dump($this);
        
        //pr($this);
    }
    
    function index() {
        //var_dump($this);
        pr($this);
        $this->set('somevar', $somevar = 100);
        
    }
    
    function quantum() {
        pr(Quantum);
    }
    
    function import_test() {
        $this->autoRender = false;
        Quantum\Import::library();
    }
    
    
}

?>
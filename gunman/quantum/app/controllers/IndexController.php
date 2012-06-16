<?

/*
 * class IndexController
 * Example Controller of a base class
 * View for this class is located in: /index/index.tpl
 */

class IndexController extends Quantum\Controller {
    
    /*
     * __construct()
     * @param $arg
     */
    
    function __construct() {
        parent::__construct();
    }
    
    function index() {
        
        //echo "Hello World";
        
        $this->autoRender = false;
        
        echo "Hello boys here goes the facebook connect stuff";
    }
    
    
    
    
    function menu() {
        
        //echo "Hello World";
        
        $this->autoRender = false;
        
        echo "Hello boys here goes the main menu";
    }
    
    
    function instructions() {
        
        //echo "Hello World";
        
        $this->autoRender = false;
        
        echo "Hello boys here goes the instructions connect stuff";
    }
    
    
    function war_room() {
        
        //echo "Hello World";
        
        $this->autoRender = false;
        
        echo "Hello boys here goes the instructions connect stuff";
    }
    
    
    
    
    function high_scores() {
        
        //echo "Hello World";
        
        $this->autoRender = false;
        
        echo "Hello boys here goes the high scores stuff";
    }
    
    
    
    function share() {
        
         $this->autoRender = false;
        
        echo "Hello boys here goes the share stuff";
    }
    
    
    
}

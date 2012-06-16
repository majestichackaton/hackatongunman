<?

/*
 * class QuantumController
 */

namespace Quantum;

class Output {
    
    
    function __construct() {
   
    }
    
    public function init($smarty) {
        
        $this->smarty = $smarty;
        $this->views = array();
        
    }
    
    public function initSmarty() {
        
        define('SMARTY_DIR', $this->quantum_root.'lib/smarty/');
        define('SMARTY_SYSPLUGINS_DIR', $this->quantum_root.'lib/smarty/sysplugins/');
        define('SMARTY_PLUGINS_DIR', $this->quantum_root.'lib/smarty/plugins');
        require_once ($this->quantum_root.'lib/smarty/Smarty.class.php');
        
        $this->smarty = new \Smarty();
        $this->smarty ->template_dir = $this->quantum_root.'app/views';
        $this->smarty->compile_dir =   $this->quantum_root.'tmp';
        $this->smarty->allow_php_tag = true;
        $this->smarty->plugins_dir[] = $this->quantum_root.'lib/smarty/plugins';
        
        //\Quantum::setSmarty($this->smarty);
        //var_dump($this->smarty);
        //var_dump($this);
    }
    
    
    public function renderView($view) {
        
       $this->smarty->display($this->quantum_root.'app/views/'.$view);
    }
    
    
    public function setMainView($controller, $task) {
        
        if (empty($controller)) {
            
            $controller = 'index';
        }
        
        $this->mainView = "$controller/$task.tpl";
     
    }
    
    
    
    public function set($var_name, $var_content) {
        //var_dump($this);
        $this->smarty->assign($var_name, $var_content);
    }
    
    
    
    public function setTemplate($layout_directory_name) {
        
        if ($layout_directory_name) {
            $this->template = $layout_directory_name;
            return true;
        }
        
            return false;
        
    }
    
    public function setView($controller, $task) {
        
        if (empty($controller)) {
            $controller = 'index';
        }
        
        if (!isset($this->views)) {
            $this->views = array();
        }
        
        $view = "$controller/$task.tpl";
        
        
        array_push($this->views, $view);
        
       
        return true;
        
    }
    
    
    public function renderFullTemplate() {
        //var_dump($this);
        if ($this->activeController->smarty && !empty($this->activeController->template)) {
            
            $header = "templates/".$this->activeController->template."/header.tpl";
            $footer = "templates/".$this->activeController->template."/header.tpl";
            
            $this->smarty->display($this->quantum_root.$header);
            
            if (!empty($this->views)) {
                
                Output::renderViews();
                
            } 
            
            $this->smarty->display($this->quantum_root.$footer);
            
        }
        
        elseif (!empty($this->mainView) && !isset($this->activeController->template)) {
            $this->smarty->display($this->mainView);
        }
        
        elseif (!empty($this->views) && !isset($this->activeController->template)) {
            foreach($this->views as $view) {
                //var_dump($this);
                $this->smarty->display($this->quantum_root.'app/views/'.$view);
            }
        }
        
    }
    
    private function renderViews() {
        foreach($this->views as $view) {
            $this->smarty->display($this->quantum_root.'app/views/'.$view);
        }
    }
    
    public function render() {
        
       if ($this->activeController->autoRender == true) {
           Output::renderFullTemplate();
        }
      
        
    }
    
    
    
   
    
    
    
}
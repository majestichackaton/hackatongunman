 <?


class Quantum  {
   
    private $controller;
    private $task;
    private $object_id;
    private $database;
    private $state;
    public $csrf;
    public $activeController;
    public $root_folder;
    public $quantum_root;
    public $environment;
    public $smarty;
    public $mainView;
    public $template;
    public $views;
    public $autoRender;
    public $requestData;
    public $postData;
    public $getData;
    public $version;
    
    
    

    //Public API;
    
    /**
     * Meta class for booting Quantum,
     * you can remove the output class and implement it manually
    */
    
    public function __construct() {
        
        
        
        $this->readWorkingFolder();
        
        $this->setQuantumVars();
        
        $this->setAutoLoader();
        
        $this->initQuantumEngine();
        
        $this->loadHelpers();
        
        

    }
    
    /**
     * This reads the configuration
     * from the environment.php file
     * located in /quantum/config
    */
    
    public function setConfig($environment) {
       
        switch($environment) {
            
            case 'live':
                
                $this->initConfig('live');
                return true;
                
            break;
        
            case 'staging':
                
                $this->initConfig('staging');
                return true;
            
            break;
        
            case 'development':
                
                $this->initConfig('development');
                return true;
            
            break;
        }
        
        return false;
    }
    
    
    
    public function setTemplate($template_name) {
        
        $this->template = $template_name;
        
    }
    
    
    public function set($var_name, $var_contents) {
        
       $this->smarty->assign($var_name, $var_contents);
       
    }
    
    public function boot() {
        
        $this->initActiveRecord();
        
        $this->initSmarty();
        
        $this->launcher();
        
        $this->output();
        
    }
    
    public function initSmarty() {
        
        Quantum\Output::initSmarty();
        
    }
    
    
    /**
     * Sintactic sugar for Quantum\Output::smartyRender
    */
    public function output() {
        //var_dump($this);
        Quantum\Output::render();
        
        
    }
    
    
    
    public function loadHelpers() {
        Quantum\Controller::loadHelpers('all');
    }
    
    
    
    
    
    
    
    
    //Private methods
    
    
    private function readWorkingFolder() {
        
        $this->root_folder = getcwd();
        $this->quantum_root = $this->root_folder.'/../quantum/';
        //var_dump($this->quantum_root);
    
    }
    
    
    private function setWorkingFolder($folder_url) {
        
        $this->root_folder = $folder_url;
    }
    
    
    private function initConfig($env) {
               
        Quantum\Config::setEnvironment($env);
        
    }
    
    /**
     * We get the data of the .htaccess with this function and assign it to quantum
    */
    private function setQuantumVars() {
        if (!empty($_REQUEST['controller'])) {
            
            $this->controller = $_REQUEST['controller'];
            
        } 
        
         if (!empty($_REQUEST['task'])) {
            
            $this->task = $_REQUEST['task'];
            
        }
        
         if (!empty($_REQUEST['object_id'])) {
            
            $this->object_id = $_REQUEST['object_id'];
            
        }
        
        
    }
    
    /**
     * We set up the autoloader
    */
    private function setAutoLoader() {
        
        spl_autoload_register(array('self', 'autoLoader'));
        
    }
    
    
    /**
     * Thee autoloader...,  you can add more fileNameFormats, for ex: %s.class.php
    */
    private function autoLoader($className) {
        
        $directories = array(
            
              $this->quantum_root.'system/controllers/',
              $this->quantum_root.'app/controllers/',
              $this->quantum_root.'lib/'
            );
        
        foreach ($directories as $directory) {
            $child_directories = scandir($directory); 
                if ($child_directories) {
                    foreach ($child_directories as $child_directory) {
                        if ($child_directory === '.' or $child_directory === '..') continue;
                        if (is_dir($directory . '/' . $child_directory)) {
                             array_push($directories, $directory.$child_directory);
                        }
                        
                    }
            }
            
        }
        
        
        $fileNameFormats = array(
              '%s.php',
              
            );
        
        $path = str_ireplace('_', '/', $className);
            
        $className = str_replace("Quantum\\" , '', $className);
            
        if(@include $path.'.php'){
                return;
        }
            
        foreach($directories as $directory){
                foreach($fileNameFormats as $fileNameFormat){
                    $path = $directory.sprintf($fileNameFormat, $className);
                    if(file_exists($path)){
                        //echo ('loading: '.$path);
                        include $path;
                        return;
                    }
                }
            }
        
        
    }
    
    
    /**
     * This inits activerecord, those require once looks ugly, but in practice make it faster.
    */
    private function initActiveRecord() {
        
        require_once ($this->quantum_root.'lib/activerecord/ActiveRecord.php');
       
        $cfg = ActiveRecord\Config::instance();
        $cfg->set_model_directory($this->quantum_root.'app/models');
        $cfg->set_connections(array(
                       $this->environment['instance'] => 'mysql://'.$this->environment['db_user'].':'.
                                        $this->environment['db_password'].'@'.
                                        $this->environment['db_host'].'/'.
                                        $this->environment['db_name'].''
                       
                       ));
        
    }
    
    
    
    
    /**
     * You can boot here your database if you want to use sql outside of ActiveRecord
    */
    private function initDatabase() {
        
        
        
    }
    
    
    
    
    
    
    /**
     * This is the launcher, it will check for the first parameter of the url
     * and will try to check if a controller exists, if it does, it will launch it, and
     * the associated function, these parameters come from .htaccess. you should use mod_rewrite
    */
    private function launcher() {
        
       $controller = $this->controller;
       $task = $this->task;
       
       if (empty($controller)) {
            $controller = 'IndexController';
        }
            else {
                $controller = ucfirst($controller).'Controller';
            }
        
        if (empty($task)) {
            $task = 'index';
        }
        
        $c = new $controller();
        $c->smarty = $this->smarty;
        $c->environment = $this->environment;
        $c->root_folder = $this->root_folder;
        $c->controller = $this->controller;
        $c->task = $this->task;
        $c->object_id = $this->object_id;
        $c->database = $this->environment['db_name'];
        $c->autoRender = true;
        $c->requestData = $this->requestData;
        $c->postData = $this->postData;
        $c->getData = $this->getData;
        $c->activeController = $controller;
        $c->state = Quantum\Utilities::guid();
        $c->csrf = Quantum\Utilities::genHash($c->state);
        $c->quantum_root = $this->quantum_root;
        $this->activeController = $c;
        
        
        
        if (method_exists($c, $task)) {
            $reflection = new ReflectionMethod($c, $task);
            
            if ($reflection->isPublic()) {
                call_user_func(array($c, $task));
                $c->mainView = "$controller/$task.tpl";
                Quantum\Output::setView($this->controller, $task);
            }
            
            else {
                call_user_func(array($c, 'index'));
                $c->mainView = "index.tpl";
                Quantum\Output::setView($this->controller, 'index');
            }
            
           
        } else {
            call_user_func(array($c, 'index'));
            $c->mainView = "index.tpl";
            Quantum\Output::setView($this->controller, 'index');
        }
      
        
        //var_dump($c);
        
        

    }
    
    private function initQuantumEngine() {
        
        Quantum\Engine::start();
    }
    
    
    
   
    
}

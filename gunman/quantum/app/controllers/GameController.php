<?

/*
 * class IndexController
 * Example Controller of a base class
 * View for this class is located in: /index/index.tpl
 */

class GameController extends Quantum {
    
    /*
     * __construct()
     * @param $arg
     */
    
    
    private $player;
    
    function __construct() {
        
    }
    
    function index() {
        
        //echo "Hello World";
        
       // $this->autoRender = false;
        
       
        
        
       // var_dump($this->facebook->getUser());
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
        
        $this->initFacebook();
        
        $this->set('server_name', $_SERVER['SERVER_NAME']);
        $this->set('app_url', 'http://'.$_SERVER['SERVER_NAME'].'/gunman/app/');
        $this->set('environment', $this->environment);
        $this->set('app_config', $this->app_config);
        
        $this->set('registered', false);
    }
    
    
    
    function share() {
        
         $this->autoRender = false;
        
        echo "Hello boys here goes the share stuff";
    }
    
    function privacy() {
        
        
        
        
    }
    
    function play() {
     
          $this->setBasicData();
     
     
     
     
    }
    
    
    
    
    
    
    
    ///PRIVATE METHODS -<
    
    private function setBasicData() {
     
          $this->initFacebook();
        
        $this->set('server_name', $_SERVER['SERVER_NAME']);
        $this->set('app_url', 'http://'.$_SERVER['SERVER_NAME'].'/gunman/app/');
        $this->set('environment', $this->environment);
        $this->set('app_config', $this->app_config);
        
        $this->set('registered', false);
    }
    
    
    private function initFacebook() {
        
        Quantum\Import::library('facebook/facebook.php');
        $this->facebook = new Facebook(array(
          'appId' => $this->app_config->app_id,
          'secret' => $this->app_config->app_secret
        ));
        
    }
    
    
     private function getSignedRequest() {
        
        if (empty($this->facebook)) {
            $this->initFacebook();
        }
       
        return $this->facebook->getSignedRequest();
    
    }
    
    
    private function getAppUrl() {
        
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        return $protocol.$_SERVER['SERVER_NAME'];
        
    }
    
    private function getFacebookUserId() {
        
        try {
            $user_id = $this->facebook->getUser();
        }
        catch (Exception $e) {
         
        }
        
        if (empty($user_id)) {
           
            try {
              $user = $this->facebook->api('/me');
            }
            catch (Exception $e) {
              
            }
            if (!empty($user['id'])) {
              $user_id = $user['id'];
            }
            else {
              $user_id = 'me';
            }
        }
        
        return $user_id;
        
    }
    
    
    
}

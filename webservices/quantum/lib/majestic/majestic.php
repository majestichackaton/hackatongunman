<?

/*
 * Majestic SDK skeleton;
 * provides a central point for accessing majestic environments and other configurations.
 */

class Majestic  {
    
    const STAGING_HOST = 'fbsocialapp.co';
    const LIVE_HOST = 'socialapps.co';
    
    protected $server;
    
    /*
     * __construct()
     * @param $arg
     */
    
    function __construct() {
        
        if (!empty($_SERVER)) {
            $this->server = $_SERVER;
        } else {
            throw new Exception('Majestic SDK should run in a server');
        }
        
        
    }
    
    
    
    /**
     * public function for interfacing with environmentCheck
    */
    function getCurrentEnvironment() {
        
        return self::environmentCheck();
        
    }
    
    
    /**
     * Returns a string if running in one of majestic servers otherwise returns false
     * String can be 'staging' or 'live'
    */
    private function environmentCheck() {
        
        
        if  ( strstr($this->server['SERVER_NAME'], self::STAGING_HOST)) {
            
            return 'staging';
        }
        
        if  ( strstr($this->server['SERVER_NAME'], self::LIVE_HOST)) {
        
            return 'live';
        }
        
       return false;
    
       
               
    }
    
    
    
    
    
}

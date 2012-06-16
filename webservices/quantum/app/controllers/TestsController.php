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
    }
    
    function index() {
        //var_dump($this);
        $this->set('somevar', $somevar = 100);
        
    }
    
    
    function getServerName() {
        $this->autoRender = false;
        echo "lynx -dump http://".$_SERVER['SERVER_NAME']."/webservices/api/matches/push_shoot?match=1 >/dev/null 2>&1 &";
    }
    
    
    function create_player() {
        
    }
    
    function create_match() {
        
    }
    
    function players_ready() {
        
    }
    
    function send_player_response() {
        
        
        
        
    }
    
    function start_playing() {
        
    }
    
    
    function log_player() {
        
        $player = Player::find_by_id($this->requestData['player_id']);
        
        $this->set('player', $player);
    }
    
    function match() {
        
        $player = Player::find_by_id($this->requestData['player_id']);
        
        $match = Match::find_by_id($this->requestData['match_id']);
        
        $this->set('player', $player);
        $this->set('match', $match);
    }
    
    
    function channel_listener() {
        
        $this->set('channel_id', $this->requestData['id']);
    
    }
    
    
    function get_player() {
        $this->autoRender = false;
        echo file_get_contents("http://".$_SERVER['SERVER_NAME']."/webservices/api/player/profile?id=1");
    }
}

?>
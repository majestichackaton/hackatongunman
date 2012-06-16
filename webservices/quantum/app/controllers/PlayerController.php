<?

/*
 * class TestsController
 */

class PlayerController extends Quantum {
    
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
        $this->autoRender = false;
        $this->set('somevar', $somevar = 100);
        
    }
    
    
    function profile() {
        
        $this->autoRender = false;
        
        if (empty($this->requestData['id'])) {
            Quantum\ApiException::invalidParameters();
        }
        
        $player = Player::find_by_id($this->requestData['id']);
        
        if (empty($player)) {
            Quantum\ApiException::resourceNotFound();
        }
        
        $data['name'] = $player->name;
        $data['id'] = $player->id;
        //$data['secret'] = $player->secret;
        $data['facebook_id'] = $player->facebook_token;
        $data['matches_won'] = $player->matches_won;
        $data['matches_lost'] = $player->matches_lost;
        $data['created_at'] =  strtotime($player->created_at);
        $data['updated_at'] =  strtotime($player->updated_at);
        
        Quantum\ApiOutput::adaptableOutput($data);
        
        
    }
    
    
    
    function create() {
        
        if (empty ($this->requestData['name']) ||empty ($this->requestData['facebook_id']) ||empty ($this->requestData['facebook_token']) ) {
            Quantum\ApiException::invalidParameters();
        }
        
        $previousPlayer = Player::find_by_facebook_id($this->requestData['facebook_id']);
            
        if (!empty($previousPlayer)) {
            
            $data['status'] = 'OK';
            $data['player_id'] = $player->id;
            $data['player_secret'] = $player->secret;
            $data['created_at'] = strtotime($player->created_at);
            Quantum\ApiOutput::adaptableOutput($data);
        }
        
        $player = new Player();
        $player->name = $this->requestData['name'];
        $player->facebook_id = $this->requestData['facebook_id'];
        $player->facebook_token = $this->requestData['facebook_token'];
        $player->secret = Quantum\Utilities::genHash($player->id.$player->name.Quantum\Utilities::guid());
        $player->save();
        
        $data['status'] = 'OK';
        $data['player_id'] = $player->id;
        $data['player_secret'] = $player->secret;
        $data['created_at'] = strtotime($player->created_at);
        
        Quantum\ApiOutput::adaptableOutput($data);
        
        
    }
    
    
    
    
}

?>
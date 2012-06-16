<?

/*
 * class TestsController
 */

class MatchController extends Quantum {
    
    /*
     * __construct()
     * @param $arg
     * 
     */
    
    private $channel;
    
    function __construct() {
         //var_dump($this);
         //$this->template = 'app';
        // var_dump($this);
    }
    
    function index() {
        if (empty ($this->requestData['match_id']) ||empty ($this->requestData['channel_id']) ) {
            Quantum\ApiException::invalidParameters();
        }
        
        $match = Match::find_by_id_and_secret($this->requestData['match_id'], $this->requestData['channel_id']);
        
        if (empty($match)) {
            Quantum\ApiException::resourceNotFound();
        }
        
        $data['match_id'] = $match->id;
        $data['channel_id'] = $match->secret;
        $data['players'] = array($match->first_player_id, $match->second_player_id);
        $data['ready_to_listen'] = 1;
        $data['created_at'] = strtotime($match->created_at);
        Quantum\ApiOutput::adaptableOutput($data);
        
        
    }
    
    
    
    function create() {
        
        if (empty ($this->requestData['first_player_id']) ||empty ($this->requestData['second_player_id']) ) {
            Quantum\ApiException::invalidParameters();
        }
        
        if ( $this->requestData['first_player_id'] == $this->requestData['second_player_id'] ) {
            Quantum\ApiException::invalidParameters();
        }
        
        $first_player = Player::find_by_id($this->requestData['first_player_id']);
        
        if (empty($first_player)) {
            Quantum\ApiException::invalidParameters();
        }
        
        $second_player = Player::find_by_id($this->requestData['second_player_id']);
        
        if (empty($second_player)) {
            Quantum\ApiException::invalidParameters();
        }
        
        
        $match = new Match();
        $match->first_player_id = $first_player->id;
        $match->second_player_id = $second_player->id;
        $match->secret = Quantum\Utilities::genHash(Quantum\Utilities::guid().$this->requestData['first_player_id'].$this->requestData['second_player_id']);
        $match->resolved = 0;
        $match->save();
        
        $data['status'] = 'OK';
        $data['match_id'] = $match->id;
        $data['channel_id'] = $match->secret;
        $data['players'] = array($match->first_player_id, $match->second_player_id);
        $data['ready_to_listen'] = 1;
        $data['created_at'] = strtotime($match->created_at);
        
        Quantum\ApiOutput::adaptableOutput($data);
        
    }
    
    
    function ready() {
        
        if (empty ($this->requestData['match_id']) || empty($this->requestData['player_secret']) ) {
            Quantum\ApiException::invalidParameters();
        }
        
        $match = Match::find_by_id($this->requestData['match_id']);
        
        $user = Player::find_by_secret($this->requestData['player_secret']);
        
        if (empty($match) || empty ($user)) {
            Quantum\ApiException::resourceNotFound();
        }
        
        if ($match->first_player_id == $user->id) {
            $match->first_player_ready = 1;
            $match->save();
        }
        
        if ($match->second_player_id == $user->id) {
            $match->second_player_ready = 1;
            $match->save();
        }
        
       
        $data['status'] = 'OK';
        $data['get_ready'] = 1; 
        $data['channel_id'] = $match->secret;
        
         if ($match->first_player_ready = 1 && $match->second_player_ready = 1) {
            //$this->playersReady($match); <- if i do this... bad things will happen i need to run this from a daemon
            $this->playerReady($user, $match);
            exec("lynx -dump http://".$_SERVER['SERVER_NAME']."/webservices/api/match/push_shoot?id=".$match->id." >/dev/null 2>&1 &");

        }
        
       
        
        Quantum\ApiOutput::adaptableOutput($data);
        
    }
    
    
    
    function shoot() {
        
        if (empty ($this->requestData['match_id']) || empty($this->requestData['player_secret']) ) {
            Quantum\ApiException::invalidParameters();
        }
        
        if (empty ($this->requestData['received_shoot_message_time']) || empty($this->requestData['player_shoot_time']) ) {
            Quantum\ApiException::invalidParameters();
        }
        
        $match = Match::find_by_id($this->requestData['match_id']);
        
        $user = Player::find_by_secret($this->requestData['player_secret']);
        
        if (empty($match) || empty ($user)) {
            Quantum\ApiException::resourceNotFound();
        }
        
        if ($match->resolved == 1) {
            Quantum\ApiException::newException('match_resolved', 'This has match has already beed resolved', 'cant change past boy');
        }
        
        if ($match->first_player_id == $user->id) {
            $match->first_player_shooted = 1;
            $match->save();
        }
        
        if ($match->second_player_id == $user->id) {
            $match->second_player_shooted = 1;
            $match->save();
        }
        
        
        $previous_response = PlayerResponse::find_by_match_id_and_player_id($match->id, $user->id);
        
        if (!empty($previous_response)) {
            Quantum\ApiException::newException('response_exists', 'A response already exists for this given match/user', 'hagame uste el favor');
        }
        
        $response = new PlayerResponse();
        $response->match_id = $match->id;
        $response->player_id = $user->id;
        $response->player_received_shoot_at = $this->requestData['received_shoot_message_time'];
        $response->player_shooted_at = $this->requestData['player_shoot_time'];
        $response->response_time = $this->requestData['player_shoot_time']-$this->requestData['received_shoot_message_time'];
        $response->save();
        
        if ($match->first_player_shooted === 1 && $match->second_player_shooted === 1 ) {
           
            $this->resolveMatch($match);
            
            exec("lynx -dump http://".$_SERVER['SERVER_NAME']."/webservices/api/match/push_winner?id=".$match->id." >/dev/null 2>&1 &");

        }
        
        $data['status'] = 'OK';
        $data['shooted'] = 1; 
        $data['channel_id'] = $match->secret;
        $data['response_id'] = $response->id;
        $data['response_time'] = $response->response_time;
        $data['shoot_time'] = $this->requestData['player_shoot_time']-$this->requestData['received_shoot_message_time'];
        
        Quantum\ApiOutput::adaptableOutput($data);
        
        
    }
    
    
    
    
    function push_shoot() {
        $this->autoRender = false;
        $match = Match::find_by_id($this->requestData['id']);
        
        if (empty($match)) {
            Quantum\ApiException::invalidParameters();
        }
        
        $channel_id = $match->secret;
        
        if ($match->first_player_ready == 1 && $match->second_player_ready == 1) {
            
            $data['event_type'] = 'shoot_now';
            $data['shoot_now'] = 1;
            $data['timestamp'] = time();
            
            sleep(rand(4, 10));
            
            $this->push($channel_id, $data);
        }
        
        echo 1;
        
    }
    
    function push_winner() {
        
        $match = Match::find_by_id($this->requestData['id']);
        
        if (empty($match)) {
            Quantum\ApiException::invalidParameters();
        }
        
        $channel_id = $match->secret;
    
        $resolution = MatchResolution::find_by_match_id($match->id);
        
        if ($match->resolved == 1) {
            
            $data['event_type'] = 'winner_resolution';
            $data['winner_id'] = $match->winner_id;
            $data['winner_time'] = $resolution->winner_time;
            
            $data['timestamp'] = time();
            
            $this->push($channel_id, $data);
        }
       
        echo 1;
        
    }
    
    
    //private methods
    
    
    
    private function push($channel_id, $data) {
        
        if (!isset($this->channel)) {
            $this->initRealtimeChannel();
        }
        
        
        $this->realtimePublish($channel_id, $data);

    }
    
    
    
    private function initRealtimeChannel ($host = '127.0.0.1') {
		
        $this->channel = new Redis();
        $this->channel->connect($host);
                
    }
    
    
    
    private  function realtimePublish ($channels, $data) {
		
        if (!is_array($channels)) {
                $channels = array($channels);
        }
        
        $message = array(
                'channels' => $channels,
                'data' => $data
        );
        
        $this->channel->publish('juggernaut', json_encode($message));
    }
    
    
    private function resolveMatch($match) {
        
       
        
        $first_player_response = PlayerResponse::find_by_player_id($match->first_player_id);
        
        if (empty($first_player_response)) {
            Quantum\ApiException::invalidParameters();
        }
        
        $second_player_response = PlayerResponse::find_by_player_id($match->second_player_id);
        
        if (empty($second_player_response)) {
            Quantum\ApiException::invalidParameters();
        }
        
        $first_player_shoot_time = ($first_player_response->player_shooted_at-$first_player_response->player_received_shoot_at);
        $second_player_shoot_time = ($second_player_response->player_shooted_at-$second_player_response->player_received_shoot_at);
        
        if ($first_player_shoot_time < $second_player_shoot_time) {
           $winner_id = $match->first_player_id;
           $winner_time = $first_player_shoot_time;
        }
        
        if ($second_player_shoot_time < $first_player_shoot_time) {
           $winner_id = $match->second_player_id;
           $winner_time = $second_player_shoot_time;
        }
        
        $match->winner_id = $winner_id;
        $match->resolved = 1;
        $match->save();
        
        $resolution = new MatchResolution;
        $resolution->match_id = $match->id;
        $resolution->winner_id = $match->winner_id;
        $resolution->winner_time = $winner_time;
        
        $resolution->save();
        
    }
    
    private function playerReady($player, $match) {
        
        $data['event_type'] = 'player_ready';
        $data['player_id'] = $player->id;
        
        $this->push($match->secret, $data);
        
        
    }
    
    
}





?>
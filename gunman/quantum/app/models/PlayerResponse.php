<?


class PlayerResponse extends ActiveRecord\Model { 

static $table_name = 'player_responses';

static $belongs_to = array(
      
      array('player'),
      array('match'),
      
    );






}


?>
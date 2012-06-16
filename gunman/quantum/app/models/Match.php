<?


class Match extends ActiveRecord\Model { 


static $belongs_to = array(
      
      array('player'),
      
    );

static $has_many = array(
      
      array('match'),
      array('player_response', 'class_name' => 'PlayerResponse', 'foreign_key' => 'match_id'),
      array('match_resolution', 'class_name' => 'MatchResolution', 'foreign_key' => 'match_id'),
      
    );

    static $table_name = 'matches';

}


?>
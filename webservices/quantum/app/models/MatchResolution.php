<?


class MatchResolution extends ActiveRecord\Model { 

static $table_name = 'match_resolutions';

static $belongs_to = array(
      
      array('match'),
      
    );





}


?>
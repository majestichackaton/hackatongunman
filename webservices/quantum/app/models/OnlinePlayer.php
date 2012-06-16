<?


class OnlinePlayer extends ActiveRecord\Model { 

static $table_name = 'online_players';

static $belongs_to = array(
      
      array('player'),
      array('match'),
      
    );






}


?>
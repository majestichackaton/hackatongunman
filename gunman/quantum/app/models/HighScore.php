<?


class HighScore extends ActiveRecord\Model { 

static $table_name = 'highscores';

static $belongs_to = array(
      
      array('player'),
      
    );





}


?>
<?

/*
 * class ApiController
 * Example for implementing a simple api class,
 * uses the Quantum\ApiOutput and Quantum\ApiException
 * classes for rendering data to the client.
 */

class AppController extends Quantum {
    
    /*
     * __construct()
     * @param $arg
     */
    
    private $facebook;
    private $user_language;
    private $registered_user;
    
    
    function index() {
        
        $this->autoRender = false;
        $this->initFacebook();
        $this->counterRedirectHook();
        //$this->smartRedirectHook();
        
        
        $this->set('server_name', $_SERVER['SERVER_NAME']);
        $this->set('environment', $this->environment);
        $this->set('app_config', $this->app_config);
        $this->set('app_url', $this->getAppUrl());
        
        $this->setUserLanguage();
        
        $this->renderView('app/'.$this->user_language.'/index.tpl');
        
        
    }
    
    
    function addphone() {
        
        $this->autoRender = false;
        $this->initFacebook();
        
        $this->set('server_name', $_SERVER['SERVER_NAME']);
        $this->set('environment', $this->environment);
        $this->set('app_config', $this->app_config);
        $this->set('app_url', $this->getAppUrl());
        
        $this->setUserLanguage();
        
        if (!$this->locateUser($this->getFacebookUserId())) {
            $this->registered_user = $this->spawnUser($this->facebook->getUser());
        }
        
        $this->saveUserPhoneHook();
        
        $this->set('fbuid', $this->registered_user->facebook);
        
        $this->setUserFriends(5);
        
        $this->renderView('app/'.$this->user_language.'/addphone.tpl');
       
    }
    
    
    function channel() {
        
        $this->autoRender = false;
        echo '<html><head><title>FB</title><script src="//connect.facebook.net/en_US/all.js"></script></head><body></body></html>';
    }
    
    
    function fanpage($add = '') {
        
       $this->autoRender = false;
       
       $q = '';
       
       if (!empty($add)) {
            $q = '&app_data='.$add;
        }
    
        $url = $this->getAppUrl().$q;
        echo "<script>top.location='".$url."'</script>";
        return;
    }
    
    function unknown_number() {
        $this->autoRender = false;
        $this->initFacebook();
        
        $this->set('server_name', $_SERVER['SERVER_NAME']);
        $this->set('environment', $this->environment);
        $this->set('app_config', $this->app_config);
        $this->set('app_url', $this->getAppUrl());
        
        $this->setUserLanguage();
        
        if (!$this->locateUser($this->getFacebookUserId())) {
            $this->registered_user = $this->spawnUser($this->facebook->getUser());
        }
        
        $this->renderView('app/'.$this->user_language.'/unknown_number.tpl');
    }
    
    function share() {
        
        $this->autoRender = false;
        $this->set('server_name', $_SERVER['SERVER_NAME']);
        $this->set('environment', $this->environment);
        $this->set('app_config', $this->app_config);
        $this->set('app_url', $this->getAppUrl());
        
        $this->setUserLanguage();
        
        if (!$this->locateUser($this->getFacebookUserId())) {
            $this->registered_user = $this->spawnUser($this->facebook->getUser());
        }
        
        $promo_code_hash = to_password($this->registered_user->promo_code, $this->environment->system_salt);
        $mail_url = $this->genMailUrl();
        
        $this->set('member', $this->registered_user);
        $this->set('promo_code_hash', $promo_code_hash);
        $this->set('mail_url', $mail_url);
        
        
        $this->renderView('app/'.$this->user_language.'/share.tpl');
        
       
        
    }
    
    
    
    function phoneCheck($phone) {
        
        $this->autoRender= false;
        return AppController::apiCheckPhone($phone);
    }
    
    function pdf() {
       
        $this->autoRender = false;
        if ( !isset($this->requestData['c']) || !isset($this->requestData['h'])) {
            Quantum\ApiException::invalidParameters();
        }
        
        $member = Member::find_by_promo_code($this->requestData['c']);
        
        if (empty($member)) {
            Quantum\ApiException::resourceNotFound();
        }
        
        $hash = to_password($member->promo_code, $this->environment->system_salt);
        
        if ($hash != $this->requestData['h']) {
            Quantum\ApiException::resourceNotFound();
        }
        
        $this->renderPdf($member);
        
        //echo 'ok';
    }
    
    
    
    
    
    
    
    
    
    
    
    
    //PRIVATE METHODS
    
    
    private function renderPdf($member) {
        
        $this->set('member', $member);
        
        $c = $this->smarty->fetch($this->views_root.'coupon/'.$this->getLanguage().'.tpl');
        
        $filename = $member->promo_code;
        
        $logfilename = $this->root_folder."/tmp/coupons/$filename.html";
	$handle = fopen($logfilename, "w");
	fwrite($handle, $c);
	fclose($handle);
        
        $s = "wkhtmltopdf ".$this->getAppUrl()."/tmp/coupons/$filename.html ".$this->root_folder."/tmp/coupons/$filename.pdf";
        
        $cmd = escapeshellcmd($s);
       
        $result = shell_exec($cmd);
        
        unlink($this->root_folder."/tmp/coupons/$filename.html");
        
        header('Content-disposition: attachment; filename=Coupon_'.$member->promo_code.'.pdf');
	header("Content-Type: application/pdf");
	header('Content-Transfer-Encoding: binary');
	header('Expires: 0');
	header('Cache-Control: must-revalidate');
	header('Pragma: public');
	header('Content-Length: ' . filesize($this->root_folder."/tmp/coupons/$filename.pdf"));
	readfile($this->root_folder."/tmp/coupons/$filename.pdf");
        
           
    }
    
    
    private function setUserLanguage() {
        
        $this->user_language = $this->getLanguage();
        $this->set('user_language', $this->user_language);
        
    }
    
    private function initFacebook() {
        
        Quantum\Import::library('facebook/facebook.php');
        $this->facebook = new Facebook(array(
          'appId' => $this->app_config->app_id,
          'secret' => $this->app_config->app_secret
        ));
        
    }
    
    private function getLanguage() {
        
        $lang = 'en';
        
        $fb_request = false;
      
        try {
          $fb_request = $this->getSignedRequest();
        }
        catch (Exception $e) {
          $lang = 'en';
        }
        
        if (!empty($fb_request['user']['locale'])) {
          if (substr($fb_request['user']['locale'], 0, 2) == 'fr') {
            $lang = 'fr';
          }
        }
        
        if (!empty($_REQUEST['lang'])) {
          if (substr($_REQUEST['lang'], 0, 2) == 'fr') {
            $lang = 'fr';
            $_SESSION['language'] = $lang;
          }
          else {
            $_SESSION['language'] = $lang;
          }
        }
        
        if (!empty($_SESSION['language'])) {
            
            $lang = $_SESSION['language'];
        }
        
        return $lang;
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
    
    private function counterRedirectHook() {
        
        $sr = $this->getSignedRequest();
        
        $greet = 0;
    
        if (!empty($sr['app_data'])) {
          
            if ($sr['app_data'] == 'website-virgin-en')  {
              
              $this->autoRender = false;
              $this->sumCounter('outsideen');
              echo "<script>top.location='http://www.virginmobile.ca/en/members-lounge/refer-a-friend.html'</script>";
              return;
            }
            elseif ($sr['app_data'] == 'website-virgin-fr') {
              
              $this->autoRender = false;
              $this->sumCounter('outsidefr');
              echo "<script>top.location='http://www.virginmobile.ca/fr/members-lounge/refer-a-friend.html'</script>";
              return;
            }
      
            if ($sr['app_data'] == 'ref-fanpage') {
              $this->sumCounter('fanpagetraffic');
            }
           
            elseif ($sr['app_data'] == 'ref-shootout') {
              $this->sumCounter('shootouttraffic');
            }
            
            elseif ($sr['app_data'] == 'share-greet') {
              $greet = 1;
            }
        }
        
        if (!empty($sr['oauth_token']) && !empty($sr['user_id'])) {
            
            if ($this->locateUser($sr['user_id'])) {
               $this->smartRedirectHook();
            }
             
        }
    }
    
    
    private function sumCounter($concept, $value = 1) {
        
        if (empty($concept)) return false;
        
        $counter = Counter::find_by_concept($concept);
    
        if (!empty($counter)) {
          
          $current = (int) $counter->value;
          $new = $current + ((int) $value);
          $counter->value = $new;
          $counter->save();
          
        }
        
        else {
            
          $counter = new Counter();
          $counter->concept = $concept;
          $counter->value = $value;
          $counter->save();
            
        }
    
        return $counter;
        
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
    
    private function initUserSession($member) {
        
        //session_start();
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = $member->id;
        $_SESSION['facebook_id'] = $member->facebook;
        
        
    }
    
    private function locateUser($fbuid) {
        
        $member = Member::find_by_facebook($fbuid);
                
        if (!empty($member)) {
           
            $this->initUserSession($member);
            
            $this->registered_user = $member;
            
            return true;
           
        }
        
        return false;
        
    }
    
    
    private function spawnUser($fbuid) {
        
        $member = Member::find_by_facebook($fbuid);
        
        if (empty($member)) {
            
            $fbdata = $this->getFacebookUserData($fbuid);
            
            $member = new Member();
            $member->facebook = $fbuid;
            $member->first_name = $fbdata['first_name'];
            $member->last_name = $fbdata['last_name'];
            $member->language = $this->getLanguage();
            $member->email = $fbdata['email'];
            $member->save();
            
            return $member;
            
        }
        
        return false;
    }
    
    
    private function getFacebookUserData($fbuid) {
        try {
            $user = $this->facebook->api('/me');
        } catch (Exception $e) {
            return false;
        }
        
        return $user;
    }
    
    private function setUserFriends($limit) {
        
        $friends = $this->getUserFriends();
        $counter = 0;
        $fc = count($friends);
        
        
        while ($counter < $limit)  {
            $counter++;
            $rf = rand(0, $fc);
        
            if ($rf >= $fc && $rf != 0) {
                $rf = $rf-1;
            }
            $this->set('friend'.$counter, $friends[$rf]);
           
        }
        
    }
    
    
    private function getUserFriends() {
        
        try {
            $friends = $this->facebook->api('/me/friends');
        }
            catch (Exception $e) {
            return false;
        }
        
        return $friends['data'];
    }
    
    
    private function smartRedirectHook() {
        
        
        
        if ($this->locateUser($this->getFacebookUserId())) {
            
            if (empty($this->registered_user->phone) || empty($this->registered_user->promo_code) ) {
                redirect_to($this->getAppUrl().'/app/addphone');
            } else {
                redirect_to($this->getAppUrl().'/app/share');
            }
            
        }
        
    }
    
    private function saveUserPhoneHook() {
        
        if ( !empty($this->postData['phone1']) && !empty($this->postData['phone2']) && !empty($this->postData['phone3']))  {
            
            $phone = $this->postData['phone1'].$this->postData['phone1'].$this->postData['phone1'];
            
            if (!empty ($phone) && is_numeric($phone) && $this->phoneIsValid($phone)) {
                $this->registered_user->phone = $phone;
                $this->registered_user->promo_code = $this->generatePromoCode();
                $this->registered_user->save();
                redirect_to($this->getAppUrl.'/app/share');
            } else {
                redirect_to($this->getAppUrl.'/app/unknown_number');
            }
            
        }
        
        
    }
    
    
    private function generatePromoCode() {
        
        return $this->generateCode();
        
    }
    
    private function generateCode() {
        $code = $this->_generateCode();
        
        $exists = Member::find_by_promo_code($code);
        
        if (empty($exists)) {
            
            return $code;
        }
        
        $this->generateCode();
        
    }

    private function _generateCode() {
    
        $code = 'FB';
        for ($i = 1; $i <= 6; $i++) {
          $code .= chr(rand(0, 25) + 65);
        }
        return $code;
    }
  
  
    private function phoneIsValid($phone) {
    
        return AppController::apiCheckPhone($phone);
    
    }
  
    private function genMailUrl($lang = 'en') {
    
        if ($lang == 'en') {
            
            $promo_code_hash = to_password($this->registered_user->promo_code, $this->environment->system_salt);
            $mail['body'] = 'I have a promocode for you: %0D%0A %0D%0A';
            $mail['body'] .= 'Your promocode is: '.$this->registered_user->promo_code.' %0D%0A %0D%0A';
            $mail['body'] .= 'And here is the link to your promo code pdf: %0D%0A %0D%0A';
            $mail['body'] .= urlencode($this->getAppUrl()."/app/pdf?c=".$this->registered_user->promo_code."&h=".$promo_code_hash).' %0D%0A %0D%0A';
            $mail['body'] .= 'Thanks. %0D%0A %0D%0A';
            $mail['subject'] = 'You have a virgin promocode ready to redeem!! Code:'.$this->registered_user->promo_code;
            
            return "mailto:?body=".$mail['body'].'&subject='.$mail['subject'];
        }
    }
  
  private function apiCheckPhone($number = '') {
    
    if (empty($number) || !is_numeric($number)) {
      return false;
    }
    
    if ((substr($number, 0, 3) == '000')) {
        return true;
    }

    $api = 'http://www.virginmobile.ca/en/activation/mdn-type.do?callback=dummy&mdn='.$number;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $api);

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_AUTOREFERER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_FRESH_CONNECT, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_MAXREDIRS, 20);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);

    $response = curl_exec($ch);
    
    if (curl_errno($ch)) {
      $err = curl_error($ch);
      curl_close($ch);
      return false;
    }

    curl_close($ch);
    
    if (empty($response)) {
      return false;
    }

    $response = trim(str_replace(array('dummy', '(', ')'), '', $response));

    $data = json_decode($response, 1);

    if (empty($data) || empty($data['type'])) {
      return false;
    }
    
    elseif ($data['type'] == 'UNKNOWN') {
      return false;
    }

    return true;
    
  }
  
    
    
    
   
    
}

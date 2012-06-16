<?php

class ClosureCompiler  {
	
	private $compiled_file;
	private $file;
	private $file_signature;
	private $file_location;
	
	
	function __construct($url) {
		
		$this->file = $this->getFile($url);
		$this->file_signature = $this->getFileSignature();
		$this->file_location = 'builds/qloader/'.$this->file_signature.'.js';
		//echo $this->file_signature;
		//exit();
		
		$this->compiled_file = $this->getCompiledFile();
		
		if ($this->compiled_file && !isset($_GET['recompile']) ) {
			
			$this->outputCompiledFile();
			
		}
		
		else {
			$this->compile();
		}	
	
		
	}
	
	
	function getFile($url) {
		
		$file = file_get_contents($url);
		
		if ($file) {
			
			return $file;
		}
		
		exit('File couldnt be loaded');
		
	}
	
	function getCompiledFile() {
		
		
		if (file_exists($this->file_location)) {
			
			return file_get_contents($this->file_location);
		}
		
		return false;
		
	}
	
	function outputCompiledFile() {
			
		header ('Content-type: text/javascript');
		echo $this->compiled_file;
		exit(0);
			
			
	}
		
	
	
	function compile() {
		
		$js = $this->file;
		
		if ($js != '') {
		
			$apiArgs = array(
				'compilation_level' => 'SIMPLE_OPTIMIZATIONS',
				'output_format' => 'text',
				'output_info' => 'compiled_code'
			);
			
			$args = 'js_code=' . urlencode($js);
			foreach ($apiArgs as $key => $value) {
				$args .= '&' . $key . '=' . urlencode($value);
			}
			
			// API call using cURL
			$call = curl_init();
			curl_setopt_array($call, array(
				CURLOPT_URL => 'http://closure-compiler.appspot.com/compile',
				CURLOPT_POST => 1,
				CURLOPT_POSTFIELDS => $args,
				CURLOPT_RETURNTRANSFER => 1,
				CURLOPT_HEADER => 0,
				CURLOPT_FOLLOWLOCATION => 0
			));
			$jscomp = curl_exec($call);
			curl_close($call);
			
			// calculate compression saving
			$reduced = (strlen($js) - strlen($jscomp)) / strlen($js) * 100;
			
			if ($this->writeCompiledFile($jscomp, $this->file_location)) {
				
				$this->compiled_file = $this->getCompiledFile();
				
				$this->outputCompiledFile();
				
			}
			
		};
		
	}
		
	
	
	function writeCompiledFile($content, $fileName) {
			
			$jsfilename = $fileName;
			$handle = fopen($jsfilename, "w");
			fwrite($handle, $content);
			fclose($handle);
			
			return true;
			
			
	
	
	}
	
	function getFileSignature() {
		
		return hash('crc32b', $this->file);
		
	}
		
		
}
	
	$x = new ClosureCompiler('http://my.flightbackpack.com/public/js/framework/v2/qloader.js');




?>

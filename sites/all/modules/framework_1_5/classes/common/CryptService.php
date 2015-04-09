<?php

final class CryptService {

/**
*
* Parameter $data = data to encrypt, $key = Key to encrypt, $algorithm = hash algorithm accepted values sha1, md5
key = signature, authkey = data
*/    

	static public function sign($data, $key, $algorithm) {
		
		if($algorithm == 'sha1') {
			$algorithm = MHASH_SHA1;
		} elseif ($algorithm == 'md5') {
			$algorithm = MHASH_MD5;
		} elseif($algorithm == '') {
			echo "Your HASH algorithm is not specified, Please contact administrator..";
			return;
		}
		return base64_encode($data);
		//return base64_encode(
		//	mhash($algorithm, $data, $key)
		//);
	}

}

?>
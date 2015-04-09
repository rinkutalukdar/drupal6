<div id="user">
		<p class="top_tabs"></p>
			<div class="login">
              <?php print drupal_render($form['name']); ?>
              <?php print drupal_render($form['pass']); ?>
			  <?php print drupal_render($form['rememberme']); ?>
			  <p><?php print drupal_render($form['submit']); ?> <?php print drupal_render($form); ?></p>
			  <p><span><a href="user/password">Forgot Password?</a></span><span><a href="user/register">Register</a></span></p>
			  <p class="center"><img src="<?php  print base_path().path_to_theme()?>/images/or.png"></p>
			</div>
			<div class="icons">
				<p>Sign in with</p>
<?php           if(variable_get('google', '')) {
                            $googleCallBack =   str_replace('http://','http%3A%2F%2F',variable_get('google_callback',''));
                            $oAuthUrl   =   'https://www.google.com/accounts/AuthSubRequest?scope=http%3A%2F%2Fwww.google.com%2Fcalendar%2Ffeeds%2F&session=1&secure=0&next='.$googleCallBack. ' ';?>
                        <span><a href="<?php echo $oAuthUrl;?>"><img src="<?php  print base_path().path_to_theme()?>/images/google_btn.png" border="0"></a></span>
<?php           } if(variable_get('facebook', '')){?>
                        <span><a href="<?php print base_path()?>oauth_facebook"><img src="<?php  print base_path().path_to_theme()?>/images/facebook_btn.png" border="0"></a></span>
<?php 			}

                if(variable_get('twitter', '')){ ?>
                    <span><a href="<?php print base_path()?>othtwitter"><img src="<?php  print base_path().path_to_theme()?>/images/twitter_btn.png" border="0"></a></span>
<?php           }

                if(variable_get('yahoo', '')) { ?>
					<span><a href="<?php print base_path()?>oauth_yahoo"><img src="<?php  print base_path().path_to_theme()?>/images/yahoo_btn.png" border="0"></a></span>				
<?php           } ?>
			</div>
      </div>
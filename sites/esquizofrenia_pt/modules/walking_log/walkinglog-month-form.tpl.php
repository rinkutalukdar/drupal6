<?php
$path = drupal_get_path('theme','psychiatry24x7');
//echo "<pre>";print_r($form);exit;
?>
<div class="my-progress-content">
  <div class="walking-log-nav">
    <div class="nav-buttons"><a href="<?php echo url('walking_log'); ?>"><img alt="Create-Plan" src="<?php echo url($path.'/images/create-plan.png'); ?>" /></a></div>
    <div class="nav-buttons"><a href="<?php echo url('walking_log/log'); ?>"><img alt="Log-a-Walk" src="<?php echo url($path.'/images/log-a-walk.png'); ?>" /></a></div>
    <div class="nav-buttons"><a href="<?php echo url('walking_log/progress'); ?>"><img alt="My-Progress" src="<?php echo url($path.'/images/my-progress.png'); ?>"></a></div>
    <div class="login-monthly-container"><img alt="login" src="<?php echo url($path.'/images/monthly-plan.png'); ?>">
      <p><?php print t('Select options from the fields below to create your plan.'); ?></p>
      <div>
      		<?php print drupal_render($form['wl_search_month']); ?>
      </div>
      <div></div>
        
        <?php print drupal_render($form['submit']); ?>
        <?php print drupal_render($form); ?>

    </div>
  </div>
</div>
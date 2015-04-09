<ul>
    <li class="wid275f"><?php echo drupal_render($form['consentURL']); ?></li>
	<li class="wid117"><?php echo drupal_render($form['consentVersion']); ?></li>
	<li class="wid117"> <?php echo drupal_render($form['consentDate']);?>	</li>
	<!-- <li class="wid50">	<?php //echo drupal_render($form['status']); ?>	</li>-->
	<li class="wid90">	<?php echo drupal_render($form['submit']); ?>	</li>
</ul>
<?php echo drupal_render($form); ?>
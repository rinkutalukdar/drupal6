<?php
// $Id: block.tpl.php,v 1.0 2010/10/12 15:55:00 narendra.b Exp $
?>
<div id="block-<?php print $block->module .'-'. $block->delta; ?>" class="clear-block block block-<?php print $block->module ?>">

<?php if (!empty($block->subject)): ?>
  <h2><?php print $block->subject ?></h2>
<?php endif;?>
  <div class="content"><?php print $block->content ?></div>
</div>

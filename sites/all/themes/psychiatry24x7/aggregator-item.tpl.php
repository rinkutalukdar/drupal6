	<?php
// $Id: aggregator-item.tpl.php,v 1.1 2007/09/13 08:02:38 goba Exp $

/**
 * @file aggregator-item.tpl.php
 * Default theme implementation to format an individual feed item for display
 * on the aggregator page.
 *
 * Available variables:
 * - $feed_url: URL to the originating feed item.
 * - $feed_title: Title of the feed item.
 * - $source_url: Link to the local source section.
 * - $source_title: Title of the remote source.
 * - $source_date: Date the feed was posted on the remote source.
 * - $content: Feed item content.
 * - $categories: Linked categories assigned to the feed.
 *
 * @see template_preprocess()
 * @see template_preprocess_aggregator_item()
 */
$arr = get_defined_vars();
?>
<div class="feed-item stories_container">  
<div class="stories_right">  
<?php echo $source_image;?>
    <h2><?php print $arr["variables"]["item"]->title; ?></h2>
  
  <?php if ($source_url) : ?>
    <a href="<?php print $source_url; ?>" class="feed-item-source"><?php print $source_title; ?></a> -
  <?php endif; ?>
    <h4><?php //print $source_date;
  	  print "Posted ";
	  print date('jS F Y',$arr["variables"]["item"]->timestamp); 
  ?></h4>  

<?php //if ($content) : ?>
  
    <?php print $content; ?>
    <?php 
    	//echo $arr["variables"]["item"]->description;
    ?><p class='read'>
    <a href="<?php print $arr["variables"]["item"]->link; ?>" target="_blank">Read the full article</a></p>
  
<?php //endif; ?>

<?php if ($categories) : ?>
  <div class="feed-item-categories">
    <?php print t('Categories'); ?>: <?php print implode(', ', $categories); ?>
  </div>
<?php endif ;?>
</div>
</div>

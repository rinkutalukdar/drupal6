<?php

// $Id: views-view-fields.tpl.php,v 1.6 2008/09/24 22:48:21 merlinofchaos Exp $

/**

* @file views-view-fields.tpl.php

* Default simple view template to all the fields as a row.

*

* - $view: The view in use.

* - $fields: an array of $field objects. Each one contains:

*   - $field->content: The output of the field.

*   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.

*   - $field->class: The safe class id to use.

*   - $field->handler: The Views field handler object controlling this field. Do not use

*     var_export to dump this object, as it can't handle the recursion.

*   - $field->inline: Whether or not the field should be inline.

*   - $field->inline_html: either div or span based on the above flag.

*   - $field->separator: an optional separator that may appear before a field.

* - $row: The raw result object from the query, with all data it fetched.

*

* @ingroup views_templates

*/

?>

<?php

                $path = drupal_get_path('theme','psychiatry24x7');

                $array = array();

                $progress_text="";

?>

<p>

<?php foreach ($fields as $id => $field){ ?>

<?php if($id=='field_month_start_value'){ ?>   

               

                <label class="views-label-<?php print $field->class; ?>">

        <?php print $field->content; ?>:

      </label>

<?php }else if($id=='field_miles_planned_value'){

 

                $array['miles'] = $field->content;

?>

<?php }elseif($id=='field_minutes_planned_value'){

 

                $array['minutes'] = $field->content;

                }elseif($id=='nid'){

                $array['node'] = url('walking_log/'.$field->content);
				$array['node_del'] = url('walking_log/delete-plan/'.$field->content);
               

}

}

 

if($array['miles']!=""){

                $progress_text = $array['miles'].' '.$fields['field_distance_unit_value']->content;

}

else if($array['minutes']!=""){

                $hours = (int) ($array['minutes']/60);

                $minutes = (int) ($array['minutes']%60);

                $time = ($hours>0)?"$hours hours and $minutes minutes":"$minutes minutes";

                $progress_text = t('for').' '.$time;

}

 

?>

<div class="log-status"><?php echo t("I aim to walk").' '.$progress_text; ?></div>

<a href="<?php echo $array['node']; ?>"><img src = "<?php echo url($path.'/images/edit-button.png');?>" /></a>
<a href="<?php echo $array['node_del']; ?>"><img src = "<?php echo url($path.'/images/delete-button.png');?>" /></a>

</p>
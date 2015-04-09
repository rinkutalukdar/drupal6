<?php

/**
 *
 * Implementation of hook_views_pre_render().
 *
 * This hook was implemented to add the javascript file for the batch
 * published functionality.
 *
 * @param <type> $view
 */
function jnj_content_workflow_views_pre_render(&$view) {
  if (user_access('Publish Approved Content') && $view->name == 'moderated_content'
            && $view->current_display == 'page_4') {
    drupal_add_js(drupal_get_path('module', 'jnj_content_workflow') .'/js/publish-nodes.js');
  }
}




<?php

/**
 * Implementation of hook_views_default_views().
 */
function jnj_content_workflow_views_default_views() {
	$draft_sid = variable_get('jnj_content_workflow_sid_draft', NULL);
	$submitted_sid = variable_get('jnj_content_workflow_sid_submitted', NULL);
	$approved_sid = variable_get('jnj_content_workflow_sid_approved', NULL);
	$disapproved_sid = variable_get('jnj_content_workflow_sid_disapproved', NULL);
	$published_sid = variable_get('jnj_content_workflow_sid_published', NULL);
$view = new view;
$view->name = 'landing_page';
$view->description = '';
$view->tag = '';
$view->view_php = '';
$view->base_table = 'node';
$view->is_cacheable = FALSE;
$view->api_version = 2;
$view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */
$handler = $view->new_display('default', 'Defaults', 'default');
$handler->override_option('fields', array(
  'nid' => array(
    'label' => 'Nid',
    'alter' => array(
      'alter_text' => 0,
      'text' => '',
      'make_link' => 0,
      'path' => '',
      'link_class' => '',
      'alt' => '',
      'prefix' => '',
      'suffix' => '',
      'target' => '',
      'help' => '',
      'trim' => 0,
      'max_length' => '',
      'word_boundary' => 1,
      'ellipsis' => 1,
      'html' => 0,
      'strip_tags' => 0,
    ),
    'empty' => '',
    'hide_empty' => 0,
    'empty_zero' => 0,
    'link_to_node' => 0,
    'exclude' => 1,
    'id' => 'nid',
    'table' => 'node',
    'field' => 'nid',
    'relationship' => 'none',
  ),
  'title' => array(
    'label' => 'Title',
    'alter' => array(
      'alter_text' => 0,
      'text' => '',
      'make_link' => 1,
      'path' => 'latest_revision/[nid]',
      'link_class' => '',
      'alt' => '',
      'prefix' => '',
      'suffix' => '',
      'target' => '',
      'help' => '',
      'trim' => 0,
      'max_length' => '',
      'word_boundary' => 1,
      'ellipsis' => 1,
      'html' => 0,
      'strip_tags' => 0,
    ),
    'empty' => '',
    'hide_empty' => 0,
    'empty_zero' => 0,
    'link_to_node' => 0,
    'exclude' => 0,
    'id' => 'title',
    'table' => 'node',
    'field' => 'title',
    'override' => array(
      'button' => 'Override',
    ),
    'relationship' => 'none',
  ),
  'type' => array(
    'label' => 'Type',
    'alter' => array(
      'alter_text' => 0,
      'text' => '',
      'make_link' => 0,
      'path' => '',
      'link_class' => '',
      'alt' => '',
      'prefix' => '',
      'suffix' => '',
      'target' => '',
      'help' => '',
      'trim' => 0,
      'max_length' => '',
      'word_boundary' => 1,
      'ellipsis' => 1,
      'html' => 0,
      'strip_tags' => 0,
    ),
    'empty' => '',
    'hide_empty' => 0,
    'empty_zero' => 0,
    'link_to_node' => 0,
    'machine_name' => 0,
    'exclude' => 0,
    'id' => 'type',
    'table' => 'node',
    'field' => 'type',
    'override' => array(
      'button' => 'Override',
    ),
    'relationship' => 'none',
  ),
  'changed' => array(
    'label' => 'Updated on',
    'alter' => array(
      'alter_text' => 0,
      'text' => '',
      'make_link' => 0,
      'path' => '',
      'link_class' => '',
      'alt' => '',
      'prefix' => '',
      'suffix' => '',
      'target' => '',
      'help' => '',
      'trim' => 0,
      'max_length' => '',
      'word_boundary' => 1,
      'ellipsis' => 1,
      'html' => 0,
      'strip_tags' => 0,
    ),
    'empty' => '',
    'hide_empty' => 0,
    'empty_zero' => 0,
    'date_format' => 'small',
    'custom_date_format' => '',
    'exclude' => 0,
    'id' => 'changed',
    'table' => 'node',
    'field' => 'changed',
    'override' => array(
      'button' => 'Override',
    ),
    'relationship' => 'none',
  ),
  'name' => array(
    'label' => 'Name',
    'alter' => array(
      'alter_text' => 0,
      'text' => '',
      'make_link' => 0,
      'path' => '',
      'link_class' => '',
      'alt' => '',
      'prefix' => '',
      'suffix' => '',
      'target' => '',
      'help' => '',
      'trim' => 0,
      'max_length' => '',
      'word_boundary' => 1,
      'ellipsis' => 1,
      'html' => 0,
      'strip_tags' => 0,
    ),
    'empty' => '',
    'hide_empty' => 0,
    'empty_zero' => 0,
    'link_to_user' => 1,
    'overwrite_anonymous' => 0,
    'anonymous_text' => '',
    'exclude' => 0,
    'id' => 'name',
    'table' => 'users',
    'field' => 'name',
    'override' => array(
      'button' => 'Override',
    ),
    'relationship' => 'none',
  ),
  'state' => array(
    'label' => 'Current State',
    'alter' => array(
      'alter_text' => 0,
      'text' => '',
      'make_link' => 0,
      'path' => '',
      'link_class' => '',
      'alt' => '',
      'prefix' => '',
      'suffix' => '',
      'target' => '',
      'help' => '',
      'trim' => 0,
      'max_length' => '',
      'word_boundary' => 1,
      'ellipsis' => 1,
      'html' => 0,
      'strip_tags' => 0,
    ),
    'empty' => '',
    'hide_empty' => 0,
    'empty_zero' => 0,
    'exclude' => 0,
    'id' => 'state',
    'table' => 'workflow_states',
    'field' => 'state',
    'override' => array(
      'button' => 'Override',
    ),
    'relationship' => 'none',
  ),
));
$handler->override_option('sorts', array(
  'stamp' => array(
    'order' => 'DESC',
    'granularity' => 'second',
    'id' => 'stamp',
    'table' => 'workflow_node',
    'field' => 'stamp',
    'relationship' => 'none',
  ),
));
$handler->override_option('filters', array(
  'sid' => array(
    'operator' => 'in',
    'value' => array(
      $draft_sid => $draft_sid,
      $disapproved_sid => $disapproved_sid,
      $submitted_sid => $submitted_sid,
      $approved_sid => $approved_sid,
      $published_sid => $published_sid,
    ),
    'group' => '0',
    'exposed' => TRUE,
    'expose' => array(
      'use_operator' => 0,
      'operator' => 'sid_op',
      'identifier' => 'sid',
      'label' => 'Content Current State',
      'optional' => 1,
      'single' => 1,
      'remember' => 0,
      'reduce' => 1,
    ),
    'id' => 'sid',
    'table' => 'workflow_node',
    'field' => 'sid',
    'relationship' => 'none',
    'override' => array(
      'button' => 'Override',
    ),
  ),
  'type' => array(
    'operator' => 'in',
    'value' => array(),
    'group' => '0',
    'exposed' => TRUE,
    'expose' => array(
      'use_operator' => 0,
      'operator' => 'type_op',
      'identifier' => 'type',
      'label' => 'Inhaltstyp',
      'optional' => 1,
      'single' => 1,
      'remember' => 0,
      'reduce' => 0,
    ),
    'id' => 'type',
    'table' => 'node',
    'field' => 'type',
    'relationship' => 'none',
    'override' => array(
      'button' => 'Override',
    ),
  ),
));
$handler->override_option('access', array(
  'type' => 'role',
  'role' => array(
    '6' => 6,
    '5' => 5,
    '7' => 7,
  ),
));
$handler->override_option('cache', array(
  'type' => 'none',
));
$handler->override_option('use_ajax', TRUE);
$handler->override_option('use_pager', '1');
$handler->override_option('style_plugin', 'table');
$handler->override_option('style_options', array(
  'grouping' => '',
  'override' => 1,
  'sticky' => 0,
  'order' => 'asc',
  'columns' => array(
    'title' => 'title',
    'type' => 'type',
    'changed' => 'changed',
  ),
  'info' => array(
    'title' => array(
      'sortable' => 0,
      'separator' => '',
    ),
    'type' => array(
      'sortable' => 0,
      'separator' => '',
    ),
    'changed' => array(
      'sortable' => 0,
      'separator' => '',
    ),
  ),
  'default' => '-1',
));
$handler = $view->new_display('page', 'Landing Page', 'page_1');
$handler->override_option('path', 'content/display');
$handler->override_option('menu', array(
  'type' => 'none',
  'title' => '',
  'description' => '',
  'weight' => 0,
  'name' => 'navigation',
));
$handler->override_option('tab_options', array(
  'type' => 'none',
  'title' => '',
  'description' => '',
  'weight' => 0,
  'name' => 'navigation',
));
$views[$view->name] = $view;
return $views;
}

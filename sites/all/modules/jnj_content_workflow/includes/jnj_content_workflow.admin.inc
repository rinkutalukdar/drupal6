<?php

/**
 *
 * Configuration form. This forms shows all content types and the user can choose
 * which content types are manageables.
 *
 * @param <type> $form_state
 * @return <type>
 */
function jnj_content_workflow_configuration_form(&$form_state) {
  $form = array();

  $types = node_get_types();

  $options = array();

  foreach ($types as $node_type => $type) {
    $options[$node_type] = $type->name;
  }

  $form['jnj_content_workflow_manageable_types'] = array(
    '#type' => 'checkboxes',
    '#title' => t('Manageable Types'),
    '#default_value' => variable_get('jnj_content_workflow_manageable_types', array()),
    '#options' => $options,
    '#multiple' => TRUE,
  );

  $form['#submit'] = array(
    'jnj_content_workflow_configuration_form_submit'
  );

  return system_settings_form($form);
}

/**
 *
 * Implementation of hook_submit().
 *
 * 
 *
 * @param <type> $form
 * @param <type> $form_state
 */
function jnj_content_workflow_configuration_form_submit($form, &$form_state) {
  module_load_include('inc', 'jnj_content_workflow', 'includes/jnj_content_workflow.util');

  $old_man_types = variable_get('jnj_content_workflow_manageable_types', array());
  
  $new_man_types = $form_state['values']['jnj_content_workflow_manageable_types'];

  $result = db_fetch_array(db_query("SELECT * FROM {workflow_transitions} w WHERE sid = %d AND target_sid = %d",
          variable_get('jnj_content_workflow_sid_approved', 0),
          variable_get('jnj_content_workflow_sid_published', 0)));

  $tid = $result['tid'];

  // remove types
  $remove = array_diff($old_man_types, $new_man_types);

  $remove_perms = array();

  foreach ($remove as $item) {
    db_query("DELETE FROM {workflow_type_map} WHERE type = '%s'", $item);
    db_query("DELETE FROM {trigger_assignments} WHERE op LIKE '%s%%'", 'workflow-'. $item);
    $remove_perms[] = 'create '. $item .' content';
    $remove_perms[] = 'edit any '. $item .' content';
    variable_del('node_options_'. $item);
    variable_del('new_revisions_'. $item);
    variable_del('revisioning_auto_publish_'. $item);
  }

  $add_perms = array();

  // Add type to workflow
  $add = array_diff($new_man_types, $old_man_types);
  foreach ($add as $item_key  => $item) {
    if ($item === $item_key) {
      db_query("DELETE FROM {workflow_type_map} WHERE type = '%s'", $item);
      db_query("INSERT INTO {workflow_type_map} (type, wid) VALUES ('%s', %d)",
              $item, variable_get('jnj_content_workflow_wid', 0));

      _jnj_content_workflow_set_action('workflow', 'workflow-'. $item .'-'. $tid,
              'revisioning_publish_latest_revision_action');
      $add_perms[] = 'create '. $item .' content';
      $add_perms[] = 'edit any '. $item .' content';

      $node_options = array(
        'revision' => 'revision',
        'revision_moderation' => 'revision_moderation',
      );
      variable_set('node_options_'. $item, $node_options);
      variable_set('new_revisions_'. $item, 1);
      variable_set('revisioning_auto_publish_'. $item, 0);
      
	$sql = "SELECT nid FROM {node} WHERE status <> 0 AND type IN ('%s')";
	$query = db_query($sql, $item);
	$nodes = array();
	$creation_sid = variable_get('jnj_content_workflow_sid_creation', NULL);
	//$draft_sid = db_result(db_query("SELECT sid FROM {workflow_states} ws WHERE ws.state = '%s' AND ws.wid = 1", 'Draft'));
	$draft_sid = variable_get('jnj_content_workflow_sid_draft', NULL);
	//$submitted_sid = db_result(db_query("SELECT sid FROM {workflow_states} ws WHERE ws.state = '%s' AND ws.wid = 1", 'Submitted'));
	$submitted_sid = variable_get('jnj_content_workflow_sid_submitted', NULL);
	//$approved_sid = db_result(db_query("SELECT sid FROM {workflow_states} ws WHERE ws.state = '%s' AND ws.wid = 1", 'Approved'));
	$approved_sid = variable_get('jnj_content_workflow_sid_approved', NULL);
	//$published_sid = db_result(db_query("SELECT sid FROM {workflow_states} ws WHERE ws.state = '%s' AND ws.wid = 1", 'Published'));
	$published_sid = variable_get('jnj_content_workflow_sid_published', NULL);
	while($rs = db_fetch_array($query)) {
		$nodes[] = node_load($rs['nid']);
	}
	foreach($nodes as $node) {
		if($node->_workflow == $creation_sid) {
			//workflow_execute_transition($node, $draft_sid, NULL, TRUE);
			//workflow_execute_transition($node, $submitted_sid, NULL, TRUE);
			//workflow_execute_transition($node, $approved_sid, NULL, TRUE);
			workflow_execute_transition($node, $published_sid, 'Published while installing', TRUE);
		}
	}
    }
  }

  // set permissions
  _jnj_content_workflow_set_permissions(variable_get('jnj_content_workflow_role_editor', 0),
          $add_perms, $remove_perms);
}

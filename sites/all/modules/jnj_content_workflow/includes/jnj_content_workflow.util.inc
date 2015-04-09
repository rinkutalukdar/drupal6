<?php

/**
 *
 * Set an action on a trigger.
 *
 * @param <type> $hook
 * @param <type> $op
 * @param <type> $aid
 */
function _jnj_content_workflow_set_action($hook, $op, $aid, $weight = 1) {
  db_query("INSERT INTO {trigger_assignments} VALUES ('%s', '%s', '%s', %d)", $hook, $op, $aid, $weight);
}

/**
 *
 * Set permissions to a role.
 *
 * @param <type> $rid role id
 * @param <type> $add permissions to be add to the role
 * @param <type> $remove permissions to be removed from the role (optional).
 */
function _jnj_content_workflow_set_permissions($rid, $add, $remove = array()) {
  $result = db_query("SELECT * FROM {permission} WHERE rid = %d", $rid);
  $role = db_fetch_array($result);
  if ($role) {
    $role['permissions'] = explode(', ', $role['perm']);
    $role['permissions'] = array_combine($role['permissions'], $role['permissions']);
    foreach ($add as $permission) {
      $role['permissions'][$permission] = $permission;
    }
    foreach ($remove as $permission) {
      unset($role['permissions'][$permission]);
    }
    db_query("UPDATE {permission} SET perm = '%s' WHERE pid = %d", implode(', ', $role['permissions']), $role['pid']);
  }
  else {
    db_query("INSERT INTO {permission} (rid, perm) VALUES (%d, '%s')", $rid, implode(', ', $add));
  }
}

/**
 *
 * Create a new workflow state.
 *
 * @param <type> $name state name
 * @param <type> $id state id
 * @param <type> $wid parente workflow id
 * @param <type> $weight
 * @param <type> $sysid if the state can be edited or not
 */
function _jnj_content_workflow_create_state($name, $id, $wid, $weight = 0, $sysid = 0) {
  $sid = workflow_state_save(array(
    'wid' => $wid,
    'sysid' => $sysid,
    'state' => $name,
    'weight' => $weight,
    'status' => 1,
  ));
  variable_set('jnj_content_workflow_sid_'. $id, $sid);
}

/**
 *
 * Create new roles.
 *
 * @param <type> $roles
 * @return array with the rids of the created roles.
 */
function _jnj_content_workflow_create_roles($roles) {
  $result = array();
  foreach ($roles as $role_hid => $role_name) {
    db_query("INSERT INTO {role} (name) VALUES ('%s')", $role_name);
    $rid = db_last_insert_id('role', 'rid');
    variable_set('jnj_content_workflow_role_'. $role_hid, $rid);
    $result[$role_hid] = $rid;
  }
  return $result;
}

/**
 *
 * Create a redirect action.
 *
 * @param <type> $action_name
 * @param <type> $url
 * @param <type> $desc
 */
function _jnj_content_workflow_create_redirect_action($action_name, $url, $desc) {
  $aid = actions_save('system_goto_action', 'system', array(
    'url' => $url,
  ), $desc);
  variable_set('jnj_content_workflow_aid_goto_'. $action_name .'_content', $aid);
}


/**
 *
 * Delete roles.
 *
 * @param <type> $roles
 */
function _jnj_content_workflow_delete_roles($roles) {
  foreach ($roles as $role) {
    $rid = variable_get('jnj_content_workflow_role_'. $role, NULL);
    db_query("DELETE FROM {role} WHERE rid = %d", $rid);
    db_query("DELETE FROM {permission} WHERE rid = %d", $rid);
    db_query("DELETE FROM {users_roles} WHERE rid = %d", $rid);
    variable_del('jnj_content_workflow_role_'. $role);
  }
}

/**
 *
 * Delete actions
 *
 * @param <type> $actions_names
 */
function _jnj_content_workflow_delete_actions($actions_names) {
  foreach ($actions_names as $action_name) {
    $aid = variable_get('jnj_content_workflow_aid_goto_'. $action_name .'_content', NULL);
    actions_delete($aid);
    variable_del('jnj_content_workflow_aid_goto_'. $action_name .'_content');
  }
}

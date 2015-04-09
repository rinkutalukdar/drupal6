<?php
// $Id: search-theme-form.tpl.php,v 1.1 2007/10/31 18:06:38 dries Exp $

/**
 * @file search-theme-form.tpl.php
 * Default theme implementation for displaying a search form directly into the
 * theme layout. Not to be confused with the search block or the search page.
 *
 * Available variables:
 * - $search_form: The complete search form ready for print.
 * - $search: Array of keyed search elements. Can be used to print each form
 *   element separately.
 *
 * Default keys within $search:
 * - $search['search_theme_form']: Text input area wrapped in a div.
 * - $search['submit']: Form submit button.
 * - $search['hidden']: Hidden form elements. Used to validate forms when submitted.
 *
 * Since $search is keyed, a direct print of the form element is possible.
 * Modules can add to the search form so it is recommended to check for their
 * existance before printing. The default keys will always exist.
 *
 *   <?php if (isset($search['extra_field'])): ?>
 *     <div class="extra-field">
 *       <?php print $search['extra_field']; ?>
 *     </div>
 *   <?php endif; ?>
 *
 * To check for all available data within $search, use the code below.
 *
 *   <?php print '<pre>'. check_plain(print_r($search, 1)) .'</pre>'; ?>
 *
 * @see template_preprocess_search_theme_form()
 */
	/* Replace button input type with image  */
	$search["submit"]	=	str_replace('input type="submit"', 'input type="image" src="'.url().path_to_theme().'/images/icon_go.gif" ', $search["submit"]);

	/* Place the HTML of the design to the search form */
	$search['search_block_form'] = '<div id="search_txt"><img src="'.url().path_to_theme().'/images/hd_seassrch.gif" alt="Search" title="Search" /></div>
        <div id="search_fields">
          <div class="search_box">
            <input type="text" maxlength="128" name="search_block_form" id="edit-search-block-form-1" size="15" value="" title='.t("Enter the terms you wish to search for.").' class="form-text" />
          </div>
          <div class="search_button">
          '.$search["submit"].'
          </div>
        </div>';
?>

  <?php print $search['search_block_form']; ?>
  <?php print $search['hidden']; ?>

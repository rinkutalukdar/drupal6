
// $Id: $

/**
* @author:        Avi Mehta
* @description:   Javascript functions for the formbuilder Module.
* @license:       GPL
*/

//Class for formbuilder UI
    var form = {
        "#id" : "new_form",
        "#value"  : "",
        "#prefix" : "",
        "#suffix" : "",
        "#method" : "post",
        "#action" : ""
      };
    var itemCount = 0;
    var duplicate_check = 'nocheck';
    var current_form_id = '';
formbuilder.UI = function() {};

/**
* @name:        addComponents()
* @description: Adds the buttons to the DOM based on js array: properties.
*               It was populated on server while this page was being created.
* @params:      none
*/
formbuilder.UI.addComponents = function() {
	var j = 0;
	for (var i in formbuilder.properties) {
		$('#formbuilder_leftCol').append('<div class="formbuilderButton" onmouseout="formbuilder.forms.changeDefaultclass(this)"  onmouseover="formbuilder.forms.changeclass(this)" onclick="formbuilder.forms.addItem(\''+i+'\',\''+i+'\'+itemCount,false)" title="'+formbuilder.components_description[i]+'">' + i + '</div>');
	}
	/*$('.formbuilderButton').ToolTip( {
		className: 'formbuilder_tooltipClass',
		position: 'mouse',
		delay: 1
	});*/
}

/**
* Fucntion to get the hints for the selected item
*/
components_description_hint = function(e) {
	//label field is undefined
	if (typeof(e) == "undefined" || e == "Label") {
		e = "label";
	}
	return formbuilder.components_description_hint[e];
}

//Remove - Was used in sorting
/**************************************************************************
* @name:        recolor()
* @description: Recolors the form elements in alternating colors.
* @params:      none.
****************************************************************************/
formbuilder.UI.recolor = function() {
	//$('.formbuilder_formRow').removeClass('rowAlt').removeClass('row').filter(':odd').addClass('row').end().filter(':even').addClass('rowAlt').end();
	$('.formbuilder_close').filter(':odd').attr('src', formbuilder.basePath+'/images/formElements/cross1.jpg').end().filter(':even').attr('src', formbuilder.basePath+'/images/formElements/cross2.gif').end();
	$('.handle').filter(':odd').attr('src', formbuilder.basePath+'/images/formElements/move.jpg').end().filter(':even').attr('src', formbuilder.basePath+'/images/formElements/move.gif').end();
	formbuilder.forms.putWeights();
}


/**
* @name:        createSortables()
* @description: Create the sortables. Called after any element is added.
* @params:      none
*/
formbuilder.UI.createSortables = function () {
	$('#editingTab').Sortable({
		accept:'formbuilder_formRow',
		activeclass:'formbuilder_sortableactive',
		hoverclass:'formbuilder_sortablehover',
		helperclass:'formbuilder_sorthelper',
		opacity:0.8,
		revert:true,
		update:formbuilder.UI.treeFormatter,
		changed:formbuilder.forms.putWeights
	}
	)
}


/**
*  Formats the form array according to the current arrangement in editingTab
*
*/
formbuilder.UI.treeFormatter = function () {
	//Insert all the child nodes.
	var x = formbuilder.UI.createTree($('#editingTab').children('.formbuilder_formRow'));
	if(!x) {
		//When no elements are present in the form.
		x = {};
	}
	x['#id'] = form['#id'];
	x['#prefix'] = form['#prefix'];
	x['#suffix'] = form['#suffix'] ;
	x['#method'] = form['#method'] ;
	x['#action'] = form['#action'] ;
	x['#value'] = form['#value'] ;

	return x;
}

/**
*  Recursive function - helper for treeFormatter
*
*/
formbuilder.UI.createTree = function(a) {
	var str = {};
	if(a.length > 0)  {
		for (var i = 0; i < a.length ; i++) {
			
			//Code to reframe the content; Dinesh
			for (formkey in form[a[i].id]) {
				if (formkey == "#type" && (form[a[i].id][formkey] == "checkboxes" || form[a[i].id][formkey] == "submit")) {
					form[a[i].id] = reframeContent (form[a[i].id]);
				}
			}//Ends Here
			
			if(a[i].id != 'sortHelper' ) {
				z = formbuilder.UI.createTree($("#"+a[i].id).children('.formbuilder_formRow'));
				if(typeof(z) != 'undefined' && !z){
					str[a[i].id] = z;
					for(j in form[a[i].id]) {
						str[a[i].id][j] = form[a[i].id][j];
					}
				}
				else {
					str[a[i].id] = form[a[i].id]
					for(j in form[a[i].id]) {
						str[a[i].id][j] = form[a[i].id][j];
					}
				}
			}
		}
		return str;
	}
}

/* Code to reframe the array of values for checkboxes and submit button */
function reframeContent (formattr) {
	for (key in formattr) {
		var attrtype = typeof formattr[key]; //Get the type of the value
		if (attrtype != 'object') {
			if (key == "#default_value") {
				formattr[key] = getObjectfromString(formattr[key]);
			}
			else if (key == "#submit") {
				delete formattr[key];
			}
			else {
				formattr[key] = formattr[key];
			}	
		}
	}

	//return the reframed array of values for checkbox and submit button
	return formattr;
}

/* Function to convert the string into an object */
function getObjectfromString(str){
	newObj = new Object();
	newObj.key = str;
	
	return newObj;
}

/**
* @name:        createFormbuilderUI()
* @description: Create the main UI for creating forms
* @params:      none
* Note: Returns false when a form was fund in the memory and user wanted to keep it there.
*        returns true otherwise.
*/
formbuilder.UI.createFormbuilderUI = function() {
	//Get the argument to apply in the back url
	if ($("#hidden_argument")) {
		var arg = $("#hidden_argument").val();
	}
	else if ($("#edit_hidden_argument")) {
		var arg = $("#edit_hidden_argument").val();
	}//ends here
	
	$('#formbuilder_introduction').hide();
	$('#formbuilder_displayPane').hide();
	$('#formbuilder_mainMenu1').hide();
	//$('.formbuilder_tooltipClass').hide();
	///govind if (itemCount == 0 ||  ( itemCount != 0 && confirm('There is already a form in the memory. Press OK to erase it and Cancel to continue from previous Form?'))) {
	//Form Menu

	varHtml = '';
	varHtml+='		<table>'+"\n";
	varHtml+='			<tr>'+"\n";
	varHtml+='				<td>&nbsp;</td>'+"\n";
	varHtml+='				<td>'+"\n";
	varHtml+='					<div id="formbuilder_mainMenu2">'+"\n";
	varHtml+='						<a href="'+homeurl+'admin/settings/formbuilder/'+arg+'" class="formbuilder_link" ocnclick="$(\'#formbuilder_wrapper\').fadeOut();$(\'#formbuilder_mainMenu1\').show();formbuilder.forms.manageForms();">Back</a>'+"\n";
	varHtml+='						<span>|</span>'+"\n";
	varHtml+='						<a href="#" class="formbuilder_link"  onclick="formbuilder.forms.send()">Save</a>'+"\n";
	varHtml+='						<span>|</span>'+"\n";
	varHtml+='						<a href="#" class="formbuilder_link" onclick="formbuilder.forms.showFormProperties()">Form Properties</a>'+"\n";
	varHtml+='					</div>'+"\n";
	varHtml+='				</td>'+"\n";
	varHtml+='				<td>&nbsp;</td>'+"\n";
	varHtml+='			</tr>'+"\n";
	varHtml+='			<tr>'+"\n";
	varHtml+='				<td class="formbuilder_columnHead">Components</td>'+"\n";
	varHtml+='				<td>'+"\n";
	varHtml+='					<div class="formbuilder_centered">'+"\n";
	varHtml+='						<span class="formbuilderTab" onclick="formbuilder.UI.showTab(\'editing\')">Editing</span>'+"\n";
	//varHtml+='						<span class="formbuilderTab" onclick="formbuilder.UI.showTab(\'phpCode\')">PHP code</span>'+"\n";
	varHtml+='						<span class="formbuilderTab" onclick="formbuilder.UI.showTab(\'htmlPrev\')">HTML Preview</span>'+"\n";
	varHtml+='					</div>'+"\n";
	varHtml+='				</td>'+"\n";
	varHtml+='				<td class="formbuilder_columnHead"> Properties</td>'+"\n";
	varHtml+='			</tr>'+"\n";
	varHtml+='			<tr>'+"\n";
	varHtml+='				<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>'+"\n";
	varHtml+='			</tr>'+"\n";
	varHtml+='			<tr>'+"\n";
	varHtml+='				<td id="formbuilder_buttons" class="formbuilder_columnSide">'+"\n";
	varHtml+='					<div id="formbuilder_leftCol"></div>'+"\n";
	varHtml+='				</td>'+"\n";
	varHtml+='				<td id="formbuilder_preview">';
	varHtml+='					<ul id="editingTab" class="formbuilder_sortable"></ul>'+"\n";
  varHtml+='					<div id="phpCodeTab"></div><div id="htmlTab"></div>'+"\n";
	varHtml+='				</td>'+"\n";
	varHtml+='				<td id="formbuilder_properties" class="formbuilder_columnSide">'+"\n";
	varHtml+='					<div>'+"\n";
	varHtml+='						<p> Form Properties: </p>'+"\n";
	varHtml+='						<table>'+"\n";
	varHtml+='							<tr>'+"\n";
	varHtml+='								<td>Form Name: </td>'+"\n"; //Form ID has been renamed as Form Name
	varHtml+='								<td><input type="text" name="formId" id="formId" size="10" value="'+form['#id']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'id\');" /></td>'+"\n";
	varHtml+='							</tr>'+"\n";
	varHtml+='							<tr>'+"\n";
	varHtml+='								<td>Prefix: </td>'+"\n";
	varHtml+='								<td><input type="text" name="formPrefix" id="formPrefix" size="10" value="'+form['#prefix']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'prefix\');" /></td>'+"\n";
	varHtml+='							</tr>'+"\n";
	varHtml+='							<tr>'+"\n";
	varHtml+='								<td>Suffix: </td>'+"\n";
	varHtml+='								<td><input type="text" name="formSuffix" id="formSuffix" size="10" value="'+form['#suffix']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'suffix\');" /></td>'+"\n";
	varHtml+='							</tr>'+"\n";
	varHtml+='							<tr>'+"\n";
	varHtml+='								<td>Method: </td>'+"\n";
	varHtml+='								<td><input type="text" name="formMethod" id="formMethod" size="10" value="'+form['#method']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'method\');" /></td>'+"\n";
	varHtml+='							</tr>'+"\n";
	varHtml+='							<tr>'+"\n";
	varHtml+='								<td>Value: </td>'+"\n";
	varHtml+='								<td><input type="text" name="formValue" id="formValue" size="10" value="'+form['#value']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'value\');" /></td>'+"\n";
	varHtml+='							</tr>'+"\n";
	varHtml+='							<tr>'+"\n";
	varHtml+='								<td>Action: </td>'+"\n";
	varHtml+='								<td><input type="text" name="formAction" id="formAction" size="10" value="'+form['#action']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'action\');" /></td>'+"\n";
	varHtml+='							</tr>'+"\n";
	varHtml+='						</table>'+"\n";
	varHtml+='						<p><br />Add some elements to the form and then click on an element to modify the properties. </p>'+"\n";
	varHtml+='					</div>'+"\n";
	varHtml+='				</td>'+"\n";
	varHtml+='			</tr>'+"\n";
	varHtml+='			<tr>'+"\n";
	varHtml+='				<td>&nbsp;</td>'+"\n";
	varHtml+='				<td>&nbsp;</td>'+"\n";
	varHtml+='				<td>&nbsp;</td>'+"\n";
	varHtml+='			</tr>'+"\n";
	varHtml+='		</table>'+"\n";

	$('#formbuilder_wrapper').html(varHtml).fadeIn();
	formbuilder.forms.initializeForm();
	formbuilder.UI.addComponents();
	return true;
	///govind }
	///govind else {
	///govind $('#formbuilder_wrapper').fadeIn();
	///govind return false;
	///govind }
}

/**
* @name:        showTab()
* @description: Show a particular tab.
* @params:      type: tab to be shown.
*/
formbuilder.UI.showTab = function(type) {
	if (type == 'editing') {
		$('#editingTab').show();
		$('#htmlTab').hide();
		$('#phpCodeTab').hide();
		return;
	}
	$('#editingTab').hide();
	$('#htmlTab').hide();
	$('#phpCodeTab').hide();

	if (type == 'htmlPrev')	{
		$('#htmlTab').show();
	}
	else {
		$('#phpCodeTab').show();
	}

	$('#formbuilder_loadingAnimation').show();
	$.post("?q=formbuilder/views",{
		"action" : type,
		"form"   : s.object(formbuilder.UI.treeFormatter()),
		"rand" : Math.random()
	},function(xml){
		$('#formbuilder_loadingAnimation').hide();
		if ($('#htmlTab').is(':visible')) {
			$('#htmlTab').html(xml);
		}
		else {
			$('#phpCodeTab').html(xml);
		}
	});
}


//Class to manipulate forms
formbuilder.forms = function() {};

formbuilder.forms.changeclass = function(obj) {
  obj.className='formbuilderButtonhover';
}

formbuilder.forms.changeDefaultclass = function(obj) {
  obj.className='formbuilderButton';
}
/**
* @name:        getElementCode(itemId)
* @description: return the basic code for an element
* @params:      itemId: id of the element to be created
*/
formbuilder.forms.getElementCode = function(itemId, itemType, itemName, dontDelete) {
  //if (itemName == '')itemName = 'Title';
  var varUl = '';
  varUl+= '<ul class="formbuilder_formRow" id="'+itemId+'" onmousedown="formbuilder.forms.addItem(\'tempul\',\''+itemId+'\',true,false)" >';
  //varUl+= '   <div class="movehandle">&nbsp;</div>';
  if(dontDelete == true) {
	  varUl+= '   <span class="" id="close'+itemId+'" title="Remove" onclick="formbuilder.forms.removeItem(\''+itemId+'\')" ></span>';
  } else {
	  varUl+= '   <span class="formbuilder_close" id="close'+itemId+'" title="Remove" onclick="formbuilder.forms.removeItem(\''+itemId+'\')" >X</span>';
  }
  
  //Set Default itemtype as Label
  if (itemName == "label") {
	  itemType = "Label";
  }
  varUl+= '   <span>'+itemName+' : '+itemId+' ('+itemType+') </span>';
  varUl+= '</ul>';

	return varUl;
}

/**
* @name:        addItem(itemType)
* @description: When a particular button is pressed, this function adds
*               the corresponding widgets to the preview column.
* @params:      i (refers to the type from the component array)
*               itemId (refers to the id of the item to be added(also the element's name))
*               existingItem (if item exists in the form array then we do not create it.)
*               parentItem (if item exists in the form array then we do not create it.)
*/
formbuilder.forms.addItem = function(i, itemId, existingItem, parentItem) {

	/*  if(!formbuilder.properties[i]) {
	//alert(i)
	// this type is not suppoted in simple mode. Exit.
	return false;
	}
	*/
	if (!existingItem) {
		form[itemId] = new formbuilder.clone(formbuilder.properties[i]);
	}

	if (i == 'tempul') {
    var varUl = '';
    varUl+= '<ul class="formbuilder_formRow" id="tempul" onmousedown="formbuilder.forms.addItem(\'tempul\',\'tempul\',false,false)" >';
    //varUl+= '   <span class="movehandle">&nbsp;</span>';
    varUl+= '   <span class="formbuilder_close" id="closetempul" alt="Close"> X </span>';
    varUl+= '   <span> tempul : tempul (tempul) </span>';
    varUl+= '</ul>';
		itemCount++;
		$("#editingTab").append(varUl);
		formbuilder.forms.removeItem('tempul');
		itemCount--;

		$(".formbuilder_formRow").removeClass("formbuilder_outline");
		$('#'+itemId).addClass("formbuilder_outline");
		formbuilder.forms.showProperties(itemId);
		formbuilder.UI.createSortables();
		formbuilder.forms.putWeights();
		return itemId;
	}
	else {
		//alert('why');
		var code = formbuilder.forms.getElementCode(itemId, i, form[itemId]['#title'], form[itemId]['#dontdelete']); //JJ dontdelete

		if(!parentItem) {
			$("#editingTab").append(code);
		}
		else {
			$("#"+parentItem).append(code);
		}

		$("#close"+itemId).click(function() {
			formbuilder.forms.removeItem( (this.id).substring(5));
		});

		$("#"+itemId).click(function() {
			$(".formbuilder_formRow").removeClass("formbuilder_outline");
			$(this).addClass("formbuilder_outline");
			formbuilder.forms.showProperties(this.id);
			return false;
		});

		formbuilder.UI.createSortables();
		formbuilder.forms.putWeights();
		itemCount++;

		$(".formbuilder_formRow").removeClass("formbuilder_outline");
		$('#'+itemId).addClass("formbuilder_outline");

		formbuilder.forms.showProperties(itemId);
		return itemId;
	}
}


/**
* @name:        removeItem(item)
* @description: Removes the item from the form array. The corresponding
*               part from the preview column has already been deleted
*               before this function was called. Adjust third column
*               accordingly
* @params:      item: The item to be removed.
*/
formbuilder.forms.removeItem = function(formItem) {
	/*if (formItem == 'test') {
		return form;
	}
	else{*/
	var strs = $('#' + formItem)[0];
	//if ( strs == 'undefined') {
		if (jQuery.className.has($('#' + formItem)[0],'formbuilder_outline')) {
			formbuilder.forms.showFormProperties();
		}
		$('#' + formItem).remove();
		formbuilder.UI.createSortables();
		//Remove the details from the JS $form array
		delete form[formItem];
	//}
 // }
}


/**
* @name:        updateFormProperty(newId)
* @description: Update the form properties
* @params:      value: the new form property.
*               prop: the name of the property
*/
formbuilder.forms.updateFormProperty = function(value, prop) {
	switch (prop) {
		case "id":
			form['#id'] = value;
		break;
		case "prefix":
			form['#prefix'] = value;
		break;
		case "suffix":
			form['#suffix'] = value;
		break;
		case "method":
			form['#method'] = value;
		break;
		case "action":
			form['#action'] = value;
		break;
		case "value":
			form['#value'] = value;
		break;
	}
}

/**
* @name:        showFormProperties(newId)
* @description: Show a form to edit the form properties in 3rd column.
* @params:      none
*/
formbuilder.forms.showFormProperties = function() { //Form ID has been renamed as Form Name
	var code = '<p> Form Properties: </p><table><tr><td>Form Name: </td><td><input type="text" name="formId" id="formId" size="10" value="'+form['#id']+'" onchange="formbuilder.forms.updateFormProperty(this.value,\'id\');" /></td></tr><tr><td>Prefix: </td><td><input type="text" name="formPrefix" id="formPrefix" size="10" value="'+form['#prefix']+'" onchange="formbuilder.forms.updateFormProperty(this.value,\'prefix\');" /></td></tr><tr><td>Suffix: </td><td><input type="text" name="formSuffix" id="formSuffix" size="10" value="'+form['#suffix']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'suffix\');" /></td></tr><tr><td>Method: </td><td><input type="text" name="formMethod" id="formMethod" size="10" value="'+form['#method']+'" onchange="formbuilder.forms.updateFormProperty(this.value,\'method\');" /></td></tr><tr><td>Value: </td><td><input type="text" name="formValue" id="formValue" size="10" value="'+form['#value']+'" onchange="formbuilder.forms.updateFormProperty(this.value,\'value\');" /></td></tr><tr><td>Action: </td><td><input type="text" name="formAction" id="formAction" size="10" value="'+form['#action']+'" onchange="formbuilder.forms.updateFormProperty(this.value,\'action\');" /></td></tr></table> <p><br />Add some elements to the form and then click on an element to modify the properties. </p>';
	$("#formbuilder_properties").html(code);
	$(".formbuilder_formRow").removeClass("formbuilder_outline");
}

/* Function to get the object value */
function getObjectValue (obj) {
	for (objkey in obj) {
		var newval = obj[objkey];
	}
	return newval;
}

/**
* @name:        showProperties(item)
* @description: Creates the third column for the selected form item. It
*               uses the keys in the Form array to show the properties.
* @params:      item: The item whose properties are to be displayed.
*/
formbuilder.forms.showProperties = function(formItem) {
	//Function call to load the hint for the element
	var hint = components_description_hint(form[formItem]['#type']);
	
	// Everything is displayed in a table.
	var code = '<form name="formProperties" id="formProperties"><table>';
	
	//code to display the hint for the selected element
	code += '<tr class="formbuilder_propertyRow"><td  title="Shows the hint for each selected element" class="formbuilder_propertyCell_hint" colspan="2" style="font-size:11px;">'+hint+'</td></tr>';

	//Display The element Type. Changing it is not supported for now.
	if (typeof(form[formItem]['#label']) == 'undefined') {
		code += '<tr class="formbuilder_propertyRow"><td  title="Shows the type of element that is selected." class="formbuilder_propertyCell">Element Type: </td><td>'+ form[formItem]['#type']+'</td></tr>';
	} 

	code += '<tr class="formbuilder_propertyRow"><td  title="Internal name for the element. Do not change it if you do not know what it is."  class="formbuilder_propertyCell"><label>Name: </label></td><td><input type="text" name="formbuilderName" size="10" value="'+formItem+'" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\'#formbuilderName\', 3)" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#formbuilderNameSync\', 3)" /></td></tr>';

	if(typeof(form[formItem]['#title']) != 'undefined' ){
		if (form[formItem]['#title'] == 'label') {
			code += '<input type="hidden" name="title" value="'+form[formItem]['#title']+'" />';
		} 
		else {
			code += '<tr><td  title="The label shown alongside/before the element" class="formbuilder_propertyCell" >Title: </td><td><input type="text" name="title" size="10" value="'+form[formItem]['#title']+'" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#title\', 3)" /></td></tr>';
		}
	}

	if(typeof(form[formItem]['#description']) != 'undefined' ){
		code += '<tr><td  title="A small description just below the element." class="formbuilder_propertyCell" >Description: </td><td><textarea name="description" cols=9 rows=5 onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#description\', 3)">'+form[formItem]['#description']+'</textarea></td></tr>';
	}

	if(typeof(form[formItem]['#collapsible']) != 'undefined' ){
		code += '<tr><td  title="Should the fieldset be collapsible? Works if you provide a title."  class="formbuilder_propertyCell">Collapsible: </td><td><input type="checkbox" name="collapsible" size="5" onclick="formbuilder.forms.synchronize(\''+formItem+'\',\'#collapsible\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#maxlength']) != 'undefined' ){
		code += '<tr><td title="Maximum length of the entered data.">Max. Length: </td><td><input type="text" name="maxlength" size="5" value="'+form[formItem]['#maxlength']+'" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\', \'#maxlength\' , 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#size']) != 'undefined' ){
		code += '<tr><td  title="Size of the input box as shown on screen." class="formbuilder_propertyCell">Size: </td><td><input type="text" name="size" size="5"  value="'+form[formItem]['#size']+'" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#size\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#autocomplete_path']) != 'undefined' ){
		code += '<tr><td  title="The path the AJAX autocomplete script uses as the source for autocompletion."  class="formbuilder_propertyCell">Autocomplete: </td><td><input type="checkbox" name="autocomplete_path" size="5" onclick="formbuilder.forms.synchronize(\''+formItem+'\',\'#autocomplete_path\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#default_value']) != 'undefined' ){
		//Added to check whether the default value for checkbox is an object.
		if (form[formItem]['#type'] == "checkboxes" && typeof form[formItem]['#default_value'] == 'object') {
			var objvalue = getObjectValue(form[formItem]['#default_value']);
		} else {
			var objvalue = form[formItem]['#default_value'];
		}
		code += '<tr><td  title="The initial value of this input element." class="formbuilder_propertyCell">Default: </td><td><input type="text" name="default_value"  value="'+objvalue+'" size="10" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#default_value\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#cols']) != 'undefined' )	{
		code += '<tr><td  class="formbuilder_propertyCell">Columns: </td><td><input type="text" name="cols"  value="'+form[formItem]["#cols"]+'" size="5" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#cols\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#rows']) != 'undefined' )	{
		code += '<tr><td  class="formbuilder_propertyCell">Rows: </td><td><input type="text" name="rows" size="5"  value="'+form[formItem]["#rows"]+'" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#rows\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#options']) != 'undefined' )	{
		if (form[formItem]['#type'] == 'radios'  ) {
			code += '<tr><td  class="formbuilder_propertyCell">Options: </td>';
			code += '<td><img onclick="formbuilder.forms.less()" src="'+formbuilder.basePath+'/images/formElements/decrProp.jpg"  alt="Less"  />&nbsp;<img onclick="formbuilder.forms.more(\'radios\', \''+formItem+'\')" src="'+formbuilder.basePath+'/images/formElements/incrProp.jpg" alt="More" /></td></tr>';
			var j=0;
			for (i in  form[formItem]['#options']) {
				code += '<tr class="optionProp"><td><input type="hidden" name="key'+j+'" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#options\', 3)" value="'+form[formItem]['#options'][i]+'" size="10" /></td><td><input type="text" name="option'+j+'" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#options\', 3)" value="'+ form[formItem]['#options'][i]+'" size="10" /></td></tr>';
				j++;
			}
		}
		else if (form[formItem]['#type'] == 'select' || form[formItem]['#type'] == 'checkboxes') {
			code += '<tr><td  class="formbuilder_propertyCell"><label>Options: </label></td><td><img onclick="formbuilder.forms.less()" src="'+formbuilder.basePath+'/images/formElements/decrProp.jpg" alt="Less" /><img onclick="formbuilder.forms.more(\'select\', \''+formItem+'\')" src="'+formbuilder.basePath+'/images/formElements/incrProp.jpg"  alt="More" /></td></tr>';
			var j=0;
			for (i in  form[formItem]['#options']) {
				code += '<tr class="optionProp"><td><input type="hidden" name="key'+j+'" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#options\', 3)" value="'+form[formItem]['#options'][i]+'" size="10" /></td><td><input type="text" name="option'+j+'" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#options\', 3)" value="'+form[formItem]['#options'][i]+'" size="10" /></td></tr>';
				j++;
			}
		}
	}

	if(typeof(form[formItem]['#button_type']) != 'undefined' )	{
		code += '<tr><td  class="formbuilder_propertyCell">Button type:</td><td><input type="text" name="button_type" size="10"  value="'+form[formItem]['#button_type']+'" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#button_type\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#value']) != 'undefined' ) {
		code += '<tr><td  class="formbuilder_propertyCell">Value: </td><td><input type="text" name="value" size="10"  value="'+form[formItem]['#value']+'" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#value\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#submit']) != 'undefined' )	{
		code += '<tr><td  class="formbuilder_propertyCell">Submit: </td><td><input type="checkbox" name="submit" onclick="formbuilder.forms.synchronize(\''+formItem+'\',\'#submit\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#multiple']) != 'undefined' )	{
		code += '<tr><td  class="formbuilder_propertyCell">Multiple: </td><td><input type="checkbox" name="multiple" ' + (form[formItem]['#multiple']?'checked="checked"':'') + ' onclick="formbuilder.forms.synchronize(\''+formItem+'\',\'#multiple\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#required']) != 'undefined' )	{
		code += '<tr><td  class="formbuilder_propertyCell">Required: </td><td><input type="checkbox" name="required" ' + (form[formItem]['#required']?'checked="checked"':'') + ' onclick="formbuilder.forms.synchronize(\''+formItem+'\',\'#required\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#encryption']) != 'undefined'  && form[formItem]['#type'] != "password")	{
		code += '<tr><td  class="formbuilder_propertyCell">Encryption: </td><td><input type="checkbox" name="encryption" ' + (form[formItem]['#encryption']?'checked="checked"':'') + ' onclick="formbuilder.forms.synchronize(\''+formItem+'\',\'#encryption\', 3)" /></td></tr>';
	}
	else if (typeof(form[formItem]['#type']) != 'undefined'  && form[formItem]['#type'] == "password") {
		code += '<tr><td  class="formbuilder_propertyCell">Encryption: </td><td><input type="checkbox" name="encryption" onclick="formbuilder.forms.synchronize(\''+formItem+'\',\'#encryption\', 3)" checked="checked" disabled="disabled" /></td></tr>';
	}
	if(typeof(form[formItem]['#dontshow']) != 'undefined' )	{
		if (form[formItem]['#type'] != "date" && form[formItem]['#type'] != "password" && form[formItem]['#type'] != "file" && form[formItem]['#type'] != "button" && form[formItem]['#type'] != "submit") {
			code += '<tr><td  class="formbuilder_propertyCell">Dont Show: </td><td><input type="checkbox" name="dontshow" ' + (form[formItem]['#dontshow']?'checked="checked"':'') + ' onclick="formbuilder.forms.synchronize(\''+formItem+'\',\'#dontshow\', 3)" /></td></tr>';
		}
	}
	if(typeof(form[formItem]['#validations']) != 'undefined' )	{
		if (form[formItem]['#type'] != "date" && form[formItem]['#type'] != "password" && form[formItem]['#type'] != "file" && form[formItem]['#type'] != "button" && form[formItem]['#type'] != "submit") {
			code += '<tr><td  class="formbuilder_propertyCell" valign="top">Validation: </td><td><input type="radio" name="validations" ' + ((form[formItem]['#validations'] == "is_none")?'checked="checked"':'checked="checked"') + ' onclick="formbuilder.forms.synchronize(\''+formItem+'\',\'#validations\', 3)" value="is_none" /> None<br /><input type="radio" name="validations" ' + ((form[formItem]['#validations'] == "is_numeric")?'checked="checked"':'') + ' onclick="formbuilder.forms.synchronize(\''+formItem+'\',\'#validations\', 3)" value="is_numeric" /> Numeric<br /><input type="radio" name="validations" ' + ((form[formItem]['#validations'] == "ctype_alnum")?'checked="checked"':'') + ' onclick="formbuilder.forms.synchronize(\''+formItem+'\',\'#validations\', 3)" value="ctype_alnum" /> Alphanumeric</td></tr>';
		}
	}
	//Display Advance options in middle.
	code += '<tr class="formbuilder_propertyRow"><td colspan=\'2\' height=\'20\'></td></tr>';
	code += '<tr class="formbuilder_propertyRow"><td colspan=\'2\'><b>Advanced Options:</b></td></tr>';
	code += '<tr class="formbuilder_propertyRow"><td colspan=\'2\' height=\'5\'></td></tr>';

	if(typeof(form[formItem]['#attributes']) != 'undefined' )	{
		code += '<tr><td  class="formbuilder_propertyCell">Attributes: </td><td><img onclick="formbuilder.forms.removeProp(\'attributes\'); formbuilder.forms.synchronize(\''+formItem+'\',\'#attributes\', 3)" src="'+formbuilder.basePath+'/images/formElements/decrProp.jpg" /><img onclick="formbuilder.forms.addProp(\'attributes\'); formbuilder.forms.synchronize(\''+formItem+'\',\'#attributes\', 3)" src="'+formbuilder.basePath+'/images/formElements/incrProp.jpg" /></td></tr>';
		var val = form[formItem]['#attributes'];
		for (var i  in val) {
      if (val[i] != '[object Object]') {
  			code += '<tr class="attributes">';
        code += '  <td><input type="text"  class="attributes_key" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#attributes\', 3)" value="'+i+'" size="10" /></td>';
        code += '  <td><input type="text" class="attributes_option" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#attributes\', 3)" value="'+val[i]+'" size="10" /></td>';
        code += '</tr>';
      }
		}
		code += '<tr class="attributes"><td><input type="text" class="attributes_key" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#attributes\', 3)" value="" size="10" /></td><td><input type="text"  class="attributes_option" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#attributes\', 3)" value="" size="10" /></td></tr>';
	}
	

	if(typeof(form[formItem]['#prefix']) != 'undefined' )	{
		code += '<tr><td  class="formbuilder_propertyCell">Prefix: </td><td><input type="textfield" name="prefix" size="10" value="'+form[formItem]['#prefix']+'"  onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#prefix\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#suffix']) != 'undefined' )	{
		code += '<tr><td  class="formbuilder_propertyCell">Suffix: </td><td><input type="textfield" name="suffix" size="10" value="'+form[formItem]['#suffix']+'"  onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#suffix\', 3)" /></td></tr>';
	}

	if(typeof(form[formItem]['#after_build']) != 'undefined' )  {
		code += '<tr><td  class="formbuilder_propertyCell"><label>After_build: </label></td><td><img onclick="formbuilder.forms.removeProp(\'after_build\'); formbuilder.forms.synchronize(\''+formItem+'\',\'#after_build\', 3)" src="'+formbuilder.basePath+'/images/formElements/decrProp.jpg" />&nbsp;<img onclick="formbuilder.forms.addProp(\'after_build\'); formbuilder.forms.synchronize(\''+formItem+'\',\'#after_build\', 3)" src="'+formbuilder.basePath+'/images/formElements/incrProp.jpg" /></td></tr>';
		var val = form[formItem]['#after_build'];
		for (var i in val) {
			code += '<tr class="after_build"><td>&nbsp;</td><td><input type="text" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#after_build\', 3)" value="'+i+'" size="10" /></td></tr>';
		}
		code += '<tr class="after_build"><td>&nbsp;</td><td><input type="text" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#after_build\', 3)" value="" size="10" /></td></tr>';
	}
	code += "</table></form>";
	$("#formbuilder_properties").html(code);
}

/**
*  Used for removing last attribute from a DOM widget.
*  Remove if attribute or after_build property is not shown in properties column.
*/
formbuilder.forms.removeProp = function(property) {
	if ($('.'+property).length == 1) {
		$('.'+property+':last').find('input').val(' ');
	}
	else {
		$('.'+property+':last').remove();
	}
}

/**
*  Used for adding extra attributes from a DOM widget.
*  Remove if attribute or after_build property is not shown in properties column.
*/
formbuilder.forms.addProp = function(property) {
	$('.'+property+':last').after('<tr class="'+property+'">' + $('.'+property+':last').html() + '</tr>');
}


/**
* @name:      synchronize(formItem, key, source)
* @description:   Function used to synchronize the three "data pools"
*         namely: DOM Form, JS form Object and properties field.
* @params:
*   formItem: the form widget that is being synchronized
*   element:  the elementof the widget that is being synchronized
*   source:   1 => js form object, 2 => DOM form, 3 => properties
*
* Note: Only title uses the source = 2, source = 1 is used when you are
*     editing an already created form.
*/
formbuilder.forms.synchronize = function(formItem, key, source) {
	switch (key) {
		case '#maxlength':
			form[formItem][key] = $('#formProperties')[0].maxlength.value;
		break;
		case '#title':
			form[formItem][key] = $('#formProperties')[0].title.value;
			$('.formbuilder_outline').find('span')[1].innerHTML = form[formItem][key] + ' : ' + formItem + ' ('+ form[formItem]['#type'] + ')';
		break;
		case '#formbuilderName': {
			var newId = $('#formProperties')[0].formbuilderName.value;
			//check the name field has empty
			if ($.trim(newId) == "") {
				alert("Name cannot be empty");
				return false;
			}
			form[newId] = form[formItem];
			delete form[formItem];

			//Method to modify the element id
			formbuilder.forms.syncElementId(formItem, newId);
			
			//check for the label type
			if (typeof(form[newId]['#type']) == "undefined") {
				form[newId]['#type'] = "Label";
			}

			$('.formbuilder_outline').find('span')[0].id = 'close' + newId;
			$('.formbuilder_outline').find('span')[1].innerHTML = form[newId]['#title'] + ' : ' + newId + ' ('+ form[newId]['#type'] + ')';
			$(".formbuilder_formRow").removeClass("formbuilder_outline");
			$('#'+newId).addClass("formbuilder_outline");
			
			formbuilder.UI.createSortables();
			formbuilder.forms.showProperties(newId);
		}
		break;
		case '#formbuilderNameSync' :
			var frm_builder_name = $('#formProperties')[0].formbuilderName.value;
		
			var innerhtml = $('.formbuilder_outline').find('span')[1].innerHTML;
			var split_colon = innerhtml.split(":");
			var fieldtype = split_colon[1].substring(split_colon[1].lastIndexOf("(")+1, split_colon[1].lastIndexOf(")"));
			$('.formbuilder_outline').find('span')[1].innerHTML = split_colon[0] + ' : ' + frm_builder_name + ' ('+ fieldtype + ')';/**/
			$('.formbuilder_outline').find('span')[0].id = 'close' + frm_builder_name;
			$("#close" + frm_builder_name).get(0).setAttribute("onclick", "formbuilder.forms.removeItem('"+frm_builder_name+"')");	
			$('.formbuilder_outline').get(0).setAttribute("onmousedown", "formbuilder.forms.addItem('tempul', '"+frm_builder_name+"', true, false)");	
			$('.formbuilder_outline').get(0).setAttribute("id", frm_builder_name);			
			form[frm_builder_name] = form[formItem];
		break;
		case '#size':
			form[formItem][key] = $('#formProperties')[0].size.value;
		break;
		case '#autocomplete_path':
			form[formItem][key] = ($('#formProperties')[0].autocomplete_path.checked == 1)? true : false;
		break;
		case '#collapsible':
			form[formItem][key] = ($('#formProperties')[0].collapsible.checked == 1)? true : false;
		break;
		case '#default_value':
			form[formItem][key] = $('#formProperties')[0].default_value.value;
		break;
		case '#description':
			form[formItem][key] = $('#formProperties')[0].description.value;
		break;
		case '#required':
			form[formItem][key] = $('#formProperties')[0].required.checked
		break;
		case '#encryption':
			form[formItem][key] = $('#formProperties')[0].encryption.checked
		break;
		case '#dontshow':
			form[formItem][key] = $('#formProperties')[0].dontshow.checked
		break;
		case '#validations':
			var radioLength = $('#formProperties')[0].validations.length;
			for(var i = 0; i < radioLength; i++) {
				if($('#formProperties')[0].validations[i].checked) {
					form[formItem][key] = $('#formProperties')[0].validations[i].value;
				}
			}
		break;
		case '#multiple':
			if (form[formItem][key] = $('#formProperties')[0].multiple.checked) {
				form[formItem]['#size'] = 2;
				$('#formProperties')[0].size.value = 2;
			}
			else {
				form[formItem]['#size'] = 1;
				$('#formProperties')[0].size.value = 1;
			}
			break;
		case '#cols':
			form[formItem][key] = $('#formProperties')[0].cols.value;
		break;
		case '#rows':
			form[formItem][key] = $('#formProperties')[0].rows.value;
		break;
		case '#options':
			if (source == 3) {
				var value = {};
				if (form[formItem]['#type'] == 'radios') {
					var temp_radio = $('input').parents('.optionProp').size();
					for (var i = 0 ; i< temp_radio ;i++) {
						$('#formProperties')[0]['key'+i].value = $('#formProperties')[0]['option'+i].value;
						value[$('#formProperties')[0]['key'+i].value] =  $('#formProperties')[0]['option'+i].value;
						//value[i] = $('#formProperties')[0]['option'+i].value ;
					}
				}
				else if (form[formItem]['#type'] == 'checkboxes') {
					var temp_check = $('input').parents('.optionProp').size();
					for (var j = 0 ; j< temp_check ;j++) {
						$('#formProperties')[0]['key'+j].value = $('#formProperties')[0]['option'+j].value;
						value[$('#formProperties')[0]['key'+j].value] =  $('#formProperties')[0]['option'+j].value;
						//value[j] =  $('#formProperties')[0]['option'+j].value;
					}
				}
				else if (form[formItem]['#type'] == 'select') {
					var temp_select = $('input').parents('.optionProp').size();
					for (var k = 0 ; k< temp_select ;k++) {
						$('#formProperties')[0]['key'+k].value = $('#formProperties')[0]['option'+k].value;
						value[ $('#formProperties')[0]['key'+k].value] = $('#formProperties')[0]['option'+k].value ;
						//value[k] = $('#formProperties')[0]['option'+k].value ;
					}
				}
				form[formItem][key] = value;
			}
		break;
		case '#prefix'://replace the double quotes with single quote and synchronize
			$('#formProperties')[0].prefix.value = ($('#formProperties')[0].prefix.value).replace(/\"/g, "'");
			form[formItem][key] = $('#formProperties')[0].prefix.value;
		break;
		case '#suffix':
			form[formItem][key] = $('#formProperties')[0].suffix.value;
		break;
		case '#button_type':
			form[formItem][key] = $('#formProperties')[0].button_type.value;
		break;
		case '#value':
			form[formItem][key] = $('#formProperties')[0].value.value;
		break;
		case '#attributes':
			form[formItem][key] = {};
			var temp1 = $('input').parents('.attributes').size();
			var val = [' ',' '];
			var j =0;
			for (var i = 0 ; i< temp1 ;i++) {
				val[0] = $('.attributes_key')[i].value.replace(/^\s*|\s*$/g,"");
				val[1] = $('.attributes_option')[i].value.replace(/^\s*|\s*$/g,"");
				if (val[0] != '' && val[1] != '' && typeof val[1] != "undefined" && typeof val[0] != "undefined"  ) {
					form[formItem][key][val[0]] = val[1];
				}
			}
		break;
		case '#after_build':
			form[formItem][key] = [];
			var temp1 = $('input').parents('.after_build').size();
			var j =0;
			var val;
			for (var i = 0 ; i< temp1 ;i++) {
				val =  $('.after_build').find('input')[i].value.replace(/^\s*|\s*$/g,"")
				if (val != '') form[formItem][key][j++] =  val ;
			}
		break;
	}
}

/**
* @name:        syncElementId()
* @description: Replace control id.
* @params:      id: actual conrol id.
*				 newId: Id to be replaced.
*/
formbuilder.forms.syncElementId = function(id, newId){
	var x = $('#editingTab').children('.formbuilder_formRow');
	if(x && x.length > 0){
		for (var i = 0; i < x.length ; i++){
			if(x[i].id == id ){
				x[i].id = newId;
				return true;
			}
		}
	}
	return false;
}

/**
* @name:        less()
* @description: Removes the last option/radiobutton/checkbox from the
*               currently selected formtem.
* @params:      none
*/
formbuilder.forms.less = function() {
	if($('input').parents('.optionProp').size() > 1) {
	 $('.optionProp:last',$('#formProperties')[0]).remove();
	} else {
		alert('Minimum one of the Option is mandatory');
	}
	$('.formbuilder_outline').find('label:last').remove();
	formbuilder.forms.synchronize($('.formbuilder_outline').get(0).id,'#options',3);
}

/**
* @name:        more(widget)
* @description: Adds more options/radiobuttons/checkboxes to the
*               currently selected widget
* @params:      widget: the widget to which option/radiobutton/checkbox
*               is added.
*/
formbuilder.forms.more = function(widget, formItem) {
	if (widget == "after_build") {}
	else if (widget == 'radios' || widget == 'checkboxes') {
		var prev = $('input').parents('.optionProp').size()-1;
		var value = "Option " + (prev + 2);
		//$('.optionProp:last',$('#formProperties')[0]).after('<tr class="optionProp"><td>&nbsp;</td><td><input type="text" name="'+'option'+(prev+1)+'" value="'+$('#formProperties')[0]['option'+prev].value+'" size="10" /></td></tr>');
		$('.optionProp:last',$('#formProperties')[0]).after('<tr class="optionProp"><td><input type="hidden" name="key'+(prev+1)+'" value="'+value+'" size="10" /></td><td><input type="text" name="'+'option'+(prev+1)+'" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#options\', 3)" value="'+value+'" size="10" /></td></tr>');
		
		//$('#formProperties')[0]['option'+(prev+1)].onchange = $('#formProperties')[0]['option'+prev].onchange;
		$('.formbuilder_outline').find('br:last').after('<label>'+$('.formbuilder_outline').find('label:last').html()+'</label><br />');

		formbuilder.forms.synchronize($('.formbuilder_outline').get(0).id,'#options',3);
	}
	else {
		var prev = $('input').parents('.optionProp').size()-1;
		var value = "Option " + (prev + 2);
		//$('.optionProp:last',$('#formProperties')[0]).after('<tr class="optionProp"><td><input type="text" name="'+'key'+(prev+1)+'" value="'+$('#formProperties')[0]['key'+prev].value+'" size="10" /></td><td><input type="text" name="'+'option'+(prev+1)+'" value="'+$('#formProperties')[0]['option'+prev].value+'" size="10" /></td></tr>');
		$('.optionProp:last',$('#formProperties')[0]).after('<tr class="optionProp"><td><input type="hidden" name="'+'key'+(prev+1)+'" value="'+value+'" size="10" /></td><td><input type="text" name="'+'option'+(prev+1)+'" onkeyup="formbuilder.forms.synchronize(\''+formItem+'\',\'#options\', 3)" value="'+value+'" size="10" /></td></tr>');
		
		//$('#formProperties')[0]['option'+(prev+1)].onchange = $('#formProperties')[0]['option'+prev].onchange;
		//$('#formProperties')[0]['key'+(prev+1)].onchange = $('#formProperties')[0]['key'+prev].onchange;

		formbuilder.forms.synchronize($('.formbuilder_outline').get(0).id,'#options',3);
	}
}

/**
	* @name:        clone(original)
	* @description: Clones the paramenter and adds to the calling object.
	* @params:      original: the object to be copied.
	*/
	formbuilder.clone  = function(original) {
		for (i in original) {
		if (typeof original[i] == 'object') {
			this[i] = new formbuilder.clone(original[i]);
		}
		else
			this[i] = original[i];
		}
	}
	var m = {
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"' : '\\"',
		'\\': '\\\\'
	},
	s = {
		array: function (x) {
			var a = ['['], b, f, i, l = x.length, v;
			for (i = 0; i < l; i += 1) {
				v = x[i];
				f = s[typeof v];
				if (f) {
					v = f(v);
					if (typeof v == 'string') {
						if (b) {
							a[a.length] = ',';
						}
						a[a.length] = v;
						b = true;
					}
				}
			}
			a[a.length] = ']';
			return a.join('');
		},
		'boolean': function (x) {
			return String(x);
		},
		'null': function (x) {
			return "null";
		},
		number: function (x) {
			return isFinite(x) ? String(x) : 'null';
		},
		object: function (x) {
			if (x) {
				if (x instanceof Array) {
					return s.array(x);
				}
				var a = ['{'], b, f, i, v;
				for (i in x) {
					v = x[i];
					f = s[typeof v];
					if (f) {
						v = f(v);
						if (typeof v == 'string') {
							if (b) {
								a[a.length] = ',';
							}
							a.push(s.string(i), ':', v);
							b = true;
						}
					}
				}
				a[a.length] = '}';
				return a.join('');
			}
			return 'null';
		},
		string: function (x) {
			if (/["\\\x00-\x1f]/.test(x)) {
				x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
					var c = m[b];
					if (c) {
						return c;
					}
					c = b.charCodeAt();
					return '\\u00' +
					Math.floor(c / 16).toString(16) +
					(c % 16).toString(16);
				});
			}
			return '"' + x + '"';
		}
	};

String.prototype.parseJSON = function () {
	try {
		return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(this.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + this + ')');
	} catch (e) {
		return false;
	}
};

/**
* @name:        createRequest()
* @description: Post a request to server to create a new form with non editable fields
*/
formbuilder.forms.createRequest = function() {
	$('#formbuilder_loadingAnimation').show();
	$.post("?q=formbuilder/action",{
		"action" : 'create',
		"module" : $("#hidden_argument").val(),
		"rand" : Math.random()
	},
	function(xml){  $('#formbuilder_loadingAnimation').hide(); formbuilder.forms.createForm(xml);});
}

/**
* @name:        editRequest()
* @description: Post a request to server to edit a already created form
* @params:      formid: the id of the form to be edited.
*/
formbuilder.forms.editRequest = function(formid) {
	$("#edit_hidden_form_id").val(formid); //Assign the value of the form being edited to the hidden field
	
	$('#formbuilder_loadingAnimation').show();
	$.post("?q=formbuilder/action",{
		"action" : 'edit',
		"formId" : formid,
		"rand" : Math.random()
	},
	function(xml){  $('#formbuilder_loadingAnimation').hide(); formbuilder.forms.createForm(xml);});
}

/**
* @name:        manageForms()
* @description: Show a screen to manage all the created forms
*                and post a request via AJAX to the server to download the list
*                of forms available if no argument is passed. (previously it was being
*                done in seperate fn)
* @params:      data: the details of the form ids coming from server via AJAX
*/
formbuilder.forms.manageForms = function(data) {
	
	if(data) {
		$('#formbuilder_loadingAnimation').hide();
		//var disp = eval(data);
		$('#formbuilder_displayPane').html(data).fadeIn();
		$('#formbuilder_displayPane').find('tr:odd').attr('class', 'row');
		$('#formbuilder_displayPane').find('tr:even').attr('class', 'rowAlt');
	}
	else {
		if ($('#formbuilder_displayPane').is(':visible')) {
			$('#formbuilder_displayPane').fadeOut();
		}
		else {
			$('#formbuilder_loadingAnimation').show();
			$.post("?q=formbuilder/list",{"rand" : Math.random()},formbuilder.forms.manageForms);
		}
	}
}

/**
* @name:        delete()
* @description: post a request via AJAX to the server to delete a form.
* @params:      formid: the id of the form to be deleted.
*/

formbuilder.forms.deleteForm = function(formid) {
	var act = confirm("Are you sure you want to delete this form?");
	if(act == true) {
		var argument = $("#edit_hidden_argument").val(); //Get the hidden argument
	
		$('#formbuilder_loadingAnimation').show();
		$.post("?q=formbuilder/action",{
			"formId" : formid,
			"argument" : argument,
			"action" : "delete",
			"rand" : Math.random()
		},
		function(xml){ formbuilder.forms.manageForms(xml) });
	} else {
		return false;	
	}
}


/**
* @name:        activate()
* @description: post a request via AJAX to the server to activate a form.
* @params:      formid: the id of the form to be activated.
*/

formbuilder.forms.activateForm = function(formid) {
	var argument = $("#edit_hidden_argument").val(); //Get the hidden argument

	$('#formbuilder_loadingAnimation').show();
	$.post("?q=formbuilder/action",{
		"formId" : formid,
		"argument" : argument,
		"action" : "activate",
		"rand" : Math.random()
	},
	function(xml){ formbuilder.forms.manageForms(xml) });
}

/**
* @name:        rename()
* @description: post a request via AJAX to the server to rename a form.
* @params:      formid: the id of the form to be renamed.
*/
formbuilder.forms.rename = function (formid, formname) {
	var argument = $("#edit_hidden_argument").val(); //Get the hidden argument
	
	newId = window.prompt("Enter a new form name", formname); //Renamed the form ID as Form Name
	if (!newId) return;
	$('#formbuilder_loadingAnimation').show();
	$.post("?q=formbuilder/action",{
		"formId" : formid,
		"newFormName" : newId, //Renamed the form ID as Form Name
		"argument" : argument,
		"action" : "rename",
		"rand" : Math.random()
	},
	function(xml){ 
		if (xml == "exist") {
			alert('The form name "' + newId + '" already exist!\nPlease give any other name.');
		}  
		formbuilder.forms.rename.listing();
	});
}

/**
* @name:        rename()
* @description: post a request via AJAX to the server to rename a form.
* @params:      formid: the id of the form to be renamed.
*/
formbuilder.forms.rename.listing = function () {
	var argument = $("#edit_hidden_argument").val(); //Get the hidden argument
	$('#formbuilder_loadingAnimation').show();
	$.post("?q=formbuilder/action",{
		"action" : "rename_listing",
		"argument" : argument,
		"rand" : Math.random()
	},
	function(xml){ formbuilder.forms.manageForms(xml) });
}

/**
* @name:        initializeForm()
* @description: Initialize the form variables!
* @params:      none
*/
formbuilder.forms.initializeForm = function() {
	//Initialize the form
	form = {
		"#id" : "new_form",
		"#value"  : "",
		"#prefix" : "",
		"#suffix" : "",
		"#method" : "post",
		"#action" : "",
		"#oldformid" : ""
	};
	itemCount = 0;
	//Initialize the UI part.
	$('#editingTab').html('');
}


/**
* @name:        createForm()
* @description: Initialize the form variables from the data received via AJAX
* @params:      data: form details
*/
formbuilder.forms.createForm = function(data) {
	if(!formbuilder.UI.createFormbuilderUI()) {
		return ;
	}
	eval("var tempForm = " + data);
  var itemId;
	for (var item in tempForm)   {
		if (item.substring(0,1) == "#") {
			form[item] = tempForm[item];    // continue in case of form properties
			continue;
		}
		// add this element and its children.
		//If false is returned, some types present in the form are not supported so return.
		if(formbuilder.forms.addFormElements(tempForm, item) == false) {
			alert("The form that you just requested to open can't be edited in Simple mode.");
			$('#formbuilder_wrapper').fadeOut();
			$('#formbuilder_mainMenu1').show();
			formbuilder.forms.manageForms();
			return;
		}
	}
	
	// form['#oldformid'] = form['#id'];
	form['#oldformid'] = $("#edit_hidden_form_id").val();
	
	formbuilder.forms.showFormProperties();
}

formbuilder.forms.addFormElements = function(tempForm, name, parentId) {
	var item;
	var name;
	form[name] = {};
	form[name]['#title'] = tempForm[name]['#title'];
	form[name]['#dontdelete'] = tempForm[name]['#dontdelete']; //JJ
	//Add current item. false is returned if item is not supported by this mode.
	if(!formbuilder.forms.addItem (tempForm[name]['#type'],name,true,parentId))
		return false;
	for (item in tempForm[name]) {
		if (item.substring(0,1) != "#") {
			formbuilder.forms.addFormElements(tempForm[name], item,name);
		}
		else {
			form[name][item] = tempForm[name][item];
		}
	}
}

/**
* @name:        openForm()
* @description: Gets a form from a URL and opens the form in editor.
* @param        url: Link where the form will be found.
*               formId : the id of the form.
*/
formbuilder.forms.openForm = function(url, formId) {
	$.get("?q="+url+"&formbuilder_form="+formId,formbuilder.forms.createForm);
}

/*undocumented function! woof woof! DO NOT DELETE IT!! :)*/
function test(){
	$.post("?q=formbuilder/views",{
		"action" : "getDefault",
		"elementType" : 'submit',
		"rand" : Math.random()
	},
	function(xml){
		alert(xml);
	});
}


/**
	* @name:        putWeights()
	* @description: Put weights in form elements to reflect their order.
	*               This has to be changed and done without using '#weights'
	*                property.
	* @params:      data: form details
*/
formbuilder.forms.putWeights = function() {
	var serial = $.SortSerialize('editingTab');
	var newForm = {};
	for (var item in form)   {
		if (item.substring(0,1) == "#") {
			newForm[item] = form[item];
			continue;
		}
	}
	serial = serial.hash.split("&")

	for(var i =0; i < serial.length;i++) {
		newForm[serial[i].substring(serial[i].indexOf('=')+1)] = form[serial[i].substring(serial[i].indexOf('=')+1)];
	}
	formbuilder.UI.createSortables;
	form = newForm;
}

formbuilder.forms.send =  function() {
  //Get the form ID and the argument
  if (form["#oldformid"] != '') {
	  var argument = $("#edit_hidden_argument").val();
	  var actual_form_id = $("#edit_hidden_form_id").val();//get the actual form id
	  var mode = "edit"; // Set the mode
  }
  else {
	  var argument = $("#hidden_argument").val();
	  var actual_form_id = $("#hidden_form_id").val();//get the actual form id
	  var mode = "create"; // Set the mode
  }
  
  if ($.trim(form["#id"]) == '') {//added trim condition to avoid empty spaces
    alert('Please Enter form name');
    formbuilder.forms.showFormProperties();
    return false;
  }

  if (form["#oldformid"] != '' && current_form_id == '' ) {
    current_form_id = form["#oldformid"];
  }
  //check for duplicate form name
  duplicate_check = 'check';

  $("#formbuilder_loadingAnimation").show();
  $.post("?q=formbuilder/receive",
  {
    "formName" : form["#id"],
    "oldformid" : form["#oldformid"],
    "formId" : actual_form_id,
    "argument" : argument,
    "duplicate_check" : duplicate_check,
    "mode" : mode,
    "form" :s.object(formbuilder.UI.treeFormatter()),
    "rand" : Math.random()
  },
  function(xml){
    $("#formbuilder_loadingAnimation").hide();
    if(xml == "exist") {
      alert('The form name "' + form['#id'] + '" already exist!\nPlease give any other name.');
      current_form_id ='';
      formbuilder.forms.showFormProperties();
    }
    else if (xml == actual_form_id) {
      //alert("Your form was saved with Form Id: " + xml);
      alert('Your form "'+form["#id"]+'" was saved successfully');
      current_form_id = actual_form_id;
      formbuilder.forms.showFormProperties();
			location.href = "";			
    }
    else {
      alert("Some error occurred!\n\n Error Description ");
    }
  });
}


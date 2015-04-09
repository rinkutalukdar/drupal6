// $Id: $

/**
 * @author:        Avi Mehta
 * @description:   Javascript functions for the formbuilder Module.
 * @license:       GPL
 */

//Class for formbuilder UI
formbuilder.UI = function() {};

/**
 * @name:        addComponents()
 * @description: Adds the buttons to the DOM based on js array: properties.
 *               It was populated on server while this page was being created.
 * @params:      none
 */
formbuilder.UI.addComponents = function() {
  var j = 0;
  for (var i in  formbuilder.properties) {
    $('#formbuilder_leftCol').append('<div class="formbuilderButton" onclick="formbuilder.forms.addItem (\''+i+'\',\''+i+'\'+itemCount,false)" >' + i + '</div>');
  }  
}

/**
 * @name:        createSortables()
 * @description: Create the sortables. Called after any element is added.
 * @params:      none
 */
formbuilder.UI.createSortables = function () {

  $('ul.formbuilder_formRow').Sortable(
    {
      accept :        'formbuilder_formRow',
      activeclass :   'formbuilder_sortableactive',
      hoverclass :    'formbuilder_sortablehover',
      helperclass :   'formbuilder_sorthelper',
      opacity:        0.8,
      revert:         true,
      tolerance:      'pointer',
		  revert:			    true,
      fx:             200,
      onStop:         formbuilder.UI.treeFormatter,
      onchange:       formbuilder.forms.putWeights
    }
  )
  $('#editingTab').Sortable(
    {
      accept :        'formbuilder_formRow',
      activeclass :   'formbuilder_sortableactive',
      hoverclass :    'formbuilder_sortablehover',
      helperclass :   'formbuilder_sorthelper',
      opacity:        0.8,
      revert:         true,
      tolerance:      'pointer',
      revert:			    true,
      onStop:         formbuilder.UI.treeFormatter,
      onchange:       formbuilder.forms.putWeights
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
  if(a.length > 0)
  {
    for (var i = 0; i < a.length ; i++)
    {
      if(a[i].id != 'sortHelper' )
      {
        str[a[i].id] = formbuilder.UI.createTree($("#"+a[i].id).children('.formbuilder_formRow'));
        for(j in form[a[i].id])
        {
           str[a[i].id][j] = form[a[i].id][j];
        }

      }
    }
    return str;
  }
  else
  {
    return form[a[0].id];
  }
}

/**
 * @name:        createFormbuilderUI()
 * @description: Create the main UI for creating forms
 * @params:      none
 * Note: Returns false when a form was fund in the memory and user wanted to keep it there.
 *        returns true otherwise.
 */
formbuilder.UI.createFormbuilderUI = function() {
  $('#formbuilder_introduction').hide();
  $('#formbuilder_displayPane').hide();
  $('#formbuilder_mainMenu1').hide();
  //$('.formbuilder_tooltipClass').hide();
  if (itemCount == 0 ||  ( itemCount != 0 && confirm('There is already a form in the memory. Press OK to erase it and Cancel to continue from previous Form?'))) {
    //Form Menu
    $('#formbuilder_wrapper').html('<div id="formbuilder_mainMenu2"><a href="#" class="formbuilder_link" onclick="$(\'#formbuilder_wrapper\').fadeOut();$(\'#formbuilder_mainMenu1\').show();formbuilder.forms.manageForms();">Back</a><span>|</span><a href="#" class="formbuilder_link"  onclick="formbuilder.forms.send()">Save</a><span>|</span><a href="#" class="formbuilder_link" onclick="formbuilder.UI.createFormbuilderUI()">Reset</a>  <span>|</span><a href="#" class="formbuilder_link" onclick="formbuilder.forms.showFormProperties()">Form Properties</a></div><table> <tr><td class="formbuilder_columnHead">Components</td><td><div class="formbuilder_centered"> <span class="formbuilderTab" onclick="formbuilder.UI.showTab(\'editing\')">Editing</span><span class="formbuilderTab" onclick="formbuilder.UI.showTab(\'phpCode\')">PHP code</span><span class="formbuilderTab" onclick="formbuilder.UI.showTab(\'htmlPrev\')">HTML Preview</span></div></td><td class="formbuilder_columnHead"> Properties</td></tr><tr><td></td><td></td><td></td></tr><tr><td id="formbuilder_buttons" class="formbuilder_columnSide"><div id="formbuilder_leftCol"></div> </td><td id="formbuilder_preview">  Select components of the form from the Left Column  <ul id="editingTab" class="formbuilder_sortable"></ul><div id="phpCodeTab"></div><div id="htmlTab"></div> </td><td id="formbuilder_properties" class="formbuilder_columnSide"><div><p> Form Properties: </p><table><tr><td>Form Id: </td><td><input type="text" name="formId" id="formId" size="10" value="'+form['#id']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'id\');" /></td></tr><tr><td>Prefix: </td><td><input type="text" name="formPrefix" id="formPrefix" size="10" value="'+form['#prefix']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'prefix\');" /></td></tr><tr><td>Suffix: </td><td><input type="text" name="formSuffix" id="formSuffix" size="10" value="'+form['#suffix']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'suffix\');" /></td></tr><tr><td>Method: </td><td><input type="text" name="formMethod" id="formMethod" size="10" value="'+form['#method']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'method\');" /></td></tr><tr><td>Value: </td><td><input type="text" name="formValue" id="formValue" size="10" value="'+form['#value']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'value\');" /></td></tr><tr><td>Action: </td><td><input type="text" name="formAction" id="formAction" size="10" value="'+form['#action']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'action\');" /></td></tr></table> <p><br />Add some elements to the form and then click on an element to modify the properties. </p></div></td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td> </tr></table>').fadeIn();
    formbuilder.forms.initializeForm();
    formbuilder.UI.addComponents();
    return true;
  }
  else {
    $('#formbuilder_wrapper').fadeIn();
    return false;
  }
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

  if (type == 'htmlPrev')
  {
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
    },function(xml){  $('#formbuilder_loadingAnimation').hide();
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


/**
 * @name:        getElementCode(itemId)
 * @description: return the basic code for an element
 * @params:      itemId: id of the element to be created
 */
formbuilder.forms.getElementCode = function(itemId, itemType, itemName) {
  return '<ul class="formbuilderElementDesc formbuilder_formRow " id="'+itemId+'"><span class="formbuilder_close" id="close'+itemId+'" alt="Close" />X</span><span>'+itemName+' : '+itemId+' ('+itemType+')</span></ul>';
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

  if (!existingItem) {
    form[itemId] = new formbuilder.clone(formbuilder.properties[i]);
  }
  var code = formbuilder.forms.getElementCode(itemId, i, form[itemId]['#title'])

  if(!parentItem)
  {
    $("#editingTab").append(code);
  }
  else
  {
    $("#"+parentItem).append(code);
  }


  $("#close"+itemId).click(function(){ formbuilder.forms.removeItem( (this.id).substring(5));});
  $("#"+itemId).click(function(){ $(".formbuilder_formRow").removeClass("formbuilder_outline"); $(this).addClass("formbuilder_outline"); formbuilder.forms.showProperties(this.id);  return false;});

  formbuilder.UI.createSortables();
  formbuilder.forms.putWeights();

  //$('#editingTab').SortableAddItem(document.getElementById(itemId)); //Error!!!
  itemCount++;
  $(".formbuilder_formRow").removeClass("formbuilder_outline");
  $('#'+itemId).addClass("formbuilder_outline")
  formbuilder.forms.showProperties(itemId);
  return itemId;

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
  if (jQuery.className.has($('#' + formItem)[0],'formbuilder_outline')) {
    formbuilder.forms.showFormProperties();
  }
  $('#' + formItem).remove();
  formbuilder.UI.createSortables();
  //Remove the details from the JS $form array
  delete form[formItem];
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
formbuilder.forms.showFormProperties = function() {
  var code = '<p> Form Properties: </p><table><tr><td>Form Id: </td><td><input type="text" name="formId" id="formId" size="10" value="'+form['#id']+'" onchange="formbuilder.forms.updateFormProperty(this.value,\'id\');" /></td></tr><tr><td>Prefix: </td><td><input type="text" name="formPrefix" id="formPrefix" size="10" value="'+form['#prefix']+'" onchange="formbuilder.forms.updateFormProperty(this.value,\'prefix\');" /></td></tr><tr><td>Suffix: </td><td><input type="text" name="formSuffix" id="formSuffix" size="10" value="'+form['#suffix']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'suffix\');" /></td></tr><tr><td>Method: </td><td><input type="text" name="formMethod" id="formMethod" size="10" value="'+form['#method']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'method\');" /></td></tr><tr><td>Value: </td><td><input type="text" name="formValue" id="formValue" size="10" value="'+form['#value']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'value\');" /></td></tr><tr><td>Action: </td><td><input type="text" name="formAction" id="formAction" size="10" value="'+form['#action']+'" onchange="formbuilder.forms.updateFormProperty (this.value,\'action\');" /></td></tr></table> <p><br />Add some elements to the form and then click on an element to modify the properties. </p>';
  $("#formbuilder_properties").html(code);
  $(".formbuilder_formRow").removeClass("formbuilder_outline"); 
}


/**
 * @name:        showProperties(item)
 * @description: Creates the third column for the selected form item. It 
 *               uses the keys in the Form array to show the properties. 
 * @params:      item: The item whose properties are to be displayed.
 */
formbuilder.forms.showProperties = function(formItem) {
  // Everything is displayed in a table.
  var code = '<form name="formProperties" id="formProperties"><table>';

  //Display The element Type. Changing it is not supported for now.
  code += '<tr class="formbuilder_propertyRow"><td  title="Shows the type of element that is selected." class="formbuilder_propertyCell">Element Type: </td><td>'+ form[formItem]['#type']+'<td></tr>';
  
  code += '<tr class="formbuilder_propertyRow"><td  title="Internal name for the element. Do not change it if you do not know what it is."  class="formbuilder_propertyCell"><label>Name: </td><td><input type="text" name="formbuilderName" size="10" value="'+formItem+'" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\'#formbuilderName\', 3)" /></div></label></td></tr>';

  for (key in form[formItem]) {
    //Insert code for the particular property of widget.
    code += '<div class="formbuilder_propertyRow">';
    switch (key) {
      case '#maxlength':
        code += '<tr><td>Max. Length: </td><td><input type="text" name="maxlength" size="5" value="'+form[formItem][key]+'" onchange="formbuilder.forms.synchronize(\''+formItem+'\', \''+ key+'\' , 3)" /></td></tr>';
      break;
      case '#title':
        code += '<tr><td  class="formbuilder_propertyCell">Title: </td><td><input type="text" name="title" size="10" value="'+form[formItem][key]+'" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#type':
        //already shown
      break;
      case '#size':
        code += '<tr><td  class="formbuilder_propertyCell">Size: </td><td><input type="text" name="size" size="5"  value="'+form[formItem][key]+'" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#autocomplete_path':
        code += '<tr><td  class="formbuilder_propertyCell">Autocomplete: </td><td><input type="checkbox" name="autocomplete_path" size="5" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#collapsible':
        code += '<tr><td class="formbuilder_propertyCell">Collapsible: </td><td><input type="checkbox" name="collapsible" size="5" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\'#collapsible\', 3)" /></td></tr>';
      break;

      case '#default_value':
        code += '<tr><td  class="formbuilder_propertyCell">Default: </td><td><input type="text" name="default_value"  value="'+form[formItem][key]+'" size="10" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#description':
        code += '<tr><td  class="formbuilder_propertyCell">Description: </td><td><textarea name="description" cols=9 rows=5 onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)">'+form[formItem][key]+'</textarea></td></tr>';
      break;
      case '#cols':
        code += '<tr><td  class="formbuilder_propertyCell">Columns: </td><td><input type="text" name="cols"  value="'+form[formItem][key]+'" size="5" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#rows':
        code += '<tr><td  class="formbuilder_propertyCell">Rows: </td><td><input type="text" name="rows" size="5"  value="'+form[formItem][key]+'" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#options':
        //Various parsing related things...
        if (form[formItem]['#type'] == 'radios'  ) {
          code += '<tr><td  class="formbuilder_propertyCell">Options: </td></tr>';
          for (i in  form[formItem][key])
            code += '<tr class="optionProp"><td>&nbsp;</td><td><input type="text" name="option'+i+'" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" value="'+ form[formItem][key][i]+'" size="10" /></td></tr>';
          code += '<tr><td>&nbsp;</td><td><img onclick="less()" src="'+formbuilder.basePath+'/images/formElements/decrProp.jpg"  alt="Less"  />&nbsp;<img onclick="more(\'radios\')" src="'+formbuilder.basePath+'/images/formElements/incrProp.jpg" alt="More" /></td></tr>';
        }
        else if (form[formItem]['#type'] == 'select' || form[formItem]['#type'] == 'checkboxes') {
          code += '<tr><td  class="formbuilder_propertyCell"><label>Options: </label></td></tr>';
          var j=0;
          for (i in  form[formItem][key]) {
            code += '<tr class="optionProp"><td><input type="text" name="key'+j+'" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" value="'+i+'" size="10" /></td><td><input type="text" name="option'+j+'" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" value="'+form[formItem][key][i]+'" size="10" /></td></tr>';
            j++;
          }
          code += '<tr><td>&nbsp;</td><td><img onclick="less()" src="'+formbuilder.basePath+'/images/formElements/decrProp.jpg" alt="Less" /><img onclick="more(\'select\')" src="'+formbuilder.basePath+'/images/formElements/incrProp.jpg"  alt="More" /></td></tr>';
        }
        
      break;
      case '#button_type':
        code += '<tr><td  class="formbuilder_propertyCell">Button type:</td><td><input type="text" name="button_type" size="5"  value="'+form[formItem][key]+'" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#value':
        code += '<tr><td  class="formbuilder_propertyCell">Value: </td><td><input type="text" name="value" size="5"  value="'+form[formItem][key]+'" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#submit':
        code += '<tr><td  class="formbuilder_propertyCell">Submit: </td><td><input type="checkbox" name="submit" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#prefix':
        code += '<tr><td  class="formbuilder_propertyCell">Prefix: </td><td><input type="textfield" name="prefix" size="10" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#suffix':
        code += '<tr><td  class="formbuilder_propertyCell">Suffix: </td><td><input type="textfield" name="suffix" size="10" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#multiple':
        code += '<tr><td  class="formbuilder_propertyCell">Multiple: </td><td><input type="checkbox" name="multiple" ' + (form[formItem][key]?'checked="checked"':'') + ' onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#required':
        code += '<tr><td  class="formbuilder_propertyCell">Required: </td><td><input type="checkbox" name="required" ' + (form[formItem][key]?'checked="checked"':'') + ' onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
			 case '#encryption':
        code += '<tr><td  class="formbuilder_propertyCell">Encryption: </td><td><input type="checkbox" name="encryption" ' + (form[formItem][key]?'checked="checked"':'') + ' onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" /></td></tr>';
      break;
      case '#attributes':
        code += '<tr><td  class="formbuilder_propertyCell">Attributes: </td><td><img onclick="removeProp(\'attributes\'); formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" " src="'+formbuilder.basePath+'/images/formElements/decrProp.jpg" /><img onclick="addProp(\'attributes\'); formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" " src="'+formbuilder.basePath+'/images/formElements/incrProp.jpg" /></td></tr>';
        var val = form[formItem][key];

          for (var i  in val) {
            code += '<tr class="attributes"><td><input type="text"  class="attributes_key" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" value='+i+' size="10" /></td><td><input type="text" class="attributes_option" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" value='+val[i]+' size="10" /></td></tr>';
          }
          code += '<tr class="attributes"><td><input type="text" class="attributes_key" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" value=" " size="10" /></td><td><input type="text"  class="attributes_option" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" value=" " size="10" /></td></tr>'
      break;
      case '#after_build':
        code += '<tr><td  class="formbuilder_propertyCell"><label>After_build: </label></td><td><img onclick="removeProp(\'after_build\'); formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" src="'+formbuilder.basePath+'/images/formElements/decrProp.jpg" />&nbsp;<img onclick="addProp(\'after_build\'); formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" src="'+formbuilder.basePath+'/images/formElements/incrProp.jpg" /></td></tr>';
        var val = form[formItem][key];
          for (var i in val) {
            code += '<tr class="after_build"><td>&nbsp;</td><td><input type="text" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" value='+i+' size="10" /></td></tr>';
        }
        code += '<tr class="after_build"><td>&nbsp;</td><td><input type="text" onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)" value=" " size="10" /></td></tr>';
      break;
      case '#process':
      case '#input' :
         //Internal... needs to be hidden
      break;
      default:
        var disp = key.substr(1);
        if(key.length > 10)
        {
          disp = key.substr(1,7) + '...';
        }
        code += '<tr><td  class="formbuilder_propertyCell" title="'+key+'">'+disp+ '</td><td><textarea name="description" cols=9 rows=5 onchange="formbuilder.forms.synchronize(\''+formItem+'\',\''+ key+'\', 3)">'+form[formItem][key]+'</textarea></td></tr>';
      break;
    }
    code+= '</div>'
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
  $('.'+property+':last').after('<tr class='+property+'>' + $('.'+property+':last').html() + '</tr>');
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
    switch (key)   {
      case '#maxlength':
          form[formItem][key] = $('#formProperties')[0].maxlength.value;
      break;
      case '#title':
            form[formItem][key] = $('#formProperties')[0].title.value;
            $('.formbuilder_outline').find('span')[1].innerHTML = form[formItem][key] + ' : ' + formItem + ' ('+ form[formItem]['#type'] + ')';
            
      break;
      case '#formbuilderName':
      {
        var newId = $('#formProperties')[0].formbuilderName.value;
        form[newId] = form[formItem];
        delete form[formItem];
        $('#'+formItem).id(newId);
        $('#close'+formItem).id('close' + newId);
        $('.formbuilder_outline').find('span')[1].innerHTML = form[newId]['#title'] + ' : ' + newId + ' ('+ form[newId]['#type'] + ')';
        $(".formbuilder_formRow").removeClass("formbuilder_outline");
        $('#'+newId).addClass("formbuilder_outline");
        formbuilder.UI.createSortables();
        formbuilder.forms.showProperties(newId)

      }
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
            var temp1 = $('input').parents('.optionProp').size();
            for (var i = 0 ; i< temp1 ;i++) {
              value[i] = $('#formProperties')[0]['option'+i].value ;
            } 
          }
          else if (form[formItem]['#type'] == 'checkboxes') {
            var temp1 = $('input').parents('.optionProp').size();            
            for (var i = 0 ; i< temp1 ;i++) {
              value[$('#formProperties')[0]['key'+i].value] =  $('#formProperties')[0]['option'+i].value;
            }
          }
          else if (form[formItem]['#type'] == 'select') {
            var temp1 = $('input').parents('.optionProp').size();
            for (var i = 0 ; i< temp1 ;i++) {
              value[ $('#formProperties')[0]['key'+i].value] = $('#formProperties')[0]['option'+i].value ;
            }
          }
          form[formItem][key] = value;
          
        }
      break;
      case '#prefix':
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
            if (val != '')
              form[formItem][key][j++] =  val ;
          }
      break;
    }

}

/**
 * @name:        less()
 * @description: Removes the last option/radiobutton/checkbox from the 
 *               currently selected formtem.
 * @params:      none
 */
formbuilder.forms.less = function() {
  $('.optionProp:last',$('#formProperties')[0]).remove();
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
 formbuilder.forms.more = function(widget) {
  if (widget == "after_build") {
    
  }
  else if (widget == 'radios' || widget == 'checkboxes') {
    var prev = $('input').parents('.optionProp').size()-1;
    $('.optionProp:last',$('#formProperties')[0]).after('<tr class="optionProp"><td>&nbsp;</td><td><input type="text" name="'+'option'+(prev+1)+'" value="'+$('#formProperties')[0]['option'+prev].value+'" size="10" /></td></tr>');
    $('#formProperties')[0]['option'+(prev+1)].onchange = $('#formProperties')[0]['option'+prev].onchange;
    $('.formbuilder_outline').find('br:last').after('<label>'+$('.formbuilder_outline').find('label:last').html()+'</label><br />');
    
    formbuilder.forms.synchronize($('.formbuilder_outline').get(0).id,'#options',3);
  }
  else {   
    var prev = $('input').parents('.optionProp').size()-1;
    $('.optionProp:last',$('#formProperties')[0]).after('<tr class="optionProp"><td><input type="text" name="'+'key'+(prev+1)+'" value="'+$('#formProperties')[0]['key'+prev].value+'" size="10" /></td><td><input type="text" name="'+'option'+(prev+1)+'" value="'+$('#formProperties')[0]['option'+prev].value+'" size="10" /></td></tr>');
    $('#formProperties')[0]['option'+(prev+1)].onchange = $('#formProperties')[0]['option'+prev].onchange;
    $('#formProperties')[0]['key'+(prev+1)].onchange = $('#formProperties')[0]['key'+prev].onchange;
    
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
        return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
                this.replace(/"(\\.|[^"\\])*"/g, ''))) &&
            eval('(' + this + ')');
    } catch (e) {
        return false;
    }
};

/**
* @name:        editRequest()
* @description: Post a request to server to edit a already created form
* @params:      formid: the id of the form to be edited.
*/
formbuilder.forms.editRequest = function(formid) {
  $('#formbuilder_loadingAnimation').show();
  $.post("?q=formbuilder/action",{
    "action" : 'edit',
    "formId" : formid,
    "rand" : Math.random()
    },function(xml){  $('#formbuilder_loadingAnimation').hide();  formbuilder.forms.createForm(xml);});
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

    var disp = eval(data);

    $('#formbuilder_displayPane').html(disp).fadeIn();
    $('#formbuilder_displayPane').find('tr:even').attr('class', 'rowAlt');
    $('#formbuilder_displayPane').find('tr:odd').attr('class', 'row');
  }
  else {
    if ($('#formbuilder_displayPane').is(':visible')) {
      $('#formbuilder_displayPane').fadeOut();
    }
    else {
      $('#formbuilder_loadingAnimation').show();
      $.post("?q=formbuilder/list",{
        "rand" : Math.random()
        },formbuilder.forms.manageForms);
    }
  }
}
 

/**
 * @name:        delete()
 * @description: post a request via AJAX to the server to delete a form.
 * @params:      formid: the id of the form to be deleted.
 */
formbuilder.forms.deleteForm = function(formid) {
  $('#formbuilder_loadingAnimation').show();
  $.post("?q=formbuilder/action",{
    "formId" : formid,
    "action" : "delete",
    "rand" : Math.random()
    },function(xml){ formbuilder.forms.manageForms(xml) });
}

/**
 * @name:        rename()
 * @description: post a request via AJAX to the server to rename a form.
 * @params:      formid: the id of the form to be renamed.
 */
formbuilder.forms.rename = function (formid) {
  
  newId = window.prompt("Enter a new form Id");
  if (!newId) return;
  $('#formbuilder_loadingAnimation').show();
  $.post("?q=formbuilder/action",{
    "formId" : formid,
    "newFormId" : newId,
    "action" : "rename",
    "rand" : Math.random()
    },function(xml){ formbuilder.forms.manageForms(xml) });
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
              "#action" : ""
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
  var itemId
  for (var item in tempForm)   {
    if (item.substring(0,1) == "#") {
      form[item] = tempForm[item];    // continue in case of form properties
      continue;
    }
    // add this element and its children.
    //If false is returned, some types present in the form are not supported so return.
    if(formbuilder.forms.addFormElements(tempForm, item) == false) {
      alert("The form that you just requested to open can't be edited in Simple mode. Please use Expert mode.");
      $('#formbuilder_wrapper').fadeOut();
      $('#formbuilder_mainMenu1').show();
      formbuilder.forms.manageForms();
      return;
    }
  }
  formbuilder.forms.showFormProperties();

}

formbuilder.forms.addFormElements = function(tempForm, name,parentId) {
  var item;
  var name;
  form[name] = {};
  form[name]['#title'] = tempForm[name]['#title'];

  //Add current item. false is returned if item is not supported by this mode.
  if(!formbuilder.forms.addItem (tempForm[name]['#type'],name,true,parentId))
    return false;
  for (item in tempForm[name]) {
    if (item.substring(0,1) != "#") {
      formbuilder.forms.addFormElements(tempForm[name], item,name);
    }
    else
    {
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

/*undocumented function :)*/
function test()
{
 $.post("?q=formbuilder/views",{
    "action" : "getDefault",
    "elementType" : 'submit',
    "rand" : Math.random()
    },function(xml){  alert(xml); });
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
  //  alert(serial)
  for(var i =0; i < serial.length;i++) {
    newForm[serial[i].substring(serial[i].indexOf('=')+1)] = form[serial[i].substring(serial[i].indexOf('=')+1)];
  }

  form = newForm;

}

formbuilder.forms.send =  function() {

      $("#formbuilder_loadingAnimation").show();
      $.post("?q=formbuilder/receive",{
        "formId" : form["#id"],
        "form" : s.object(form),
        "rand" : Math.random()
        },function(xml){
          $("#formbuilder_loadingAnimation").hide();
          if(xml.substring(0,5) != "Error") {
            alert("Your form was saved with Form Id: " + xml);
          }
          else {
            alert("Some error occurred!\n\n Error Description " + xml.substring(5));
          }

        });
    }
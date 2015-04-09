/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
// Code for sorting the Year in descending order from current year to 1900 -- Added by GIRISH SHANKAR R dated 30/08/2010
$(document).ready(
    function(){
        var myArray =   new Array();
        var myURL   =   window.location.href.replace('http://','');
        myURL       =   myURL.split('/');

        if( (myURL[2] == 'user') && (myURL[3] == 'password') ) {
            $("#tabs-wrapper ul li:first").hide();
            $("#tabs-wrapper ul li").eq(1).hide();
            // ADDED BY GIRI SHANKAR R dated 13/09/2010
            if ($('#edit-name-wrapper')) {
                if($('#edit-name')) {
                    $('#edit-name').keydown(function(event) {
                      if ((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)) {
                        document.getElementById('edit-submit').click();
                        return false;
                      }
                    });
                }              
            }
            // ADDED BY GIRI SHANKAR R dated 13/09/2010
        } else if ( (myURL[2] == 'user') && (myURL[4] == 'edit') )
            $("#tabs-wrapper ul li:last").hide();
    });

function sortmyway(data_A, data_B) {
    //return (data_A - data_B);
    return ((data_A > data_B) ? -1 : ((data_A < data_B) ? 1 : 0));
}

function addOption(selectbox,text,value ) {
    var optn = document.createElement("OPTION");
    optn.text = text;
    optn.value = value;
    var myCurrentDate   =   new Date();
    if (myCurrentDate.getFullYear() == optn.value)
            optn.selected   =   true;

    selectbox.options.add(optn);
}

function clearOptions(selectbox){
    selectbox.options.length    =   0;
}
// Code for sorting the Year in descending order from current year to 1900 -- Added by GIRISH SHANKAR R dated 30/08/2010

function doValidateEmail(userEmail) {
	if ((userEmail.value==null)||(userEmail.value=="")){
		alert("Please Enter your Email ID")
		userEmail.focus()
		return false
	}
	if (echeck(userEmail.value)==false){
		userEmail.value=""
		userEmail.focus()
		return false
	}
	return true
}
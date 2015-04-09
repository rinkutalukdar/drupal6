// $ id $

var customarray=new Array();
var i=0;
function parseXML(path){
  try {//Internet Explorer
    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  }
  catch(e)  {
    try {//Firefox, Mozilla, Opera, etc.
      xmlDoc=document.implementation.createDocument("","",null);
    }
    catch(e)  {
      alert(e.message);
      return;
    }
  }
  
  xmlDoc.async=false;
  xmlDoc.load(path);
  var list=xmlDoc.getElementsByTagName("word");
  for (i=0;i<list.length;i++){
    customarray[i]=list[i].childNodes[0].nodeValue;
  }
}

if (Drupal.jsEnabled) {
  $(document).ready(function() {
   var path = '';
   //if (Drupal.settings.internetsearch.xmlPath.length > 1)
     //path = Drupal.settings.internetsearch.xmlPath[0];
   //else
     /*path = Drupal.settings.internetsearch.xmlPath;
     if (path != '') {
      parseXML(path);
     }*/
  });
}

Drupal.behaviors.internetsearch = function() {
  
  $("input#edit-internet-button").click(function() {
    
    if ($("input[@name='chk_is']:checked").val()) {
	  var searchText = $("input[@name='search_term']").val();
	  $("a.internetsearch").attr("href", "http://www.google.com/search?query=" + searchText + "&btnG=Google+Search&lr=lang_en");
    }
	else {
	  $("a.internetsearch").attr("href", "");
	}
  });

}
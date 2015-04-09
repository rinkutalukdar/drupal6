function f_optionMove(s_from, s_to, direction) {
  var e_from = $("#"+s_from).get(0);
  var e_to   = $("#"+s_to).get(0);
  var n_moved = 0;
  for (var i = 0; i < e_from.options.length; i++) {
    if (e_from.options[i].selected) {
		s_to_length = e_to.options.length;
      e_to.options[e_to.options.length] = new Option(e_from.options[i].text, e_from.options[i].value);
      n_moved++;
    }
    else if (n_moved)
      e_from.options[i - n_moved] = new Option(e_from.options[i].text, e_from.options[i].value);
  }
  if (n_moved){
    e_from.options.length = e_from.options.length - n_moved;
	if(direction == 'right'){
		selectAllValues(e_to);
	}else{
		selectAllValues(e_from);
	}
}
  else
    return;
}


function selectListValues(resource, DivId, e){
            if (!e) var e = window.event;

            var divObj = document.getElementById(DivId);

            var eventSource = (window.event) ? e.srcElement : e.target;
            if (e.type == "mouseout" && eventSource.nodeName != "DIV")
                return;
			//Prevent event bubbling	
			 var relTarg = e.relatedTarget || e.toElement || e.fromElement;
			 	
            try
            {
                while (relTarg && relTarg != divObj)
                    relTarg = relTarg.parentNode;

                if (relTarg == divObj)
                    return;
				selectAllValues(resource);
                
            }
            catch(e)
            {
            }


}


function selectAllValues(resource){
			for (var i = 0; i < resource.options.length; i++){
				if(resource.options[i].value != 'null'){
				resource.options[i].selected = true;
				}
			}

}
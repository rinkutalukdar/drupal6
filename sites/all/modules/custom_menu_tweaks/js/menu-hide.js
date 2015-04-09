$(document).ready(function() {
       if($.cookie('popup') != 1){
           $.cookie('popup', '1');
           //$("a#example1").fancybox();
           //$("a#example1").trigger('click');
		   alert("Hello");
        }
    });

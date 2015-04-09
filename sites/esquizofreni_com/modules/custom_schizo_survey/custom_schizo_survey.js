Drupal.behaviors.myModuleBehavior = function (context) {
var time = Drupal.settings.custom_schizo_survey.time;
setTimeout(showTooltip, time);
};
$(document).ready(function(){
   // setTimeout(showTooltip, 5000);

 
				$('.lightbox').click(function(){
					$('.backdrop, .survey_box').animate({'opacity':'.50'}, 300, 'linear');
					$('.survey_box').animate({'opacity':'1.00'}, 300, 'linear');
					$('.backdrop, .survey_box').css('display', 'block');
				});
 
				$('.close').click(function(){
					close_box();
				});
 
				$('.backdrop').click(function(){
					close_box();
				});
 
			});
 
function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
} 
 
function close_box()
{

    setCookie("anonymous_user","anonymous_user",365);
	$('.backdrop, .survey_box').animate({'opacity':'0'}, 300, 'linear', function(){
	$('.backdrop, .survey_box').css('display', 'none');
	});
}

function showTooltip()
    {
$('.backdrop, .survey_box').animate({'opacity':'.50'}, 300, 'linear');
$('.survey_box').animate({'opacity':'1.00'}, 300, 'linear');
$('.backdrop, .survey_box').css('display', 'block');
$('#block-block-80 .survey_box').css("display","block");
    }
	
	function get_radio_value() {
            var inputs = document.getElementsByName("survey_selected");
            for (var i = 0; i < inputs.length; i++) {
              if (inputs[i].checked) {
                return inputs[i].value;
              }
            }
			
}

          function onSubmit(user) {
		 
		 
		  
            var id = get_radio_value();
			// alert(id);
	    var usertype = user;
		// alert(usertype);
	    cit_clickevent(1, usertype, id);
          }
		  
//jQuery.noConflict();
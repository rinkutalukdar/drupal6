$(document).ready(function() {
    $('.expandable-panel-heading').click(function() {
	var ExpC = $(this).attr("class");
	var ExpContent = '.'+ExpC.replace("heading", "content"); 
	var parentEclass = '.'+$(this).parent().attr('class');
	var togCls = parentEclass +' .icon-close-open';
	$(togCls).toggleClass("down");	
	$(parentEclass).children(ExpContent).slideToggle();
    });
});
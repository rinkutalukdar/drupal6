/*
 * Interface elements for jQuery - http://interface.eyecon.ro
 *
 * Copyright (c) 2006 Stefan Petre
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */

 jQuery.iUtil={
  getPos:function(e,s){
   var l=0;var t=0;var sl=0;var st=0;
   var w=jQuery.css(e,'width');
   var h=jQuery.css(e,'height');
   var wb=e.offsetWidth;
   var hb=e.offsetHeight;
   var el;
   while(e.offsetParent){
    l+=e.offsetLeft+(e.currentStyle?parseInt(e.currentStyle.borderLeftWidth)||0:0);
	t+=e.offsetTop+(e.currentStyle?parseInt(e.currentStyle.borderTopWidth)||0:0);
	if(s){sl+=e.parentNode.scrollLeft||0;st+=e.parentNode.scrollTop||0}e=e.offsetParent
	}
	l+=e.offsetLeft+(e.currentStyle?parseInt(e.currentStyle.borderLeftWidth)||0:0);
	t+=e.offsetTop+(e.currentStyle?parseInt(e.currentStyle.borderTopWidth)||0:0);
	st=t-st;
	sl=l-sl;
	return{x:l,y:t,sx:sl,sy:st,w:w,h:h,wb:wb,hb:hb}
	},

	getPosition:function(e){
	 var x=0;
	 var y=0;
	 var restoreStyle=false;
	 es=e.style;
	 if(jQuery(e).css('display')=='none'){
	  oldVisibility=es.visibility;
	  oldPosition=es.position;
	  es.visibility='hidden';
	  es.display='block';
	  es.position='absolute';
	  restoreStyle=true
	  }

	el=e;

	while(el){
	 x+=el.offsetLeft+(el.currentStyle&&!jQuery.browser.opera?parseInt(el.currentStyle.borderLeftWidth)||0:0);
	 y+=el.offsetTop+(el.currentStyle&&!jQuery.browser.opera?parseInt(el.currentStyle.borderTopWidth)||0:0);
	 el=el.offsetParent
	}

	el=e;
	while(el&&el.tagName.toLowerCase()!='body'){
	 x-=el.scrollLeft||0;
	 y-=el.scrollTop||0;
	 el=el.parentNode
	 }

	if(restoreStyle){
	 es.display='none';
	 es.position=oldPosition;
	 es.visibility=oldVisibility
	 }
	return{x:x,y:y}
	},

	getSize:function(e){
	 var w=jQuery.css(e,'width');
	 var h=jQuery.css(e,'height');
	 var wb=0;
	 var hb=0;
	 es=e.style;
	 if(jQuery(e).css('display')!='none'){
	  wb=e.offsetWidth;hb=e.offsetHeight
	  }else{
	   oldVisibility=es.visibility;
	   oldPosition=es.position;
	   es.visibility='hidden';
	   es.display='block';
	   es.position='absolute';
	   wb=e.offsetWidth;
	   hb=e.offsetHeight;
	   es.display='none';
	   es.position=oldPosition;
	   es.visibility=oldVisibility
	   }

	return{w:w,h:h,wb:wb,hb:hb}
	},

	getClient:function(e){
	 if(e){
	  w=e.clientWidth;h=e.clientHeight
	  }
	 else{
	  de=document.documentElement;
	  w=window.innerWidth||self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth;
	  h=window.innerHeight||self.innerHeight||(de&&de.clientHeight)||document.body.clientHeight
	  }
	return{w:w,h:h}
	  },

	  getScroll:function(e){
	   if(e){t=e.scrollTop;l=e.scrollLeft;w=e.scrollWidth;h=e.scrollHeight;iw=0;ih=0}
	   else{if(document.documentElement&&document.documentElement.scrollTop){t=document.documentElement.scrollTop;l=document.documentElement.scrollLeft;w=document.documentElement.scrollWidth;h=document.documentElement.scrollHeight}else if(document.body){t=document.body.scrollTop;l=document.body.scrollLeft;w=document.body.scrollWidth;h=document.body.scrollHeight}iw=self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;ih=self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0
	   }
	   return{t:t,l:l,w:w,h:h,iw:iw,ih:ih}
	  },

	  getMargins:function(e,toInteger){
	   el=$(e);t=el.css('marginTop')||'';r=el.css('marginRight')||'';b=el.css('marginBottom')||'';l=el.css('marginLeft')||'';if(toInteger)return{t:parseInt(t)||0,r:parseInt(r)||0,b:parseInt(b)||0,l:parseInt(l)};else return{t:t,r:r,b:b,l:l}},

	  getPadding:function(e,toInteger){el=$(e);t=el.css('paddingTop')||'';r=el.css('paddingRight')||'';b=el.css('paddingBottom')||'';l=el.css('paddingLeft')||'';if(toInteger)return{t:parseInt(t)||0,r:parseInt(r)||0,b:parseInt(b)||0,l:parseInt(l)};else return{t:t,r:r,b:b,l:l}},

	  getBorder:function(e,toInteger){el=$(e);t=el.css('borderTopWidth')||'';r=el.css('borderRightWidth')||'';b=el.css('borderBottomWidth')||'';l=el.css('borderLeftWidth')||'';if(toInteger)return{t:parseInt(t)||0,r:parseInt(r)||0,b:parseInt(b)||0,l:parseInt(l)||0};else return{t:t,r:r,b:b,l:l}},

	  getPointer:function(event){x=event.pageX||(event.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft))||0;y=event.pageY||(event.clientY+(document.documentElement.scrollTop||document.body.scrollTop))||0;return{x:x,y:y}
	  }
	};

	jQuery.iSort={changed:[],collected:{},helper:false,inFrontOf:null,

	start:function(){
  if(jQuery.iDrag.dragged==null){alert('null');return}

  var i;jQuery.iSort.helper.get(0).className=jQuery.iDrag.dragged.dragCfg.hpc;
  shs=jQuery.iSort.helper.get(0).style;
  shs.display='block';
  jQuery.iSort.helper.oC=jQuery.iUtil.getPos(jQuery.iSort.helper.get(0));
  shs.width=jQuery.iDrag.dragged.dragCfg.oC.wb+'px';
  shs.height=jQuery.iDrag.dragged.dragCfg.oC.hb+'px';
  margins=jQuery.iUtil.getMargins(jQuery.iDrag.dragged);
  shs.marginTop=margins.t;
  shs.marginRight=margins.r;
  shs.marginBottom=margins.b;
  shs.marginLeft=margins.l;
  if(jQuery.iDrag.dragged.dragCfg.ghosting==true){
    c=jQuery.iDrag.dragged.cloneNode(true);
    cs=c.style;
    cs.marginTop='0px';
    cs.marginRight='0px';
    cs.marginBottom='0px';
    cs.marginLeft='0px';
    cs.display='block';
    jQuery.iSort.helper.empty().append(c)
  }
  jQuery(jQuery.iDrag.dragged).after(jQuery.iSort.helper.get(0));
  jQuery.iDrag.dragged.style.display='none';
  },

	check:function(e){if(!e.dragCfg.so&&jQuery.iDrop.overzone.sortable){if(e.dragCfg.onStop)e.dragCfg.onStop.apply(dragged);jQuery(e).css('position',e.dragCfg.initialPosition||e.dragCfg.oP);jQuery(e).DraggableDestroy();jQuery(jQuery.iDrop.overzone).SortableAddItem(e)}jQuery.iSort.helper.removeClass(e.dragCfg.hpc).html('&nbsp;');jQuery.iSort.inFrontOf=null;shs=jQuery.iSort.helper.get(0).style;shs.display='none';ts=[];fnc=false;for(i in jQuery.iSort.changed){iEL=jQuery.iDrop.zones[jQuery.iSort.changed[i]].get(0);id=jQuery.attr(iEL,'id');ser=jQuery.iSort.serialize(id);if(iEL.dropCfg.os!=ser.hash){iEL.dropCfg.os=ser.hash;if(fnc==false&&iEL.dropCfg.onchange){fnc=iEL.dropCfg.onchange}ser.id=id;ts[ts.length]=ser}}if(fnc!=false&&ts.length>0){fnc(ts)}jQuery.iSort.changed=[]},

	checkhover:function(e,o){if(!jQuery.iDrag.dragged)return;jQuery.iSort.helper.get(0).style.display='block';var cur=false;var i=0;if(e.dropCfg.el.size()>0){for(i=e.dropCfg.el.size();i>0;i--){if(e.dropCfg.el.get(i-1)!=jQuery.iDrag.dragged){if(!e.sortCfg.floats){if((e.dropCfg.el.get(i-1).pos.y+e.dropCfg.el.get(i-1).pos.hb/2)>jQuery.iDrag.dragged.dragCfg.ny){cur=e.dropCfg.el.get(i-1)}else{break}}else{if((e.dropCfg.el.get(i-1).pos.x+e.dropCfg.el.get(i-1).pos.wb/2)>jQuery.iDrag.dragged.dragCfg.nx&&(e.dropCfg.el.get(i-1).pos.y+e.dropCfg.el.get(i-1).pos.hb/2)>jQuery.iDrag.dragged.dragCfg.ny){cur=e.dropCfg.el.get(i-1)}}}}}if(cur&&jQuery.iSort.inFrontOf!=cur){jQuery.iSort.inFrontOf=cur;jQuery(cur).before(jQuery.iSort.helper.get(0))}else if(!cur&&(jQuery.iSort.inFrontOf!=null||jQuery.iSort.helper.get(0).parentNode!=e)){jQuery.iSort.inFrontOf=null;jQuery(e).append(jQuery.iSort.helper.get(0))}},

	measure:function(e){if(jQuery.iDrag.dragged==null){return}var i;e.dropCfg.el.each(function(){this.pos=jQuery.extend(jQuery.iUtil.getSize(this),jQuery.iUtil.getPosition(this))})},

	serialize:function(s){var i;var h='';var o={};if(s){if(jQuery.iSort.collected[s]){o[s]=[];jQuery('#'+s+' .'+jQuery.iSort.collected[s]).each(function(){if(h.length>0){h+='&'}h+=s+'[]='+jQuery.attr(this,'id');o[s][o[s].length]=jQuery.attr(this,'id')})}else{for(a in s){if(jQuery.iSort.collected[s[a]]){o[s[a]]=[];jQuery('#'+s[a]+' .'+jQuery.iSort.collected[s[a]]).each(function(){if(h.length>0){h+='&'}h+=s[a]+'[]='+jQuery.attr(this,'id');o[s[a]][o[s[a]].length]=jQuery.attr(this,'id')})}}}}else{for(i in jQuery.iSort.collected){o[i]=[];jQuery('#'+i+' .'+jQuery.iSort.collected[i]).each(function(){if(h.length>0){h+='&'}h+=i+'[]='+jQuery.attr(this,'id');o[i][o[i].length]=jQuery.attr(this,'id')})}}return{hash:h,o:o}},

	addItem:function(e){if(!e.childNodes){return}return this.each(function(){if(!this.sortCfg||!jQuery.className.has(e,this.sortCfg.accept))jQuery(e).addClass(this.sortCfg.accept);jQuery(e).Draggable(this.sortCfg.dragCfg)})},

	build:function(o){
//	alert('one build');
    if(o.accept&&jQuery.iUtil&&jQuery.iDrag&&jQuery.iDrop){
      if(!jQuery.iSort.helper){
        jQuery('body',document).append('<div id="sortHelper">&nbsp;</div>');
        jQuery.iSort.helper=jQuery('#sortHelper');
        jQuery.iSort.helper.get(0).style.display='none'
      }
      this.Droppable({accept:o.accept,activeclass:o.activeclass?o.activeclass:false,hoverclass:o.hoverclass?o.hoverclass:false,helperclass:o.helperclass?o.helperclass:false,onDrop:function(drag,fx){jQuery.iSort.helper.after(drag);if(fx>0){jQuery(drag).fadeIn(fx)}},onHover:o.onHover||o.onhover,onOut:o.onOut||o.onout,sortable:true,onChange:o.onChange||o.onchange,fx:o.fx?o.fx:false,ghosting:o.ghosting?true:false,tolerance:o.tolerance?o.tolerance:'pointer'});
    return this.each(function(){
      dragCfg={revert:o.revert?true:false,zindex:3000,opacity:o.opacity?parseFloat(o.opacity):false,hpc:o.helperclass?o.helperclass:false,fx:o.fx?o.fx:false,so:true,ghosting:o.ghosting?true:false,handle:o.handle?o.handle:null,containment:o.containment?o.containment:null,onStart:o.onStart&&o.onStart.constructor==Function?o.onStart:false,onStop:o.onStop&&o.onStop.constructor==Function?o.onStop:false,axis:/vertically|horizontally/.test(o.axis)?o.axis:false,snapDistance:o.snapDistance?parseInt(o.snapDistance)||0:false,cursorAt:o.cursorAt?o.cursorAt:false};
      jQuery('.'+o.accept,this).Draggable(dragCfg);
      this.isSortable=true;
      this.sortCfg={
        accept:o.accept,
        revert:o.revert?true:false,
        zindex:2000,
        opacity:o.opacity?parseFloat(o.opacity):false,
        hpc:o.helperclass?o.helperclass:false,
        fx:o.fx?o.fx:false,
        so:true,
        ghosting:o.ghosting?true:false,
        handle:o.handle?o.handle:null,
        containment:o.containment?o.containment:null,
        floats:o.floats?true:false,
        dragCfg:dragCfg
      }
    }
    )
    }
	}};

	jQuery.fn.extend({Sortable:jQuery.iSort.build,SortableAddItem:jQuery.iSort.addItem});
  jQuery.SortSerialize=jQuery.iSort.serialize;
  jQuery.iDrag={helper:null,dragged:null,

	destroy:function(){
	//alert('calling');
  return this.each(function(){if(this.isDraggable){this.dragElem=null;jQuery(this).unbind('mousedown',jQuery.iDrag.dragstart)}})},

	draginit:function(e){
	//alert('draginit');
    if(jQuery.iDrag.dragged!=null){
      //alert('stoped')
      jQuery.iDrag.dragstop(e);
      return false
    }
    var elm=this.dragElem;
    jQuery(document).bind('mousemove',jQuery.iDrag.dragmove).bind('mouseup',jQuery.iDrag.dragstop);
    elm.dragCfg.pointer=jQuery.iUtil.getPointer(e);
    elm.dragCfg.currentPointer=elm.dragCfg.pointer;
    elm.dragCfg.init=false;
    jQuery.iDrag.dragged=elm;
    return false
  },

	dragstart:function(e){
	//alert('dragstart');
    elm=jQuery.iDrag.dragged;
    elm.dragCfg.init=true;
    dEs=elm.style;
    elm.dragCfg.oD=jQuery.css(elm,'display');
    elm.dragCfg.oP=jQuery.css(elm,'position');
    if(!elm.dragCfg.initialPosition) elm.dragCfg.initialPosition=elm.dragCfg.oP;
    elm.dragCfg.oR={x:parseInt(jQuery.css(elm,'left'))||0,y:parseInt(jQuery.css(elm,'top'))||0};
    elm.dragCfg.diffX=0;
    elm.dragCfg.diffY=0;
    if(jQuery.browser.msie){
      oldBorder=jQuery.iUtil.getBorder(elm,true);
      elm.dragCfg.diffX=oldBorder.l||0;
      elm.dragCfg.diffY=oldBorder.t||0
    }
    elm.dragCfg.oC=jQuery.extend(jQuery.iUtil.getPosition(elm),jQuery.iUtil.getSize(elm));
    if(elm.dragCfg.oP!='relative'&&elm.dragCfg.oP!='absolute'){
      dEs.position='relative'
    }
    jQuery.iDrag.helper.empty();
    clonedEl=elm.cloneNode(true);
    jQuery(clonedEl).css({display:'block',left:'0px',top:'0px'});
    clonedEl.style.marginTop='0';
    clonedEl.style.marginRight='0';
    clonedEl.style.marginBottom='0';
    clonedEl.style.marginLeft='0';
    jQuery.iDrag.helper.append(clonedEl);
    if(elm.dragCfg.onStart)elm.dragCfg.onStart.apply(elm,[clonedEl]);
    dhs=jQuery.iDrag.helper.get(0).style;
    if(elm.dragCfg.autoSize){
      dhs.width='auto';
      dhs.height='auto'
    }
    else{
      dhs.height=elm.dragCfg.oC.hb+'px';
      dhs.width=elm.dragCfg.oC.wb+'px'
    }
    dhs.display='block';
    dhs.marginTop='0px';
    dhs.marginRight='0px';
    dhs.marginBottom='0px';
    dhs.marginLeft='0px';
    jQuery.extend(elm.dragCfg.oC,jQuery.iUtil.getSize(clonedEl));
    if(elm.dragCfg.cursorAt)    {
      if(elm.dragCfg.cursorAt.left) {
        elm.dragCfg.oR.x+=elm.dragCfg.pointer.x-elm.dragCfg.oC.x-elm.dragCfg.cursorAt.left;
        elm.dragCfg.oC.x=elm.dragCfg.pointer.x-elm.dragCfg.cursorAt.left
      }
      if(elm.dragCfg.cursorAt.top){
        elm.dragCfg.oR.y+=elm.dragCfg.pointer.y-elm.dragCfg.oC.y-elm.dragCfg.cursorAt.top;
        elm.dragCfg.oC.y=elm.dragCfg.pointer.y-elm.dragCfg.cursorAt.top
      }
      if(elm.dragCfg.cursorAt.right){
        elm.dragCfg.oR.x+=elm.dragCfg.pointer.x-elm.dragCfg.oC.x-elm.dragCfg.oC.hb+elm.dragCfg.cursorAt.right;
        elm.dragCfg.oC.x=elm.dragCfg.pointer.x-elm.dragCfg.oC.wb+elm.dragCfg.cursorAt.right
      }
      if(elm.dragCfg.cursorAt.bottom){
        elm.dragCfg.oR.y+=elm.dragCfg.pointer.y-elm.dragCfg.oC.y-elm.dragCfg.oC.hb+elm.dragCfg.cursorAt.bottom;
        elm.dragCfg.oC.y=elm.dragCfg.pointer.y-elm.dragCfg.oC.hb+elm.dragCfg.cursorAt.bottom
      }
    }
    elm.dragCfg.nx=elm.dragCfg.oR.x;
    elm.dragCfg.ny=elm.dragCfg.oR.y;
    if(elm.dragCfg.insideParent||elm.dragCfg.containment=='parent'){
      parentBorders=jQuery.iUtil.getBorder(elm.parentNode,true);
      elm.dragCfg.oC.x=elm.offsetLeft+(jQuery.browser.msie?0:jQuery.browser.opera?-parentBorders.l:parentBorders.l);
      elm.dragCfg.oC.y=elm.offsetTop+(jQuery.browser.msie?0:jQuery.browser.opera?-parentBorders.t:parentBorders.t);
      jQuery(elm.parentNode).append(jQuery.iDrag.helper.get(0))
    }
    if(elm.dragCfg.containment){
      jQuery.iDrag.getContainment(elm);
      elm.dragCfg.onDrag.containment=jQuery.iDrag.fitToContainer
    }
    if(elm.dragCfg.si){
      jQuery.iSlider.modifyContainer(elm)
    }
    dhs.left=elm.dragCfg.oC.x-elm.dragCfg.diffX+'px';
    dhs.top=elm.dragCfg.oC.y-elm.dragCfg.diffY+'px';
    dhs.width=elm.dragCfg.oC.wb+'px';
    dhs.height=elm.dragCfg.oC.hb+'px';
    jQuery.iDrag.dragged.dragCfg.prot=false;
    if(elm.dragCfg.gx){
      elm.dragCfg.onDrag.grid=jQuery.iDrag.snapToGrid
    }
    if(elm.dragCfg.zIndex!=false){
      jQuery.iDrag.helper.css('zIndex',elm.dragCfg.zIndex)
    }
    if(elm.dragCfg.opacity){
      jQuery.iDrag.helper.css('opacity',elm.dragCfg.opacity);
      if(window.ActiveXObject){
        jQuery.iDrag.helper.css('filter','alpha(opacity='+elm.dragCfg.opacity*100+')')
      }
    }
    if(elm.dragCfg.ghosting==false){
      dEs.display='none'
    }
    if(jQuery.iDrop&&jQuery.iDrop.count>0){
      //alert('sssss');
      jQuery.iDrop.highlight(elm)
    }
    return false
  },

	getContainment:function(elm){if(elm.dragCfg.containment.constructor==String){if(elm.dragCfg.containment=='parent'){elm.dragCfg.cont=jQuery.extend({x:0,y:0},jQuery.iUtil.getSize(elm.parentNode));contBorders=jQuery.iUtil.getBorder(elm.parentNode,true);elm.dragCfg.cont.w=elm.dragCfg.cont.wb-contBorders.l-contBorders.r;elm.dragCfg.cont.h=elm.dragCfg.cont.hb-contBorders.t-contBorders.b}else if(elm.dragCfg.containment=='document'){clnt=jQuery.iUtil.getClient();elm.dragCfg.cont={x:0,y:0,w:clnt.w,h:clnt.h}}}else if(elm.dragCfg.containment.constructor==Array){elm.dragCfg.cont={x:parseInt(elm.dragCfg.containment[0])||0,y:parseInt(elm.dragCfg.containment[1])||0,w:parseInt(elm.dragCfg.containment[2])||0,h:parseInt(elm.dragCfg.containment[3])||0}}elm.dragCfg.cont.dx=elm.dragCfg.cont.x-elm.dragCfg.oC.x;elm.dragCfg.cont.dy=elm.dragCfg.cont.y-elm.dragCfg.oC.y},

	hidehelper:function(dragged){
    if(dragged.dragCfg.insideParent||dragged.dragCfg.containment=='parent'){
      jQuery('body',document).append(jQuery.iDrag.helper.get(0))
    }
    jQuery.iDrag.helper.empty().hide().css('opacity',1);
    if(window.ActiveXObject){
      jQuery.iDrag.helper.css('filter','alpha(opacity=100)')
    }
  },

	dragstop:function(e){
	//alert('dragstop');
    jQuery(document).unbind('mousemove',jQuery.iDrag.dragmove).unbind('mouseup',jQuery.iDrag.dragstop);
      if(jQuery.iDrag.dragged==null){
        return
      }
      dragged=jQuery.iDrag.dragged;
      jQuery.iDrag.dragged=null;
      if(dragged.dragCfg.init==false){
        return false
      }
      if(dragged.dragCfg.so==true){
        jQuery(dragged).css('position',dragged.dragCfg.oP)
      }
      dEs=dragged.style;
      if(dragged.si){
        jQuery.iDrag.helper.css('cursor','move')
      }
      if(dragged.dragCfg.revert==false){
        if(dragged.dragCfg.fx>0){
          x=new jQuery.fx(dragged,dragged.dragCfg.fx,'left');
          y=new jQuery.fx(dragged,dragged.dragCfg.fx,'top');
          x.custom(dragged.dragCfg.oR.x,dragged.dragCfg.nRx);
          y.custom(dragged.dragCfg.oR.y,dragged.dragCfg.nRy)
        }
        else{
          dragged.style.left=dragged.dragCfg.nRx+'px';
          dragged.style.top=dragged.dragCfg.nRy+'px'
        }
        jQuery.iDrag.hidehelper(dragged);
        if(dragged.dragCfg.ghosting==false){
          jQuery(dragged).css('display',dragged.dragCfg.oD)
        }
      }
      else if(dragged.dragCfg.fx>0){
        dragged.dragCfg.prot=true;
        if(jQuery.iDrop&&jQuery.iDrop.overzone&&jQuery.iSort){
          dh=jQuery.iUtil.getPosition(jQuery.iSort.helper.get(0))
        }
        else {
          dh=false
        }
        jQuery.iDrag.helper.animate({left:dh?dh.x:dragged.dragCfg.oC.x,top:dh?dh.y:dragged.dragCfg.oC.y},
          dragged.dragCfg.fx,
          function(){
            dragged.dragCfg.prot=false;
            if(dragged.dragCfg.ghosting==false){
              dragged.style.display=dragged.dragCfg.oD
            }
            jQuery.iDrag.hidehelper(dragged)
          }
        )
      }
      else{
        jQuery.iDrag.hidehelper(dragged);
        if(dragged.dragCfg.ghosting==false){
          jQuery(dragged).css('display',dragged.dragCfg.oD)
        }
      }
      if(jQuery.iDrop&&jQuery.iDrop.count>0){
        jQuery.iDrop.checkdrop(dragged)
      }
      if(jQuery.iSort&&jQuery.iDrop.overzone){
        jQuery.iSort.check(dragged)
      }
      if(dragged.dragCfg.onChange&&(dragged.dragCfg.nRx!=dragged.dragCfg.oR.x||dragged.dragCfg.nRy!=dragged.dragCfg.oR.y)){
        dragged.dragCfg.onChange.apply(dragged,dragged.dragCfg.lastSi)
      }
      if(dragged.dragCfg.onStop)dragged.dragCfg.onStop.apply(dragged);
      return true;
    },

	snapToGrid:function(x,y,dx,dy){if(dx!=0)dx=parseInt((dx+(this.dragCfg.gx*dx/Math.abs(dx))/2)/this.dragCfg.gx)*this.dragCfg.gx;if(dy!=0)dy=parseInt((dy+(this.dragCfg.gy*dy/Math.abs(dy))/2)/this.dragCfg.gy)*this.dragCfg.gy;return{dx:dx,dy:dy,x:0,y:0}},

	fitToContainer:function(x,y,dx,dy){dx=Math.min(Math.max(dx,this.dragCfg.cont.dx),this.dragCfg.cont.w+this.dragCfg.cont.dx-this.dragCfg.oC.wb);dy=Math.min(Math.max(dy,this.dragCfg.cont.dy),(this.dragCfg.cont.h+this.dragCfg.cont.dy-this.dragCfg.oC.hb));return{dx:dx,dy:dy,x:0,y:0}},

	dragmove:function(e){
    if(jQuery.iDrag.dragged==null||jQuery.iDrag.dragged.dragCfg.prot==true){return }
    var dragged=jQuery.iDrag.dragged;dragged.dragCfg.currentPointer=jQuery.iUtil.getPointer(e);
    if(dragged.dragCfg.init==false){
      distance=Math.sqrt(Math.pow(dragged.dragCfg.pointer.x-dragged.dragCfg.currentPointer.x,2)+Math.pow(dragged.dragCfg.pointer.y-dragged.dragCfg.currentPointer.y,2));
      if(distance<dragged.dragCfg.snapDistance){return}
      else{jQuery.iDrag.dragstart(e)}
    }
    dx=dragged.dragCfg.currentPointer.x-dragged.dragCfg.pointer.x;
    dy=dragged.dragCfg.currentPointer.y-dragged.dragCfg.pointer.y;
    for(i in dragged.dragCfg.onDrag){
      newCoords=dragged.dragCfg.onDrag[i].apply(dragged,[dragged.dragCfg.oR.x+dx,dragged.dragCfg.oR.y+dy,dx,dy]);
      if(newCoords.constructor==Object){
        dx=i!='user'?newCoords.dx:(newCoords.x-dragged.dragCfg.oR.x);
        dy=i!='user'?newCoords.dy:(newCoords.y-dragged.dragCfg.oR.y)
      }
    }
    dragged.dragCfg.nx=dragged.dragCfg.oC.x+dx-dragged.dragCfg.diffX;
    dragged.dragCfg.ny=dragged.dragCfg.oC.y+dy-dragged.dragCfg.diffY;
    if(dragged.dragCfg.si&&(dragged.dragCfg.onSlide||dragged.dragCfg.onChange)){
      jQuery.iSlider.onSlide(dragged,dragged.dragCfg.nx,dragged.dragCfg.ny)
    }
    if(!dragged.dragCfg.axis||dragged.dragCfg.axis=='horizontally'){
      dragged.dragCfg.nRx=dragged.dragCfg.oR.x+dx;
      jQuery.iDrag.helper.get(0).style.left=dragged.dragCfg.nx+'px'
    }
    if(!dragged.dragCfg.axis||dragged.dragCfg.axis=='vertically'){
      dragged.dragCfg.nRy=dragged.dragCfg.oR.y+dy;
      jQuery.iDrag.helper.get(0).style.top=dragged.dragCfg.ny+'px'
    }
    if(jQuery.iDrop&&jQuery.iDrop.count>0){
      jQuery.iDrop.checkhover(dragged,clonedEl)
    }
    return false
  },

	build:function(o){
	//alert('Not here build');
//	alert('two build');
  if(!jQuery.iDrag.helper){jQuery('body',document).append('<div id="dragHelper"></div>');jQuery.iDrag.helper=jQuery('#dragHelper');el=jQuery.iDrag.helper.get(0);els=el.style;els.position='absolute';els.display='none';els.cursor='move';els.listStyle='none';els.overflow='hidden';if(window.ActiveXObject){el.onselectstart=function(){return false};el.ondragstart=function(){return false}}else{els.mozUserSelect='none';els.userSelect='none'}}if(!o){o={}}return this.each(function(){if(this.isDraggable&&!jQuery.iUtil)return;if(window.ActiveXObject){this.onselectstart=function(){return false};this.ondragstart=function(){return false}}var dhe=o.handle?jQuery(this).find(o.handle):jQuery(this);this.dragCfg={revert:o.revert?true:false,ghosting:o.ghosting?true:false,so:o.so?o.so:false,si:o.si?o.si:false,insideParent:o.insideParent?o.insideParent:false,zIndex:o.zIndex?parseInt(o.zIndex)||0:false,opacity:o.opacity?parseFloat(o.opacity):false,fx:parseInt(o.fx)||null,hpc:o.hpc?o.hpc:false,onDrag:{},pointer:{},onStart:o.onStart&&o.onStart.constructor==Function?o.onStart:false,onStop:o.onStop&&o.onStop.constructor==Function?o.onStop:false,onChange:o.onChange&&o.onChange.constructor==Function?o.onChange:false,axis:/vertically|horizontally/.test(o.axis)?o.axis:false,snapDistance:o.snapDistance?parseInt(o.snapDistance)||0:0,cursorAt:o.cursorAt?o.cursorAt:false,autoSize:o.autoSize?true:false};if(o.onDrag&&o.onDrag.constructor==Function)this.dragCfg.onDrag.user=o.onDrag;if(o.containment&&((o.containment.constructor==String&&(o.containment=='parent'||o.containment=='document'))||(o.containment.constructor==Array&&o.containment.length==4))){this.dragCfg.containment=o.containment}if(o.fractions){this.dragCfg.fractions=o.fractions}if(o.grid){if(typeof o.grid=='number'){this.dragCfg.gx=parseInt(o.grid)||1;this.dragCfg.gy=parseInt(o.grid)||1}else if(o.grid.length==2){this.dragCfg.gx=parseInt(o.grid[0])||1;this.dragCfg.gy=parseInt(o.grid[1])||1}}if(o.onSlide&&o.onSlide.constructor==Function){this.dragCfg.onSlide=o.onSlide}this.isDraggable=true;dhe.get(0).dragElem=this;dhe.bind('mousedown',jQuery.iDrag.draginit)})
	}};

	jQuery.fn.extend({DraggableDestroy:jQuery.iDrag.destroy,Draggable:jQuery.iDrag.build});jQuery.iDrop={fit:function(zonex,zoney,zonew,zoneh){return zonex<=jQuery.iDrag.dragged.dragCfg.nx&&(zonex+zonew)>=(jQuery.iDrag.dragged.dragCfg.nx+jQuery.iDrag.dragged.dragCfg.oC.w)&&zoney<=jQuery.iDrag.dragged.dragCfg.ny&&(zoney+zoneh)>=(jQuery.iDrag.dragged.dragCfg.ny+jQuery.iDrag.dragged.dragCfg.oC.h)?true:false},

	intersect:function(zonex,zoney,zonew,zoneh){return!(zonex>(jQuery.iDrag.dragged.dragCfg.nx+jQuery.iDrag.dragged.dragCfg.oC.w)||(zonex+zonew)<jQuery.iDrag.dragged.dragCfg.nx||zoney>(jQuery.iDrag.dragged.dragCfg.ny+jQuery.iDrag.dragged.dragCfg.oC.h)||(zoney+zoneh)<jQuery.iDrag.dragged.dragCfg.ny)?true:false},

	pointer:function(zonex,zoney,zonew,zoneh){return zonex<jQuery.iDrag.dragged.dragCfg.currentPointer.x&&(zonex+zonew)>jQuery.iDrag.dragged.dragCfg.currentPointer.x&&zoney<jQuery.iDrag.dragged.dragCfg.currentPointer.y&&(zoney+zoneh)>jQuery.iDrag.dragged.dragCfg.currentPointer.y?true:false},

	overzone:false,highlighted:{},count:0,zones:{},

	highlight:function(elm){if(jQuery.iDrag.dragged==null){return}var i;jQuery.iDrop.highlighted={};oneIsSortable=false;for(i in jQuery.iDrop.zones){if(jQuery.iDrop.zones[i]!=null){iEL=jQuery.iDrop.zones[i].get(0);if(jQuery.className.has(jQuery.iDrag.dragged,iEL.dropCfg.a)){if(iEL.dropCfg.m==false){iEL.dropCfg.p=jQuery.extend(jQuery.iUtil.getPosition(iEL),jQuery.iUtil.getSize(iEL));iEL.dropCfg.m=true}if(iEL.dropCfg.ac){jQuery.iDrop.zones[i].addClass(iEL.dropCfg.ac)}jQuery.iDrop.highlighted[i]=jQuery.iDrop.zones[i];if(jQuery.iSort&&iEL.dropCfg.s==true){iEL.dropCfg.el=jQuery('.'+iEL.dropCfg.a,iEL);elm.style.display='none';jQuery.iSort.measure(iEL);elm.style.display=elm.dragCfg.oD;oneIsSortable=true}}}}if(oneIsSortable){jQuery.iSort.start()}},

	remeasure:function(){jQuery.iDrop.highlighted={};for(i in jQuery.iDrop.zones){if(jQuery.iDrop.zones[i]!=null){iEL=jQuery.iDrop.zones[i].get(0);if(jQuery.className.has(jQuery.iDrag.dragged,iEL.dropCfg.a)){iEL.dropCfg.p=jQuery.extend(jQuery.iUtil.getPosition(iEL),jQuery.iUtil.getSize(iEL));if(iEL.dropCfg.ac){jQuery.iDrop.zones[i].addClass(iEL.dropCfg.ac)}jQuery.iDrop.highlighted[i]=jQuery.iDrop.zones[i];if(jQuery.iSort&&iEL.dropCfg.s==true){iEL.dropCfg.el=jQuery('.'+iEL.dropCfg.a,iEL);elm.style.display='none';jQuery.iSort.measure(iEL);elm.style.display=elm.dragCfg.oD;oneIsSortable=true}}}}},

	checkhover:function(e){if(jQuery.iDrag.dragged==null){return}jQuery.iDrop.overzone=false;var i;applyOnHover=false;for(i in jQuery.iDrop.highlighted){iEL=jQuery.iDrop.highlighted[i].get(0);if(jQuery.iDrop.overzone==false&&jQuery.iDrop[iEL.dropCfg.t](iEL.dropCfg.p.x,iEL.dropCfg.p.y,iEL.dropCfg.p.wb,iEL.dropCfg.p.hb)){if(iEL.dropCfg.hc&&iEL.dropCfg.h==false){jQuery.iDrop.highlighted[i].removeClass(iEL.dropCfg.ac);jQuery.iDrop.highlighted[i].addClass(iEL.dropCfg.hc)}if(iEL.dropCfg.h==false&&iEL.dropCfg.onHover){applyOnHover=true}iEL.dropCfg.h=true;jQuery.iDrop.overzone=iEL;if(jQuery.iSort&&iEL.dropCfg.s==true){jQuery.iSort.helper.get(0).className=iEL.dropCfg.shc;jQuery.iSort.checkhover(iEL)}}else{if(iEL.dropCfg.onOut&&iEL.dropCfg.h==true){iEL.dropCfg.onOut.apply(iEL,[e,clonedEl,iEL.dropCfg.fx])}if(iEL.dropCfg.hc){jQuery.iDrop.highlighted[i].removeClass(iEL.dropCfg.hc);jQuery.iDrop.highlighted[i].addClass(iEL.dropCfg.ac)}iEL.dropCfg.h=false}}if(jQuery.iSort&&jQuery.iDrop.overzone==false){jQuery.iSort.helper.get(0).style.display='none';jQuery('body').append(jQuery.iSort.helper.get(0))}if(applyOnHover){jQuery.iDrop.overzone.dropCfg.onHover.apply(jQuery.iDrop.overzone,[e,clonedEl])}},

	checkdrop:function(e){var i;for(i in jQuery.iDrop.highlighted){iEL=jQuery.iDrop.highlighted[i].get(0);if(iEL.dropCfg.ac){jQuery.iDrop.highlighted[i].removeClass(iEL.dropCfg.ac)}if(iEL.dropCfg.hc){jQuery.iDrop.highlighted[i].removeClass(iEL.dropCfg.hc)}if(iEL.dropCfg.s){jQuery.iSort.changed[jQuery.iSort.changed.length]=i}if(iEL.dropCfg.onDrop&&iEL.dropCfg.h==true){iEL.dropCfg.h=false;iEL.dropCfg.onDrop.apply(iEL,[e,iEL.dropCfg.fx])}iEL.dropCfg.m=false;iEL.dropCfg.h=false}jQuery.iDrop.highlighted={}},

	destroy:function(){
  return this.each(function(){if(this.isDroppable){if(this.dropCfg.s){id=jQuery.attr(this,'id');jQuery.iSort.collected[id]=null;jQuery('.'+this.dropCfg.a,this).DraggableDestroy()}jQuery.iDrop.zones['d'+this.idsa]=null;this.isDroppable=false;this.f=null}})},

	build:function(o){
//  alert('three build');
  return this.each(function(){if(this.isDroppable==true||!o.accept||!jQuery.iUtil||!jQuery.iDrag){return}this.dropCfg={a:o.accept,ac:o.activeclass,hc:o.hoverclass,shc:o.helperclass,onDrop:o.ondrop||o.onDrop,onHover:o.onHover||o.onhover,onOut:o.onOut||o.onout,t:o.tolerance&&(o.tolerance=='fit'||o.tolerance=='intersect')?o.tolerance:'pointer',fx:o.fx?o.fx:false,m:false,h:false};if(o.sortable==true&&jQuery.iSort){id=jQuery.attr(this,'id');jQuery.iSort.collected[id]=this.dropCfg.a;this.dropCfg.s=true;if(o.onchange){this.dropCfg.onchange=o.onchange;this.dropCfg.os=jQuery.iSort.serialize(id).hash}}this.isDroppable=true;this.idsa=parseInt(Math.random()*10000);jQuery.iDrop.zones['d'+this.idsa]=jQuery(this);jQuery.iDrop.count++})}};

	jQuery.fn.extend({DroppableDestroy:jQuery.iDrop.destroy,Droppable:jQuery.iDrop.build});jQuery.recallDroppables=jQuery.iDrop.remeasure;jQuery.iTooltip={current:null,focused:false,oldTitle:null,focus:function(e){jQuery.iTooltip.focused=true;jQuery.iTooltip.show(e,this,true)},

	hidefocused:function(e){if(jQuery.iTooltip.current!=this)return;jQuery.iTooltip.focused=false;jQuery.iTooltip.hide(e,this)},

	show:function(e,el,focused){if(jQuery.iTooltip.current!=null)return;if(!el){el=this}jQuery.iTooltip.current=el;pos=jQuery.extend(jQuery.iUtil.getPosition(el),jQuery.iUtil.getSize(el));jEl=jQuery(el);title=jEl.attr('title');href=jEl.attr('href');if(title){jQuery.iTooltip.oldTitle=title;jEl.attr('title','');jQuery('#tooltipTitle').html(title);if(href)jQuery('#tooltipURL').html(href.replace('http://','')).show();else jQuery('#tooltipURL').html('').hide();helper=jQuery('#tooltipHelper');if(el.tooltipCFG.className){helper.get(0).className=el.tooltipCFG.className}else{helper.get(0).className=''}helperSize=jQuery.iUtil.getSize(helper.get(0));filteredPosition=focused&&el.tooltipCFG.position=='mouse'?'bottom':el.tooltipCFG.position;switch(filteredPosition){case'top':ny=pos.y-helperSize.hb;nx=pos.x;break;case'left':ny=pos.y;nx=pos.x-helperSize.wb;break;case'right':ny=pos.y;nx=pos.x+pos.wb;break;case'mouse':jQuery('body').bind('mousemove',jQuery.iTooltip.mousemove);pointer=jQuery.iUtil.getPointer(e);ny=pointer.y+15;nx=pointer.x+15;break;default:ny=pos.y+pos.hb;nx=pos.x;break}helper.css({top:ny+'px',left:nx+'px'});if(el.tooltipCFG.delay==false){helper.show()}else{helper.fadeIn(el.tooltipCFG.delay)}if(el.tooltipCFG.onShow)el.tooltipCFG.onShow.apply(el);jEl.bind('mouseout',jQuery.iTooltip.hide).bind('blur',jQuery.iTooltip.hidefocused)}},

	mousemove:function(e){
    if(jQuery.iTooltip.current==null){
      jQuery('body').unbind('mousemove',jQuery.iTooltip.mousemove);
      return
    }
    pointer=jQuery.iUtil.getPointer(e);jQuery('#tooltipHelper').css({top:pointer.y+15+'px',left:pointer.x+15+'px'})
  },

	hide:function(e,el){if(!el){el=this}if(jQuery.iTooltip.focused!=true&&jQuery.iTooltip.current==el){jQuery.iTooltip.current=null;jQuery('#tooltipHelper').fadeOut(1);jQuery(el).attr('title',jQuery.iTooltip.oldTitle).unbind('mouseout',jQuery.iTooltip.hide).unbind('blur',jQuery.iTooltip.hidefocused);if(el.tooltipCFG.onHide)el.tooltipCFG.onHide.apply(el);jQuery.iTooltip.oldTitle=null}},

	build:function(options){
//alert('four build');
  if(!jQuery.iTooltip.helper){jQuery('body').append('<div id="tooltipHelper"><div id="tooltipTitle"></div><div id="tooltipURL"></div></div>');jQuery('#tooltipHelper').css({position:'absolute',zIndex:3000,display:'none'});jQuery.iTooltip.helper=true}return this.each(function(){if(jQuery.attr(this,'title')){this.tooltipCFG={position:/top|bottom|left|right|mouse/.test(options.position)?options.position:'bottom',className:options.className?options.className:false,delay:options.delay?options.delay:false,onShow:options.onShow&&options.onShow.constructor==Function?options.onShow:false,onHide:options.onHide&&options.onHide.constructor==Function?options.onHide:false};var el=jQuery(this);el.bind('mouseover',jQuery.iTooltip.show);el.bind('focus',jQuery.iTooltip.focus)}})}

	};jQuery.fn.ToolTip=jQuery.iTooltip.build;
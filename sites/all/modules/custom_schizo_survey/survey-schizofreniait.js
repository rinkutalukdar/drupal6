 //add css file
cit_include_css("http://CIT/ui.all.css");
//removed jquery for drupal website 
/*
 * jQuery UI 1.5.3
 *
 * Copyright (c) 2008 Paul Bakaus (ui.jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
;
(function($){

  $.ui = {
    plugin: {
      add: function(module, option, set) {
        var proto = $.ui[module].prototype;
        for(var i in set) {
          proto.plugins[i] = proto.plugins[i] || [];
          proto.plugins[i].push([option, set[i]]);
        }
      },
      call: function(instance, name, args) {
        var set = instance.plugins[name];
        if(!set) {
          return;
        }

        for (var i = 0; i < set.length; i++) {
          if (instance.options[set[i][0]]) {
            set[i][1].apply(instance.element, args);
          }
        }
      }
    },
    cssCache: {},
    css: function(name) {
      if ($.ui.cssCache[name]) {
        return $.ui.cssCache[name];
      }
      var tmp = $('<div class="ui-gen">').addClass(name).css({
        position:'absolute',
        top:'-5000px',
        left:'-5000px',
        display:'block'
      }).appendTo('body');

      //if (!$.browser.safari)
      //tmp.appendTo('body');

      //Opera and Safari set width and height to 0px instead of auto
      //Safari returns rgba(0,0,0,0) when bgcolor is not set
      $.ui.cssCache[name] = !!(
        (!(/auto|default/).test(tmp.css('cursor')) || (/^[1-9]/).test(tmp.css('height')) || (/^[1-9]/).test(tmp.css('width')) ||
          !(/none/).test(tmp.css('backgroundImage')) || !(/transparent|rgba\(0, 0, 0, 0\)/).test(tmp.css('backgroundColor')))
        );
      try {
        $('body').get(0).removeChild(tmp.get(0));
      } catch(e){}
      return $.ui.cssCache[name];
    },
    disableSelection: function(el) {
      $(el).attr('unselectable', 'on').css('MozUserSelect', 'none');
    },
    enableSelection: function(el) {
      $(el).attr('unselectable', 'off').css('MozUserSelect', '');
    },
    hasScroll: function(e, a) {
      var scroll = /top/.test(a||"top") ? 'scrollTop' : 'scrollLeft', has = false;
      if (e[scroll] > 0) return true;
      e[scroll] = 1;
      has = e[scroll] > 0 ? true : false;
      e[scroll] = 0;
      return has;
    }
  };  /** jQuery core modifications and additions **/

  var _remove = $.fn.remove;
  $.fn.remove = function() {
    $("*", this).add(this).triggerHandler("remove");
    return _remove.apply(this, arguments );
  };

  // $.widget is a factory to create jQuery plugins
  // taking some boilerplate code out of the plugin code
  // created by Scott GonzÃƒÂ¡lez and JÃƒÂ¶rn Zaefferer
  function getter(namespace, plugin, method) {
    var methods = $[namespace][plugin].getter || [];
    methods = (typeof methods == "string" ? methods.split(/,?\s+/) : methods);
    return ($.inArray(method, methods) != -1);
  }

  $.widget = function(name, prototype) {
    var namespace = name.split(".")[0];
    name = name.split(".")[1];

    // create plugin method
    $.fn[name] = function(options) {
      var isMethodCall = (typeof options == 'string'),
      args = Array.prototype.slice.call(arguments, 1);

      if (isMethodCall && getter(namespace, name, options)) {
        var instance = $.data(this[0], name);
        return (instance ? instance[options].apply(instance, args)
          : undefined);
      }

      return this.each(function() {
        var instance = $.data(this, name);
        if (isMethodCall && instance && $.isFunction(instance[options])) {
          instance[options].apply(instance, args);
        } else if (!isMethodCall) {
          $.data(this, name, new $[namespace][name](this, options));
        }
      });
    };

    // create widget constructor
    $[namespace][name] = function(element, options) {
      var self = this;

      this.widgetName = name;
      this.widgetBaseClass = namespace + '-' + name;

      this.options = $.extend({}, $.widget.defaults, $[namespace][name].defaults, options);
      this.element = $(element)
      .bind('setData.' + name, function(e, key, value) {
        return self.setData(key, value);
      })
      .bind('getData.' + name, function(e, key) {
        return self.getData(key);
      })
      .bind('remove', function() {
        return self.destroy();
      });
      this.init();
    };

    // add widget prototype
    $[namespace][name].prototype = $.extend({}, $.widget.prototype, prototype);
  };

  $.widget.prototype = {
    init: function() {},
    destroy: function() {
      this.element.removeData(this.widgetName);
    },

    getData: function(key) {
      return this.options[key];
    },
    setData: function(key, value) {
      this.options[key] = value;

      if (key == 'disabled') {
        this.element[value ? 'addClass' : 'removeClass'](
          this.widgetBaseClass + '-disabled');
      }
    },

    enable: function() {
      this.setData('disabled', false);
    },
    disable: function() {
      this.setData('disabled', true);
    }
  };

  $.widget.defaults = {
    disabled: false
  };  /** Mouse Interaction Plugin **/

  $.ui.mouse = {
    mouseInit: function() {
      var self = this;

      this.element.bind('mousedown.'+this.widgetName, function(e) {
        return self.mouseDown(e);
      });

      // Prevent text selection in IE
      if ($.browser.msie) {
        this._mouseUnselectable = this.element.attr('unselectable');
        this.element.attr('unselectable', 'on');
      }

      this.started = false;
    },

    // TODO: make sure destroying one instance of mouse doesn't mess with
    // other instances of mouse
    mouseDestroy: function() {
      this.element.unbind('.'+this.widgetName);

      // Restore text selection in IE
      ($.browser.msie
        && this.element.attr('unselectable', this._mouseUnselectable));
    },

    mouseDown: function(e) {
      // we may have missed mouseup (out of window)
      (this._mouseStarted && this.mouseUp(e));

      this._mouseDownEvent = e;

      var self = this,
      btnIsLeft = (e.which == 1),
      elIsCancel = (typeof this.options.cancel == "string" ? $(e.target).parents().add(e.target).filter(this.options.cancel).length : false);
      if (!btnIsLeft || elIsCancel || !this.mouseCapture(e)) {
        return true;
      }

      this._mouseDelayMet = !this.options.delay;
      if (!this._mouseDelayMet) {
        this._mouseDelayTimer = setTimeout(function() {
          self._mouseDelayMet = true;
        }, this.options.delay);
      }

      if (this.mouseDistanceMet(e) && this.mouseDelayMet(e)) {
        this._mouseStarted = (this.mouseStart(e) !== false);
        if (!this._mouseStarted) {
          e.preventDefault();
          return true;
        }
      }

      // these delegates are required to keep context
      this._mouseMoveDelegate = function(e) {
        return self.mouseMove(e);
      };
      this._mouseUpDelegate = function(e) {
        return self.mouseUp(e);
      };
      $(document)
      .bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
      .bind('mouseup.'+this.widgetName, this._mouseUpDelegate);

      return false;
    },

    mouseMove: function(e) {
      // IE mouseup check - mouseup happened when mouse was out of window
      if ($.browser.msie && !e.button) {
        return this.mouseUp(e);
      }

      if (this._mouseStarted) {
        this.mouseDrag(e);
        return false;
      }

      if (this.mouseDistanceMet(e) && this.mouseDelayMet(e)) {
        this._mouseStarted =
        (this.mouseStart(this._mouseDownEvent, e) !== false);
        (this._mouseStarted ? this.mouseDrag(e) : this.mouseUp(e));
      }

      return !this._mouseStarted;
    },

    mouseUp: function(e) {
      $(document)
      .unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
      .unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);

      if (this._mouseStarted) {
        this._mouseStarted = false;
        this.mouseStop(e);
      }

      return false;
    },

    mouseDistanceMet: function(e) {
      return (Math.max(
        Math.abs(this._mouseDownEvent.pageX - e.pageX),
        Math.abs(this._mouseDownEvent.pageY - e.pageY)
        ) >= this.options.distance
      );
    },

    mouseDelayMet: function(e) {
      return this._mouseDelayMet;
    },

    // These are placeholder methods, to be overriden by extending plugin
    mouseStart: function(e) {},
    mouseDrag: function(e) {},
    mouseStop: function(e) {},
    mouseCapture: function(e) {
      return true;
    }
  };

  $.ui.mouse.defaults = {
    cancel: null,
    distance: 1,
    delay: 0
  };

})(jQuery);

/*
 * jQuery UI Dialog
 *
 * Copyright (c) 2008 Richard D. Worth (rdworth.org)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 *	ui.resizable.js
 */
(function($){
  var setDataSwitch = {
    dragStart: "start.draggable",
    drag: "drag.draggable",
    dragStop: "stop.draggable",
    maxHeight: "maxHeight.resizable",
    minHeight: "minHeight.resizable",
    maxWidth: "maxWidth.resizable",
    minWidth: "minWidth.resizable",
    resizeStart: "start.resizable",
    resize: "drag.resizable",
    resizeStop: "stop.resizable"
  };

  $.widget("ui.dialog", {
    init: function() {
      var self = this,
      options = this.options,
      resizeHandles = typeof options.resizable == 'string'? options.resizable: 'n,e,s,w,se,sw,ne,nw',
      uiDialogContent = this.element.addClass('ui-dialog-content').wrap('<div/>').wrap('<div/>'),
      uiDialogContainer = (this.uiDialogContainer = uiDialogContent.parent().addClass('ui-dialog-container').css({
          position: 'relative',
          width: '100%',
          height: '100%'
        })),
     title = options.title || uiDialogContent.attr('title') || '',
      uiDialogTitlebar = (this.uiDialogTitlebar =
        $('<div class="ui-dialog-titlebar"/>')).append('<span class="ui-dialog-title">' + title + '</span>').append('<a href="#" class="ui-dialog-titlebar-close"><span>X</span></a>').prependTo(uiDialogContainer),
      uiDialog = (this.uiDialog = uiDialogContainer.parent())
      .appendTo(document.body)
      .hide()
      .addClass('ui-dialog')
      .addClass(options.dialogClass)
      // add content classes to dialog
      // to inherit theme at top level of element
      .addClass(uiDialogContent.attr('className'))
      .removeClass('ui-dialog-content')

      .css({
        position: 'absolute',
        width: options.width,
        height: options.height,
        overflow: 'hidden',
        zIndex: options.zIndex
      })

      // setting tabIndex makes the div focusable
     // setting outline to 0 prevents a border on focus in Mozilla
      .attr('tabIndex', -1).css('outline', 0).keydown(function(ev) {
        if (options.closeOnEscape) {
          var ESC = 27;
          (ev.keyCode && ev.keyCode == ESC && self.close());
       }
     })
      .mousedown(function() {
        self.moveToTop();
      }),

      uiDialogButtonPane = (this.uiDialogButtonPane = $('<div/>'))
      .addClass('ui-dialog-buttonpane').css({
        position: 'absolute',
        bottom: 0
      })
      .appendTo(uiDialog);

      this.uiDialogTitlebarClose = $('.ui-dialog-titlebar-close', uiDialogTitlebar)
      .hover(
        function() {
          $(this).addClass('ui-dialog-titlebar-close-hover');
        },
        function() {
          $(this).removeClass('ui-dialog-titlebar-close-hover');
        }
        )
      .mousedown(function(ev) {
        ev.stopPropagation();
      })
      .click(function() {
        self.close();
        return false;
      });

      this.uiDialogTitlebar.find("*").add(this.uiDialogTitlebar).each(function() {
        $.ui.disableSelection(this);
      });

      if ($.fn.draggable) {
        uiDialog.draggable({
          cancel: '.ui-dialog-content',
          helper: options.dragHelper,
          handle: '.ui-dialog-titlebar',
          start: function(e, ui) {
            self.moveToTop();
            (options.dragStart && options.dragStart.apply(self.element[0], arguments));
          },
          drag: function(e, ui) {
            (options.drag && options.drag.apply(self.element[0], arguments));
          },
          stop: function(e, ui) {
            (options.dragStop && options.dragStop.apply(self.element[0], arguments));
            $.ui.dialog.overlay.resize();
          }
        });
        (options.draggable || uiDialog.draggable('disable'));
      }

      if ($.fn.resizable) {
        uiDialog.resizable({
          cancel: '.ui-dialog-content',
          helper: options.resizeHelper,
          maxWidth: options.maxWidth,
          maxHeight: options.maxHeight,
          minWidth: options.minWidth,
          minHeight: options.minHeight,
          start: function() {
            (options.resizeStart && options.resizeStart.apply(self.element[0], arguments));
          },
          resize: function(e, ui) {
            (options.autoResize && self.size.apply(self));
            (options.resize && options.resize.apply(self.element[0], arguments));
          },
          handles: resizeHandles,
          stop: function(e, ui) {
            (options.autoResize && self.size.apply(self));
            (options.resizeStop && options.resizeStop.apply(self.element[0], arguments));
            $.ui.dialog.overlay.resize();
          }
        });
        (options.resizable || uiDialog.resizable('disable'));
      }

      this.createButtons(options.buttons);
      this.isOpen = false;

      (options.bgiframe && $.fn.bgiframe && uiDialog.bgiframe());
      (options.autoOpen && this.open());
    },

    setData: function(key, value){
      (setDataSwitch[key] && this.uiDialog.data(setDataSwitch[key], value));
      switch (key) {
        case "buttons":
          this.createButtons(value);
          break;
        case "draggable":
          this.uiDialog.draggable(value ? 'enable' : 'disable');
          break;
        case "height":
          this.uiDialog.height(value);
          break;
        case "position":
          this.position(value);
          break;
        case "resizable":
          (typeof value == 'string' && this.uiDialog.data('handles.resizable', value));
          this.uiDialog.resizable(value ? 'enable' : 'disable');
          break;
        case "title":
          $(".ui-dialog-title", this.uiDialogTitlebar).text(value);
          break;
        case "width":
          this.uiDialog.width(value);
          break;
      }

      $.widget.prototype.setData.apply(this, arguments);
    },

    position: function(pos) {
      var wnd = $(window), doc = $(document),
      pTop = doc.scrollTop(), pLeft = doc.scrollLeft(),
      minTop = pTop;

      if ($.inArray(pos, ['center','top','right','bottom','left']) >= 0) {
        pos = [
        pos == 'right' || pos == 'left' ? pos : 'center',
        pos == 'top' || pos == 'bottom' ? pos : 'middle'
        ];
      }
      if (pos.constructor != Array) {
        pos = ['center', 'middle'];
      }
      if (pos[0].constructor == Number) {
        pLeft += pos[0];
      } else {
        switch (pos[0]) {
          case 'left':
            pLeft += 0;
            break;
          case 'right':
            pLeft += wnd.width() - this.uiDialog.width();
            break;
          default:
          case 'center':
            pLeft += (wnd.width() - this.uiDialog.width()) / 2;
        }
      }
      if (pos[1].constructor == Number) {
        pTop += pos[1];
      } else {
        switch (pos[1]) {
          case 'top':
            pTop += 0;
            break;
          case 'bottom':
            pTop += wnd.height() - this.uiDialog.height();
            break;
          default:
          case 'middle':
            pTop += (wnd.height() - this.uiDialog.height()) / 2;
        }
      }

      // prevent the dialog from being too high (make sure the titlebar
      // is accessible)
      pTop = Math.max(pTop, minTop);
      this.uiDialog.css({
        top: pTop,
        left: pLeft
      });
    },

    size: function() {
      var container = this.uiDialogContainer,
      titlebar = this.uiDialogTitlebar,
      content = this.element,
      tbMargin = parseInt(content.css('margin-top'),10) + parseInt(content.css('margin-bottom'),10),
      lrMargin = parseInt(content.css('margin-left'),10) + parseInt(content.css('margin-right'),10);
      content.height(container.height() - titlebar.outerHeight() - tbMargin);
      content.width(container.width() - lrMargin);
    },

    open: function() {
      if (this.isOpen) {
        return;
      }

      this.overlay = this.options.modal ? new $.ui.dialog.overlay(this) : null;
      (this.uiDialog.next().length > 0) && this.uiDialog.appendTo('body');
      this.position(this.options.position);
      this.uiDialog.show(this.options.show);
      this.options.autoResize && this.size();
      this.moveToTop(true);

      // CALLBACK: open
      var openEV = null;
      var openUI = {
        options: this.options
      };
      this.uiDialogTitlebarClose.focus();
      this.element.triggerHandler("dialogopen", [openEV, openUI], this.options.open);

      this.isOpen = true;
    },

    // the force parameter allows us to move modal dialogs to their correct
    // position on open
    moveToTop: function(force) {
      if ((this.options.modal && !force)
        || (!this.options.stack && !this.options.modal)) {
        return this.element.triggerHandler("dialogfocus", [null, {
          options: this.options
        }], this.options.focus);
      }

      var maxZ = this.options.zIndex, options = this.options;
      $('.ui-dialog:visible').each(function() {
        maxZ = Math.max(maxZ, parseInt($(this).css('z-index'), 10) || options.zIndex);
      });
      (this.overlay && this.overlay.$el.css('z-index', ++maxZ));
      this.uiDialog.css('z-index', ++maxZ);

      this.element.triggerHandler("dialogfocus", [null, {
        options: this.options
      }], this.options.focus);
    },

    close: function() {
      (this.overlay && this.overlay.destroy());
      this.uiDialog.hide(this.options.hide);

      // CALLBACK: close
      var closeEV = null;
      var closeUI = {
        options: this.options
      };
      this.element.triggerHandler("dialogclose", [closeEV, closeUI], this.options.close);
      $.ui.dialog.overlay.resize();

      this.isOpen = false;
    },

    destroy: function() {
      (this.overlay && this.overlay.destroy());
      this.uiDialog.hide();
      this.element
      .unbind('.dialog')
      .removeData('dialog')
      .removeClass('ui-dialog-content')
      .hide().appendTo('body');
      this.uiDialog.remove();
    },

    createButtons: function(buttons) {
      var self = this,
      hasButtons = false,
      uiDialogButtonPane = this.uiDialogButtonPane;

      // remove any existing buttons
      uiDialogButtonPane.empty().hide();

      $.each(buttons, function() {
        return !(hasButtons = true);
      });
      if (hasButtons) {
        uiDialogButtonPane.show();
        $.each(buttons, function(name, fn) {
          $('<button/>')
          .text(name)
          .click(function() {
            fn.apply(self.element[0], arguments);
          })
          .appendTo(uiDialogButtonPane);
        });
      }
    }
  });

  $.extend($.ui.dialog, {
    defaults: {
      autoOpen: true,
      autoResize: true,
      bgiframe: false,
      buttons: {},
      closeOnEscape: true,
      draggable: true,
      height: 200,
      minHeight: 100,
      minWidth: 150,
      modal: false,
      overlay: {},
      position: 'center',
      resizable: true,
      stack: true,
      width: 300,
      zIndex: 1000
    },

    overlay: function(dialog) {
      this.$el = $.ui.dialog.overlay.create(dialog);
    }
  });

  $.extend($.ui.dialog.overlay, {
    instances: [],
    events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
      function(e) {
        return e + '.dialog-overlay';
      }).join(' '),
    create: function(dialog) {
      if (this.instances.length === 0) {
        // prevent use of anchors and inputs
        // we use a setTimeout in case the overlay is created from an
        // event that we're going to be cancelling (see #2804)
        setTimeout(function() {
          $('a, :input').bind($.ui.dialog.overlay.events, function() {
            // allow use of the element if inside a dialog and
            // - there are no modal dialogs
            // - there are modal dialogs, but we are in front of the topmost modal
            var allow = false;
            var $dialog = $(this).parents('.ui-dialog');
            if ($dialog.length) {
              var $overlays = $('.ui-dialog-overlay');
              if ($overlays.length) {
                var maxZ = parseInt($overlays.css('z-index'), 10);
                $overlays.each(function() {
                  maxZ = Math.max(maxZ, parseInt($(this).css('z-index'), 10));
                });
                allow = parseInt($dialog.css('z-index'), 10) > maxZ;
              } else {
                allow = true;
              }
            }
            return allow;
          });
        }, 1);

        // allow closing by pressing the escape key
        $(document).bind('keydown.dialog-overlay', function(e) {
          var ESC = 27;
          (e.keyCode && e.keyCode == ESC && dialog.close());
        });

        // handle window resize
        $(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
      }

      var $el = $('<div/>').appendTo(document.body)
      .addClass('ui-dialog-overlay').css($.extend({
        borderWidth: 0,
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: this.width(),
        height: this.height()
      }, dialog.options.overlay));

      (dialog.options.bgiframe && $.fn.bgiframe && $el.bgiframe());

      this.instances.push($el);
      return $el;
    },

    destroy: function($el) {
      this.instances.splice($.inArray(this.instances, $el), 1);

      if (this.instances.length === 0) {
        $('a, :input').add([document, window]).unbind('.dialog-overlay');
      }

      $el.remove();
    },

    height: function() {
      if ($.browser.msie && $.browser.version < 7) {
        var scrollHeight = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
          );
        var offsetHeight = Math.max(
          document.documentElement.offsetHeight,
          document.body.offsetHeight
          );

        if (scrollHeight < offsetHeight) {
          return $(window).height() + 'px';
        } else {
          return scrollHeight + 'px';
        }
      } else {
        return $(document).height() + 'px';
      }
    },

    width: function() {
      if ($.browser.msie && $.browser.version < 7) {
        var scrollWidth = Math.max(
          document.documentElement.scrollWidth,
          document.body.scrollWidth
          );
        var offsetWidth = Math.max(
          document.documentElement.offsetWidth,
          document.body.offsetWidth
          );

        if (scrollWidth < offsetWidth) {
          return $(window).width() + 'px';
        } else {
          return scrollWidth + 'px';
        }
      } else {
        return $(document).width() + 'px';
      }
    },

    resize: function() {
      /* If the dialog is draggable and the user drags it past the
		 * right edge of the window, the document becomes wider so we
		 * need to stretch the overlay. If the user then drags the
		 * dialog back to the left, the document will become narrower,
		 * so we need to shrink the overlay to the appropriate size.
		 * This is handled by shrinking the overlay before setting it
		 * to the full document size.
		 */
      var $overlays = $([]);
      $.each($.ui.dialog.overlay.instances, function() {
        $overlays = $overlays.add(this);
      });

      $overlays.css({
        width: 0,
        height: 0
      }).css({
        width: $.ui.dialog.overlay.width(),
        height: $.ui.dialog.overlay.height()
      });
    }
  });

  $.extend($.ui.dialog.overlay.prototype, {
    destroy: function() {
      $.ui.dialog.overlay.destroy(this.$el);
    }
  });

})(jQuery);

//jQuery.noConflict();

/***************new script START*******************************************/
var  goalsDone = [];  //a global object which will track the count of each goal.
/**
*Function goal_pagetracker()
*@arg1: slot assign to the goal , 
*@arg2: cookie name , 
*@arg3: name of the goal/page, 
*@arg4: url of that page ,
*@arg5: number of seconds the user should be on this page ,
*/
function goal_pagetracker(slot, cookiename, pagetitle, pageurl, seconds){
 this.slot = slot;
 this.cookiename = cookiename; 
 this.pagetitle = pagetitle;
 this.pageurl = pageurl;
 this.seconds = seconds;
}

/**
*Function goal_webpagecounter()
*@arg1: slot assign to the goal , 
*@arg2: cookie name , 
*@arg3: number of pages the user should be viewing in order to track the goal
*@arg4: name of the goal, 
*@arg5: time the user should spend on each page before the goal is triggered ,
*/
function goal_webpagecounter(slot, cookiename, webgoalname, numberofpages, seconds){
 this.slot = slot;
 this.cookiename = cookiename; 
 this.numberofpages = numberofpages;
 this.webgoalname = webgoalname;
 this.seconds = seconds;
}

/**
*Function goal_sitetimer()
*@arg1: slot assign to the goal , 
*@arg2: cookie name , 
*@arg3: name of the goal, 
*@arg4: number of seconds the user should be on this page ,
*/
function goal_sitetimer(slot,cookiename, goalname,seconds){
 this.slot = slot;
 this.cookiename = cookiename; 
 this.goalname = goalname;
 this.seconds = seconds;
}

/**
*Function loadSurvy()
*@arg1: survey URL , 
*@arg2: number of page load the user should get the survey popup , 
*@arg3: number of second load the user should get the survey popup , 
*@arg4: delay time for loading the survey popup , 
*@arg1: survey URL, 
*@arg2: number of page load the user should get the survey popup, 
*@arg3: number of second the user should get the survey popup, 
*@arg4: delay time (in seconds) for loading the survey popup, 
*@arg5: cookie name, 
*@arg6: width of the popup
*@arg7: height of the popup
*@arg8: opacity of the popup
*@arg9: animation (leftunder, rightunder, leftabove, rightabove)
*@arg10: color: popup border color
*@arg11: Close button color (green, red, black)
*@arg12: goals: goals object
//Either arg2 or arg3 will be 0 (zero)
*/
function loadSurvy(urlSurvey, sumPages, numberofseconds, delaytime, cookieName, width, height,opacity,animation,color, closebtnColor, goals){

  var delay = delaytime;
  if(color==undefined){
    color="#DDDDDD";
  }

  if(delay==undefined){
    delay=2;
  }

  if(goals==undefined){
    goals = [];
  }
  if(closebtnColor == undefined){
    closebtnColor = '#a7c5dd';
  }

 window.onload = function() {
  cit_savepagecookie();
 };  
  
  
//site timer in seconds
  //window.onbeforeunload = cit_savetimecookie;
  seconds = 0;

  var arraycount = goals.length;
  pagegoals = [];
  pagecountergoals = [];
  sitetimergoals = [];
  var j = 0;
  var k = 0;
  for(i=0;i < arraycount ; i++){
    var moves = goals[i];
	if(moves.pageurl){
    pagegoals[i] = moves.pageurl;
	} 
	
 	if(moves.numberofpages){
	pagecountergoals[j] = moves.webgoalname + '###' +moves.slot + '###' +moves.cookiename + '###' + moves.numberofpages+ '###' + moves.seconds;
	j += 1;
	} 

 	if(moves.goalname){
	sitetimergoals[k] = moves.goalname + '###' +moves.slot + '###' +moves.cookiename + '###' + moves.seconds;
	k += 1;
	} 
	
  }
 
  setInterval('cit_savetime("'+urlSurvey+'", "'+sumPages+'", "'+numberofseconds+'", "'+cookieName+'","'+width+'","'+height+'","'+opacity+'","'+delay+'","'+animation+'","'+color+'", "'+closebtnColor +'","'+ pagecountergoals +'", "'+ sitetimergoals +'" )',1000);   


  
  //pagecountergoals
var currentMove = 0;

var processNextMove = function() {
 var move = goals[currentMove];
 var currentpage = window.location.pathname;

 //goal_pagetracker	
   var goalpos = jQuery.inArray(currentpage, pagegoals)
   
	if(goalpos != -1){ 
	goalSec = goals[goalpos].seconds*1000;
		currentMove++;
		window.setTimeout(function() {	
			cit_pagetracker(goals[goalpos].pagetitle ,goals[goalpos].slot  , goals[goalpos].pageurl , goals[goalpos].cookiename );		
		}, goalSec);
	}	

};
processNextMove();


}

/**
* function for saving a goal in coookie and mark as completed
*/
//cit_setCookie('goalsDoneCount','');
//cit_setCookie('goalsDone','');
function cit_savegoal( goalname , slot , cookiename){ 

 if(cit_getCookie('goalsDone') == ""){   //if no goals are completed
    if(cit_getCookie('goalsDoneCount') == ""){
	 var i = 0;
	}else{
	 var count = cit_getCookie('goalsDoneCount');
	 var i =  parseInt(count) + 1 ;
	}

	cit_setCookie('goalsDoneCount',i+1);
	var goalCompleted =  goalname +'#*#'+ slot   ;
	cit_setCookie('goalsDone',goalCompleted); 
 
 }else{   
        //console.log('Some Goals are already completed and r saved in cookie ');
        var goalsDoneCookie = cit_getCookie('goalsDone');
    	var goalCompleted =  goalsDoneCookie + '#*~*#' + goalname +'#*#'+ slot  ;
          cit_setCookie('goalsDone',goalCompleted); 
		  
		 if(cit_getCookie('goalsDoneCount') == ""){
		   var i = 0;
		  }else{
		  var count = cit_getCookie('goalsDoneCount');
		  var doneCount =  parseInt(count) + 1 ;
		  }
     	 cit_setCookie('goalsDoneCount', doneCount);		  
         //console.log('last saved goal :' + cit_getCookie('goalsDone'));
 }
}

//cit_setCookie('goalsDoneCount','');
//cit_setCookie('goalsDone','');
function cit_pagetracker( goalno , slot , specialPages, cookiename){ 
  pageGoals = [];
   //console.log('Inside cit_pagetracker: ' + specialPages);	
  var currentpage = window.location.pathname;
 if(cit_getCookie('goalsDone') == ""){   //if no goals are completed

    if(cit_getCookie('goalsDoneCount') == ""){
	 var i = 0;
	}else{
	 var count = cit_getCookie('goalsDoneCount');
	 var i =  parseInt(count) + 1 ;
	}

	cit_setCookie('goalsDoneCount',i+1);
	var goalCompleted =  goalno +'#*#'+ slot +'#*#'+ specialPages  ;
	cit_setCookie('goalsDone',goalCompleted); 

	//console.log('completed goal: ' +goalno +'#*#'+ slot +'#*#'+ specialPages);
 
 }else{   
        //console.log('Some Goals are already completed and r saved in cookie ');
        var goalsDoneCookie = cit_getCookie('goalsDone');
		var goalarr = goalsDoneCookie.split('#*~*#'); 
		//console.log('split by #*~*# :' + goalarr);
		for(i=0;i < goalarr.length ; i++){
		  var pageArr = goalarr[i].split('#*#');
		   //console.log('split by #*# :' + pageArr);console.log('pageArr[2] :' + pageArr[2]);console.log('currentpage :' + currentpage);
		   pageGoals[i] = pageArr[2];
		}

		 var goalpos = jQuery.inArray(currentpage, pageGoals);
		 //console.log('goalpos :' + goalpos);
		  if(goalpos == -1){
			  var goalCompleted =  goalsDoneCookie + '#*~*#' + goalno +'#*#'+ slot +'#*#'+ specialPages  ;
			  cit_setCookie('goalsDone',goalCompleted); 
			  
			 if(cit_getCookie('goalsDoneCount') == ""){
			    var i = 0;
			  }else{
				  var count = cit_getCookie('goalsDoneCount');
				  var doneCount =  parseInt(count) + 1 ;
			    }
			 cit_setCookie('goalsDoneCount', doneCount);		  	  
            }		  

         //console.log('last saved goal :' + cit_getCookie('goalsDone'));
    }
}


function cit_customerImpactTrackerWrapper_new(urlSurvey,cookieName,width,height,opacity,delay,animation,color, closebtnColor){
    var goalurl = '';
	var  query =  '';
	
  var goalsDone = cit_getCookie('goalsDone');
  if(cit_getCookie('goalsDoneCount')){
   goalsDoneCookie = parseInt(cit_getCookie('goalsDoneCount'));
   var query = '?custom1='+goalsDoneCookie;
  }
  var new_urlSurvey = urlSurvey + query ;

 	var goalsDoneCookie = cit_getCookie('goalsDone');
	var goalarr = goalsDoneCookie.split('#*~*#'); 
	//alert(goalarr);
	//console.log('split by #*~*# :' + goalarr);
	for(i=0;i < goalarr.length ; i++){
	  var pagesArr = goalarr[i].split('#*#');
	  if(pagesArr[1]){
	    customnbr  = parseInt(pagesArr[1])+1;
		if(query){
	    var goalurl= goalurl+ '&custom'+customnbr+'='+pagesArr[0] ;
		}else{
		var goalurl= goalurl+ '?custom'+customnbr+'='+pagesArr[0] ;
		}
	  }
	} 

 var newurlSurvey = new_urlSurvey +goalurl ; 
 //http://questionpro.com/t/ACSooZKIto?custom1=3custom5=goal4&custom4=goal3&custom7=goal6
 //console.log('urlSurvey modified : ' + newurlSurvey);
 
 if(cit_getCookie(cookieName) != ''){  
  //console.log('survey already completed');
    //COOKIE EXCIST ; survey already done
  }else{ 
    //CREATE NEW COOKIE
    cit_setCookie(cookieName,'done');
	cit_openSurveyDiv(newurlSurvey,width,height,opacity,delay,animation, color, closebtnColor);
  }
}

var seconds;
 currentpageview = 0;
function cit_savetime(urlSurvey,sumPages ,numberofseconds, cookieName,width,height,opacity,delay,animation,color, closebtnColor, pagecountergoals, sitetimergoals){
  seconds += 1;
  currentpageview = parseInt(currentpageview)+1;
  pageload = parseInt(cit_getCookie("pageload"));
  timewebsite = parseInt(cit_getCookie("timewebsite"));
  
  if((numberofseconds != 0) && ( timewebsite == numberofseconds)){
  //show survey popup
   cit_customerImpactTrackerWrapper_new(urlSurvey,cookieName,width,height,opacity,delay,animation,color, closebtnColor);
  }else if((sumPages != 0) && ( sumPages == pageload)){
  //show survey popup
   cit_customerImpactTrackerWrapper_new(urlSurvey,cookieName,width,height,opacity,delay,animation,color, closebtnColor);
  } 

//track webpagecounter goals
/************/	
 var goalsarr = pagecountergoals.split(','); 
  for(i=0;i < goalsarr.length ; i++){  
   var goalsArray = goalsarr[i].split('###');
   var goalsname =  goalsArray[0];
   var goalsSlot =  goalsArray[1];
   var goalsCookiename =  goalsArray[2];
   var goalsNumberofpages =  goalsArray[3];
   var goalsSeconds =  goalsArray[4];	
   //console.log('goalsSeconds->'+ goalsSeconds + ', currentpageview ->' +currentpageview);
   if(goalsSeconds == currentpageview){   
    if(cit_getCookie(goalsCookiename) != 'Done'){ 
	  if((cit_getCookie(goalsCookiename)) < goalsNumberofpages){
	    if( cit_getCookie(goalsCookiename) == ''){
		 pagevisitcount = 1;
		}else{
         pagevisitcount = parseInt(cit_getCookie(goalsCookiename))+1;
	    }
       cit_setCookie(goalsCookiename,pagevisitcount);
	  }
	}
	
	if(parseInt(cit_getCookie(goalsCookiename)) == goalsNumberofpages){
	  pagevisitcount = parseInt(cit_getCookie(goalsCookiename))+1;
	  //save goal
	   cit_setCookie(goalsCookiename,'Done');
	   cit_savegoal(goalsname ,goalsSlot, goalsCookiename );		
	 }
	
   }		  
  }   
 /**********/ 
//sitetimergoals
 var timergoalsarr = sitetimergoals.split(','); 
  for(i=0;i < timergoalsarr.length ; i++){  
   var timergoalsArray = timergoalsarr[i].split('###');
   var timergoalsName =  timergoalsArray[0];
   var timergoalsSlot =  timergoalsArray[1];
   var timergoalsCookiename =  timergoalsArray[2];
   var timergoalsSeconds =  timergoalsArray[3];	
   //console.log('timergoalsSeconds->'+ timergoalsSeconds + ', timewebsite ->' +timewebsite);
   if(timergoalsSeconds == timewebsite){   
    if(cit_getCookie(timergoalsCookiename) != 'Done'){  
	  //console.log('timewebsite '+ timergoalsCookiename + ' goal done');
	  //save goal
	   cit_setCookie(timergoalsCookiename,'Done');
	   cit_savegoal(timergoalsName ,timergoalsSlot, timergoalsCookiename );		
	}	
   }		  
  }   
 /*****timewebsite*****/ 
  if(cit_getCookie("timewebsite") != ""){  
    value = parseInt(cit_getCookie("timewebsite"));
    value = value + 1;
    cit_setCookie("timewebsite",value); 
  }else{
    cit_setCookie("timewebsite",seconds);
  }
 
}


var pagecookie = 1;
function cit_savepagecookie(){
  if(cit_getCookie("pageload") != ""){
  value = parseInt(cit_getCookie("pageload"));
    value = value + pagecookie;
    cit_setCookie("pageload",value);
  }else{
    cit_setCookie("pageload",pagecookie);
  }
}

/**
*Function cit_clickevent()
*@arg1: slot assign to the goal , 
*@arg2: cookie name , 
*@arg3: name of the goal, 
*/
function cit_clickevent(slot, cookiename, clickname){
    if(cit_getCookie(cookiename) != 'Done'){  
	   cit_setCookie(cookiename,'Done');
	   cit_savegoal(clickname, slot, cookiename );		
	}	

}

/**
*Function cit_clickevent()
*@arg1: slot number , 
*@arg2: cookie name , 
*@arg3: user id, 
*/
function cit_addUser(slot, cookiename, userid ){
    if(cit_getCookie(cookiename) != 'Done'){  
	 if(cit_getCookie('goalsDone') == ""){   //if no goals are completed
		var goalCompleted =  userid +'#*#'+ slot;
		cit_setCookie('goalsDone',goalCompleted); 
		cit_setCookie(cookiename,'Done');	 
	  }else{   
			//console.log('Some Goals are already completed and r saved in cookie ');
			var goalsDoneCookie = cit_getCookie('goalsDone');
			var goalCompleted =  goalsDoneCookie + '#*~*#' + userid +'#*#'+ slot  ;
			  cit_setCookie('goalsDone',goalCompleted); 
			  cit_setCookie(cookiename,'Done');
			 //console.log('last saved goal :' + cit_getCookie('goalsDone'));
	  }	   
	}	

}

/**************new script END********************/

var js;
function cit_include_js(file) {
 var html_doc = document.getElementsByTagName('head').item(0);
  js = document.createElement('script');
  js.setAttribute('type', 'text/javascript');
  js.setAttribute('src', file);
  html_doc.appendChild(js);
}

var css;
function cit_include_css(file) {
  var html_doc = document.getElementsByTagName('head').item(0);
  css = document.createElement('link');
  css.setAttribute('type', 'text/css');
  css.setAttribute('rel', 'stylesheet');
  css.setAttribute('href', file);
  html_doc.appendChild(css);
}

//var expiredays = 180;
function cit_setCookie(cookieName,value,expiredays){
 expiredays =180;
 var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie = cookieName+"="+ escape(value)+"; expires="+exdate.toGMTString()+"; path=/;";
}

function cit_getCookie(c_name){ 
  if (document.cookie.length>0){
    c_start=document.cookie.indexOf(c_name + "=");
    if (c_start!=-1){
      c_start=c_start + c_name.length+1;
      c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1) c_end=document.cookie.length;
     return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return "";
}
// this deletes the cookie when called
function cit_deleteCookie( cookieName, path, domain ) {
  if ( cit_getCookie( name ) ) document.cookie = cookieName + "=" + ( ( path ) ? ";path=" + path : "") +( ( domain ) ? ";domain=" + domain : "" ) +";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

var win;

function cit_get_cookies_array() {
  var cookies = { };
  if (document.cookie && document.cookie != '') {
    var split = document.cookie.split(';');
    for (var i = 0; i < split.length; i++) {
      var name_value = split[i].split("=");
      name_value[0] = name_value[0].replace(/^ /, '');
      cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
    }
  }
  return cookies;
}

//for testing //a7c5dd
//cit_openSurveyDiv('http://questionpro.com/t/ACSooZKIto',330,339,0.4,5,'leftundersdfsd','#a7c5dd', '#a7c5dd');

function cit_openSurveyDiv(urlSurvey,w,h, o ,delay,animation,color, closebtnColor){ 
  delay = parseInt(delay)*1000;
  time = parseInt(cit_getCookie("timewebsite"));

  //DIV THAT WILL OPEN
  var arrayPageSize = getPageSize();
  var pageHeight = arrayPageSize[1];
  var survey;

  if((animation != 'leftunder') && (animation != 'rightunder')&& (animation != 'leftabove')&&(animation != 'rightabove') ){
	var overlay = '<div id="surveyoverlay" style="z-index: 800; height:'+screen.height+'px; background-color:#000000; opacity: '+o+'; width: '+screen.width+'px; display: none;"/>';
    jQuery("body").append(overlay);
    jQuery('#surveyoverlay').css({
      height: pageHeight + 'px',
      width: arrayPageSize[0] + 'px',
      overflow: 'hidden',
      position : 'absolute',
      top:0+'px',
      left:0+'px',
	  opacity:o+'px'
    });
 
    survey = '<div id="survey" style="z-index : 11000; background-color: #000;">';
    survey += '<iframe name="frame" src ="'+urlSurvey+'" width="'+w+'" height="'+h+'" frameborder="0" style="overflow-y:hidden; border-width: 0px;"></iframe></div>';

    jQuery('body').append(survey);
    jQuery('#survey').dialog({
      width:w,
      height:h
    });    

	jQuery('.ui-dialog').css("left", ( jQuery(window).width() - jQuery('#survey').width() ) - 25 + "px");
    jQuery('.ui-dialog').css("top", jQuery(document).height() + "px");
    jQuery('.ui-dialog').css("display", "none");

    setTimeout('cit_timeout_other()',delay);
   }
  else{
    survey = '<div id="survey" style="z-index : 11000">';
    survey += '<iframe name="frame" src ="'+urlSurvey+'" width="'+w+'" height="'+h+'" frameborder="0" style="overflow-y:hidden; border-width: 0px;"></iframe></div>';
    jQuery('body').append(survey);
    jQuery('#survey').dialog({
      width:w,
      height:h
    });

	jQuery('.ui-dialog').css("left", ( jQuery(window).width() - jQuery('#survey').width() ) - 25 + "px");
	jQuery('.ui-dialog').css("top", jQuery(document).height() + "px");
	jQuery('.ui-dialog').css("display", "none");

	setTimeout('cit_timeout_rechts("'+animation+'")',delay);
  }

  //CHANGE COLOR

  jQuery('.ui-dialog').css("border", "4px solid "+color);
  jQuery('.ui-dialog-titlebar').css("border-color", color);
  jQuery('.ui-dialog-titlebar').css("background", color);
 


 //close button color change 
	if(closebtnColor == 'red'){
	//red  
	  jQuery('.ui-dialog-titlebar-close').addClass("ui-dialog-titlebar-close-red");
	  jQuery('.ui-dialog-titlebar-close-red').removeClass("ui-dialog-titlebar-close");
	  jQuery(".ui-dialog-titlebar-close-red").click(function(){ 
		jQuery('body').css("overflow-y", "auto");
		jQuery("#surveyoverlay").fadeOut('slow',removeOverlay);
	  });
		jQuery('.ui-dialog-titlebar-close-red').hover(
			function() {
			  jQuery(this).addClass('ui-dialog-titlebar-close-red');
			  jQuery(this).removeClass('ui-dialog-titlebar-close-hover');
			},
			function() {
			  jQuery(this).removeClass('ui-dialog-titlebar-close');
			}
		);		  
	}else if (closebtnColor == 'black'){
	 //black 
	  jQuery('.ui-dialog-titlebar-close').addClass("ui-dialog-titlebar-close-black");
	  jQuery('.ui-dialog-titlebar-close-black').removeClass("ui-dialog-titlebar-close");
	  jQuery(".ui-dialog-titlebar-close-black").click(function(){ 
		jQuery('body').css("overflow-y", "auto");
		jQuery("#surveyoverlay").fadeOut('slow',removeOverlay);
	  });  
		jQuery('.ui-dialog-titlebar-close-black').hover(
			function() {
			  jQuery(this).addClass('ui-dialog-titlebar-close-black');
			  jQuery(this).removeClass('ui-dialog-titlebar-close-hover');
			},
			function() {
			  jQuery(this).removeClass('ui-dialog-titlebar-close');
			}
		);	  
	}else if (closebtnColor == 'green'){
	  //green  
	  jQuery('.ui-dialog-titlebar-close').addClass("ui-dialog-titlebar-close-green");
	  jQuery('.ui-dialog-titlebar-close-green').removeClass("ui-dialog-titlebar-close");
	  jQuery(".ui-dialog-titlebar-close-green").click(function(){ 
		jQuery('body').css("overflow-y", "auto");
		jQuery("#surveyoverlay").fadeOut('slow',removeOverlay);
	  }); 
		jQuery('.ui-dialog-titlebar-close-green').hover(
			function() {
			  jQuery(this).addClass('ui-dialog-titlebar-close-green');
			  jQuery(this).removeClass('ui-dialog-titlebar-close-hover');
			},
			function() {
			  jQuery(this).removeClass('ui-dialog-titlebar-close');
			}
		);	  
	  
	}else{
	//nornal blue : #a7c5dd
	  jQuery(".ui-dialog-titlebar-close").click(function(){ 
		jQuery('body').css("overflow-y", "auto");
		jQuery("#surveyoverlay").fadeOut('slow',removeOverlay);
	  });
	}
  
}
function cit_timeout_rechts(animation){
  if(animation == 'leftunder'){
    jQuery('.ui-dialog').css("display", "inline");
    jQuery('body').css("overflow-y", "hidden");
    jQuery(".ui-dialog").animate({"left": "20px", "top":"35%"}, 2000); 
  }else if(animation == 'rightunder'){
    jQuery('.ui-dialog').css("display", "inline");
    jQuery('body').css("overflow-y", "hidden");
    jQuery(".ui-dialog").animate({"right": "20px", "top":"35%"}, 2000);  
  }else if(animation == 'leftabove'){
    jQuery('.ui-dialog').css("display", "inline");
    jQuery('body').css("overflow-y", "hidden");
    jQuery(".ui-dialog").animate({"left": "20px", "top":"5%"}, 2000);  
  }else if(animation == 'rightabove'){
    jQuery('.ui-dialog').css("display", "inline");
    jQuery('body').css("overflow-y", "hidden");
    jQuery(".ui-dialog").animate({"right": "20px", "top":"5%"}, 2000);  
  }else{
    cit_timeout_other();
  }
}

function cit_timeout_other(){
    jQuery('body').css("overflow-y", "hidden");
    jQuery('.ui-dialog').css("display", "inline");

    jQuery('#surveyoverlay').show("slow");
    //jQuery('#surveyoverlay').fadeIn("fast", 0);
    //jQuery('#surveyoverlay').fadeTo("fast", 0);

    jQuery('.ui-dialog').css("left", ( jQuery(window).width() - jQuery('#survey').width() ) / 2+jQuery(window).scrollLeft() + "px");
    jQuery('.ui-dialog').css("top", ( jQuery(window).height() - jQuery('#survey').height() ) / 2+jQuery(window).scrollTop() - 10 + "px");
}


function closeSurvey(){
  jQuery("#surveyoverlay").fadeOut('slow',removeOverlay);
  jQuery('#survey').hide();
  jQuery('.ui-dialog').html('');
  jQuery('.ui-dialog').hide('');
}

function removeOverlay(){
  jQuery('#survey').hide();
  jQuery('.ui-dialog').html('');
  jQuery('.ui-dialog').hide('');
  jQuery("#surveyoverlay").remove();
}

function getPageSize(){
  var xScroll, yScroll;
  if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
    xScroll = document.body.scrollWidth;
    yScroll = document.body.scrollHeight;
  }
  else if (window.innerHeight && window.scrollMaxY) {
    xScroll = window.innerWidth + window.scrollMaxX;
    yScroll = window.innerHeight + window.scrollMaxY;
  }
  // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari.
  else {
   xScroll = document.body.offsetWidth;
   yScroll = document.body.offsetHeight;
  }
  var windowWidth, windowHeight;
  if (self.innerHeight) { // All except Explorer.
    if (document.documentElement.clientWidth) {
     windowWidth = document.documentElement.clientWidth;
    }
    else {
     windowWidth = self.innerWidth;
    }
    windowHeight = self.innerHeight;
  }
  // Explorer 6 Strict Mode.
  else if (document.documentElement && document.documentElement.clientHeight) {
    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;
  }
  else if (document.body) { // Other Explorers.
    windowWidth = document.body.clientWidth;
    windowHeight = document.body.clientHeight;
  }
  // For small pages with total height less then height of the viewport.
  if (yScroll < windowHeight) {
   pageHeight = windowHeight;
  }
  else {
    pageHeight = yScroll;
  }
  // For small pages with total width less then width of the viewport.
  if (xScroll < windowWidth) {
    pageWidth = windowWidth;
  }
  else {
    pageWidth = xScroll;
  }
  arrayPageSize = [pageWidth, pageHeight, windowWidth, windowHeight];
  return arrayPageSize;
}
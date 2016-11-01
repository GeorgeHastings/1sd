'use strict';

var Magnetic = {
  elements: [],
  getScrollTop: function(){
    if(typeof pageYOffset!== 'undefined'){
        //most browsers except IE before #9
        return pageYOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
  },
  getY: function() {
			var yPos = Magnetic.getScrollTop();
			return yPos;
	},
  getX: function(event) {
    var xPos = event.pageX - window.innerWidth/2;
    return xPos;
  },
  positionElements: function() {
    var elements = Magnetic.elements[0];
    for (var i = 0; i < elements.length; i++) {
      var element = document.getElementById(Magnetic.elements[0][i].id);
      var adjusetedY = -(elements[i].speed/15*Magnetic.getY());
      element.style.webkitTransform = "translate3d(0px,"+adjusetedY+"px,0)";
      element.style.MozTransform = "translate3d(0px,"+adjusetedY+"px,0)";
      element.style.OTransform = "translate3d(0px,"+adjusetedY+"px,0)";
      element.style.transform = "translate3d(0px,"+adjusetedY+"px,0)";
    }
  },
  bindEvents: function() {
      document.body.onscroll = Magnetic.positionElements;
  },
  init: function() {
    this.elements.push(arguments);
    this.bindEvents();
  }
};

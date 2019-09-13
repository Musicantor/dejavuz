(function (app) {
 
 /*<div>Can touch this</div>
  <h2>Output</h2>
  <pre></pre>
  touch events always target the element where that touch STARTED, while mouse events target the element currently under the mouse cursor. This is why we have mouseover and mouseout events, but there are no corresponding touchover and touchout events - only touchend.
  */
 var info = document.getElementById('out'); // info field for debug
 // get the canvas element and its ctx
 var canvas = document.getElementById('sketchpad');
 var ctx = canvas.getContext('2d');
 var startx = 0;
 var touchesInAction = {};
 
 var log = function(msg) {
    return function(e) {
        var pre = $("pre");
        pre.append("EVENT (" + new Date().getTime() + "): "  + msg + "\n");
        if(e.originalEvent.type == "touchmove") e.preventDefault();
        pre[0].scrollTop = pre.height();
 };
 };
 
 $(function() {
   $("div").on("mousedown", log("mousedown"));
   $("div").on("mouseup", log("mouseup"));
   $("div").on("click", log("click"));
   $("div").on("dblclick", log("dblclick"));
   $("div").on("context", log("context"));
   $("div").on("touchstart", log("touchstart"));
   $("div").on("touchcancel", log("touchcancel"));
   $("div").on("touchmove", log("touchmove"));
   $("div").on("touchleave", log("touchleave"));
   $("div").on("touchend", log("touchend"));
});
 
 $(ctx).on('mousedown touchstart', function(e){
           if (e.type = 'touchstart') startx = e.pageX;
           console.log('ctx:' + e); // will return obj ..kind of {x:20,y:40}
           
           })
 /*$('a').on('mousedown touchstart', function(e){
           console.log(pointerEventToXY(e)); // will return obj ..kind of {x:20,y:40}
           })*/
 
 function touchStartHandler(event) {
    var touches = event.changedTouches;
    for(var j = 0; j < touches.length; j++) {
        // store touch info on touchstart
        touchesInAction[ "$" + touches[j].identifier ] = {
            identifier : touches[j].identifier,
            pageX : touches[j].pageX,
            pageY : touches[j].pageY                     };
    }
 }
 
 function touchEndHandler(event) {
    var touches = event.changedTouches;
    for(var j = 0; j < touches.length; j++) {
        // access stored touch info on touchend
        var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];
        theTouchInfo.dx = touches[j].pageX - theTouchInfo.pageX;
        // x-distance moved since touchstart
        theTouchInfo.dy = touches[j].pageY - theTouchInfo.pageY;
        // y-distance moved since touchstart
    } // for
    console.log(theTouchInfo);
            // determine what gesture was performed,
            // based on dx and dy (tap, swipe, one or two fingers etc.
 }
 document.body.addEventListener("touchstart", touchStartHandler, false);
 document.body.addEventListener("touchend", touchEndHandler, false);
 

 
 var draw = function(e){
    console.log(JSON.stringify(pointerEventToXY(e)));
 }
 
 var pointerEventToXY = function(e){
    var out = {type:e.type, pageX:0, pageY:0};
    if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        out.pageX = touch.pageX;
        out.pageY = touch.pageY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        out.pageX = e.pageX;
        out.pageY = e.pageY;
    }
    return out;
 };
 
 
       // detect touch capabilities
        var touchAvailable = ('createTouch' in document) || ('ontouchstart' in window);
       // attach the touchstart, touchmove, touchend event listeners.
                        if(touchAvailable){
                        console.log("touch available");
                          canvas.addEventListener('touchstart', draw, false);
                          canvas.addEventListener('touchmove', draw, false);
                          canvas.addEventListener('touchend', draw, false);
                        }  else {
                        console.log("mouse events")
                          canvas.addEventListener('mousedown', draw, false);
                          canvas.addEventListener('mousemove', draw, false);
                          canvas.addEventListener('mouseup', draw, false);
                        }
                        
     // prevent elastic scrolling
     document.body.addEventListener('touchmove', function (e) {
          var touchobj = e.changedTouches[0];
        var dist = parseInt(touchobj.clientX) - startx;
                // e.preventDefault();
                     }, false); // end body.onTouchMove
 


 
})(window.app); // end drawer func

 

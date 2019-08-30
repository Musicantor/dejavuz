;(function(win, undefined){ // invisible closure for app
 'use strict';
 win.app = (function(w){ // Private area start:
            
// load external script and check is it loaded before you use it:
 function loadModule (url) {
 var module = document.createElement('script');
  module.setAttribute('src', url);
  module.setAttribute('type', 'text/javascript');
  document.getElementsByTagName('head')[0].appendChild(module);
 module.onload = function(){
  $('#object').show(); // loaded -> trigger
         app.mod.ready(this.src);
  }
 }
var modules = ['mod','view','contr','memento'];
for (var i = 0; i < modules.length; i++) {
  loadModule('js/'+modules[i] + '.js');
}
   return { // facade interface
            'exec': function (a,b){
            cntr.exec(a,b);
            }
   }
}(win)); // app end
 
 })(this); // end of invisible object closure
window.addEventListener('load', function(e) {
            app.exec('start','demo');
      }, false);

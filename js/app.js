;(function(win, undefined){ // invisible closure (facade) for app
 'use strict';
 win.app = (function(w){ // Private area start:
            
// load external script and check is it loaded before you use it:
 function loadModule (url) { // sort fo proxy
  if (filesAdded.indexOf(url) === -1){ // sort of singleton
            var module = document.createElement('script');
            module.setAttribute('src', url);
            module.setAttribute('type', 'text/javascript');
            module.setAttribute('onerror', "alert('Load: ' + this.src)");
            document.getElementsByTagName('head')[0].appendChild(module);
            module.onload = function(){
                    $('#object').show(); // loaded -> trigger
                    filesAdded.push(url); // alert(JSON.stringify(filesAdded))
                }
    } // if
 }
var filesAdded = [];
var modules = ['mod','builder','view','contr','memento'];
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

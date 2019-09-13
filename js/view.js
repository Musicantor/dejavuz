;(function ( app, undefined ){ // inject view object
  app.view = (app.view || {});
  view = app.view = (function(){ // View without language
      return {'build': function(pgn){ // Build page elements
             document.title = app.mod.get('tle');
             if (window.jQuery) { // are we in test mode ( no jquery in tests)
                if (pgn == 0) {
                     app.bld.buildPage(0);
                     document.querySelector('div#'+app.mod.getElemName(0)).innerHTML = app.mod.get();
                 } else if (pgn == 1){
                     app.bld.buildPage(1);
                } // if
              } else {
                // test mode, do not build page
              }
           },
        'update': function(){ // Update style & text elements
                     var n = app.mod.getPageNum();
                     this.build(n);
                      this.setStyle(n);
        },
        'setStyle': function (n){
                     var head = window.document.head;
                     var oldStyle =  head.querySelector('style');
                     if (oldStyle) head.removeChild(oldStyle);
                     var newStyle = document.createElement('style');
                     var styleTxt = "";
                     
                     if (n == 0){
                     styleTxt = 'div#'+app.mod.getElemName(n)+' {';
                     styleTxt +=  '  color: '+app.mod.currCol()+';';
                     styleTxt +=  '}';
                     }
                     
                     if (n == 1){
                     styleTxt = 'body { position: fixed;';
                     styleTxt += 'margin:30;';
                     styleTxt += 'padding:30;';
                     styleTxt += 'font-family:Arial;';
                     styleTxt += '}';
                     styleTxt += '#container {';
                     styleTxt += 'margin:30;';
                     styleTxt += 'padding:30;';
                     styleTxt += 'position:absolute;';
                     styleTxt += '}';
                     styleTxt += '#sketchpad {';
                     styleTxt += 'margin:30;';
                     styleTxt += 'padding:30;';
                     styleTxt += 'border: 1px solid #000;';
                     styleTxt += '}';
                    
                     }
                     newStyle.innerHTML = styleTxt;
                     head.appendChild(newStyle);
                     
                     }
                } // interface end
         })(); // view end
})( window.app = window.app || {} ); // injection

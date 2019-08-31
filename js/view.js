;(function ( app, undefined ){ // inject view object
  app.view = (app.view || {});
  view = app.view = (function(){ // View without language
      return {'build': function(pgn){ // Build page elements
                     document.title = app.mod.get('tle');
                if (pgn == 0) {
                     app.bld.buildPage(0);
                 } else if (pgn == 1){
                     app.bld.buildPage(1);
                } // if
                     },
        'update': function(){ // Update style & text elements
                     var n = app.mod.getPageNum();
                     
                     this.build(0);
                     view.setStyle(0);
          document.querySelector('div#'+app.mod.getElemName(0)).innerHTML = app.mod.get();
        },
        'setStyle': function (n){
                     var head = window.document.head;
                     var oldStyle =  head.querySelector('style');
                     if (oldStyle) head.removeChild(oldStyle);
                     var newStyle = document.createElement('style');
                     var styleTxt = 'div#'+app.mod.getElemName(n)+' {';
                     styleTxt +=  '  color: '+app.mod.currCol()+';';
                     styleTxt +=  '}';
                     newStyle.innerHTML = styleTxt;
                     head.appendChild(newStyle);
                     }
                } // interface end
         })(); // view end
})( window.app = window.app || {} ); // injection

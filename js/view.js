;(function ( app, undefined ){ // inject view object
  app.view = (app.view || {});
  view = app.view = (function(){ // View without language
      function buildButton (id,txt,fld,val,cnl) {
                     return "<button label=\'"+id+"\' onclick=\"app.exec('set',{fld:'"+fld+"',val:'"+val+"',cancel:"+cnl+"})\">"+txt+"</button>";
         }
      return {'build': function(){ // Build page elements
                     document.title = app.mod.get('tle');
                     view.setStyle('sec');
                     
                     var page =  "<h1>"+app.mod.get('hdng')+"</h1>"
                     page += app.mod.get('inf');
                     page += "<div id=\""+app.mod.getElemName(0)+"\"></div>";
                     page += buildButton('btn0','FI','lang','fi',true);
                     page += buildButton('btn1','EN','lang','en',true);
                     page += buildButton('btn2',app.mod.get('red'),'col','red',true);
                     page += buildButton('btn3',app.mod.get('green'),'col','green',true);
                     page += buildButton('btn4',app.mod.get('blue'),'col','blue',true);
                     page += buildButton('btn5',app.mod.get('uiCnl'),'com','cnl',false);
                     page += buildButton('btn6',app.mod.get('uiRdo'),'com','rdo',true);
                     
                     document.body.innerHTML = page;
                     document.querySelector('div#'+app.mod.getElemName(0)).innerHTML = app.mod.get();
          },
        'update': function(){ // Update style & text elements
                     this.build();
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

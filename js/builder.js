;(function ( app, undefined ){ // inject builder object
  app.bld = (app.bld || {});
  app.bld = (function(){
            
  return {
     'buildSelectFromArray': function (arr,langArr,id,selInd){
         // build selection list from array with selected item & id
         var out = '<div class="form-group">';
         var len = arr.length;
          var sel = selInd;
         for(var i = 0; i < len; i++){
           if (sel === i){
              out += "<option selected='true' value='" + arr[i] + "'>" + langArr[i] + "</option>";
           }else{
              out  += "<option value='" + arr[i] + "'>" + langArr[i] + "</option>";
           } // if
         } // for
   return "<select  class='form-control' id='"+id+"' onChange=\"app.exec('sel',[this.options[this.options.selectedIndex].value,this.id,this.options.selectedIndex]);\">" + out + "</select></div>";
    }, // buildSelectFromArray: var menu = buildSelectFromArray(values,names,id,0';
  'buildButton': function (id,txt,fld,val,cnl) { return "<button label=\'"+id+"\' onclick=\"app.exec('set',{fld:'"+fld+"',val:'"+val+"',cancel:"+cnl+"})\">"+txt+"</button>";
        },
             
  'buildPage': function (n){
    if (n === 0) {
      view.setStyle('sec');
      var page =  "<h1>"+app.mod.get('hdng')+"</h1>"
      page += app.mod.get('inf');
      page += "<div id=\""+app.mod.getElemName(0)+"\"></div>";
     var langN = app.mod.get('n');
    page += app.bld.buildSelectFromArray(['fi','en'],['Suomeksi','In english'],'lang',langN);
       var vals = ['black','red','green','blue']; // values to use in script
       var cols =[];
          for (var x = 0; x < vals.length; x++) { // lang versions to UI
             cols.push(app.mod.get(vals[x]));
         }
     page += app.bld.buildSelectFromArray(vals,cols,'col',vals.indexOf(app.mod.currCol()));
      page += app.bld.buildButton('btn0','FI','lang','fi',true);
      page += app.bld.buildButton('btn1','EN','lang','en',true);
      page += app.bld.buildButton('btn2',app.mod.get('red'),'col','red',true);
      page += app.bld.buildButton('btn3',app.mod.get('green'),'col','green',true);
      page += app.bld.buildButton('btn4',app.mod.get('blue'),'col','blue',true);
      page += app.bld.buildButton('btn5',app.mod.get('uiCnl'),'com','cnl',false);
      page += app.bld.buildButton('btn6',app.mod.get('uiRdo'),'com','rdo',true);
     page += app.bld.buildButton('btn6','NEXT','com','nxt',true);
      document.body.innerHTML = page;
      document.querySelector('div#'+app.mod.getElemName(0)).innerHTML = app.mod.get();
    }
    if (n === 1){
             /*
             var page = '<div id="canvas" touch-action="none"></div>';
              page += '<script>';
             page += 'function draw(where) { alert("DR"); ';
             page += '$("<div>").addClass("pixel").appendTo("#canvas").css({ left: where.pageX, top: where.pageY });';
             
              page += '}';
            // page += '$("#canvas").on("pointermove", function(event) {';
            // page += ' alert(event); draw(event);';
            // page += ' });';
             page += 'document.getElementById( "canvas" ).addEventListener( "pointermove", draw );';
             page += '</script>';
            */
             var page = '<div id="container"  touch-action="none">';
             page += '<canvas id="sketchpad" width="400" height="400">Sorry, your browser is not supported.</canvas>';
             page += '</div>';
             
             page += '<div id="out">info:</div>';
             
            document.body.innerHTML = page;
            
           
      }  // if
    }// interface end
   } // ?
})(); // builder closure end
})( window.app = window.app|| {} ); // injection

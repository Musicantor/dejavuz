(function(win){ // invisible app
 'use strict';
 win.app = (function(){ // Private area start:
    var mod=(function(){ // language model
             var lang = 'en', model = {
             
             fi:{red:'Punainen', green:'Vihreä', blue:'Sininen',
             uiCnl:'Peru',uiRdo:'Tee sittenkin',
             txt:'Heippa Maa!',tle:'Tyyli ja kieli',hdng:'Esimerkki',
             inf:'Valitse kieli ja/tai tyyli, peruuta tai tee uudelleen...'},
             
             en:{red:'Red', green:'Green', blue:'Blue',
             uiCnl:'Undo',uiRdo:'Redo',
             txt:'Hello World!',tle:'"Style & Lang"',hdng:'Example',
             inf:'Choose language/style and undo / redo & again...'}
             
             },
             currCol = 'black',
             elem = ['output','info'],
             colors = {main:'red',sec:'green',thrd:'blue',4:'cyan',5:'#ff0'},
             setVal = function(o){  //alert('setVal:' + o["fld"] + "=" + o["val"]);
                if (o["fld"] === 'lang'){
                   var oldVal = lang; // for memento
                    lang = o["val"];
                 //alert(oldVal + ' changed to val:'+ o["val"]);
                    return oldVal;
                } else if (o["fld"] === 'col'){
                    return currCol;
                     currCol = o["val"];
                } else { // other fields
                    return model[lang][o["fld"]]=o["val"];
                } // end if
             }; // end setVal
             return {
             'set': function (obj){
                return setVal(obj);
             },'get': function (fld='txt'){ //alert(model[lang]['txt']);
                return model[lang][fld];
             },'col': function(obj){
                return setVal(obj);
             },'currCol': function (){
                return currCol;
             },'setCurrCol': function (col){ currCol = col;
             
             },
             'getElemName': function (n) {return elem[n];}
             }; // return & end of mod
     }()), view=(function(){ // View without language
                 function buildButton (id,txt,fld,val,cnl) {
                 return "<button label=\'"+id+"\' onclick=\"app.set({fld:'"+fld+"',val:'"+val+"',cancel:"+cnl+"})\">"+txt+"</button>";
                 }
           return {'build': function(){ // Build page elements
                 document.title = mod.get('tle');
                 view.setStyle('sec');
                 
                 var page =  "<h1>"+mod.get('hdng')+"</h1>"
                 page += mod.get('inf');
                 page += "<div id=\""+mod.getElemName(0)+"\"></div>";
                 page += buildButton('btn0','FI','lang','fi',true);
                 page += buildButton('btn1','EN','lang','en',true);
                 page += buildButton('btn2',mod.get('red'),'col','red',true);
                 page += buildButton('btn3',mod.get('green'),'col','green',true);
                 page += buildButton('btn4',mod.get('blue'),'col','blue',true);
                 page += buildButton('btn5',mod.get('uiCnl'),'com','cnl',false);
                 page += buildButton('btn6',mod.get('uiRdo'),'com','rdo',true);
                
            document.body.innerHTML = page;
            document.querySelector('div#'+mod.getElemName(0)).innerHTML = mod.get();
           },'update': function(){ // Update style & text elements
                 this.build();
                 view.setStyle(0);
                 document.querySelector('div#'+mod.getElemName(0)).innerHTML = mod.get();
           },'setStyle': function (n){
                 var head = window.document.head;
                 var oldStyle =  head.querySelector('style');
                 if (oldStyle) head.removeChild(oldStyle);
                 var newStyle = document.createElement('style');
                 var styleTxt = 'div#'+mod.getElemName(n)+' {';
                 styleTxt +=  '  color: '+mod.currCol()+';';
                 styleTxt +=  '}';
                 newStyle.innerHTML = styleTxt;
                 head.appendChild(newStyle);
                 }
        } // return & end of view
                 }())
            ,mem=(function(){ // memento
                  var memento = [], redos=[], len=0, allow=[false,false]
                  return {
                  'done': function (commObj){
                    commObj.cancel = true;
                    len = memento.push(commObj);
                    allow[0] = true; // enable undo btn
                    return len;
                  },
                  'last': function (){
                     if (allow[0]) {
                        len = len - 1;
                  if (len == 0) {
                    allow[0] = false; // disable undo button here?
                  };
                        var tmp = memento.splice(len,1)
                        redos.push(tmp[0])
                        allow[1] = true; // enable redo btn
                        return tmp;
                      } else {
                        return -1;
                      }
                    }, // last end
                  'redo': function (){
                    if (allow[1]) {
                       var tmp = redos.splice(redos.length-1,1);
                       if (redos.length == 0) {
                            allow[1] = false; // disable redo button
                       };
                       return tmp;
                    } else {
                        return -1;
                    }
                  
                  }, // redo end
                  'allow': function (i=0){
                    return allow[i];
                  }
                  }
                  }())
            ,ctr=(function(){ // Controller
                return { 'doit': function (comm,obj){
                             // obj: {fld:'txt',val:'hi'}
                  
          switch (comm) {
            case 'start': view.build(); break;
            case 'err': alert("ctr: " + obj); break;
            case 'update': view.update(); break;
            case 'set':
                if (obj.fld === 'com') { // command
                  if (obj.val === 'cnl' && mem.allow(0)) { // only com so far
                    var lastComm = mem.last()[0]; // get memento
                   if (lastComm == -1) return
                    var cob = {};
                    cob.comm = 'set';
                    cob.fld = lastComm.fld; // col / lang
                    cob.val = lastComm.oldVal;
                    cob.cancel = false; // no memento this time
                    ctr.doit('set',cob); // create command
                  
                  } else if (obj.val === 'rdo' && mem.allow(1)){ // redo
                    var nxtComm = mem.redo()[0]; // get memento
                  if (nxtComm == -1) return
                    var nob = {};
                    nob.val = nxtComm.newVal;
                    nob.fld = nxtComm.fld;
                    nob.cancel = true;
                    ctr.doit('set',nob);
                  
                  }
               } else if (obj.fld === 'col') { // color change
                   var o = {}
                    o.fld = 'col'
                    o.oldVal = mod.currCol();
                    mod.setCurrCol(obj.val);
                    o.newVal = obj.val;
                    if (obj.cancel){
                      mod.ml = mem.done(o); // set memento
                  } else{
                  //alert('cancel:'+JSON.stringify(obj))
                  
                  }
                } else if (obj.fld === 'lang'){
                   obj.oldVal = mod.set(obj);
                   obj.newVal = obj.val;
                   if (obj.cancel){
                    mod.ml = mem.done(obj); // set memento
                   } else{ //alert('cancel:'+JSON.stringify(obj))
                  
                  }
                }
                view.update();
                break;
          default: alert("ctr.doit: " + comm + ' ?'); break;
          }}} // return & end of ctr
     }()); // end of private area
     return{// privileged (public) area start (App Facade)
            'exec': function exec(args){ //
                ctr.doit(args);
            },
            'set': function set(args){
                return ctr.doit('set',args);
            },'get': function set(args){
                return mod.get(args);
            } // end func
   } // return & privileged area end
  }()); // app end
 })(this); // end of invisible object

 try {
     window.addEventListener('load', function(e) { // trigger when ready
        app.exec('start');
     },false);
 } catch (e) {
     app.ctr.doit('err',e);
 }

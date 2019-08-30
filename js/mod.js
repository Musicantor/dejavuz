;(function ( app, undefined ){ // inject view object
  app.mod = (app.mod || {});
  app.mod=(function(){ // language model
           var modules = [];
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
           },
           'ready': function (who){
              modules.push(who);
              if (modules.length == 5) alert('ready');
           },
           'currCol': function (){
           return currCol;
           },'setCurrCol': function (col){ currCol = col;
           
           },
           'getElemName': function (n) {return elem[n];}
           }; // pub funcs end
    })(); // end of model
  
  })( window.app = window.app || {} ); // injection

;(function ( app, undefined ){ // inject view object
  app.mod = (app.mod || {});
  app.mod=(function(){ // language model
           var modules = [], pageNum=0;
           
           var lang = 'en', model = {
           // n = language number
           fi:{n:0,black:'Musta',red:'Punainen', green:'Vihreä', blue:'Sininen',
           uiCnl:'Peru',uiRdo:'Tee sittenkin',
           txt:'Builder ja memento GOF -suunnittelumallit testissä. Väri vaihtuu vaihtamalla JavaScriptin avulla lennossa koko CSS-tyyli. Huomaa myös valikoiden ja käyttöliittymän kielen vaihtuminen riippumatta siitä mistä komento tulee.',tle:'Tyyli ja kieli',hdng:'Esimerkki',
           inf:'Valitse kieli ja/tai tyyli, peruuta tai tee sittenkin toiminto uudelleen...'},
           
           en:{n:1,black:'Black',red:'Red', green:'Green', blue:'Blue',
           uiCnl:'Undo',uiRdo:'Redo',
           txt:'I am using builder and memento GOF -patterns here. Color is chanced by switchin the whole CSS-style on the run, by JavaScript. Notice the chances in user interface -language and menus, no matter from where the command comes.',tle:'"Style & Lang"',hdng:'Example',
           inf:'Choose language / style and undo / redo & again...'}
           
           },
           currCol = 'black',
           elem = ['output','info'],
           colors = {main:'red',sec:'green',thrd:'blue',4:'cyan',5:'#ff0'},
           setVal = function(o){
           //alert('setVal:' + o["fld"] + "=" + o["val"]);
           if (o["fld"] === 'lang'){
              var oldVal = lang; // for memento
              lang = o["val"];
              //alert(oldVal + ' changed to val:'+ o["val"]);
              return oldVal;
           } else if (o["fld"] === 'col'){
              return currCol; // for memento
              currCol = o["val"];
           } else { // other fields
              var oldVal = model[lang][o["fld"]];
              model[lang][o["fld"]]=o["val"];
              return oldVal;
           } // end if
           }; // end setVal
           return { 'set': function (obj){
                return setVal(obj);
           },'get': function (fld='txt'){ //alert(model[lang]['txt']);
               return model[lang][fld];
           },'col': function(obj){
              return setVal(obj);
           }, 'ready': function (who){
                modules.push(who);
                //if (modules.length == 5) alert('ready');
           }, 'currCol': function (){
                return currCol;
           }, 'getPageNum': function () {
                return pageNum;
           }, 'setCurrCol': function (col) {
                currCol = col;
           },  'getElemName': function (n) {
                return elem[n];
           }
           }; // pub funcs end
    })(); // end of model
  
  })( window.app = window.app || {} ); // injection

;(function ( app, undefined ){ // inject controller object
  app.controller = (app.controller || {});
  cntr = app.controller = (function(){ // controller
     function doTheThing (e) {
          //alert(JSON.stringify(arguments));
          if (arguments.length > 0) {
            switch (arguments[0]) {
              case 'start': {
                               //alert('start')
                                app.mod.set(arguments[1]);
                                app.view.update();
                           break;}
                           
              default: {
                           alert('def:'+ arguments[0])
                           
                } // default
             } // switch
          }else{
              alert('cntr:'+ arguments);
          } // end if else
     } // do
     return {
            'doit': function (comm,obj){
                           // obj: {fld:'txt',val:'hi'}
                          // alert(JSON.stringify(obj));
               switch (comm) {
                    case 'start': view.build(); break;
                    case 'err': alert("ctr: " + obj); break;
                    case 'update': view.update(); break;
                    case 'set':
                           //alert("SET" + JSON.stringify(obj));
                      if (obj.fld === 'com') { // command
                        if (obj.val === 'cnl' && mem.allow(0)) { // only com so far
                           var lastComm = mem.last()[0]; // get memento
                           if (lastComm == -1) return
                           var cob = {};
                           cob.comm = 'set';
                           cob.fld = lastComm.fld; // col / lang
                           cob.val = lastComm.oldVal;
                           cob.cancel = false; // no memento this time
                           cntr.doit('set',cob); // create command
                           
                        } else if (obj.val === 'rdo' && mem.allow(1)){ // redo
                           var nxtComm = mem.redo()[0]; // get memento
                           if (nxtComm == -1) return
                           var nob = {};
                           nob.val = nxtComm.newVal;
                           nob.fld = nxtComm.fld;
                           nob.cancel = true;
                           cntr.doit('set',nob);
                           
                        } // if inner
                    } else if (obj.fld === 'col') { // color change
                           var o = {}
                           o.fld = 'col'
                           o.oldVal = app.mod.currCol();
                           app.mod.setCurrCol(obj.val);
                           o.newVal = obj.val;
                        if (obj.cancel){
                           app.mod.ml = mem.done(o); // set memento
                        } else{
                           //alert('cancel:'+JSON.stringify(obj))
                           
                        }
                    } else if (obj.fld === 'lang'){
                           obj.oldVal = app.mod.set(obj);
                           obj.newVal = obj.val;
                        if (obj.cancel){
                           app.mod.ml = mem.done(obj); // set memento
                        } else{ //alert('cancel:'+JSON.stringify(obj))
                           
                        }
                    } //if outer
                           view.update();
                           break;
                default: alert("cntr.doit: " + comm + ' ?'); break;
                           } // switch
         }, // doit func
    'exec': function exec(a,b){ //
            cntr.doit(a,b);
        },
    'set': function set(args){
            return cntr.doit('set',args);
        },
    'get': function set(args){
        return app.mod.get(args);
        }, // end func
    'start': function (a){
               doTheThing(arguments[0], arguments[1])
           }
   } // interface end
})(); // end of controller
  })( window.app = window.app || {} ); // injection

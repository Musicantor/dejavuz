;(function ( app, undefined ){ // inject controller object
  app.controller = (app.controller || {});
  cntr = app.controller = (function(){ // controller
     function replaceFile(xfile, newfile, ftype){ // to switch between styles
             var jsorcss=(ftype=="js")? "script" : (ftype=="css")? "link" : "none"
             var addr=(ftype=="js")? "src" : (ftype=="css")? "href" : "none"
             var fileArr=document.getElementsByTagName(jsorcss)
               for (var i= fileArr.length; i>=0; i--) {  //search
                    if ( fileArr[i] && fileArr[i].getAttribute(addr)!=null &&       fileArr[i].getAttribute(addr).indexOf(xfile)!=-1) {
                           var newel=createFile(newfile, ftype)
                                 fileArr[i].parentNode.replaceChild(newel,fileArr[i])
                    }
                }
     }
     return {
            'doit': function (comm,obj){
               switch (comm) {
                    case 'start': view.build(0); break;
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
                        }
                    } else if (obj.fld === 'lang'){
                           obj.oldVal = app.mod.set(obj);
                           obj.newVal = obj.val;
                        if (obj.cancel){
                           app.mod.ml = mem.done(obj); // set memento
                        }
                    } //if outer
                           view.update();
                           break;
                   case 'sel':
                           if( arguments[1][1] == 'lang'){
                             this.doit('set',{'fld':'lang','val':arguments[1][0],'cancel':true});
                           }
                           if( arguments[1][1] == 'col'){
                           this.doit('set',{'fld':'col','val':arguments[1][0],'cancel':true});
                           }
                           break;
                default: alert("cntr.doit: " + comm + ' ?'); break;
                 } // switch
         }, // doit func
    'exec': function exec(a,b){ //
            cntr.doit(a,b);
        }
   } // interface end
})(); // end of controller
  })( window.app = window.app || {} ); // injection

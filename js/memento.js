;(function ( app, undefined ){ // inject controller object
  app.memento = (app.memento || {});
  app.memento = {}
  mem = app.memento; // memento shortcut mem
  
  /*
   mem.done(obj) <-- remember command
   mem.last() --> undo last command and move it into redos
   mem.redo() --> redo last undo -command
   mem.allow(1); 0 =  cancel, 1  redo (boolean)
   obj {fld:'txt',  // txt,col,com
   val:'string',
   oldVal:'string',
   newVal:'string',
   cancel:[boolean]
   
   }
   
   */
  var mementoArray = [], redos=[], len=0, allow=[false,false];
  
  mem.done = function (commObj){ // insert memento command
                    commObj.cancel = true;
                    len = mementoArray.push(commObj);
                    allow[0] = true; // enable undo btn
                    return len; // return number of mementos
                  }
  mem.last = function (){ // get last command to cancel operation
                     if (allow[0]) {
                        len = len - 1;
                      if (len == 0) {
                       allow[0] = false; // disable undo button here?
                      };
                        var tmp = mementoArray.splice(len,1)
                        redos.push(tmp[0])
                        allow[1] = true; // enable redo btn
                        return tmp;
                    } else {
                        return -1;
                    }
                  }
  mem.redo = function (){ // cencel former cancel operation
                    if (allow[1]) {
                       var tmp = redos.splice(redos.length-1,1);
                       if (redos.length == 0) {
                            allow[1] = false; // disable redo button
                       };
                       return tmp;
                    } else {
                        return -1;
                    }
                 }
  mem.allow = function (i=0){ // is there something to cancel?
                          return allow[i];
                      }
  


})( window.app = window.app || {} ); // injection

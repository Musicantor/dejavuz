////////GLOBAL AREA  //// DEBUGGER START 
var cnt = 0;
var put = function put(viesti){ // simppeli viesti komentoriville
	console.log("foo:", viesti);
};
var verify = function verify(test, val, msg) { // UNIT - TESTING
	 cnt++; 
	 if ((test===val)===false) { 
	 	put("Unit-test:\n"+msg+":\n"+test+" !== "+val + "\nNro:" + cnt); 
	 	return false; 
	 } else { 
	 	return true; 
	 } // if
}; // verify	
this.onerror=function(type, msg,Ln,ch,Url,stck){ // Virheiden käsittelijä
	var result = type, virhe = "" 
	var MY_ERR="MyCustomError", TYPE_ERR="TypeError", REF_ERR="ReferenceError",SYNTAX_ERROR="SyntaxError";
	var RANGE_ERR = "RangeError", URI_ERR="URIError",DEF_ERR="Error";
	if (type == DEF_ERR) virhe = DEF_ERR + " = Geneerinen virhe";
	if (type == SYNTAX_ERROR) virhe = SYNTAX_ERROR + " = Syntaksivirhe";
	if (type == MY_ERR) virhe = MY_ERR + " = Kustomoitu virhe";
	if (type == URI_ERR) virhe = URI_ERR + " = Osoitemoka";
	if (type == RANGE_ERR) { virhe = RANGE_ERR + " = Raja-arvovirhe"};
	if (type == REF_ERR) { virhe = REF_ERR + " = Viittausmoka"};
	if (type == TYPE_ERR) {virhe = TYPE_ERR + " = Tietotyyppimoka"};
	put(">>>>>>: " + virhe  + "\nViesti:\n" + msg + "\nURL:\n" + Url + "\nLocation: " + Ln+"/"+ch+"\nStack:\n"+stck);
};
/////////// DEBUGGER END
try {
//'use strict';   /* strict modessa funktion sisällä this on undefined, ei global (window Object)  */

/////////// DEBUGGER 2 START
var strictMode=function (){
        return !this;
} // strictMode
// verify(strictMode(), false, "strict mode on päällä !"); 

// Generoituja virheitä testaamiseen:
/*
var fs = require('fs');
fs.readFile('/some/file/that/does-not-exist', function nodeStyleCallback(err, data) {
  console.log("A:" + err)  // Error: ENOENT
  console.log(data) // undefined / null
});
*/
/*
var net = require('net');
var connection = net.connect('macmini2.local');
// adding an "error" event handler to a stream:
connection.on('error', function(err) {
  // if the connection is reset by the server, or if it can't
  // connect at all, or on any sort of error encountered by the connection
  console.error("ConnectionError: " + err);
});
connection.pipe(process.stdout);
*/
/*
var EventEmitter = require('events');
var ee = new EventEmitter();
setImmediate(function() {
  // this will crash the process because no "error" event handler has been added.
  ee.emit('error', new Error('This will crash'));
});
*/
var MyCustomError = function MyCustomError (type, message, ln,st) { // customoitu virheilmoitus
  this.name = (type || "MyCustomError");
  this.sourceUrl = 'main.js'; 
  this.line = ln;
  this.column = 0;
  this.stack = "Testiarvo: " + st;
  this.message = (message || "Tämä on räätälöity virheilmoitus");
};
var throwCustomError = function throwCustomError (msg) {
	var testvalue = 1234;
	MyCustomError.prototype = new Error();
	MyCustomError.prototype.constructor = MyCustomError();
	var err = new MyCustomError("MyCustomError",msg, 51, testvalue);
	throw err; // Poikkeuksenkäsittely, virheen heitto
}
// fooz++;  // ReferenceError doesNotExist
// var pi = 3.14159; pi.toFixed(100000);  // RangeError
// require('net').connect(-1); // RangeError
// var foo = {}; foo.bar(); // TypeError
// require('url').parse(function() { }); // TypeError
// decodeURIComponent("%"); // URIError
// eval(unescape('%61%6C%65%72%22%68%65%6C%6C%6F%22%29')); // SyntaxError
// require("vm").runInThisContext("binary ! isNotOk"); // SyntaxError
// throw new Error("Generoitu virhe on tässä tapauksessa harmiton"); // Error
// throwCustomError("Itsetuhojärjestelmä laukaistu!"); // MyCustomError
// new Error("Virhe jota ei heitetä, ei aiheuta poikkeusta");
/* TOIMINTA: failed to connect to server, failed to resolve hostname, invalid user input
request timeout, server returned a 500 response
socket hang-up, system is out of memory
OHJELMOINTI: tried to read property of "undefined", called an asynchronous function without a callback
passed a "string" where an object was expected, passed an object where an IP address string was expected*/
/*
function makeFaster() {
  // cheetahify *synchronously* calls speedy. 
    throw new Error('oh no!');
}
//makeFaster();
var myObject = {
};
Error.captureStackTrace(myObject);
//put(myObject.stack)
*/


///////////////////////////////// DEBUG 2 END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// foo module
module.exports = function(){};
foo = function (){ // global, not var !
 // var fullInfo = this.root == global === GLOBAL // [Circular]
 // this.root.__proto__; // {}
 // this.window == undefined; // true
 // paitsi jos:
 // window = "";
	var nimi = this.process.title; // node
	var v = this.process.version; //'v5.0.0' 
	var bc = this.process.moduleLoadList[0]; // Binding contextify
	var mll = this.process.moduleLoadList[1]; // Binding natives
	var machine = this.process.platform; // darwin
	var pwd = this.process.env.PWD // /Users/the/Sites/js/foo
	var file = this.process.mainModule.filename;  // /Users/the/Sites/js/foo/footst.js
	// this.process.stdout = "hi"; // alternative to console.log()
	var up = this.process.uptime(); // 0.208 kauanko prosessin ajo on kestänyt? 
	var info = nimi + " " + v + " on " + machine +"\n";
	info += file + " host:" ;
	return info;
}
put(foo());

////////// UNIT TESTIT ja VIRHEENKÄSITTELY
var unit_test = function () { // lisää testit tähän
	verify(true, true, "Unit test ei toimi");
	verify(false, false, "Unit test ei toimi");
	// verify(true, false, "Unit-testit ajettu !");
} // unit test end

} catch (e) { // blokki ajetaan jos tulee virheitä
	this.onerror(e.name, e.message, e.line, e.column, e.sourceURL, e.stack);	
} finally {
	// tämä blokki ajetaan joka tapauksessa tuli virheitä tai ei
	unit_test();
 } // try
 
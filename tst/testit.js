QUnit.module( "Basic testing" );
QUnit.test( "Basic test", function( assert ) {
           assert.ok(typeof app == 'object', "Expected namespace app." );
           assert.ok(typeof app.cntr == 'object', "Expected namespace cntr." );
           assert.ok(typeof app.view == 'object', "Expected namespace view." );
           assert.ok(typeof app.model == 'object', "Expected namespace model." );
           assert.ok(typeof app.mem == 'object', "Expected namespace mem." );
           });

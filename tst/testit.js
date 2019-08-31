QUnit.module( "Basic testing" );
QUnit.test( "app tests", function( assert ) {
      assert.ok(typeof app == 'object', "Expected namespace app." );
      assert.ok(typeof app.view == 'object', "Expected namespace view." );
      assert.ok(typeof app.mod == 'object', "Expected namespace mod = model." );
      assert.ok(typeof app.bld == 'object', "Expected namespace bld = builder." );
      assert.notEqual((typeof app.cntr !== 'object'), false, "app.cntr should be invisible");
      assert.notEqual((typeof app.mem !== 'object'), false, "app.mem should be invisible");
      assert.ok(typeof app.exec == 'function', 'Expected app.exec to be function');
      assert.notEqual(typeof app.loadModule !== 'function',false, 'Expected app.loadModule to be invisible');
           });
QUnit.test( "mod tests", function( assert ) {
           assert.ok(typeof app.mod == 'object', "Expected namespace mod." );
           assert.ok(typeof app.mod.get() == 'string', "Expected get() to return string." );
           assert.ok(app.mod.getPageNum() == 0, "Expected getPageNum() to return zero." );
           assert.ok(typeof app.mod.set == 'function', "Expected set to be function." );
           assert.ok(typeof app.mod.ready == 'function', "Expected ready to be function." );
           assert.ok(typeof app.mod.setCurrCol == 'function', "Expected setCurrCol to be function." );
           assert.ok(typeof app.mod.getElemName == 'function', "Expected getElemName to be function." );
           assert.notEqual((app.mod.currCol == 'black'), 'black', "app.mod.currCol should return black");
           });



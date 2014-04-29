var expect = require('chai').expect;
var asterUglify = require('./index.js');
var parse = require('esprima').parse;
var Promise = require('bluebird');

describe('aster-uglify', function() {
    it('should works with array of syntax-trees', function(done) {
        var sources = ['var aaa = 1; if (true) { console.log(aaa); }', 'if(false) { } else { var bbb = 2; }'].map(parse);
        var expected = ['var aaa=1; console.log(aaa);', 'var bbb = 2;'].map(parse);
        Promise.all(asterUglify()(sources)).then(function(res) {
            expect( res ).to.eql(expected);
            done();
        });
    });
});

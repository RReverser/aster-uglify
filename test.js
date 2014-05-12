var expect = require('chai').expect;
var Promise = require('aster').Promise;
var parse = require('esprima').parse;
var asterUglify = require('./index.js');

describe('aster-uglify', function() {
    it('should works with array of syntax-trees', function(done) {
        var sources = ['var a = 1; if (true) { console.log(a); }', 'if(false) { } else { var b = 2; }'].map(parse);
        var expected = ['var a=1; console.log(a);', 'var b = 2;'].map(parse);
        Promise.all(asterUglify({ warnings: false })(sources)).then(function(res) {
            expect( res ).to.eql(expected);
            done();
        });
    });
});

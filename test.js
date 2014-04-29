var expect = require('chai').expect;
var asterUglify = require('./index.js');
var parse = require('esprima').parse;

describe('aster-uglify', function() {
    it('should works with array of syntax-trees', function() {
        var sources = ['var aaa = 1; if (true) { console.log(aaa); }', 'if(false) { } else { var bbb = 2; }'].map(parse);
        var expected = ['var aaa=1; console.log(aaa);', 'var bbb = 2;'].map(parse);
        expect( asterUglify()(sources) ).to.eql(expected);
    });
});

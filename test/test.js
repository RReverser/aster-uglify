var expect = require('chai').expect;
var aster = require('aster');
var Promise = aster.Promise;
var parse = require('esprima').parse;
var asterUglify = require('../');
var fs = require('fs');

describe('aster-uglify', function() {
    it('should work with array of syntax-trees', function() {
        var expected, actual;
        return aster.src('./test/from*.js')
            .then( asterUglify({ compress: { warnings: false } }) )
            .then(aster.dest('tmp'))
            .then(function() {
                var ast1 = parse( fs.readFileSync('./tmp/test/from1.js') );
                var exp_ast1 = parse( fs.readFileSync('./test/to1.js') );
                expect(ast1).to.eql(exp_ast1);

                var ast2 = parse( fs.readFileSync('./tmp/test/from2.js') );
                var exp_ast2 = parse( fs.readFileSync('./test/to2.js') );
                expect(ast2).to.eql(exp_ast2);
            });
    });
});

var expect = require('chai').expect;
var aster = require('aster');
var Promise = aster.Promise;
var parse = require('esprima').parse;
var asterUglify = require('../');
var fs = require('fs');

describe('aster-uglify', function() {
    it('should work with array of syntax-trees', function() {
        function whenPrograms(asts) {
            return Promise.map(asts, function (ast) {
                return ast.program;
            });
        }

        var actual = aster.src('test/from/+(1|2).js').then(asterUglify({ compress: { warnings: false } }));

        var expected = aster.src([
            {code: 'test/to/1.js', map: 'test/to/1.js.map'},
            {code: 'test/to/2.js', map: 'test/to/2.js.map'}
        ]);

        return Promise.props({
            actual: actual.then(whenPrograms),
            expected: expected.then(whenPrograms)
        }).then(function (results) {
            expect(results.actual).to.eql(results.expected);
        });
    });
});

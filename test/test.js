var expect = require('chai').expect;
var aster = require('aster');
var Promise = require('aster').Promise;
var parse = require('esprima').parse;
var asterUglify = require('../');

var fs = require('fs');

describe('aster-uglify', function() {
    it('should work with array of syntax-trees', function(done) {
        aster.src(['./test/ex1.js', './test/ex2.js'])
            .then( asterUglify({ compress: { warnings: false } }) )
            .then( aster.dest('./test/dest') )
            .then(function(res) {
                done();
            });
    });
});

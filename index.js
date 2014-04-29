'use strict';

var uglify = require('uglify-js');
var parse = require('esprima').parse;

module.exports = function(options) {
    var compressor = uglify.Compressor(options);
    return function(ast) {
        return ast.map(function(syntax) {
            var uglify_ast = uglify.AST_Node.from_mozilla_ast(syntax);
            uglify_ast.figure_out_scope();
            return parse( uglify_ast.transform(compressor).print_to_string() );
        });
    };
};
'use strict';

var uglify = require('uglify-js');
var compressor = uglify.Compressor({ warnings: false });

var parse = require('esprima').parse;

module.exports = function(ast) {
    return ast.map(function(syntax) {
        var uglify_ast = uglify.AST_Node.from_mozilla_ast(syntax);
        uglify_ast.figure_out_scope();
        return parse( uglify_ast.transform(compressor).print_to_string() );
    });
};
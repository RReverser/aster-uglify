'use strict';

var aster = require('aster');
var uglify = require('uglify-js');

module.exports = function(options) {
    var compressor = options.compress ? uglify.Compressor(options.compress) : null;

    return function(asts) {
        return aster.map.wait(asts, function(ast) {
            var uglifyAst = uglify.AST_Node.from_mozilla_ast(ast.program);

            if (compressor) {
                uglifyAst.figure_out_scope();
                uglifyAst = uglifyAst.transform(compressor);
            }

            if (options.mangle) {
                uglifyAst.figure_out_scope();
                uglifyAst.compute_char_frequency();
                uglifyAst.mangle_names();
            }

            var sourceMap = uglify.SourceMap();

            var stream = uglify.OutputStream({
                beautify: false,
                source_map: sourceMap,
                comments: options.comments
            });

            uglifyAst.print(stream);

            return {
                code: {path: ast.loc.source, contents: new Buffer(stream.toString())},
                map: {path: ast.loc.source + '.map', contents: new Buffer(sourceMap.toString())}
            };
        }).then(aster.parse);
    };
};
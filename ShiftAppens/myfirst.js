var http = require('http');
var mongo =require('mongodb')
var fs = require('fs');
var css =require('css');
const jsdom = require("jsdom");


var ast = css.parse('body { font-size: 12px; }', { source: 'source.css' });

var css = css.stringify(ast);

var result = css.stringify(ast, { sourcemap: true });
result.code; // string with CSS
result.map; // source map object*/

/*http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
});

}).listen(8080);

/*let jsdom=require('jsdom').JSDOM,
uri='public/index.html',
options={
  runScripts:'dangerously',
  resources:'usable'
};

jsdom.fromFile(uri,options).then(function(dom){
  let window =dom.window,
  document=window.document;
}).catch(function(e){
  console.log(e);

});*/

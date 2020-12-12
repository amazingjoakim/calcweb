var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
    var u = url.parse(req.url, true);
    var filename = "." + u.pathname;
    console.log(u.pathname);
    if (u.pathname == "/") {
        filename = "./form.html"
    }

    fs.readFile(filename, function (err, data) {
        if (err) {
            if (u.pathname == "/compute") {
                console.log("compu in");
                res.writeHead(200, { 'content-Type': 'text/html' });

                compa(u, res);
                res.end();
            }
            else {
                res.writeHead(404, { 'content-Type': 'text/html' });

                return res.end("<!DOCTYPE html><html><head> <title>404</title> </head> <body> <h1>404 kunde inte hitta sidan </h1></body>");
            }
        }
        else {
            res.writeHead(200, { 'content-Type': 'text/html' });
            console.log(u.pathname);
                res.write(data);
                return res.end();
        }
    });
    function compa(u, res) {
        var q = u.query;
        var svar = 5;
        var z = parseInt(q.x);
        console.log(z);
        var t = parseInt(q.y);
        console.log(t);
        switch (q.op) {
            case "plus":
                svar = z + t;
                res.write("<h1>" + z + " + " + t + " = " + svar + "</h1>");
                break;
            case "times":
                svar = z * t;
                res.write("<h1>" + z + " * " + t + " = " + svar + "</h1>");
                break;
            case "minus":
                svar = z - t;
                res.write("<h1>" + z + " - " + t + " = " + svar + "</h1>");
                break;
            case "division":
                svar = z / t;
                res.write("<h1>" + z + " / " + t + " = " + svar + "</h1>");
                break;
            default:
                res.write("404, kunde inte hitta svar");
                break;
        }
        console.log(svar);
    }

}).listen(8080);
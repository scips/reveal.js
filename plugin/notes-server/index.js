var http      = require('http');
var express   = require('express');
var fs        = require('fs');
var io        = require('socket.io');
var Mustache  = require('mustache');

var app       = express();
var staticDir = express.static;
var server    = http.createServer(app);

var qr        = require('qr-image');

io = io(server);

var opts = {
    port :      1947,
    baseDir :   __dirname + '/../../'
};

io.on( 'connection', function( socket ) {

    socket.on( 'new-subscriber', function( data ) {
        socket.broadcast.emit( 'new-subscriber', data );
    });

    socket.on( 'statechanged', function( data ) {
        delete data.state.overview;
        socket.broadcast.emit( 'statechanged', data );
    });

    socket.on( 'statechanged-speaker', function( data ) {
        delete data.state.overview;
        socket.broadcast.emit( 'statechanged-speaker', data );
    });

});

[ 'css', 'js', 'images', 'plugin', 'lib', 'assets' ].forEach( function( dir ) {
    app.use( '/' + dir, staticDir( opts.baseDir + dir ) );
});

app.get('/', function( req, res ) {
    console.log(req.connection.remoteAddress);
    if( req.connection.remoteAddress == '127.0.0.1' || req.connection.remoteAddress == '::ffff:127.0.0.1') {
        res.writeHead( 200, { 'Content-Type': 'text/html' } );
        fs.createReadStream( opts.baseDir + '/presenter/index.html' ).pipe( res );
    } else {
        res.writeHead( 200, { 'Content-Type': 'text/html' } );
        fs.createReadStream( opts.baseDir + '/public/index.html' ).pipe( res );
    }
});

app.get( '/notes/:socketId', function( req, res ) {

    fs.readFile( opts.baseDir + 'plugin/notes-server/notes.html', function( err, data ) {
        res.send( Mustache.to_html( data.toString(), {
            socketId : req.params.socketId
        }));
    });

});

app.get( '/qr.png' , function( req, res ) {
    var code = qr.image('http://10.1.0.24:1947', { type: 'png' });
    res.type('png');
    code.pipe(res);
});

// Actually listen
server.listen( opts.port || null );

var brown = '\x1B[33m',
    green = '\x1B[32m',
    reset = '\x1B[0m';

var slidesLocation = 'http://localhost' + ( opts.port ? ( ':' + opts.port ) : '' );

console.log( brown + 'reveal.js - Speaker Notes' + reset );
console.log( '1. Open the slides at ' + green + slidesLocation + reset );
console.log( '2. Click on the link in your JS console to go to the notes page' );
console.log( '3. Advance through your slides and your notes will advance automatically' );

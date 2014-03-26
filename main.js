'use strict';

var express = require('express'),
    middleware = require('./app/middleware');

var app = express(),
    port = 8000;

app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(middleware.react({
    header: {
        yield: 'js-yield-header',
        component: require('./public/js/components/header'),
        contextKey: 'initialHeaderStr'
    },
    footer: {
        yield: 'js-yield-footer',
        component: require('./public/js/components/footer'),
        contextKey: 'initialFooterStr'
    }
}));

app.get('/', function(req, res) {
    return res.renderComponent('autocomplete', {myCustomVar: 'Hey, I am a custom var from the server'});
});
app.listen(port);
console.log('HTTP server running at port ' + port);

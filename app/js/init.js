/*global requirejs*/
'use strict';

requirejs.config({
    baseUrl: 'app/js',
    urlArgs: 'bust=' + (+new Date())
});

requirejs(['app']);

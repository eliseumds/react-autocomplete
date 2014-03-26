/*global requirejs*/
'use strict';

requirejs.config({
    baseUrl: '/js',
    urlArgs: 'bust=' + (+new Date())
});

requirejs(['app']);

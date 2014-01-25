/*global requirejs*/
'use strict';

requirejs.config({
    baseUrl: 'app',
    urlArgs: 'bust=' + (+new Date())
});

requirejs(['app']);

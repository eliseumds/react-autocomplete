'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function(require) {
    var Rx = require('rx');

    return {
        componentWillMount: function() {
            if (!this.subjects) return;

            var eventHandlers = {},
                subjects = {};

            this.subjects.forEach(function(key) {
                var subject = new Rx.Subject();

                eventHandlers[key] = subject.onNext.bind(subject);
                subjects[key] = subject;
            });

            this.handlers = eventHandlers;
            this.subjects = subjects;
        },

        componentDidMount: function() {
            if (!this.subjects) return;

            var streams = this.fireStreams();
        },

        componentWillUnmount: function() {
            if (!this.subjects) return;

            for (var key in this.subjects) {
                this.subjects[key].dispose();
            }
        }

    };
});

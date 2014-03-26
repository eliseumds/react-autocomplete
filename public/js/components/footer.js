/** @jsx React.DOM */
'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function(require) {
    var React = require('react/addons');

    return React.createClass({
        render: function() {
            return (
                React.DOM.div( {className:"footer"}, 
                    React.DOM.hr(null ),
                    "Repo: ", React.DOM.a( {href:"https://github.com/eliseumds/react-autocomplete"}, "https://github.com/eliseumds/react-autocomplete"),
                    React.DOM.hr(null ),
                    "Extra: ", this.props.myCustomVar
                )
            );
        }
    });
});


/** @jsx React.DOM */

require([
    'components/autocomplete'
], function(Autocomplete) {

    var App = React.createClass({
        render: function() {
            return Autocomplete();
        }
    });

    React.renderComponent(App(), document.getElementById('view-yield'));

});

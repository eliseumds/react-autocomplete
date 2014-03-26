define(['lodash', 'config', 'react/addons'], function(_, config, React) {
    if (config.fastRender) {
        config.fastRender.components.forEach(function(item) {
            require(['./components/' + item.componentName], function(Component) {
                React.renderComponent(Component(_.cloneDeep(config.fastRender.props)), document.getElementById(item.yield));
            });
        });
    }
});

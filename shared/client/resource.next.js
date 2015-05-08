window.Resource = function (propertyPath, ...parameters) {
    var resource = Resources.findOne()
    if (propertyPath !== undefined) {
        var props = propertyPath.split(' ')
        for (var i = 0; i < props.length; i++) {
            resource = resource[props[i]]
        }
    }
    
    if (parameters !== undefined) {
        for (var i = 0; i < parameters.length; i++) {
            var regex = new RegExp(`\\$\\{${i}\\}`, 'g')
            resource = resource.replace(regex, parameters[i])
        }
    }
    return resource
}

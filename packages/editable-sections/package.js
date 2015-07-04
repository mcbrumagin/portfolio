//var path = Npm.require('path')

Package.describe({
    summary: 'Editable title/content sections',
    version: '1.0.0',
    name: 'editable-sections'
})

Package.onUse(function(api) {
    api.use(['templating'], 'client');
    api.add_files('client/editableSection.html')
    api.add_files('client/toggleEditableSections.html')
    api.add_files('client/editSection.html')
    api.add_files('editable-sections.next.js')
})

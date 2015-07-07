//var path = Npm.require('path')

Package.describe({
    summary: 'General utilities',
    version: '1.0.0',
    name: 'mcb-utility'
})

Package.onUse(function(api) {
    api.add_files('util.js')
    api.export('Util', ['client', 'server'])
})

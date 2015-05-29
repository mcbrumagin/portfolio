//var path = Npm.require('path')

Package.describe({
  summary: 'CRUD and other Collection utilities',
  version: '1.0.0',
  name: 'crud-collection'
})

Package.onUse(function(api) {
  api.add_files('crud-collection.js')
})

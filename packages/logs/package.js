//var path = Npm.require('path')

Package.describe({
  summary: 'Logger collection and utilities',
  version: '1.0.0',
  name: 'logger'
})

Package.onUse(function(api) {
  api.use('mcb-utility')
  api.use(['templating'], 'client')
  api.add_files('client/meteor-logger.html')
  api.add_files('client/logs.css')
  api.add_files('meteor-logger.js')
  api.export('Logger', ['client', 'server'])
})

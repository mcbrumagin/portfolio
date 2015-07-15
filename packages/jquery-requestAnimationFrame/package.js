//var path = Npm.require('path')

Package.describe({
  summary: 'jquery-requestAnimationFrame gnarf37 Github package',
  version: '0.1.2',
  name: 'jquery-requestanimationframe'
})

Package.onUse(function(api) {
  api.imply('jquery', 'client')
  api.addFiles(['jquery.requestAnimationFrame.js'], 'client')
  
  //api.imply('$', 'client');
  //api.imply('jQuery', 'client');
  
  //api.export('$', 'client');
  //api.export('jQuery', 'client');
})

/*
Package.onUse(function (api) {
  api.addFiles(['jquery.js', 'post.js'], 'client');

  api.export('$', 'client');
  api.export('jQuery', 'client');
});
*/
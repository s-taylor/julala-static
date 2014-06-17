_.templateSettings = interpolate: /\{\{(.+?)\}\}/g

window.Julala =
  Models: {}
  Collections: {}
  Routers: {}
  Views: {}

$(document).ready ->
  
  #create and render the app view
  Julala.appView = new Julala.Views.appView()
  Julala.appView.render()

  Julala.homeView = new Julala.Views.homeView()
  Julala.homeView.render()  

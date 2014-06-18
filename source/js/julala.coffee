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

  #start the router
  Julala.router = new Julala.Routers.appRouter()
  Backbone.history.start pushState: false

Julala.Views.appView = Backbone.View.extend(
  el: "#app"
  
  initialize: ->
    @template = _.template($("#appView").html())
    return

  render: ->
    @$el.html @template()
    return
)
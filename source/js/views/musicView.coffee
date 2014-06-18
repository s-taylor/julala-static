Julala.Views.musicView = Backbone.View.extend(
  el: "#output"
  
  initialize: ->
    @template = _.template($("#musicView").html())
    return

  render: ->
    @$el.html @template()
    return
)
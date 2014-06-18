Julala.Views.musicView = Backbone.View.extend(
  el: "#content-main"
  
  initialize: ->
    @template = _.template($("#musicView").html())
    return

  render: ->
    @$el.html @template()
    return
)
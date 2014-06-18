Julala.Views.aboutView = Backbone.View.extend(
  el: "#output"
  
  initialize: ->
    @template = _.template($("#aboutView").html())
    return

  render: ->
    @$el.html @template()
    return
)
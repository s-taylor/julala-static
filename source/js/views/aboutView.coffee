Julala.Views.aboutView = Backbone.View.extend(
  el: "#content-main"
  
  initialize: ->
    @template = _.template($("#aboutView").html())
    return

  render: ->
    @$el.html @template()
    return
)
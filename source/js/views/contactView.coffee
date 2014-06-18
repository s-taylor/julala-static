Julala.Views.contactView = Backbone.View.extend(
  el: "#output"
  
  initialize: ->
    @template = _.template($("#contactView").html())
    return

  render: ->
    @$el.html @template()
    return
)
Julala.Views.contactView = Backbone.View.extend(
  el: "#content-main"
  
  initialize: ->
    @template = _.template($("#contactView").html())
    return

  render: ->
    @$el.html @template()
    return
)
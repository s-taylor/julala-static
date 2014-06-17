Julala.Views.homeView = Backbone.View.extend(
  el: "#content-main"
  initialize: ->
    @template = _.template($("#homeView").html())
    return

  render: ->
    @$el.html @template()
    return
)
Julala.Views.japaneseView = Backbone.View.extend(
  el: "#content-main"
  
  initialize: ->
    @template = _.template($("#japaneseView").html())
    return

  render: ->
    @$el.html @template()
    return
)
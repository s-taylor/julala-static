Julala.Views.japaneseView = Backbone.View.extend(
  el: "#output"
  
  initialize: ->
    @template = _.template($("#japaneseView").html())
    return

  render: ->
    @$el.html @template()
    return
)
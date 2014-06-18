Julala.Views.calendarView = Backbone.View.extend(
  el: "#output"
  
  initialize: ->
    @template = _.template($("#calendarView").html())
    return

  render: ->
    @$el.html @template()
    return
)
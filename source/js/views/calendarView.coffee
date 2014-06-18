Julala.Views.calendarView = Backbone.View.extend(
  el: "#content-main"
  
  initialize: ->
    @template = _.template($("#calendarView").html())
    return

  render: ->
    @$el.html @template()
    return
)
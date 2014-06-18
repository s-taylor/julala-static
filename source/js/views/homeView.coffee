Julala.Views.homeView = Backbone.View.extend(
  el: "#output"
  
  initialize: ->
    @template = _.template($("#homeView").html())
    return 

  render: ->
    @$el.html @template()
    return

  events:
    'mouseover .tuition-link': 'color'
    'mouseleave .tuition-link': 'blackWhite'

  color: (event) ->
    target = $(event.currentTarget)

    target.find('.tuition').addClass('mouseover')
    target.find('img').addClass('mouseover')

  blackWhite: (event) ->
    target = $(event.currentTarget)

    target.find('.tuition').removeClass('mouseover')
    target.find('img').removeClass('mouseover')
)
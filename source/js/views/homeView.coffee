Julala.Views.homeView = Backbone.View.extend(
  el: "#content-main"
  
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
    console.log('applying color')

    target = $(event.currentTarget)

    target.find('.tuition').addClass('mouseover')

    target.find('img').addClass('mouseover')
      # 'filter'         : 'saturate(100%)',
      # '-webkit-filter' : 'saturate(100%)'

  blackWhite: (event) ->

    console.log('applying black and white')

    target = $(event.currentTarget)

    target.find('.tuition').removeClass('mouseover')

    target.find('img').removeClass('mouseover')
      # 'filter'         : 'saturate(0%)',
      # '-webkit-filter' : 'saturate(0%)'
)
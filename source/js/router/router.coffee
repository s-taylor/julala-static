Julala.Routers.appRouter = Backbone.Router.extend(
  routes:
    
    "": "home"
    "about": "about"
    "japanese": "japanese"
    "music": "music"
    "calendar": "calendar"
    "contact": "contact"
      
    #invalid url
    # '*anything': 'goHome'
  
  #home page
  home: ->
    @clearEvents()
    Julala.homeView = new Julala.Views.homeView()
    Julala.homeView.render()  
    return

  about: ->
    @clearEvents()
    Julala.aboutView = new Julala.Views.aboutView()
    Julala.aboutView.render()  
    return  

  japanese: ->
    @clearEvents()
    Julala.japaneseView = new Julala.Views.japaneseView()
    Julala.japaneseView.render()  
    return  

  music: ->
    @clearEvents()
    Julala.musicView = new Julala.Views.musicView()
    Julala.musicView.render()  
    return  

  calendar: ->
    @clearEvents()
    Julala.calendarView = new Julala.Views.calendarView()
    Julala.calendarView.render()  
    return

  contact: ->
    @clearEvents()
    Julala.contactView = new Julala.Views.contactView()
    Julala.contactView.render()  
    return

  clearEvents: ->
    $("#output").off()
    # console.log("clearing events")
)
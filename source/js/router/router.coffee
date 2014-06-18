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
    Julala.homeView = new Julala.Views.homeView()
    Julala.homeView.render()  
    return

  about: ->
    Julala.aboutView = new Julala.Views.aboutView()
    Julala.aboutView.render()  
    return  

  japanese: ->
    Julala.japaneseView = new Julala.Views.japaneseView()
    Julala.japaneseView.render()  
    return  

  music: ->
    Julala.musicView = new Julala.Views.musicView()
    Julala.musicView.render()  
    return  

  calendar: ->
    Julala.calendarView = new Julala.Views.calendarView()
    Julala.calendarView.render()  
    return

  contact: ->
    Julala.contactView = new Julala.Views.contactView()
    Julala.contactView.render()  
    return

  clearEvents: ->
    $("#content-main").off()
)
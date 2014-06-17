##CONVENTIONS

###IN ROUTER
route name: 'search/movies/results/:term'
route function name: searchMoviesResults (as above except without variable)
* variable name in route (if any): term
class name: ReviewMi.Views.searchMoviesResultsView (note: seperated by hypens)

###FOLDER / FILENAME
folder name: search_movies_results (term being the wildcard)
file name: searchMoviesResultsView.js

###TEMPLATE
template name (script tag): searchMoviesResultsView
div inside template (div wrapper): class="search-movies-results" (Note: hypens AND no -view)
* form inside template: id="search-movies-results-frm"

- - -

##SUB VIEW (MODEL WITHIN A COLLECTION)

file name: searchMoviesResultsSubView.js
class name: ReviewMi.Views.searchMoviesResultsSubView
template name: search-movies-results-sub-view

- - -

##HOME VIEW (ROOT PATH)

route name: ''
route function name: home 
class name: ReviewMi.Views.homeView

folder name: home
file name: homeView.js

template name (script tag): homeView
div inside template (div wrapper): class="home-view" (note: seperated by hypens)

##HOME SUB VIEW

file name: homeSubView.js
class name: ReviewMi.Views.homeSubView
template name: home-sub-view
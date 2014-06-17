//####build/js/test.js
var helloWorld = function () {
  console.log("hello world");
};
//####build/js/test2.js
(function() {
  var annoyingPopup;

  annoyingPopup = function() {
    alert("this is super annoying!");
  };

  annoyingPopup();

}).call(this);

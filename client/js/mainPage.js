// Here are the controllers for the main page "mainPage.html".


// The function passed to the controller is like its constructor. 
// In particular it contains the default values of the attributes.
// But it also defines the methods; so this is not exactly the constructor.
// It is merely a whole module in python : it is parsed on the first strike
// to create its functions and constants.
//
// From that point of view, it is better to not provide the '$scope' parameter
// and to use 'this'. Then use the controller using its alias created by
// ng-controller="<controller name> as <controller alias>">

function mainPageControllerFunction()
{
    this.author="Steve Arapporteunebiere";
};

var app=angular.module('mainPageApp',[]);
app.controller('mainPageController', mainPageControllerFunction);

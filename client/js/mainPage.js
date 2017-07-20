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

function mainPageControllerFunction(Book)
{
    this.author="Steve Arapporteunebiere";
    this.addBook=function()
    {
        var bc = Book.create();
        console.log(bc);
    }
};

// How is our controller aware of the module 'Book' ?
// 'Book' is exported (with many other stuff) at the top of 'lb-services.js' under the module name
// 'lsServices'.
// So we create our app 'mainPageApp' depending on 'lbServives' and when we create the controller
// we pass to 'mainPageControllerFunction' the (sub)module 'Boook'.

var app=angular.module('mainPageApp',['lbServices']);
app.controller('mainPageController', ['Book',mainPageControllerFunction]);

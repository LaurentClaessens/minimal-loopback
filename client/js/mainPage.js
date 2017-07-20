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
        //var bc = Book.create();
        bc = 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
        console.log(bc);
    }
};

var app=angular.module('mainPageApp',[]);


// The important point : we pass the object 'Book' to the function, so that loopback is exposed.
app.controller('mainPageController', ['Book',mainPageControllerFunction]);

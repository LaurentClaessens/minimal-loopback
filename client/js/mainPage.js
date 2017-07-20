// Here are the controllers for the main page "mainPage.html".

function mainPageControllerFunction()
{
    this.blah="default blah";
};

var app=angular.module('mainPageApp',[]);
app.controller('mainPageController', mainPageControllerFunction);

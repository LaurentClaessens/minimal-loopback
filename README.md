# My loopback helper

This is a minimalistic server/client toy model. The aim is to have a basic html/javascript client-side stuff that allows to create some objects on the loopback server. 

In this file we learn from scratch to

- install loopback
- set up the server
- install, set up and laund mongodb
- set up the server for basic html rendering
- create an html/javascript/angular client which is sufficient to create some object.

We will not learn

- the good practices to make the javascript side scalable/maintainable,
- create the css, the app.js and other redirections like that,
- install the softwares from your operating system point of view. We assume in particular mongo and npm to be available.

What you have here after cloning is the result of having followed this tutorial.

## Prerequiste

Do not clone this repository in the directory in which you plan to install your toy application.

## Installation

### Directory manipulations

Since loopback wants to install your application in an empty directory, you have to install the loopback command line interface somewhere else.

We will install loopback in `node` and our application in `toy` :
```
mkdir node
mkdir toy
```

### Loopback instalation

```
cd node
npm install loopback-cli
```

Launch is with no argument :
```
cd ../toy
./../node/node_modules/loopback-cli/bin/loopback-cli.js
```
For the toy example, we choose 

* name : <whatever> let's say «toy»
* version : long-term support
* notes (A project containing a basic working example, including a memory database)

Notes : 

* Here we have to give the full strange path because we did not 
`npm -g install loopback-cli`. This is a local installation and the shortcut in
`/usr/bin/something` is not created.

* It says that the next step is `lb model` but, for the same reason, the executable `lb` is not available.

If you understood that story of 'path manipulations', we understand that `loopback-cli` is not available in the current directory. So let us install it :

```
npm install loopback-cli --save
```
This time it is installed in the `toy` directory dans saved in the file `package.json`.


### Launch your app

Now the server should work invoking
```
node .
```
Open the following in your browser 
- `http://0.0.0.0:3000` should provide the uptime of the server
- `http://0.0.0.0:3000/explorer` is already a complete web based application to create, remove and patch notes.

### Mongodb

#### Connector

Install the mongodb connector :

```
npm install loopback-connector-mongodb --save
```
and connect it to your app :
```
./node_modules/loopback-cli/bin/loopback-cli.js datasource
```

* nom : toy
* connector : mongoDB
* url : mongodb://localhost:27017/toy

#### Launch the database

You have to invoke
```
mongod --dbpath=<path>
```
where `<path>` is the path where the database will puts its data. We put it next to the old loopback trick :
```
mkdir -p ../node/data/db
mongod --dbpath=../node/data/db
```
Advise : do it in an other terminal since the process will have to stay forever.

## Your models and relations

### Models

Loopback has already created a simple 'note' model. We will create a model 'book' that will contain several notes; each note will be the property of a book.


For creating the model :
```
./node_modules/loopback-cli/bin/loopback-cli.js model
```

* name : 'book'
* toy (mongodb)
* class : persistedModel

For the properties we will have :

* author : string
* content : string

Since loopback had yet created 'Note' for us, we just remove that editing the file
`toy/server/model-config-json`.

Now, relaunching our server and looking at `http://0.0.0.0:3000/explorer/#!/Note/Note_create`, we see that 'Note' has disappeared.

### Relations

Let's make the relations.
```
./node_modules/loopback-cli/bin/loopback-cli.js relation
```

* note belongs to one book
* book has many note

## Client

We are going to build a minimalistic `html/javascript` page that creates a book and put it in the database.

### Pause : npm

You will need them now or later :
```
npm install path --save
npm install fs --save
```

### The express trick

We are going to store our files in 

- `toy/client/html`
- `toy/client/js`

But if one tries to connect to `http://0.0.0.0:3000/html/myPage.html` it does not work because our server do not know how to serve these pages.

We install an `express` static server going in `toy/server/server.js` and adding the lines 

```
const path=require('path');
const express=require("express");
app.use(express.static(path.resolve(__dirname,"../client/html")));
app.use(express.static(path.resolve(__dirname,"../client/js")));
```
right after the creation of the object `app`.

Now put an html file in `toy/client/html/mainPage.html`, restart the server and open your browser at `http://0.0.0.0:3000/mainPage.html`.

Note : the page `toy/client/html/mainPage.html` appears in `http://0.0.0.0:3000/mainPage.html`, not `http://0.0.0.0:3000/html/mainPage.html`.

Now any requirement like
```
<script src="bla/blo.js"></script>
```
will be interpreted as `toy/client/js/bla/blo.js` and will be served.

### The html part

### Creating your files

We need an `html` page able to use some javascript. The files are

- `toy/client/html/mainPage.html`
- `toy/client/js/mainPage.js`

Thus the head is :

```
<!DOCTYPE html>
<html lang='fr'>
<head>
    <meta charset="utf-8" />
    <title>My toy app</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
    <script src="mainPage.js"></script>
</head>

HERE COMES THE BODY

</html>
```

The controller will be the function `mainPageController` and we "import" it as `MPcontroller` (MP as main page)


```
<body ng-app="mainPageApp" ng-controller="mainPageController as MPcontroller">

</body>
```

#### Minimal Angular app

The minimal is to attach a text input zone to a controller variable. Here is the 'html' code :

```
    <input type="text" ng-model="MPcontroller.blah">    
    <br>
    You type : {{MPcontroller.blah}}
```

and the 'js' part :

```
function mainPageControllerFunction()
{
    this.blah="default blah";
};

var app=angular.module('mainPageApp',[]);
app.controller('mainPageController', mainPageControllerFunction);
```

The result is on the commit number `5e60e567ddb34b13efac4314f646cf69aa4c52a7` (obviously the commit number given here is
 not part of what you get by checking out this commit).

### Generating the loopback files

What you need to interact with your "online" database is to produce the correct GET/POST requests. 
Loopback can create for you some (quite complicated) javascript obkects which are aware of the correct URL's and the way to
form the requests.

```
npm install strongloop --save
```

If you install it with ``-g`, the executable ``lb-ng` is created (it is a link). If not (as I do), we have to understand where is the real executable. Here is then answer.

```
mkdir -p <toy>client/js/services
```

The following has to be launched from the main directory of your application (the directory which is named <toy>).
```
./node_modules/strongloop/node_modules/loopback-sdk-angular-cli/bin/lb-ng.js server/server.js client/js/services/lb-services.js
```

In our minimalistic application, we have defined no relations for the user, the access tokens and so on. So you will be slightly insulted by loopback but it is not a big deal.

### Pause : what is happening

The file `<toy>/client/js/services/lb-services.js` contains a quite complicated object ``Book`. This is a module which contains the loopback services. This object will be made available to our html page by including it in the usual way :
```
<script src=services/lb-services.lb></script>
```

That stuff uses the package `angular-resource` so we install it :
```
npm install angular-resource --save
```

In order to load these packages in our html/javascript code, we copy them in the directory `<toy>/client/js/vendor`.

Note : in a real application, it seems preferable to make copy them by an 'install.sh' scripts which launches `npm install` before, in order to get the latest version.

```
mkdir -p <toy>/client/vendor
cp -r <toy>/node_modules/angular-resource <toy>/client/vendor
```

In order to have these files served, we have to redo the 'express' static server trick. So add the following line with the others.
```
app.use(express.static(path.resolve(__dirname,"../client/vendor")));
```

### The final html

For the user, want to present 

* a text zone asking for an author name
* a button which creates the book

### The controller

The extremely important point is the controller to get a reference to the 'Book' object.

### So what ?

I'm not describing here how to fill these files. Instead you should read the comments in the files themselves.


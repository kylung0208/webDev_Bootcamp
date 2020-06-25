# YelpCamp

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
* Name
* Image
    EX:
        [
            {name: "Salmon Creek}, image: "http://www.image.com"},
            {name: "Salmon Creek}, image: "http://www.image.com"},
            {name: "Salmon Creek}, image: "http://www.image.com"},
            {name: "Salmon Creek}, image: "http://www.image.com"},
            {name: "Salmon Creek}, image: "http://www.image.com"},
            {name: "Salmon Creek}, image: "http://www.image.com"},
            {name: "Salmon Creek}, image: "http://www.image.com"},
        ]

## Layout and Basic Styling
* Create our deader and footer partials
* Add in Bootstrap

## Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

## Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

## Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

## Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

## Show Page
* Review the RESTful routes we've seen so far
    - INDEX
        - url: /dogs
        - verb: GET
        - desc.: Display a list of all dogs
    - NEW
        - url: /dogs/new
        - verb: GET
        - desc.: Display form to make a new dog
    - CREATE
        - url: /dogs
        - verb: POST
        - desc.: Add new dog to DB
    - SHOW
        - url: /dogs/:id
        - verb: GET
        - desc.: Shows info about one dog
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

## Refactor Mongoose Code
- Create a models directory
- Use module.exports
- Require everything correctly!

## Add Seeds File
- Add a seeds.js file
- Run the seeds file every time the server starts

## Add the Comment model!
- Make our errors go away!
- Display comments on campground show page

## Comment New/Create
- Discuss nested routes
    - NEW: campgrounds/:id/comments/new (GET)
    - CREATE: campgrounds/:id/comments (POST)
- Add the comment new and create routes
- Add the new comment form

## Style Show Page
- Add side bar to show page
- Display comments nicely

## Finish Styling Show Page
- Add public directory
- Add custom stylesheet

## Auth Pt. 1 - Add User Model
- Install all packages for auth
- Define user model

## Auth Pt. 2 - Register
- Configure passport
- Add register routes
- Add register template

## Auth Pt. 3 - Login
- Add login routes
- Add login template

## Auth Pt. 4 - Logout/Navbar
- Add logout route
- Prevent user from adding a comment if not signed in
- Add links to navbar

## Auth Pt. 5 - Show/Hide links
- Show/hide auth links in navbar correctly

## Refactor The Routes
- Use Express router to reorganize all routes

## Users + Comments
- Associate users and comments
- Save author's name to a comment automatically

## Users + Campgrounds
- Prevent an unauthenticated user from creating a campground
- Save username+id to newly created campground
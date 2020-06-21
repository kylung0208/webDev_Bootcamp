# RESTFUL Routing

## Introduction
- Define REST and explain WHY it matters
- List all 7 RESTFUL routes
- show example of ＲESTful routing in practice

    - **REST** - a mapping between HTTP routes and CRUD(Create, Read, Update, Destroy)
    - RESTful Routes (A table of 7 RESTful routes)
        - Name
            - Index
                - Path: /dogs
                - HTTP Verb: GET
                - Purpose: List all dogs
                - Mongoose Method: *Dog.find()*
            - New
                - Path: /dogs/new
                - HTTP Verb: GET
                - Purpose: Show new dog form
                - Mongoose Method: *N/A*
            - Create
                - Path: /dogs
                - HTTP Verb: POST
                - Purpose: Create a new dog, then redirect somewhere
                - Mongoose Method: *Dog.create()*
            - Show
                - Path: /dogs/:id
                - HTTP Verb: GET
                - Purpose: Show info about one specific dog
                - Mongoose Method: *Dog.findById()*
            - Edit
                - Path: /dogs/:id/edit
                - HTTP Verb: GET
                - Purpose: Show edit form for one dog
                - Mongoose Method: *Dog.findById()*
            - Update
                - Path: /dogs/:id
                - HTTP Verb: PUT
                - Purpose: Update a particular dog, then redirect somewhere
                - Mongoose Method: *Dog.findByIdAndUpdate()*
            - Destroy
                - Path: /dogs/:id
                - HTTP Verb: DELETE
                - Purpose: Delete a particular dog, then redirect somewhere
                - Mongoose Method: *Dog.findByIdAndRemove()*

## Blog Index
- Ssetup the Blog App
- Create the Blog model
- Add INDEX route and template
- Add Simple Nav Bar

## Basic Layout
- Add Header and Footer Partials
- Include Semantic UI
- Add Simple Nav

## Putting the C in CRUD
- Add NEW route
- Add NEW template
- Add CREATE route
- Add CREATE template

## SHOWtime
- Add Show route
- Add Show template
- Add links to show page
- Style show template

## Edit/Update
- Add Edit Route
- Add Edit Form
- Add Update Route
- Add Update Form
- Add Method-Override

## DESTROYYYYYY
- Add Destroy Route
- Add Edit and Destroy Links

## Final Updates
- Sanitize blog body (npm install express-sanitizer --save)
- Style Index
- Update REST Table
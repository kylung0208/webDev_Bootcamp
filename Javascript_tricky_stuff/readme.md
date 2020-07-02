# The new keyword
1. Creates an object out of thin air
2. Assigns the value of "this" to be that object
3. Adds "return this" to the end of the function
4. Creates a link (which we can access as __proto__) between the object created and the prototype property of the constructor function.
    ```
    function Car(make, model, year){
        this.make = make
        this.model = model
        this.year = year
        // we can also set properties on the keyboard this
        // that are preset values
        this.numWheels = 4
    }
    ```
    ```
    function Motrocycle(make, model, year){
        //using call
        Car.call(this, make, model, year)
        this.numWheels = 2
    }
    ```
    ```
    function Motrocycle(make, model, year){
        //using apply
        Car.apply(this, [make, model, year])
        this.numWheels = 2
    }
    ```
    ```
    function Motrocycle(make, model, year){
        //even better using apply with arguments (arguments = [make, model, year])
        Car.call(this, argument)
        this.numWheels = 2
    }
    ```

# Prototypes
```
        .constructor
Person <--------------- Person.prototype
       --------------->    ^         ^
         .prototype       /           \
                         /  .__proto__ \
                       elie           colt
```
- Every constructor function has a property on it called "prototype", which is an object
- The prototype object has a property on it called "constructor", which points back to the constructor function
- Anytime an object is created using the "new" keyword, a property called "__proto__" gets created, linking the object and the prototype property of the constructor function
    ```
    //this is the constructor function
    function Person(name){
        this.name = name
    }

    //this is an object created from the Person constructor
    let elie = new Person("Elie")
    let colt = new Person("Colt")

    // since we used the new keyword, we have established
    // a link between the object and the prototype property
    // we can access that using __proto__
    elie.__proto__ === Person.prototype // true
    colt.__proto__ === Person.prototype // true

    // Ther Person.prototype object also has a property
    // called constructor which points back to the function
    Person.prototype.constructor === Person // true
    ```

# Prototype Chain
```
// this is the constructor function
function Person(name){
    this.name = name
}

// this is an object created from the Person constructor
let elie = new Person("Elie")
let colt = new Person("Colt")
```
```
Person.prototype.isInstructor = true

elie.isInstructor // true
colt.isInstructor // true

// how were we able to access properties on the prototype??

// __proto__ !
```

```
        .constructor                    .__proto__
Array <--------------- Array.prototype ------------->Object.prototype
       --------------->    ^                                |
         .prototype       /                                 |  .__proto__
                         /.__proto__                        `
                       arr                                 null
```

- Refactoring 
    - instead of:
    ```
    function Person(name){
        this.name = name
        this.sayHi = function(){
            return "Hi " + this.name
        }
    }

    elie = new Person("Elie")
    elie.sayHi() // Hi Elie

    // now thi code works, but it is inefficient
    // everytime we make an object using the new keyword we have to redefine this function
    // but it's the same for everyone! Let's put it on the prototype instead!
    ```
    - we do:
    ```
    function Person(name){
        this.name = name
    }

    Person.prototype.sayHi = function(){
        return "Hi " + this.name
    }
    
    elie = new Person("Elie")
    elie.sayHi() // Hi Elie
    ```
    - Exercise:
        - Create a constructor function for a Vehicle: every object created from this constructor should have a make, model, and year property. Each object should also have a property called isRunning, which should be set to false
        - Every object created from the Vehicle constructor should have a function called turnOn, which changes the isRunning property to true
        - Every object created from the Vehicle constructor should have a function called turnOff, which changes the isRunning property to false
        - Every object created from the Vehicle constructor should have a method called honk, which returns the string "beep" ONLY is the isRunning property is true
        ```
        function Vehicle(make, model, year){
            this.make = make
            this.model = model
            this.year = year
            this.isRunning = false
        }

        Vehicle.prototype.turnOn = function(){
            this.isRunning = true
        }
        Vehicle.prototype.turnOff = function(){
            this.isRunning = false
        }
        Vehicle.prototype.honk = function(){
            if(this.isRunning === true){
                return "beep!"
            }
        }
        ```

# Closure
- Objectives
    - Understand waht a closure is and what it is not
    - Use a closure to emulate private variables
    - List use cases for closures in the real world
- Closure Defined
    - A closure is a function that makes use of variables defined in outer funcitons that have previously returned
    ```
    function outer(){
        let data = "closures are "
        return function inner(){
            let innerData = "awesome"
            return data + innerData
        }
    
    outer()
    //function inner(){let innerData = "awesome"; return data + innerData}

    outer()() // "closures are awesome"
    }
    ```
- Private Variables
    - In other languages, there exists support for variables that cannot be modified externally, we call those private variables, but in JavaScript we don't have that built in. No worries - closures can help!
    - Ex1:
        ```
        function counter(){
            let count = 0
            return function(){
                return ++count
            }
        }

        counter1 = counter()
        counter1() // 1
        counter1() // 2

        counter2 = counter()
        counter2() // 1
        counter2() // 2

        counter1() // 3 this is not affected by counter2!

        count // ReferenceError: count is not defined - because it is private!
        ```
    - Ex2 (More Privacy):
        ```
        function classRoom(){
            let instructors = ["Elie", "Colt"]
            return {
                getInstructors: function(){
                    return instructors
                },
                addInstructor: function(instructor){
                    instructors.push(instructor)
                    return instructors
                }
            }
        }

        course1 = classRoom()
        course1.getInstructors() // ["Elie", "Colt"]
        course1.addInstructor("Ian") // ["Elie", "Colt", "Ian"]
        course1.getInstructors() // ["Elie", "Colt", "Ian"]

        course2 = classRoom()
        course2.getInstructors() // ["Elie", "Colt"] - not affected by course1

        // we also have NO access to the instructors variable
        // which makes it private - no one can modify it ... you're stuck with Colt and Elie
        ```
- Recap
    - Closure exists when an inner function makes use of variables declared in an outer function which has previously returned
    - Closure does not exist if you do not return an inner function and if that inner function does not make use of variables returned by an outer function
    - We can use closures to create private variables and write code that isolates our logic and application
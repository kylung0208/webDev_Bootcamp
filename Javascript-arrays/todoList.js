let todos = ["Buy new turtle"]
let input = prompt('What would you like to do?')

while(input !== 'quit'){
    //handle input
    if(input === 'list'){
        ListTodos(todos)
    }
    else if(input === 'new'){
        addTodos(todos)
    }
    else if(input === 'delete'){
        deleteTodos(todos)
    }

    //ask the input again
    input = prompt('What would you like to do?')
}
console.log('OK, you quit the app.')

function ListTodos(todos){
    console.log('***************')
        todos.forEach((todo, i) => {
            console.log(`${i}: ${todo}`)
        });
    console.log('***************')
}

function addTodos(todos){
    let newTodo = prompt('Enter new todo.')
    todos.push(newTodo)
}

function deleteTodos(todos){
    let idToDelete = prompt('Enter the index to delete.')
    //splice(where to start deleting, how many items you want to delete)
    todos.splice(idToDelete, 1) //from the index, only 1 item I want to delete.
}
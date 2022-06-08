const { fromEvent, BehaviorSubject } = rxjs

const todos = []
const onAddTodoBtnClick$ = fromEvent(document.querySelector('.add-todo'), 'click')
const todosEmitter$ = new BehaviorSubject(todos)

onAddTodoBtnClick$.subscribe(setTodoInList(todos))
todosEmitter$.subscribe(renderTodos)
todosEmitter$.subscribe(console.info)

function setTodoInList(list) {
  return function() {
    const todoTextInputContent = document.querySelector('.todo-text-input').value

    if (todoTextInputContent.length > 0) {
      list.push(todoTextInputContent)
      todosEmitter$.next(list)
    }
  }
}

function renderTodos(todos) {
  const todoItems = document.querySelector('.todo-items')
  todoItems.innerHTML = ''

  const items = todos.map((todo, index) => {
    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item')

    const p = document.createElement('p')
    p.innerText = todo

    const removeTodo = document.createElement('button')
    removeTodo.classList.add('remove-todo')
    removeTodo.dataset.todoId = index
    removeTodo.innerHTML = '&times;'

    const todoExcluder = deleteTodoFromList(todos)
    fromEvent(removeTodo, 'click').subscribe(todoExcluder(index))

    todoItem.append(p, removeTodo)

    return todoItem
  })

  todoItems.append(...items)
}

function deleteTodoFromList(list) {
  return todoIndex => {
    return () => {
      list.splice(todoIndex, 1)
      todosEmitter$.next(list)
    }
  }
}

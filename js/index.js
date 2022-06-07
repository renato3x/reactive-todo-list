const { fromEvent, BehaviorSubject } = rxjs

const todos = []
const onAddTodoBtnClick$ = fromEvent(document.querySelector('.add-todo'), 'click')
const todosEmitter$ = new BehaviorSubject(todos)

onAddTodoBtnClick$.subscribe(setTodoInList(todos))
todosEmitter$.subscribe(renderTodos)

function setTodoInList(list) {
  return function(event) {
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

    const removeTodo = document.createElement('div')
    removeTodo.classList.add('remove-todo')
    removeTodo.dataset.todoId = index
    removeTodo.innerHTML = '&times;'

    todoItem.append(p, removeTodo)

    return todoItem
  })

  todoItems.append(...items)
}

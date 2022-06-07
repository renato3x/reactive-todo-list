const { fromEvent, BehaviorSubject } = rxjs

const todos = []
const onAddTodoBtnClick$ = fromEvent(document.querySelector('.add-todo'), 'click')
const todosEmitter$ = new BehaviorSubject(todos)

onAddTodoBtnClick$.subscribe(
  event => {
    const todoTextInputContent = document.querySelector('.todo-text-input').value

    if (todoTextInputContent.length > 0) {
      todos.push(todoTextInputContent)
    }
  }
)

import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos,renderPending } from './use-cases';

const ElementIDs = {
    TodoList : '.todo-list',
    NewTodoInput: '#new-todo-input',
    destroy : '.destroy',
    ClearCompleted:'.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count'

}



/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId)=>{

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList,todos);
        updatePendingCount();
    }

    const updatePendingCount = ()=>{
        renderPending(ElementIDs.PendingCountLabel);
    }

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();

    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersUL = document.querySelectorAll(ElementIDs.TodoFilters);


    let letra = "";
   // Listeners
   newDescriptionInput.addEventListener('keyup',(e)=>{
        if (e.keyCode !== 13) return;
        if(e.target.value.trim().length === 0) return;

        todoStore.addTodo(e.target.value);
        displayTodos();
        e.target.value = "";

   });

   todoListUL.addEventListener('click', (e)=>{
    const element = e.target.closest('[data-id]');
    todoStore.toggleTodo(element.getAttribute('data-id'));
    displayTodos();
   })

   todoListUL.addEventListener('click', (e)=>{
    if (e.target.className === "destroy"){
        const element = e.target.closest('[data-id]');
        console.log(element);
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    }

   console.log(letra);

   })


   clearCompletedButton.addEventListener('click',()=>{
    todoStore.deleteCompleted();
    displayTodos();
 })

 filtersUL.forEach(e=>{
    e.addEventListener('click',(e)=>
    {   filtersUL.forEach(el =>el.classList.remove('selected'));
        e.target.classList.add('selected'); 

        switch (e.target.text) {
            case "Todos":
                //console.log(e.target.text)
                todoStore.setFilter(Filters.All);
                
                break;
            case "Completados":
                todoStore.setFilter(Filters.Completed);
                break;
            case "Pendientes":
                todoStore.setFilter(Filters.Pending);
                break;
            default:
                break;
        }
        displayTodos();
        console.log(e.target.text);






    })
 })

}

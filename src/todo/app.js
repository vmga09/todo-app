import todoStore from '../store/todo.store';
import html from './app.html?raw';





/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId)=>{

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    }

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);

    })();




}
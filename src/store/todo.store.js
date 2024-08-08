import { Todo } from "../todo/models/todo.model";

export const Filters = {
    All:'all',
    Completed: 'Completed',
    Pending: 'Pending'
}



const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Pieda del tiempo'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    // console.log(state);
    // console.log('InitStore');


}

const loadStore = () =>{
    if(!localStorage.getItem('state')) return;

    const {todos = [], filter= Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
    //console.log(localSorage.getItem('state'))
    //throw new Error('Not implemented');
}

const saveLocalStorage = () => {
    //console.log(JSON.stringify(state));
    localStorage.setItem('state',JSON.stringify(state));
}

/**
 * 
 * @param {String} filter 
 */
const getTodos = (filter = Filters.All) =>{
    switch (filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Options ${filter} is no valid.`);
    }
    throw new Error('Not implemented');
}

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required');
    state.todos.push( new Todo(description));
    //throw new Error('Not implemented');
    saveLocalStorage();
}

/**
 * 
 * @param {String} todoId Todo identifier
 */
const toggleTodo = (todoId) =>{

    state.todos = state.todos.map(todo => {
        if ( todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;

    })
    //throw new Error('Not implemented');
    saveLocalStorage();

}
/**
 * 
 * @param {String} todoId Todo identifier
 */
const deleteTodo = (todoId) =>{
    state.todos = state.todos.filter( todo => todo.id !== todoId);
    //throw new Error('Not implemented');
    saveLocalStorage();
}

const deleteCompleted = () =>{
    state.todos = state.todos.filter( todo => !todo.done);
    saveLocalStorage();
    //throw new Error('Not implemented');
}
/**
 * 
 * @param {String} newFilter 
 */
const setFilter = ( newFilter = Filters.All) =>{
    console.log(newFilter)
    // if (!Filters.hasOwnProperty(newFilter)){
    //    throw new Error('Not found'); 
    // }else{
        state.filter = newFilter;
    //}
    
    
}

const getCurrentFilter = () =>{
   return state.filter;
}

export default {
    initStore,
    loadStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
}
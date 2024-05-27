import React from 'react'
import { useLocalStorage } from './useLocalStorage';

function useTodos(){
    const {item: todos, saveItem: saveTodos, loading, error, sincronizeItem: sincronizeTodos} = useLocalStorage('TODOS_V1', []);
	
	const [searchValue, setSearchValue] = React.useState('');

	const [openModal, setOpenModal] = React.useState(false);

	const completedTodos = todos.filter(todo => !!todo.completed).length;

	const totalTodos = todos.length;
	
	const searchedTodos = todos.filter(todo => {
		const todoText = todo.text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		const searchText = searchValue.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		return todoText.includes(searchText)
	});

	const addTodo = (text) => {
		const newTodos = [...todos]
		newTodos.push({text, completed: false})
		saveTodos(newTodos)
	}
	
	const completeTodo = (text) => {
		const newItem = [...todos]
		const todoIndex = newItem.findIndex((todo) => todo.text === text)
		newItem[todoIndex].completed === false ? newItem[todoIndex].completed = true : newItem[todoIndex].completed = false
		saveTodos(newItem)
	}

	const deleteTodo = (text) => {
		const newItem = [...todos]
		const todoIndex = newItem.findIndex((todo) => todo.text === text)
		newItem.splice(todoIndex,1)
		saveTodos(newItem)
	}

    const states = {
        loading, 
        error,
        totalTodos, 
        completedTodos, 
        searchValue, 
        searchedTodos, 
        openModal,
    }

    const stateUpdaters = {
        setSearchValue, 
        setOpenModal,
        completeTodo, 
        deleteTodo, 
        addTodo,
        sincronizeTodos
    }

    return {states, stateUpdaters}
}

export {useTodos}







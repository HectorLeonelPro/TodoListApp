import React from 'react';
import {useTodos} from './useTodos'
import {TodoCounter} from '../TodoCounter'
import {TodoSearch} from '../TodoSearch'
import {TodoList} from '../TodoList'
import {TodoItem} from '../TodoItem';
import {TodosLoading} from '../TodosLoading';
import {TodosError} from '../TodosError';
import {EmptyTodos} from '../EmptyTodos';
import {CreateTodoButton} from '../CreateTodoButton'
import { TodoForm } from '../TodoForm';
import { Modal } from '../Modal';
import { TodoHeader } from '../TodoHeader';
import { ChangeAlert } from '../ChangeAlert';

function App(){
	const {states, stateUpdaters} = useTodos()
    const {loading, error, totalTodos, completedTodos, searchValue, searchedTodos, openModal } = states
    const {setSearchValue, setOpenModal, completeTodo, deleteTodo, addTodo, sincronizeTodos} = stateUpdaters
    return (
		<>
            <TodoHeader loading={loading}>
                <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
                <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
            </TodoHeader>

            <TodoList 
                error={error}
                loading={loading}
                searchedTodos={searchedTodos}
                totalTodos={totalTodos}
                searchText={searchValue}
                onError={() => <TodosError />}
                onLoading={() => <TodosLoading />}
                onEmptyTodos={() => <EmptyTodos />}
                onEmptySearchResults={(searchText) => `${searchText} no fue encontrado en tu lista de TODO's.`}
                // render={todo => (
                //     <TodoItem 
                //         key={todo.text} 
                //         text={todo.text}
                //         completed={todo.completed}
                //         onComplete={() => completeTodo(todo.text)}
                //         onDelete={() => deleteTodo(todo.text)}
                //     />
                // )}
            >
                {todo => (
                    <TodoItem 
                        key={todo.text} 
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.text)}
                        onDelete={() => deleteTodo(todo.text)}
                    />
                )}
            </TodoList>
			<CreateTodoButton setOpenModal={setOpenModal} />

            {openModal && (
                <Modal>
                    <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
                </Modal>
            )}

            <ChangeAlert sincronize={sincronizeTodos} />

		</>
	);
}

export default App;




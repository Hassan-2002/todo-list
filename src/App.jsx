import { Header, Tabs, TodoInput, TodoList } from "./components"

import { useState, useEffect } from 'react'

function App() {
 

  const [todos, setTodos] = useState([
    { input: 'Hello! Add your first todo!', complete: true }
  ])
  const [selectedTab, setSelectedTab] = useState('All')
  const [editIndex, setEditIndex] = useState(null); 

  function handleEditTodo(index) {
    setEditIndex(index); 
  }
  
  function handleUpdateTodo(updatedTodo) {
    if (editIndex !== null) {
      const newTodos = [...todos];
      newTodos[editIndex].input = updatedTodo;
      setTodos(newTodos);
      handleSaveData(newTodos);
      setEditIndex(null);

    }
  }
  
  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { input: newTodo, complete: false }]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleCompleteTodo(index) {
    
    let newTodoList = [...todos]
    let completedTodo = todos[index]
    completedTodo['complete'] = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)
    
  }

  
  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleSaveData(currTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }))
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) { return }
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
  }, [])

  return (
    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos} />
      <TodoList  todos={todos}
           selectedTab={selectedTab}
           handleCompleteTodo={handleCompleteTodo}
           handleDeleteTodo={handleDeleteTodo}
           handleEditTodo={handleEditTodo}
           editIndex={editIndex}
           handleUpdateTodo={handleUpdateTodo} />
      <TodoInput handleAddTodo={handleAddTodo}
            editIndex={editIndex}
              todos={todos}
              handleUpdateTodo={handleUpdateTodo} 
              />
    </>
  )
}

export default App
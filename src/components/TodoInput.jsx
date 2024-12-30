/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

export default function TodoInput({ handleAddTodo, editIndex, todos, handleUpdateTodo, setInputValue }) {
  const [inputValue, setLocalInputValue] = useState('');

  useEffect(() => {
    if (editIndex !== null) {
      setLocalInputValue(todos[editIndex].input); // Pre-fill input field for editing
    } else {
      setLocalInputValue('');
    }
  }, [editIndex, todos]);

  const handleInputChange = (e) => {
    setLocalInputValue(e.target.value);
    setInputValue('');
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      if (!inputValue) return;
      if (editIndex !== null) {
        handleUpdateTodo(inputValue);
        setInputValue(''); // Clear input field after editing
      } else {
        handleAddTodo(inputValue);
        setInputValue(''); // Clear input field after adding
      }
      setLocalInputValue(''); // Clear local input field
    }
  };

  const handleAddButtonClick = () => {
    if (!inputValue) return;
    if (editIndex !== null) {
      handleUpdateTodo(inputValue);
      setInputValue(''); // Clear input field after editing
    } else {
      handleAddTodo(inputValue);
      setInputValue(''); // Clear input field after adding
    }
    setLocalInputValue(''); // Clear local input field
  };

  return (
    <div className="input-container">
      <input
        placeholder="Enter todo"
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleEnterKey}
      />
      <button onClick={handleAddButtonClick}>
        <i className="fa-solid fa-plus" />
      </button>
    </div>
  );
}

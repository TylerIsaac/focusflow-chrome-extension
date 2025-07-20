// src/components/TodoList.tsx

import React, { useState, useEffect, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronUp, faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  // 1) Start collapsed by default
  const [collapsed, setCollapsed] = useState(true);
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  // Persist whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add new task
  function handleAdd(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now().toString(), text, completed: false }]);
    setInput("");
  }

  // Toggle complete status
  function toggle(id: string) {
    setTodos((t) => t.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  }

  // Remove a task
  function remove(id: string) {
    setTodos((t) => t.filter((item) => item.id !== id));
  }

  return (
    <div className="absolute bottom-4 right-4">
      <div
        className={`
          bg-white/10 backdrop-blur-md rounded-lg shadow-md text-white hover:bg-white/20
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${collapsed ? "h-12 w-32" : "w-80 pt-4"}
        `}
      >
        {/* Header row: clickable to toggle, vertically centered */}
        <div className="flex justify-between items-center px-4 h-full cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
          {/* 2) Changed title to “Tasks” */}
          <span className="text-lg">Tasks</span>
          <button onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Show Tasks" : "Hide Tasks"}>
            <FontAwesomeIcon icon={collapsed ? faChevronUp : faChevronDown} className="hover:text-gray-300 transition-colors duration-200" />
          </button>
        </div>

        {/* 3) Expanded view */}
        {!collapsed && (
          <div className="px-4 pb-4">
            {/* List items */}
            <ul className="max-h-48 overflow-auto mt-4">
              {todos.map((todo) => (
                <li key={todo.id} className="flex items-center justify-between mb-2">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" checked={todo.completed} onChange={() => toggle(todo.id)} className="form-checkbox h-5 w-5 text-green-500 cursor-pointer" />
                    <span className={todo.completed ? "line-through text-gray-400" : "text-white"}>{todo.text}</span>
                  </label>
                  {/* 4) Trash icon in white */}
                  <button onClick={() => remove(todo.id)} className="text-white hover:text-red-400 transition-colors duration-200" aria-label="Delete task">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>

            {/* 5) Moved form to bottom, transparent bg, hover effect */}
            <form onSubmit={handleAdd} className="flex">
              <input
                type="text"
                placeholder="New Task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="
                  flex-1 px-3 py-2
                  bg-transparent
                  placeholder-white
                  focus:outline-none
                  transition-colors duration-200
                  placeholder-text-shadow
                  text-sm
                "
              />
              <button type="submit" className="px-4 py-2 bg-transparent border-l border-white/50 rounded-r" aria-label="Add task">
                <FontAwesomeIcon icon={faPlus} className="hover:text-gray-300 transition-colors duration-200" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

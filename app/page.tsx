"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, loaded]);

  function addTodo() {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-4 sm:p-8">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-black shadow-lg sm:p-8">
        <h1 className="mb-4 text-2xl font-bold text-black">Mi Todo App</h1>

        <div className="mb-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Nueva tarea..."
            className="min-w-0 flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-400"
          />
          <button
            onClick={addTodo}
            className="shrink-0 rounded bg-blue-600 px-4 py-2 text-white"
          >
            Agregar
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded border border-gray-200 bg-white px-3 py-2"
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer break-all ${
                  todo.done ? "text-gray-400 line-through" : "text-black"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="shrink-0 pl-2 text-sm text-red-500"
              >
                eliminar
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="mt-2 text-sm text-gray-400">No hay tareas todavía.</p>
        )}
      </div>
    </main>
  );
}
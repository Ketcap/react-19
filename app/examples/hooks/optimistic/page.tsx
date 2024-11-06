"use client";

import { startTransition, useState } from "react";
import { useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type Todo = { id: number; text: string; completed: boolean };

// Simulating server actions
async function addTodoToServer(todo: string): Promise<Todo> {
  await new Promise((resolve) => setTimeout(resolve, 2_000)); // Longer delay to demonstrate the difference
  if (Math.random() > 0.6) {
    console.log("Failed to add todo");
    throw new Error("Failed to add todo");
  }
  return { id: Date.now(), text: todo, completed: false };
}

export default function Component() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const [optimisticTodos, addOptimisticTodo] = useOptimistic<Todo[], Todo>(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const optimisticTodo = { id: Date.now(), text: newTodo, completed: false };

    // Immediately update the optimistic state
    startTransition(async () => {
      addOptimisticTodo(optimisticTodo);
      setNewTodo("");

      // Asynchronously update the actual state
      try {
        const addedTodo = await addTodoToServer(newTodo);
        setTodos((currentTodos) => [...currentTodos, addedTodo]);
      } catch {}
    });

    // Reset input
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">True Optimistic Updates</h1>
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow"
        />
        <Button type="submit">Add</Button>
      </form>
      <div className="space-y-2">
        <h2 className="font-semibold">
          Optimistic Todos (Updates Immediately):
        </h2>
        <ul className="space-y-2">
          {optimisticTodos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-2">
              <Checkbox
                id={`optimistic-todo-${todo.id}`}
                checked={todo.completed}
              />
              <label
                htmlFor={`optimistic-todo-${todo.id}`}
                className="flex-grow"
              >
                {todo.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 space-y-2">
        <h2 className="font-semibold">
          Actual Todos (Updates After Server Response):
        </h2>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-2">
              <Checkbox
                id={`actual-todo-${todo.id}`}
                checked={todo.completed}
              />
              <label htmlFor={`actual-todo-${todo.id}`} className="flex-grow">
                {todo.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

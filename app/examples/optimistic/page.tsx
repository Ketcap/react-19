"use client";

import { useState, useTransition, useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, XCircle } from "lucide-react";

// Simulating server actions
async function addTodo(todo: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { id: Date.now(), text: todo, completed: false };
}

async function toggleTodo(id: number, completed: boolean) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { id, completed };
}

async function deleteTodo(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return id;
}

type Todo = { id: number; text: string; completed: boolean };

export default function Component() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isPending, startTransition] = useTransition();
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state: Todo[], newTodo: Todo) => [...state, newTodo]
  );

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    startTransition(async () => {
      const optimisticTodo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };
      addOptimisticTodo(optimisticTodo);
      setNewTodo("");

      try {
        const addedTodo = await addTodo(newTodo);
        setTodos((currentTodos) => [...currentTodos, addedTodo]);
      } catch (error) {
        console.error("Failed to add todo:", error);
        setTodos((currentTodos) =>
          currentTodos.filter((todo) => todo.id !== optimisticTodo.id)
        );
      }
    });
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    startTransition(async () => {
      const optimisticTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      );
      addOptimisticTodo(optimisticTodos as any);

      try {
        const updatedTodo = await toggleTodo(id, !completed);
        setTodos((currentTodos) =>
          currentTodos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: updatedTodo.completed }
              : todo
          )
        );
      } catch (error) {
        console.error("Failed to toggle todo:", error);
        setTodos([...todos]);
      }
    });
  };

  const handleDeleteTodo = async (id: number) => {
    startTransition(async () => {
      const optimisticTodos = todos.filter((todo) => todo.id !== id);
      addOptimisticTodo(optimisticTodos as any);

      try {
        await deleteTodo(id);
        setTodos((currentTodos) =>
          currentTodos.filter((todo) => todo.id !== id)
        );
      } catch (error) {
        console.error("Failed to delete todo:", error);
        setTodos([...todos]);
      }
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Optimistic Todo List</h1>
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow"
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
        </Button>
      </form>
      <ul className="space-y-2">
        {optimisticTodos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => handleToggleTodo(todo.id, todo.completed)}
              disabled={isPending}
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`flex-grow ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteTodo(todo.id)}
              disabled={isPending}
              aria-label={`Delete todo: ${todo.text}`}
            >
              <XCircle className="w-5 h-5" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

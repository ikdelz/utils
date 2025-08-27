import './App.css'
import { useEffect, useState } from 'react';
import { saveTodo, savePending, getPending, clearPending, getTodos } from './db';

function App() {
  const [newTodo, setTodo] = useState(null)
  const [todos, setTodos] = useState(null)

  const submit = async(e) => {
    e.preventDefault()

    // !double syncing -> fix: api call to store in db
    if (navigator.onLine) {
      saveTodo(newTodo)
    }

    if (!navigator.onLine){
      savePending(newTodo)
    }
  }
  
  useEffect(() => {
    window.addEventListener("online", async (e) => {
      console.log("Syncing data...");

      const pendings = await getPending();
      for(let pending of pendings) {
        await saveTodo(pending.todo);

        await clearPending(pending.id);
      }
    });

    return () => window.removeEventListener("online", () => {});
  }, [])

  useEffect(() => {
    const getdata = async() => {
      const todos = await getTodos();

      setTodos(todos)
    }

    getdata()
  }, [])

  return (
    <div>
      <form onSubmit={submit}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} required />
        <button>Store</button>
      </form>
      {todos && todos.map(td => (
        <p>{td.todo}</p>
      ))}
    </div>
  );
}

export default App

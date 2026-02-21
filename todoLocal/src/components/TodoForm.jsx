import React, { useState } from 'react'
import {useTodo} from "../contexts"

function TodoForm() {
  const [todo, setTodo] = useState("")
  const {addTodo} = useTodo();

  const add = (e) => {
    e.preventDefault() //Page reload रोकता है.

    if(!todo) return //Empty todo add करने से रोकता है.

    addTodo({todo, completed: false}) //New todo object add करता है.
    
    setTodo("")    // Input field clear करता है.
  }


    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
           />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
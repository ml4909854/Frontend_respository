// App.jsx
import React, { useEffect } from "react";
import { fetchTodos } from "./slices/todoSlice";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const { todo } = useSelector((state) => state);
  const dispatch = useDispatch();

  // Fetch todos on mount or button click
  const handleFetch = () => {
    dispatch(fetchTodos());
  };

  return (
    <div>
      <button onClick={handleFetch}>Fetch Todos</button>
      
      {todo.isLoading && <p>Loading...</p>}
      {todo.isError && <p>Error: {todo.isError}</p>}
      
      {todo.data && (
        <ul>
          {todo.data.slice(0, 5).map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
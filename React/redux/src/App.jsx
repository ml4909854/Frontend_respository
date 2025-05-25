import React from "react";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
     <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch({ type: "Increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "Decrement" })}>Decrement</button>
    </div>
  );
};

export default App;

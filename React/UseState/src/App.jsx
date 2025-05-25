import React, { useState } from "react";
import userContext from "./context/context";
import Component2 from "./Components/Component2";
import Component1 from "./Components/Component1";

const App = () => {
const [count , setCount] = useState(0)
  return (
    <userContext.Provider value={count}>
      <p>{count}</p>
      <button onClick={()=>setCount(count+1)}>Increase</button>
      <button onClick={()=>setCount(count-1)}>Decrease</button>
      <Component2/>
      <Component1/>
    </userContext.Provider>
  );
};

export default App;
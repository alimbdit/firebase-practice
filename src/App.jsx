import { useState } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (<>
  <Header>
  </Header>
  <Outlet></Outlet>
  
  </>  )
}

export default App;

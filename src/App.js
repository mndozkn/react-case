import React, { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Navbar from "./components/Todos/Navbar";
import Todos from "./pages/Todos";
import { Flex } from "@chakra-ui/react";
import { Toaster } from 'react-hot-toast';

function App() {
  const [data, setData] = useState([]);

  const [isAuth, setIsAuth] = useState(false);

  const getData = () => {
    fetch("account.json", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    }).then((response) => {
      return response.json();
    }).then((myjson) => {
      setData(myjson);
    })
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div>
      <div>
        {isAuth ? (<Flex flexDirection="column" height="100vh" overflow="auto"><Navbar /><Toaster /><Todos /></Flex>) : (<Login data={data} setIsAuth={setIsAuth} />)}
      </div>
    </div>
  );

}
export default App;

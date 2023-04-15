import LoginPage from "pages/Login"
import { useEffect, useState } from "react";
import { auth } from "services/firebase";
import Dashboard from "pages/Dashboard";

export default function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(()=> {
    auth.onAuthStateChanged((user: any) => {
      if(user) {
        setIsLogin(true);
      } else {
        console.log(user);
      }
    })
    let userFromLocalStorage = localStorage.getItem("user");
    if(userFromLocalStorage !== null){
      setIsLogin(true);
    }
  }, [])

  if (isLogin === true){
    return <Dashboard/>
  }

  return <LoginPage/>
}
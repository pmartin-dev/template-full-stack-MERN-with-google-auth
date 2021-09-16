import "./App.css";
import Header from "./features/Header";
import { Route, BrowserRouter } from "react-router-dom";
import { Test } from "./features/Test";
import { Signin } from "./features/Signin";
import { Signup } from "./features/Signup";
import { Home } from "./features/Home";
import { UserContext } from "./contexts/userContext";
import { emptyUser, User } from "./types/user";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [userInfo, setUserInfo] = useState<User>(emptyUser);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/current_user")
        .then((res) => {
          console.log("data:", res.data)
          setUserInfo(res.data);
        })
        .catch((err) => console.warn(err));
    };
    fetchData();
  }, [setUserInfo]);

  return (
    <div className="App">
      <UserContext.Provider value={{user: userInfo}}>
        <BrowserRouter>
          <Header />
          <Route path="/" component={Home} exact />
          <Route path="/test" component={Test} exact />
          <Route path="/signin" component={Signin} exact />
          <Route path="/signup" component={Signup} exact />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;

import Sidebar from "./components/sidebar/Sidebar";
import { useEffect } from "react";
import "./App.css";
import Chat from "./components/chat/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import { useStateValue } from "./context/StateProvider";
import { auth } from "./firebase";
function App() {
  const [{user},dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(user=>{
      dispatch({
        type:"SETUSER",
        user:user
      })
    })
  }, [])
  return (
    <Router>
      <Switch>
      {!user?(<Login/>):(
        <div className="App">
          <div className="app_body">
            <Sidebar />
              {/* <Chat /> */}

            <Route exact path="/">
              <Chat />
            </Route>
            <Route exact path="/rooms/:roomId">
              <Chat />
            </Route>
          </div>
        </div>
      )}
       </Switch>
     </Router>
  );
}

export default App;

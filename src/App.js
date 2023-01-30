import "./App.css";
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/Home/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/Cart/Cart.jsx";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <div className="content-container">
          <Switch>
            <Route path="/cart" component={Cart} />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

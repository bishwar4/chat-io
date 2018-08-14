import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/layout/Home/home";
import Chat from "./component/layout/chat/Chat";
import Search from "./component/layout/track/Search";
import Faq from "./component/layout/faq/Faq";
import Query from "./component/layout/Queries/Query";
import Admin from "./component/layout/Admin/Admin";
import Register from "./component/layout/Admin/auth/Register";
import Login from "./component/layout/Admin/auth/Login";
import Logo from "./component/layout/Logo/logo";
import Navbar from "./component/layout/Admin/Navbar";
import Footer from "./component/layout/Admin/Footer";
import Landing from "./component/layout/Admin/Landing";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Logo} />
          <Route path="/admin" component={Navbar} />
          <Route exact path="/admin" component={Landing} />
          <Route exact path="/admin1" component={Admin} />

          <div className="container">
            {/* Router path */}
            <Route exact path="/admin/register" component={Register} />
            <Route exact path="/admin/login" component={Login} />

            <Route exact path="/home" component={Home} />
            <Route exact path="/home/query" component={Query} />
            <Route exact path="/home/chat" component={Chat} />
            <Route exact path="/home/search" component={Search} />
            <Route exact path="/home/faq" component={Faq} />
          </div>
          <Route path="/admin" component={Footer} />
        </div>
      </Router>
    );
  }
}

export default App;

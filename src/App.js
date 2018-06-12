import React, { Component } from "react";
import "./App.css";
import AgentDashboard from "./AgentDashboard";
import RequestForm from "./RequestForm";
import { Link, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Helpdesk</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Agent Dashboard</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={RequestForm} />
            <Route exact path="/dashboard" component={AgentDashboard} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;

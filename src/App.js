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
                <Link to="/mock-helpdesk">Home</Link>
              </li>
              <li>
                <Link to="/mock-helpdesk/dashboard">Agent Dashboard</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/mock-helpdesk" component={RequestForm} />
            <Route exact path="/mock-helpdesk/dashboard" component={AgentDashboard} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import RequestItem from "./RequestItem.js";

class AgentDashboard extends Component {
  state = {
    queue: [],
    claimed: {},
    error: "",
    loaded: false
  };

  xhr = new XMLHttpRequest();

  // initializes queue
  componentDidMount = () => {
    this.xhr.responseType = "json";
    this.loadQueue();
  };

  // helper function to fetch and reload queue
  loadQueue = () => {
    this.xhr.open("GET", "//queue.continuation.org/queue/");
    this.xhr.onload = () => {
      this.setState({ queue: this.xhr.response, loaded: true });
    };
    this.xhr.onerror = () => {
      this.setState({ error: this.xhr.statusText, loaded: true });
    };
    this.xhr.send(null);
  };

  // stores 'claimed' ticket on state, deletes it from server
  clickHandler = () => {
    const id = this.state.queue[0].id;
    this.xhr.open("DELETE", `//queue.continuation.org/queue/${id}`);
    this.xhr.onload = () => {
      if (this.xhr.status === 204) {
        this.setState({
          claimed: this.state.queue[0],
          error: "",
          loaded: true
        });
      } else {
        this.setState({
          error: "That ticket had already been claimed!",
          loaded: true
        });
      }
      this.loadQueue();
    };
    this.xhr.onerror = () => {
      this.setState({
        error: "That ticket had already been claimed!",
        loaded: true
      });
      this.loadQueue();
    };
    this.xhr.send(null);
  };

  render = () => {
    const error = this.state.error;
    const queue = this.state.queue;
    const claimed = this.state.claimed;
    const loaded = this.state.loaded;

    return (
      <div>
        <h2>Current queue</h2>
        {error && <span id="error">{`${error}`}</span>}
        {!loaded ? (
          <Card>
            <CardHeader
              title="Loading..."
              subheader="the queue will be available shortly"
            />
          </Card>
        ) : (
          <ul id="request-queue">
            {Object.keys(claimed).length ? (
              <RequestItem requestTicket={claimed} />
            ) : null}
            {queue.length ? (
              queue.map((requestTicket, index) => (
                <RequestItem
                  key={`${requestTicket.id}`}
                  requestTicket={requestTicket}
                  position={index + 1}
                  clickHandler={this.clickHandler}
                />
              ))
            ) : (
              <li>
                <Card>
                  <CardHeader
                    title="All done!"
                    subheader="No more tickets in the queue"
                  />
                  <CardActions>
                    <Button
                      onClick={this.loadQueue}
                      label="Reload"
                      children="Reload"
                    />
                  </CardActions>
                </Card>
              </li>
            )}
          </ul>
        )}
      </div>
    );
  };
}

export default AgentDashboard;

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
    error: ""
  };

  xhr = new XMLHttpRequest();

  componentDidMount = () => {
    this.xhr.responseType = "json";
    this.loadQueue();
  };

  loadQueue = () => {
    this.xhr.open("GET", "http://queue.continuation.org/queue/");
    this.xhr.onload = () => {
      this.setState({ queue: this.xhr.response });
    };
    this.xhr.onerror = () => {
      this.setState({ error: this.xhr.statusText });
    };
    this.xhr.send(null);
  };

  clickHandler = () => {
    const id = this.state.queue[0].id;
    this.xhr.open("DELETE", `http://queue.continuation.org/queue/${id}`);
    this.xhr.onload = () => {
      if (this.xhr.status === 204) {
        this.setState({ claimed: this.state.queue[0], error: "" });
      } else {
        this.setState({
          error: "That ticket had already been claimed!"
        });
      }
      this.loadQueue();
    };
    this.xhr.onerror = () => {
      this.setState({
        error: "That ticket had already been claimed!"
      });
      this.loadQueue();
    };
    this.xhr.send(null);
  };

  render = () => {
    const error = this.state.error;
    const queue = this.state.queue;
    const claimed = this.state.claimed;

    return (
      <div>
        <h2>Current queue</h2>
        {error && <span id="error">{`${error}`}</span>}
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
      </div>
    );
  };
}

export default AgentDashboard;

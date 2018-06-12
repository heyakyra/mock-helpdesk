import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

class RequestForm extends Component {
  state = {
    isSubmitted: false,
    queuePosition: 0,
    name: "",
    tel: "",
    email: ""
  };

  xhr = new XMLHttpRequest();
  formElement = null;

  queueLength = () => {
    this.xhr.open("GET", "http://queue.continuation.org/queue/");
    this.xhr.onload = () =>
      this.setState({
        queuePosition: this.xhr.response.length,
        isSubmitted: true
      });
    this.xhr.send(null);
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.xhr.responseType = "json";
    this.xhr.open("POST", "http://queue.continuation.org/queue/");
    this.xhr.setRequestHeader("Content-Type", "application/json");
    const jsonData = {};
    const formData = new FormData(this.formElement);
    for (const [key, value] of formData.entries()) {
      key === "tel" ? (jsonData.phone = value) : (jsonData[key] = value);
    }
    this.xhr.send(JSON.stringify(jsonData));
    this.xhr.onload = this.queueLength;
  };

  render = () => {
    return this.state.isSubmitted ? (
      <Card>
        <CardHeader title="Success" subheader="Your request has been added" />
        <CardContent>
          <p>as number {this.state.queuePosition} in line</p>
        </CardContent>
      </Card>
    ) : (
      <Card>
        <CardHeader
          title="Submit a help ticket"
          subheader="Your request has been added"
        />
        <CardContent>
          <form
            ref={el => {
              this.formElement = el;
            }}
            onSubmit={this.handleSubmit}
          >
            <fieldset>
              <legend>Your info</legend>
              <ul id="form">
                <li>
                  <label htmlFor="name">
                    Name:{" "}
                    <input
                      required="true"
                      inputMode="text"
                      autoFocus="true"
                      autoComplete="name"
                      type="text"
                      id="name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                    <span className="error" />
                  </label>
                </li>
                <li>
                  <label htmlFor="tel">
                    Phone:{" "}
                    <input
                      type="tel"
                      placeholder=" e.g. 987-555-1234 "
                      required="true"
                      inputMode="tel"
                      autoComplete="tel"
                      id="tel"
                      name="tel"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      value={this.state.tel}
                      onChange={this.handleChange}
                    />
                    <span className="error" />
                  </label>
                </li>
                <li>
                  <label htmlFor="email">
                    Email:{" "}
                    <input
                      type="email"
                      required="true"
                      inputMode="email"
                      autoComplete="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      id="email"
                      name="email"
                    />
                    <span className="error" />
                  </label>
                </li>
              </ul>
            </fieldset>
            <CardActions>
              <Button type="submit">Submit</Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    );
  };
}

export default RequestForm;

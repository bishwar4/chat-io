import React from "react";
import axios from "axios";
import "./Chat.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
var uniqid = require("uniqid");

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unique: uniqid(),
      username: "Bishwa",
      message: "",
      messages: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    // to get faq from the server
    const newUser = {
      unique: this.state.unique
    };
    axios
      .post("/api/chat/recive", newUser)
      .then(res => {
        this.setState({ messages: res.data.conversation });
      })
      .catch(err => console.log(err));
  }
  componentDidUpdate() {
    const newUser = {
      unique: this.state.unique
    };
    axios
      .post("/api/chat/recive", newUser)
      .then(res => {
        this.setState({ messages: res.data.conversation });
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      unique: this.state.unique,
      username: this.state.username,
      message: this.state.message
    };
    //to submit queries to database
    axios
      .post("/api/chat/send", newUser)
      .then(res => {
        // this.setState({ user: res.data.user });
      })
      .catch(err => console.log(err));

    this.setState({
      message: ""
    });
    this.componentDidMount();
  }
  render() {
    return (
      <div className="Chat">
        <div className="card-title">Client Chat</div>
        <hr />

        <div className="messages">
          {this.state.messages.map(function(message, i) {
            return (
              <div key={i}>
                {message.username}: {message.message}
              </div>
            );
          })}
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="card-footer">
            <input
              type="text"
              placeholder="Username"
              required="true"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              className="form-control"
            />
            <br />
            <textarea
              placeholder="Message"
              className="form-control"
              required
              name="message"
              value={this.state.message}
              onChange={this.onChange}
            />
            <br />
            <button className="btn btn-primary form-control">Send</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Chat;

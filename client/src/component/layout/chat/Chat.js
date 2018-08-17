import React from "react";
import axios from "axios";
import "./Chat.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo1 from "./image (1).png";
var uniqid = require("uniqid");

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unique: uniqid(),
      username: "",
      message: "",
      messages: [],
      open:
        "Hi 😀­­­­ Have a look around! Let us know if you have any questions.",
      admin: [],
      show: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  toggleItem = () => {
    const doesShow = this.state.show;
    this.setState({ show: !doesShow });
  };
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

    axios
      .get("/api/chat/admin")
      .then(res => {
        this.setState({ admin: res.data.user });
        console.log(this.state.admin[0].email);
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
      username: this.state.unique,
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
  }
  render() {
    let persons = null;
    let comp2 = null;
    if (this.state.show) {
      persons = (
        <div className="Chat">
          {/* <h1>{this.state.admin}</h1> */}
          <div className="card-title">
            {this.state.admin.map(function(data, i) {
              return (
                <span key={i}>
                  <img
                    src={data.avatar}
                    style={{ width: 20, height: "auto" }}
                    alt="My logo"
                    hspace={10}
                    className="icon"
                  />
                  {data.name}
                </span>
              );
            })}
            <button className="btn" onClick={this.toggleItem}>
              <i className="fa fa-close" />
            </button>
          </div>
          <hr />

          <div className="messages">
            <div className="incoming_msg">
              <div className="received_msg">
                <div className="received_withd_msg">
                  <p>{this.state.open}</p>
                </div>
              </div>
            </div>
            {this.state.messages.map((message, i) => {
              return message.username === "Admin" ? (
                <div className="incoming_msg" key={i}>
                  <div className="received_msg">
                    <div className="received_withd_msg">
                      {this.state.admin.map(function(data, i) {
                        return (
                          <img
                            key={i}
                            src={data.avatar}
                            style={{ width: 20, height: "auto" }}
                            alt="My logo"
                            hspace={10}
                            className="icon"
                          />
                        );
                      })}
                      <label>
                        <p>{message.message}</p>
                      </label>

                      <span className="time_date">
                        <small>{message.time}</small>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="outgoing_msg" key={i}>
                  <div className="sent_msg">
                    <p>{message.message}</p>
                    <span className="time_date">
                      {" "}
                      <small>{message.time}</small>
                    </span>{" "}
                  </div>
                </div>
              );
            })}
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="card-footer">
              {/* <input
            type="text"
            placeholder="Username"
            required="true"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            className="form-control"
          /> */}
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
              <button className="btn btn-primary" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      );
    }
    if (!this.state.show) {
      comp2 = (
        <div className="size">
          <img
            src={logo1}
            style={{ width: 120, height: "auto" }}
            alt="My logo"
            onClick={this.toggleItem}
          />
        </div>
      );
    }
    return (
      <div>
        {persons}
        {comp2}
      </div>
    );
  }
}

export default Chat;

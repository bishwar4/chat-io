import React, { Component } from "react";
import axios from "axios";
import "./Admin.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unique: "abc",
      username: "Admin",
      message: "",
      messages: [],
      users: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClick(param) {
    this.setState({ unique: param });
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

    axios.get("/api/chat/find").then(res => {
      this.setState({ users: res.data.user });
    });
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
    axios.get("/api/chat/find").then(res => {
      this.setState({ users: res.data.user });
    });
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
        // this.setState({ messages: res.data.conversation });
      })
      .catch(err => console.log(err));

    this.setState({
      message: ""
    });
    this.componentDidMount();
  }

  render() {
    return (
      <div className="container">
        <h3 className=" text-center">Messaging</h3>
        <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>Recent</h4>
                </div>
              </div>
              <div className="inbox_chat">
                {this.state.users.map((data, i) => {
                  return (
                    <div className="chat_list active_chat">
                      <div className="chat_people">
                        <div className="chat_img" />
                        <div className="chat_ib">
                          <div
                            key={i}
                            className="f-l"
                            onClick={this.handleClick.bind(this, data.unique)}
                          >
                            <h5>
                              {data.conversation[0].username}
                              <span>
                                {
                                  data.conversation[
                                    data.conversation.length - 1
                                  ].time
                                }
                              </span>
                            </h5>
                            <p>{data.unique}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mesgs">
              <div className="msg_history">
                {this.state.messages.map(function(message, i) {
                  return message.username === "Admin" ? (
                    <div className="outgoing_msg" key={i}>
                      <div className="sent_msg">
                        <p>
                          {message.username}: {message.message}
                        </p>
                        <span className="time_date"> {message.time}</span>{" "}
                      </div>
                    </div>
                  ) : (
                    <div className="incoming_msg" key={i}>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <p>
                            {message.username}: {message.message}
                          </p>
                          <span className="time_date">{message.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="type_msg">
                  <div className="input_msg_write">
                    <input
                      placeholder="Message"
                      className="form-control"
                      required
                      name="message"
                      value={this.state.message}
                      onChange={this.onChange}
                    />
                    <button className="msg_send_btn" type="button">
                      {/* <i className="fa fa-paper-plane-o" aria-hidden="true" /> */}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;

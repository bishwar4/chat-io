import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "./chatbot2.png";
import logo1 from "./image (1).png";
import icon1 from "./icon1.png";
import icon2 from "./icon2.png";
import icon3 from "./icon3.png";
import icon4 from "./icon4.png";

export default class home extends Component {
  state = {
    show: false
  };
  toggleItem = () => {
    const doesShow = this.state.show;
    this.setState({ show: !doesShow });
  };
  render() {
    let comp1 = null;
    let comp2 = null;
    if (this.state.show) {
      comp1 = (
        <form>
          <button className="btn" onClick={this.toggleItem}>
            <i className="fa fa-close" />
          </button>
          <img src={logo} alt="My logo" className="img" />
          <br />
          <small>
            <p>
              hello,
              <br /> i am {"{"}
              BIZ
              {"}"} Bot, how i can
              <br /> help you today?
            </p>
          </small>
          <Link to="/chat" className="link">
            <img src={icon1} alt="My logo" hspace={10} />
            <span>Talk To Our Expert</span>
            <br />
            <br />
          </Link>
          <Link to="/query" className="link">
            <img src={icon2} alt="My logo" hspace={10} />
            <span> Post Your Inquaries/Issue</span>
            <br />
            <br />
          </Link>
          <Link to="/search" className="link">
            <img src={icon3} alt="My logo" hspace={10} />
            <span> Track My Ticket</span>
            <br />
            <br />
          </Link>
          <Link to="/faq" className="link">
            <img src={icon4} alt="My logo" hspace={10} />
            <span> Frequently Asked Questions</span>
            <br />
            <br />
          </Link>
          <h6 style={{ textAlign: "center" }}>Powered by Prackr</h6>
        </form>
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
        <div className="form-style-5">{comp1}</div>
        <div>{comp2}</div>
      </div>
    );
  }
}

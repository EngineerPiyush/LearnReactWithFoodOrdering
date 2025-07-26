import UserClass from "./UserClass";
import { Component } from "react";
import User from "./User";
class About extends Component {
  constructor() {
    super();
    console.log("parent constructor called");
    this.state = {
      name: "Piyush",
      designation: "Software Engineer",
    };
  }
  componentDidMount() {
    // after updating the state of parent component the component did update called but the twist 
    // is the child component did update also called in this case even we have not updated the 
    // props or state of a child component

     this.time = setInterval(() => {
      console.log("set Interval called inside About Component")
     }, 1000);
    this.setState({
      name: "Dubey Ji",
    });
    console.log("parent component did mount called");
  }
  componentDidUpdate() {
    console.log("parent component Did Update called");
  }
  componentWillUnmount(){
    console.log("component will unmount called")
     clearInterval(this.time);
  }
  render() {
    console.log("parent render called");
    // const UserInfo = {
    //   name: "Piyush",
    //   location: "Noida",
    //   designation: "Software Engineer",
    // };
    return (
      <div>
        <h1>{this.state.name}</h1>
        <UserClass />
        <User/>
        {/* <UserClass UserInfo={UserInfo} /> */}
      </div>
    );
  }
}
export default About;

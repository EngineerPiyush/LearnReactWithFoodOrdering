import React from "react";
class UserClass extends React.Component {
  constructor() {
    super();
    // this.state = {
    //     count: 0,
    //     count2 : 1,
    // }
    this.state = {
      UserInfo: {
        name: "test",
        avatar_url: "https://user-dummy-profile",
        user_view_type: "user is public",
        bio: "No information available",
      },
    };
    console.log("child constructor called ");
  }
  componentDidMount(){
    console.log("child component did mount called")
  }
  componentDidUpdate(){
    console.log("child component Did Update called")
  }
  fetchData = async () => {
    const data = await fetch("https://api.github.com/users/EngineerPiyush");
    var json = await data.json();
    console.log(json);
    this.setState({
      UserInfo: json,
    });
  };
  render() {
    const { UserInfo } = this.state;
    console.log("child render called");
    return (
      <div className="about-user">
        <hr />
        <h1>{UserInfo.login}</h1>
        <img src={UserInfo.avatar_url} alt="User Profile"></img>
        <h1>{UserInfo.name}</h1>
        <h1>{UserInfo.user_view_type}</h1>
        <h1>{UserInfo.bio}</h1>
        <button
          onClick={() => {
            this.fetchData();
          }}
        >
          Get User Data
        </button>
      </div>
    );
  }
}
export default UserClass;

// const h1 = document.createElement("h1");
// h1.innerText = "Piyush Dubey";
// document.body.appendChild(h1);
import React from "react";
import ReactDOM from "react-dom/client";
import { jsx } from "react/jsx-runtime";

// const myElement=React.createElement("div",{className:"continer",id:"menu-container"},
//   React.createElement("div",{className:"main-menu"},
//   React.createElement("ul",{className:"menu-items" , style: { listStyle: "none" }} ,[
//   React.createElement("li",{className:"list",key:1},
//   "home"),
//   React.createElement("li",{className:"list",key:2},
//  "about"),
//   React.createElement("li",{className:"list",key:3},
//   "contact")])));

// const jsxSyntax=( <h1 className='piyush'>
// Dubey Ji
// </h1>)
// console.log(jsxSyntax)
// const showMyElement= ReactDOM.createRoot(document.getElementById("root"));
// showMyElement.render(jsxSyntax);

// React functional component

// const HeadingComponent= () =>{
//   return <h1>Namaste react functional component</h1>
// }
// or
// const HeadingComponent= () =><h1>Namaste react functional component</h1>
// or
const car = {type:"Fiat", model:"500", color:"white"};
const reactElem = <span>Hello this is a react element </span>
const HeadingComponent = () => (
  <div id="container">
  {/* below how we can put a component inside another component */}
    <Title /> 
    <Title></Title>
    {Title()}
     {/* below how we can put a javascript object inside a component */}
     {car.type} {car.model} {car.color}
    <h1>Hello this is component composition example</h1>
     {/* below how we can put a react element  inside a component */}
    {reactElem}
  </div>
);
const showComponent = ReactDOM.createRoot(document.getElementById("root"));
showComponent.render(<HeadingComponent />);

const Title = () => <h1>Namaste react using jsx</h1>;

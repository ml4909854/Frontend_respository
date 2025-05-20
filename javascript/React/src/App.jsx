import React from "react";

// function App(){
//   return <h1>HI I am App Component</h1>
// }

// // props in a component
// function App(props){
//   console.log(props.color , props.fontsize)
// return <h1 style={{color:props.color , fontSize:props.fontsize}}>{props.color}</h1>

// }

// components in components

// function App(){

//   return<>
//   <h1>I am a App component</h1>
//   <Car/>
//   </>
// }
// function Car(){
//   return <h1> I am a car Component</h1>
// }

// const import React from 'react'

const Garage = (props)=>{
  return <>
  <h1>I have a {props.car} car</h1>
  
  </>
}

const  App= () => {
  let carname = "maruti 800"
  return <>
  <h1>hI aam a car component</h1>
<Garage car={carname}/>
  </>
};



export default App;

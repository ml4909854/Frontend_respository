// import React from "react";

// // function App(){
// //   return <h1>HI I am App Component</h1>
// // }

// // // props in a component
// // function App(props){
// //   console.log(props.color , props.fontsize)
// // return <h1 style={{color:props.color , fontSize:props.fontsize}}>{props.color}</h1>

// // }

// // components in components

// // function App(){

// //   return<>
// //   <h1>I am a App component</h1>
// //   <Car/>
// //   </>
// // }
// // function Car(){
// //   return <h1> I am a car Component</h1>
// // }

// // const import React from 'react'

// // const Garage = (props)=>{
// //   return <>
// //   <h1>I have a {props.car} car</h1>

// //   </>
// // }

// // const  App= () => {
// //   let carname = "maruti 800"
// //   return <>
// //   <h1>hI aam a car component</h1>
// // <Garage car={carname}/>
// //   </>
// // };

// // /// react Events

// // function App() {
// //   const shoot = (a) => {
// //     alert(a);
// //   };
// //   return (
// //     <>
// //       <button onClick={() => shoot("Great Shot!")}>Hit A Shot</button>
// //     </>
// //   )
// // }
// // import React from 'react'

// const App = () => {

// function Garage(props) {
//   const cars = props.cars;
//   return (
//     <>
//       <h1>Garage</h1>
//       {cars.length > 0 &&
//         <h2>
//           You have {cars.length} cars in your garage.
//         </h2>
//       }
//     </>
//   );
// }
 
// const cars = [
//   // "ford" , "mustang" , "Maruti*900"
// ]
//   return (
//     <div>
//       <Garage cars={cars}/>
//     </div>
//   )
// }

// export default App


import React from 'react'

const App = (props) => {

  function MissedGoal(){
    return <h1>Goal is missed</h1>
  }
  function MadeGoal(){
    return <h1>Goad is maded</h1>
  }

  return (
    <div>
      {props.isGoal?<MadeGoal/> : <MissedGoal/>}
    </div>
  )
}

export default App
import { useState } from "react";
import Quiz from "./components/Quiz";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import "./index.css"
export default function App() {
const [quizStarted, setQuizStarted] = useState(false);
  return (
    <>
      <Nav/>
      {quizStarted ? <Quiz/> : <div className="center-div"><button onClick={()=> setQuizStarted(true)} className="text-xl custom-btn btn-7"><span>Let's Go</span></button> </div>}
      <Footer/>
   
    </>
  )
}
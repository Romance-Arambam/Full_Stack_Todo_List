import Navbar from "../navbar/navbar";
import "./home.css"

export default function Home(){
    return(
        <div className="home d-flex align-items-center justify-content-center">
           <div className="container d-flex align-items-center flex-column">
            <h1 className="h1-home">
                Plan. Act. Achieve. <br/>
                Your personal task manager is here.<br/>
                Start organizing your day, one task at a time!<br/>
            </h1>
            <p className="p-home">
                Organize your tasks, set priorities, and track progress effortlessly.
            Whether it’s work, study, or personal goals — TODO helps you stay on top of everything in one place.
            </p>
            <button type="button" className=" btn-home">Make Your To-Do list Now</button>
            </div>
            
        </div>
    )
}
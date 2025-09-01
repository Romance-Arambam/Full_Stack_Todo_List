import "./todo.css";
import { useState } from "react";
import TodoCards from "./todoCards";
import Update from "./update";
import { ToastContainer, toast } from 'react-toastify';
import {useSelector} from 'react-redux';
import { useEffect } from "react";
import axios from "axios";



export default function Todo() {
  const [id, setId] = useState(sessionStorage.getItem("Id"));
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [tasks, setTasks] = useState([]);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
  const fetchTasks = async () => {
   
      try {
       await axios.get("http://localhost:3000/getTasks/" + id).then( (res) => {
          setTasks(res.data.list);
        });
      } catch (err) {
        console.error("Error fetching tasks", err);
      }
    
  };
  fetchTasks();
}, [id]);


  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
  if (Inputs.title.trim() === "" || Inputs.body.trim() === "") { 
    toast.error("Title and Body cannot be empty!");
    return;
  }

  if (id) {
    try {
      const res = await axios.post("http://localhost:3000/addTask", { 
        title: Inputs.title, 
        body: Inputs.body, 
        id 
      });

      setTasks((prev) => [...prev, res.data.list]); // push new task
      setInputs({ title: "", body: "" });
      document.getElementById("textarea").style.display = "none";
      toast.success("Task Added Successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error, please try again later.");
    }
  } else {
    setTasks((prev) => [...prev, Inputs]); 
    setInputs({ title: "", body: "" });
    toast.success("Task Added Successfully!");
    toast.info("Note: Your tasks won't be saved as you are not logged in.");
  }
};


  const del = async(cardid) => {
    await axios.delete("http://localhost:3000/deleteTask/" + cardid, { data: { id: id } }); 
  };
  const showUpdate=(value)=>{
    document.getElementById("todo-update").style.display=value;
  }

  return (
    <>
      <div className="todo">
          <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-50 p1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={Inputs.title}
              onChange={change}
            />

            <textarea
              id="textarea"
              placeholder="BODY"
              className="p-2 todo-inputs"
              name="body"
              value={Inputs.body}
              onChange={change}
              style={{ display: "none" }}
            />
          </div>
          <div className="w-50 d-flex justify-content-end my-3">
            <button className="todo-btn px-2" onClick={submit}>
              Add Task
            </button>
          </div>
        </div>

        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {tasks.map((item, index) => (
                <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                  <TodoCards
                    id={item._id}
                    title={item.title}
                    body={item.body}
                    delid={del}
                    display={showUpdate}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="todo-update " id="todo-update" >
        <div className="container ">
          <Update display={showUpdate}/>
        </div>
        
      </div>
    </>
  );
}

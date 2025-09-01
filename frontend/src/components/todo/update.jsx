export default function Update({display}) {
  return (
    <div className="p-5 d-flex flex-column justify-content-center align-items-start todo-update">
        <h2>
            Update Your Task
        </h2>
        <input type ="text"
        className="todo-inputs my-4 w-100 p-3" />

        <textarea className="todo-inputs w-100 p-3" />
        <div>
            <button className="btn btn-primary my-4" >Update </button>
            <button className="btn btn-danger my-4 mx-4" onClick={()=> display("none")}>Close </button>
        </div>
    </div>
  )
}
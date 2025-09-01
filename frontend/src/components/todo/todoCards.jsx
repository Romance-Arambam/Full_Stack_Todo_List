import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

export default function TodoCards({ title, body, id, delid, display }) {
  return (
    <div className="todo-cards p-3">
      <div>
        <h5>{title}</h5>
        <p>{body.length > 80 ? body.substring(0, 80) + "..." : body}</p>
      </div>
      <div className="d-flex justify-content-around">
        <div className="d-flex justify-content-center align-items-center card-item px-1 py-1" onClick={()=>display("block")}>
          <GrUpdate className="card-icons " /> Update
        </div>
        <div
          className="d-flex justify-content-center align-items-center card-item px-1 py-1"
          onClick={() => delid(id)}
        >
          <MdDeleteForever className="card-icons del" /> Delete
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import "./todo.css"; // make sure this is imported if not already

function TodoCards({ id, item, onDelete, onUpdate }) {
  // local state to control expansion
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const isLong = item.body.length > 80;
  const displayText = isLong && !expanded
    ? item.body.substring(0, 80) + "..."
    : item.body;

  return (
    <div>
      <div className="todo-cards p-3 shadow-md">
        <div>
          <h5>{item.title}</h5>
          <p>
            {displayText}
            {isLong && (
              <span onClick={toggleExpand} className="read-more-toggle">
                {expanded ? " Show less" : " Read more"}
              </span>
            )}
          </p>
        </div>

        <div className="d-flex justify-content-around">
          <div
            className="d-flex justify-content-center align-items-center card-item px-1 py-1"
            onClick={() => onUpdate(item)}
          >
            <GrUpdate className="card-icons" /> Update
          </div>

          <div
            className="d-flex justify-content-center align-items-center card-item px-1 py-1"
            onClick={() => onDelete(id)}
          >
            <MdDeleteForever className="card-icons del" /> Delete
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoCards;

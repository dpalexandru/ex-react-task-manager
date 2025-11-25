import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";


const TaskRow = ({ task }) => {

  const navigate = useNavigate();

  const row = useMemo(() => {
    // Calcolo colore stato
    const statusColor =
      task.status === "To do"
        ? "#ffb3b3"
        : task.status === "Doing"
          ? "#fff4b3"
          : task.status === "Done"
            ? "#baf7ba"
            : "";

    const formattedDate = new Date(task.createdAt).toLocaleString("it-IT");

    return (
      <tr
        onClick={() => navigate(`/task/${task.id}`)}
        style={{ cursor: "pointer" }}>
        <td>{task.title}</td>

        <td
          style={{ backgroundColor: statusColor }}>
          {task.status}
        </td>

        <td>{formattedDate}</td>
      </tr>
    );
  }, [task]);


  return row;
};

export default TaskRow;

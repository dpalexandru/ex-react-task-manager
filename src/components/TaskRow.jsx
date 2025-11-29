import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/it";
dayjs.locale("it");


const TaskRow = ({ task, checked, onToggle }) => {

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

    const formattedDate = dayjs(task.createdAt).format("DD/MM/YYYY HH:mm");

    return (
      <tr
        onClick={() => navigate(`/task/${task.id}`)}
        style={{ cursor: "pointer" }}>

        <td><input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(task.id)}
          onClick={(e) => e.stopPropagation()}
        />
        </td>
        <td>{task.title}</td>

        <td
          style={{ backgroundColor: statusColor }}>
          {task.status}
        </td>

        <td>{formattedDate}</td>
      </tr>
    );
  }, [task, checked, onToggle]);


  return row;
};

export default TaskRow;

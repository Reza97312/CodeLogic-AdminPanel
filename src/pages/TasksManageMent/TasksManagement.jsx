import React from "react";
import TasksTable from "../../components/Tasks/TasksTable";
import { useQuery } from "@tanstack/react-query";
import { GetAllTasks } from "../../core/services/api/get/Tasks/GetAllTasks";
import loading from "../../assets/images/A/loading.gif";
const TasksManagement = () => {
  const { data: allTasks = [], isPending } = useQuery({
    queryKey: ["ALLTASKS"],
    queryFn: () => GetAllTasks(),
  });
  return (
    <div>
      {isPending ? (
        <img src={loading} className="mx-auto" />
      ) : (
        <TasksTable taskData={allTasks} />
      )}
    </div>
  );
};

export default TasksManagement;

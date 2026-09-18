import type { Metadata } from "next";
import TaskStatusContent from "./TaskStatusContent";

export const metadata: Metadata = {
  title: "Task Status",
};

const TaskStatusPage = () => <TaskStatusContent />;

export default TaskStatusPage;
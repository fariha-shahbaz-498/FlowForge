import Column from "./Column";
import useTasks from "../../hooks/useTasks";

function KanbanBoard() {

  const {
    tasks,
    changeStatus,
  } = useTasks();


  const columns = [
    {
      title: "📝 Todo",
      status: "Todo",
    },
    {
      title: "🚀 In Progress",
      status: "In Progress",
    },
    {
      title: "👀 Review",
      status: "Review",
    },
    {
      title: "✅ Done",
      status: "Done",
    },
  ];


  return (
    <div className="grid gap-6 lg:grid-cols-4">

      {columns.map((column)=>(
        <Column
          key={column.status}
          title={column.title}
          tasks={
            tasks.filter(
              (task)=>task.status === column.status
            )
          }
        />
      ))}

    </div>
  );
}

export default KanbanBoard;
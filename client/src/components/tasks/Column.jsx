import TaskCard from "./TaskCard";

function Column({ title, tasks }) {
  return (
    <div className="rounded-3xl bg-slate-100 dark:bg-slate-800 p-5">

      <h2 className="mb-5 text-lg font-bold">
        {title}
      </h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}

    </div>
  );
}

export default Column;
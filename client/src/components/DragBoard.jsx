import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import {
  Edit3,
  Trash2,
  Calendar,
  MessageCircle,
} from "lucide-react";

export default function DragBoard({
  tasks,
  setTasks,
  search,
  editTask,
  deleteTask,
  openTask,
}) {

  const columns = [
    "Todo",
    "In Progress",
    "Review",
    "Done"
  ];

  function handleDragEnd(result) {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    setTasks(prev =>
      prev.map(task =>
        task.id.toString() === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  }

  function priorityColor(priority) {
    if (priority === "High")
      return "bg-red-100 text-red-600";

    if (priority === "Medium")
      return "bg-yellow-100 text-yellow-600";

    return "bg-green-100 text-green-600";
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid gap-6 lg:grid-cols-4">
        {columns.map(column => (
          <Droppable key={column} droppableId={column}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-h-[500px] rounded-3xl bg-slate-100 dark:bg-slate-800 p-5"
              >
                <div className="mb-5 flex justify-between">
                  <h2 className="text-xl font-bold dark:text-white">
                    {column}
                  </h2>
                  <span className="rounded-full bg-white dark:bg-slate-900 px-3 py-1 text-sm">
                    {tasks.filter(t => t.status === column).length}
                  </span>
                </div>

                {tasks
                  .filter(task => task.status === column)
                  .filter(task =>
                    task.title
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          onClick={() => openTask(task)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4 rounded-3xl bg-white dark:bg-slate-900 p-5 shadow transition hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                        >
                          <h3 className="font-bold dark:text-white">
                            {task.title}
                          </h3>

                          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                            {task.description}
                          </p>

                          <div className="mt-4 flex justify-between items-center">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor(task.priority)}`}>
                              {task.priority}
                            </span>

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                              {task.member}
                            </div>
                          </div>

                          <div className="mt-4 flex justify-between text-xs text-slate-500">
                            <span className="flex gap-1 items-center">
                              <Calendar size={14} />
                              {task.due || "No date"}
                            </span>

                            <span className="flex gap-1 items-center">
                              <MessageCircle size={14} />
                              {task.comments || 0}
                            </span>
                          </div>

                          <div className="mt-4">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{task.progress || 0}%</span>
                            </div>

                            <div className="mt-2 h-2 rounded-full bg-slate-200">
                              <div
                                className="h-2 rounded-full bg-emerald-500"
                                style={{ width: `${task.progress || 0}%` }}
                              />
                            </div>
                          </div>

                          {/* Action Buttons Layer */}
                          <div className="mt-5 flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => editTask(task)}
                              className="flex items-center gap-1 rounded-xl bg-blue-100 px-3 py-2 text-xs text-blue-600"
                            >
                              <Edit3 size={14} />
                              Edit
                            </button>

                            <button
                              onClick={() => deleteTask(task.id)}
                              className="flex items-center gap-1 rounded-xl bg-red-100 px-3 py-2 text-xs text-red-600"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>

                        </div>
                      )}
                    </Draggable>
                  ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
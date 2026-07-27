import { useState, useEffect } from "react";
import Layout from "../layout/Layout";

const initialEvents = [
  {
    id: 1,
    title: "Project Meeting",
    date: "2026-07-20",
    time: "10:00",
    type: "Meeting",
  },
  {
    id: 2,
    title: "UI Review",
    date: "2026-07-22",
    time: "14:00",
    type: "Review",
  },
];

function Calendar() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : initialEvents;
  });
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [type, setType] = useState("Meeting");

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  function addEvent() {
    if (!title || !date || !time) return;

    if (editId) {
      setEvents(
        events.map((event) =>
          event.id === editId
            ? {
                ...event,
                title,
                date,
                time,
                type,
              }
            : event
        )
      );
      setEditId(null);
    } else {
      setEvents([
        ...events,
        {
          id: Date.now(),
          title,
          date,
          time,
          type,
        },
      ]);
    }

    setTitle("");
    setDate("");
    setTime("");
    setType("Meeting");
    setShowModal(false);
  }

  function editEvent(event) {
    setTitle(event.title);
    setDate(event.date);
    setTime(event.time);
    setType(event.type || "Meeting");
    setEditId(event.id);
    setShowModal(true);
  }

  function deleteEvent(id) {
    setEvents(events.filter((e) => e.id !== id));
  }

  function handleCloseModal() {
    setTitle("");
    setDate("");
    setTime("");
    setType("Meeting");
    setEditId(null);
    setShowModal(false);
  }

  // Helper filter array to prevent code duplication in conditional empty states and maps
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Calendar</h1>
            <p className="text-slate-500 dark:text-slate-300">
              Meetings, deadlines and schedules.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl bg-emerald-500 px-6 py-3 text-white font-medium hover:bg-emerald-600 transition"
          >
            + Add Event
          </button>
        </div>

        {/* STEP 2 — Added Statistics Section */}
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-5 shadow">
            <h3 className="text-slate-500 dark:text-slate-300 text-sm font-medium">Total Events</h3>
            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              {events.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-5 shadow">
            <h3 className="text-slate-500 dark:text-slate-300 text-sm font-medium">Upcoming</h3>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {
                events.filter(
                  (e) => new Date(e.date) >= new Date()
                ).length
              }
            </h2>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-5 shadow">
            <h3 className="text-slate-500 dark:text-slate-300 text-sm font-medium">Today's Events</h3>
            <h2 className="mt-2 text-3xl font-bold text-emerald-600">
              {
                events.filter(
                  (e) =>
                    e.date ===
                    new Date().toISOString().split("T")[0]
                ).length
              }
            </h2>
          </div>
        </div>

        {/* Search Bar */}
        <div className="rounded-xl bg-white dark:bg-slate-900 transition-colors duration-300 p-4 shadow">
          <input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-slate-700"
          />
        </div>

        <div className="space-y-4">
          {/* STEP 4 — Empty State Checklist / UI implementation */}
          {filteredEvents.length === 0 ? (
            <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-10 text-center shadow">
              <h2 className="text-2xl font-bold text-slate-700">No Events Found</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-300">
                Try another search or add a new event.
              </p>
            </div>
          ) : (
            /* STEP 1 — Filter, sort by date/time, and map over elements */
            filteredEvents
              .sort(
                (a, b) =>
                  new Date(`${a.date}T${a.time}`) -
                  new Date(`${b.date}T${b.time}`)
              )
              .map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-6 shadow flex justify-between items-center"
                >
                  <div>
                    <h2 className="font-bold text-lg text-slate-800">{event.title}</h2>
                    <p className="text-slate-500 dark:text-slate-300">
                      {event.date} • {event.time}
                    </p>
                    
                    {/* STEP 3 — Color Event Types via Dynamic Classnames */}
                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold
                      ${
                        event.type === "Meeting"
                          ? "bg-blue-100 text-blue-600"
                          : event.type === "Deadline"
                          ? "bg-red-100 text-red-600"
                          : event.type === "Review"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {event.type}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => editEvent(event)}
                      className="rounded-lg bg-blue-100 px-4 py-2 text-blue-600 font-medium hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="rounded-lg bg-red-100 px-4 py-2 text-red-600 font-medium hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="w-[420px] rounded-3xl bg-white dark:bg-slate-900 transition-colors duration-300 p-8 shadow-2xl">
              {/* STEP 9 — Update Modal Title */}
              <h2 className="text-2xl font-bold text-slate-800">
                {editId ? "Edit Event" : "Add Event"}
              </h2>

              <input
                className="mt-5 w-full rounded-xl border p-3 outline-none focus:border-emerald-500 transition"
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="date"
                className="mt-4 w-full rounded-xl border p-3 outline-none focus:border-emerald-500 transition text-slate-700"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <input
                type="time"
                className="mt-4 w-full rounded-xl border p-3 outline-none focus:border-emerald-500 transition text-slate-700"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

              {/* STEP 7 — Event Type Dropdown */}
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-4 w-full rounded-xl border p-3 outline-none focus:border-emerald-500 transition bg-white dark:bg-slate-900 transition-colors duration-300 text-slate-700"
              >
                <option>Meeting</option>
                <option>Deadline</option>
                <option>Review</option>
                <option>Presentation</option>
              </select>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={addEvent}
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-white font-medium hover:bg-emerald-600 transition"
                >
                  {editId ? "Save" : "Add"}
                </button>

                <button
                  onClick={handleCloseModal}
                  className="rounded-xl bg-slate-200 px-5 py-3 font-medium hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}

export default Calendar;
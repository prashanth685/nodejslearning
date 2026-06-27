import React, { useState } from "react";

const Practice = () => {
  const [input, setinput] = useState("");
  const [tasks, setTasks] = useState([]);
  const addtask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setinput("");
  };
  const deletetask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  const edittask = (index) => {
    setinput(tasks[index]);
    setTasks(tasks.filter((_, i) => i !== index));
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
          <h1 className="font-semibold text-3xl text-center text-blue-600 mb-6">
            Todo manager
          </h1>
          <div className="flex gap-2 mb-6 ">
            <input
              type="text"
              placeholder="enter a task"
              value={input}
              className="flex-1 px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2"
              onChange={(e) => setinput(e.target.value)}
            />
            <button
              onClick={addtask}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-lg cursor-pointer"
            >
              Add
            </button>
          </div>
          <ul className="space-x-3">
            {tasks.map((item, index) => (
              <li
                key={index}
                type="1"
                className="flex justify-between items-center bg-gray-100 p-3 rounded-sm"
              >
                <span className="text-lg">{item}</span>{" "}
                <div className="space-x-2">
                  <button
                    onClick={() => edittask(index)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => deletetask(index)}
                    className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    delete
                  </button>{" "}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Practice;

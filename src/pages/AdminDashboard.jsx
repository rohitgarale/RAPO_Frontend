// src/pages/AdminDashboard.jsx

import React, { useState, useEffect } from "react";
import api from "../axios";

const AdminDashboard = () => {
  const [buses, setBuses] = useState([]);
  const [newBus, setNewBus] = useState({ number_plate: "", capacity: "" });

  useEffect(() => {
    // Fetch buses on page load
    api.get("/buses").then((response) => setBuses(response.data));
  }, []);

  const handleAddBus = () => {
    // Make POST request to add new bus
    api
      .post("/buses", newBus)
      .then((response) => {
        setBuses([...buses, response.data]); // Update the bus list
        setNewBus({ number_plate: "", capacity: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding bus:", error));
  };

  const handleDeleteBus = (busId) => {
    // Make DELETE request to remove a bus
    api
      .delete(`/buses/${busId}`)
      .then(() => {
        setBuses(buses.filter((bus) => bus.id !== busId)); // Remove from the list
      })
      .catch((error) => console.error("Error deleting bus:", error));
  };

  const [drivers, setDrivers] = useState([]);
const [newDriver, setNewDriver] = useState({ name: "", bus_id: "" });

useEffect(() => {
  // Fetch drivers on page load
  api.get("/drivers").then((response) => setDrivers(response.data));
}, []);

const handleAddDriver = () => {
  api
    .post("/drivers", newDriver)
    .then((response) => {
      setDrivers([...drivers, response.data]);
      setNewDriver({ name: "", bus_id: "" });
    })
    .catch((error) => console.error("Error adding driver:", error));
};

const handleDeleteDriver = (driverId) => {
  api
    .delete(`/drivers/${driverId}`)
    .then(() => {
      setDrivers(drivers.filter((driver) => driver.id !== driverId));
    })
    .catch((error) => console.error("Error deleting driver:", error));
};

<div className="mb-6">
  <h2 className="text-xl font-semibold text-gray-700 mb-2">Manage Drivers</h2>
  <div className="border-t border-b py-4">
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Driver Name"
        value={newDriver.name}
        onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
        className="p-2 border rounded-md"
      />
      <select
        value={newDriver.bus_id}
        onChange={(e) => setNewDriver({ ...newDriver, bus_id: e.target.value })}
        className="p-2 border rounded-md"
      >
        <option value="">Select Bus</option>
        {buses.map((bus) => (
          <option key={bus.id} value={bus.id}>
            {bus.number_plate}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddDriver}
        className="bg-blue-600 text-white p-2 rounded-md"
      >
        Add Driver
      </button>
    </div>
    <ul>
      {drivers.map((driver) => (
        <li key={driver.id} className="flex justify-between py-2">
          <span>{driver.name}</span>
          <span>{driver.bus_id}</span>
          <button
            onClick={() => handleDeleteDriver(driver.id)}
            className="bg-red-600 text-white p-1 rounded-md"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>

const [routes, setRoutes] = useState([]);
const [newRoute, setNewRoute] = useState({ source: "", destination: "", scheduled_time: "" });

useEffect(() => {
  // Fetch routes on page load
  api.get("/routes").then((response) => setRoutes(response.data));
}, []);

const handleAddRoute = () => {
  api
    .post("/routes", newRoute)
    .then((response) => {
      setRoutes([...routes, response.data]);
      setNewRoute({ source: "", destination: "", scheduled_time: "" });
    })
    .catch((error) => console.error("Error adding route:", error));
};

const handleDeleteRoute = (routeId) => {
  api
    .delete(`/routes/${routeId}`)
    .then(() => {
      setRoutes(routes.filter((route) => route.id !== routeId));
    })
    .catch((error) => console.error("Error deleting route:", error));
};


<div className="mb-6">
  <h2 className="text-xl font-semibold text-gray-700 mb-2">Manage Routes</h2>
  <div className="border-t border-b py-4">
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Source"
        value={newRoute.source}
        onChange={(e) => setNewRoute({ ...newRoute, source: e.target.value })}
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Destination"
        value={newRoute.destination}
        onChange={(e) => setNewRoute({ ...newRoute, destination: e.target.value })}
        className="p-2 border rounded-md"
      />
      <input
        type="datetime-local"
        value={newRoute.scheduled_time}
        onChange={(e) => setNewRoute({ ...newRoute, scheduled_time: e.target.value })}
        className="p-2 border rounded-md"
      />
      <button
        onClick={handleAddRoute}
        className="bg-blue-600 text-white p-2 rounded-md"
      >
        Add Route
      </button>
    </div>
    <ul>
      {routes.map((route) => (
        <li key={route.id} className="flex justify-between py-2">
          <span>{route.source} → {route.destination}</span>
          <span>{route.scheduled_time}</span>
          <button
            onClick={() => handleDeleteRoute(route.id)}
            className="bg-red-600 text-white p-1 rounded-md"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>


  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>

        {/* Bus Management */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Manage Buses</h2>
          <div className="border-t border-b py-4">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Bus Number Plate"
                value={newBus.number_plate}
                onChange={(e) => setNewBus({ ...newBus, number_plate: e.target.value })}
                className="p-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Capacity"
                value={newBus.capacity}
                onChange={(e) => setNewBus({ ...newBus, capacity: e.target.value })}
                className="p-2 border rounded-md"
              />
              <button
                onClick={handleAddBus}
                className="bg-blue-600 text-white p-2 rounded-md"
              >
                Add Bus
              </button>
            </div>
            <ul>
              {buses.map((bus) => (
                <li key={bus.id} className="flex justify-between py-2">
                  <span>{bus.number_plate}</span>
                  <span>{bus.capacity} seats</span>
                  <button
                    onClick={() => handleDeleteBus(bus.id)}
                    className="bg-red-600 text-white p-1 rounded-md"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

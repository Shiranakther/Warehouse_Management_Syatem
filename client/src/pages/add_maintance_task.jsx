import React, { useState } from 'react';

const AddMaintenanceTask = () => {
  const [taskData, setTaskData] = useState({
    taskTitle: '',
    description: '',
    equipmentFacility: '',
    maintenanceType: '',
    scheduledDateTime: '',
    duration: '',
    assignedTechnician: '',
    assignedTechnicianContact: '',
    priority: '',
    costEstimation: '',
    status: 'Pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/maintance/create_maintence_task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });
      if (!response.ok) {
        throw new Error('Failed to add maintenance task');
      }
      // Reset form after successful submission
      setTaskData({
        taskTitle: '',
        equipmentFacility: '',
        maintenanceType: '',
        scheduledDateTime: '',
        duration: '',
        assignedTechnician: '',
        assignedTechnicianContact: '',
        priority: '',
        costEstimation: '',
        description: '',
        status: 'Pending'
      });
      alert('Maintenance task added successfully'); // Show an alert
      window.location.href = '/MaintenanceListPage';
    } catch (error) {
      console.error('Error adding maintenance task:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Add Maintenance Task</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">Task Title:</label>
            <input type="text" name="taskTitle" value={taskData.taskTitle} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Equipment/Facility:</label>
            <input type="text" name="equipmentFacility" value={taskData.equipmentFacility} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">Maintenance Type:</label>
            <select name="maintenanceType" value={taskData.maintenanceType} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full">
              <option value="">Select maintenance type</option>
              <option value="Routine Inspection">Routine Inspection</option>
              <option value="Preventive Maintenance">Preventive Maintenance</option>
              <option value="Corrective Maintenance">Corrective Maintenance</option>
              <option value="Emergency Repair">Emergency Repair</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Scheduled Date and Time:</label>
            <input type="datetime-local" name="scheduledDateTime" value={taskData.scheduledDateTime} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">Duration (minutes):</label>
            <input type="number" name="duration" value={taskData.duration} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Assigned Technician:</label>
            <input type="text" name="assignedTechnician" value={taskData.assignedTechnician} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">Assigned Technician Contact:</label>
            <input type="text" name="assignedTechnicianContact" value={taskData.assignedTechnicianContact} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Priority:</label>
            <select name="priority" value={taskData.priority} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full">
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">Cost Estimation:</label>
            <input type="number" name="costEstimation" value={taskData.costEstimation} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Description:</label>
          <textarea name="description" value={taskData.description} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full h-32"></textarea>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddMaintenanceTask;

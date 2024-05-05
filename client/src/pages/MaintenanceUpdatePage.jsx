import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MaintenanceUpdatePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/maintance/get_maintenance_task/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch maintenance task');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/maintance/update_maintenance_task/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update maintenance task');
      }
      const updatedTask = await response.json();

      alert('Maintenance task updated successfully');
      window.location.href = '/MaintenanceListPage';
    } catch (error) {
      console.error('Error updating maintenance task:', error);
      setError(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Update Maintenance Task</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">Task Title:</label>
            <input type="text" name="taskTitle" value={formData.taskTitle || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Equipment/Facility:</label>
            <input type="text" name="equipmentFacility" value={formData.equipmentFacility || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">Maintenance Type:</label>
            <select name="maintenanceType" value={formData.maintenanceType || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full">
              <option value="">Select maintenance type</option>
              <option value="Routine Inspection">Routine Inspection</option>
              <option value="Preventive Maintenance">Preventive Maintenance</option>
              <option value="Corrective Maintenance">Corrective Maintenance</option>
              <option value="Emergency Repair">Emergency Repair</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Scheduled Date and Time:</label>
            <input type="datetime-local" name="scheduledDateTime" value={formData.scheduledDateTime || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">Duration (minutes):</label>
            <input type="number" name="duration" value={formData.duration || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Assigned Technician:</label>
            <input type="text" name="assignedTechnician" value={formData.assignedTechnician || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">Assigned Technician Contact:</label>
            <input type="text" name="assignedTechnicianContact" value={formData.assignedTechnicianContact || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Priority:</label>
            <select name="priority" value={formData.priority || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full">
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
            <input type="number" name="costEstimation" value={formData.costEstimation || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Description:</label>
          <textarea name="description" value={formData.description || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full h-32"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default MaintenanceUpdatePage;

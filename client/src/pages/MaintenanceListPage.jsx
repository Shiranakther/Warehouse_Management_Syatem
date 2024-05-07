import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MaintenanceListPage = () => {
  const [maintenanceTasks, setMaintenanceTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetchMaintenanceTasks();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const fetchMaintenanceTasks = async () => {
    try {
      const response = await fetch('/api/maintance/MaintenanceListPage');
      const data = await response.json();
      setMaintenanceTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error('Error fetching maintenance tasks:', error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'UTC'
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', options);
  };

 
const handleDeleteTask = async (id) => {
  try {
    const response = await fetch(`/api/maintance/delete_maintenance_task/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete maintenance task');
    }

    // Fetch the updated list of tasks
    await fetchMaintenanceTasks();
    alert('Maintenance task deleted successfully');
  } catch (error) {
    console.error('Error deleting maintenance task:', error);
    alert('Failed to delete maintenance task');
  }
};

  const handleSearch = () => {
    const filteredTasks = maintenanceTasks.filter(task =>
      Object.values(task).some(val =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredTasks(filteredTasks);
  };

  const handleGenerateReport = () => {
    try {
      const doc = new jsPDF();
  
      // Add header border
      doc.setDrawColor(0); // Set border color to black
      doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, 40); // Draw header border with increased height
  
      // Add header content
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 255); // Set color to blue
      doc.text('Chaminda Stores', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0); // Reset color to black
      doc.setFontSize(10);
      doc.setTextColor(130,130,130); // Set color to blue
      doc.text('No 125, Mapatana, Horana', doc.internal.pageSize.getWidth() / 2, 27, { align: 'center' });
      doc.setFontSize(10);
      doc.text('TP : 075 - 6175658', doc.internal.pageSize.getWidth() / 2, 34, { align: 'center' });
  
      // Add current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
      const formattedTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'UTC' });
      const dateTimeText = 'Date: ' + formattedDate + ' Time: ' + formattedTime;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0); // Set color to black
      doc.text(dateTimeText, 104, 40, { align: 'center' }); // Adjust the position as needed
  
      // Add document border
      doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10); // Draw document border

      // Add title with underline
    doc.setFontSize(16);
    doc.setDrawColor(0); // Set140,140 underline color to black

    doc.textWithLink('Maintenance Report', doc.internal.pageSize.getWidth() / 2, 60, { align: 'center', url: 'javascript:void(0)', underline: true }); // Adjust the vertical position






  
      // Add table
      doc.autoTable({
        head: [
          ["Task Title", "Equipment/Facility", "Maintenance Type", "Scheduled Date and Time", "Duration (minutes)", "Assigned Technician", "Assigned Technician Contact", "Priority", "Cost Estimation", "Description", "Status"]
        ],
        body: filteredTasks.map(task => [
          task.taskTitle, 
          task.equipmentFacility, 
          task.maintenanceType, 
          formatDateTime(task.scheduledDateTime), 
          task.duration, 
          task.assignedTechnician, 
          task.assignedTechnicianContact, 
          task.priority, 
          task.costEstimation, 
          task.description, 
          task.status
        ]),
        columnStyles: {
          0: {cellWidth: 15},
          1: {cellWidth: 15},
          2: {cellWidth: 18},
          3: {cellWidth: 15},
          4: {cellWidth: 15},
          5: {cellWidth: 15},
          6: {cellWidth: 15},
          7: {cellWidth: 15},
          8: {cellWidth: 20},
          9: {cellWidth: 15},
          10: {cellWidth: 20},
        },
        styles: { fontSize: 5 }, // Set the font size to 8
        margin: { left: 15, right: 10,top: 70, bottom: 10}
      });
  
      // Add footer
      doc.setFontSize(10);
      doc.setTextColor(255, 0, 0); // Set color to red
      doc.text('Keep this report Confidential', doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 15, { align: 'center' });
  
      // Save PDF
      const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
      doc.save(`maintenance_tasks_report_${dateString}.pdf`);
    } catch (err) {
      console.error(err);
    }
  };








  return (
    <div className="p-8 w-3/4 mx-auto me-0 pt-4">
      <div className="p-7 rounded-lg mt-44">
        <div className="flex flex-row justify-between"> 
          <div className="w-3/8">
            <h3 className="text-3xl font-bold mb-6">All Maintenance Tasks</h3>
          </div>
          <div className='w-3/8 justify-center mb-7'>
          <input type="text" placeholder="Search anything" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full sm:w-72 mb-2 sm:mb-0 mr-0 sm:mr-2 " />
  
          </div>
          <div className='w-2/8 sm:w-auto flex justify-end'>
            <Link to="/add_maintance_task" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-50 h-10">
              Add Maintenance Task
            </Link>        
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className="w-full border border-blue-500">
            <thead>
              <tr className="bg-white border border-blue-500">
                <th className="px-4 py-2 border border-blue-500">Task Title</th>
                <th className="px-4 py-2 border border-blue-500">Equipment/Facility</th>
                <th className="px-4 py-2 border border-blue-500">Maintenance Type</th>
                <th className="px-4 py-2 border border-blue-500">Scheduled Date and Time</th>
                <th className="px-4 py-2 border border-blue-500">Duration (minutes)</th>
                <th className="px-4 py-2 border border-blue-500">Assigned Technician</th>
                <th className="px-4 py-2 border border-blue-500">Assigned Technician Contact</th>
                <th className="px-4 py-2 border border-blue-500">Priority</th>
                <th className="px-4 py-2 border border-blue-500">Cost Estimation</th>
                <th className="px-4 py-2 border border-blue-500">Description</th>
                <th className="px-4 py-2 border border-blue-500">Status</th>
                <th className="px-4 py-2 border border-blue-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task._id} className="bg-white border border-blue-500">
                  <td className="px-4 py-2 border border-blue-500">{task.taskTitle}</td>
                  <td className="px-4 py-2 border border-blue-500">{task.equipmentFacility}</td>
                  <td className="px-4 py-2 border border-blue-500">{task.maintenanceType}</td>
                  <td className="px-4 py-2 border border-blue-500">{formatDateTime(task.scheduledDateTime)}</td>
                  <td className="px-4 py-2 border border-blue-500">{task.duration}</td>
                  <td className="px-4 py-2 border border-blue-500">{task.assignedTechnician}</td>
                  <td className="px-4 py-2 border border-blue-500">{task.assignedTechnicianContact}</td>
                  <td className="px-4 py-2 border border-blue-500">{task.priority}</td>
                  <td className="px-4 py-2 border border-blue-500">{task.costEstimation}</td>
                  <td className="px-4 py-2 border border-blue-500">{task.description}</td>
                  <td className="px-4 py-2 border border-blue-500">{task.status}</td>
                  <td className="px-4 py-2 border border-blue-500 action">
                    <div className='flex flex-row justify-between'>
                      <Link to={`/MaintenanceUpdatePage/${task._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Update
                       </Link>
                      <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-5"> 
        <button onClick={handleGenerateReport} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Generate Report
          </button>

        </div>
      </div>
    </div>
  );
};

export default MaintenanceListPage;

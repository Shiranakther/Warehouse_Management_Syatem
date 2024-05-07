import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function AssignWorkerToShift() {
  const [shifts, setShifts] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedShift, setSelectedShift] = useState(() => localStorage.getItem('selectedShift') || '');
  const [selectedStaffForShift, setSelectedStaffForShift] = useState(() => {
    const storedData = localStorage.getItem('selectedStaffForShift');
    return storedData ? JSON.parse(storedData) : Object.fromEntries(shifts.map(shift => [shift._id, []]));
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchShiftsAndStaff = async () => {
      try {
        const shiftResponse = await axios.get('/api/workersShiftSchedule/shift');
        const staffResponse = await axios.get('/api/workersShiftSchedule/all/staff');
        setShifts(shiftResponse.data);
        setStaff(staffResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchShiftsAndStaff();
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedShift', selectedShift);
  }, [selectedShift]);

  useEffect(() => {
    localStorage.setItem('selectedStaffForShift', JSON.stringify(selectedStaffForShift));
  }, [selectedStaffForShift]);

  const handleShiftChange = (e) => {
    setSelectedShift(e.target.value);
  };

  const handleStaffChange = (e) => {
    const staffId = e.target.value;
    const isChecked = e.target.checked;

    setSelectedStaffForShift(prevState => {
      const updatedSelectedStaff = { ...prevState };
      if (isChecked) {
        Object.keys(updatedSelectedStaff).forEach(shiftId => {
          if (shiftId !== selectedShift) {
            updatedSelectedStaff[shiftId] = updatedSelectedStaff[shiftId].filter(id => id !== staffId);
          }
        });
        updatedSelectedStaff[selectedShift] = updatedSelectedStaff[selectedShift] ? [...updatedSelectedStaff[selectedShift], staffId] : [staffId];
      } else {
        updatedSelectedStaff[selectedShift] = updatedSelectedStaff[selectedShift].filter(id => id !== staffId);
      }
      return updatedSelectedStaff;
    });
  };

  const filteredStaff = staff.filter(member =>
    member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase())
    
  );

  return (
    <div className='flex w-3/4 ml-80'>
    <div className="container mx-auto mt-14">
      <h1 className="text-3xl font-bold mb-10 text-center text-slate-500">Assign Workers To Shift</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Shift</h2>
          <select value={selectedShift} onChange={handleShiftChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
            <option value="">Select Shift</option>
            {shifts.map(shift => (
              <option key={shift._id} value={shift._id}>{shift.shiftname}</option>
            ))}
          </select>
        </div>
        <div className="p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Staff</h2>
          <input
            type="text"
            placeholder="Search by Name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
          />
          <table className="table-auto border border-collapse border-gray-400 w-full">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(member => (
                <tr key={member._id} className="border border-gray-400 hover:bg-gray-100">
                  <td className="border border-gray-400 px-4 py-2">
                    <input
                      type="checkbox"
                      value={member._id}
                      checked={selectedStaffForShift[selectedShift]?.includes(member._id)}
                      onChange={handleStaffChange}
                      className="mr-2 cursor-pointer"
                    />
                    {member.username}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">{member.id}</td>
                  <td className="border border-gray-400 px-4 py-2">{member.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        {shifts.map(shift => (
          <div key={shift._id} className="bg-white rounded-md shadow-md p-6 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 te">{shift.shiftname}</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">ID</th>
                    <th className="py-2 px-4 border">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStaffForShift[shift._id] && selectedStaffForShift[shift._id].length > 0 ? (
                    selectedStaffForShift[shift._id].map(id => {
                      const selectedStaffMember = staff.find(member => member._id === id);
                      return (
                        <tr key={id}>
                          <td className="border px-4 py-2">{selectedStaffMember ? selectedStaffMember.username : 'Staff member not found'}</td>
                          <td className="border px-4 py-2">{selectedStaffMember ? selectedStaffMember.id : '-'}</td>
                          <td className="border px-4 py-2">{selectedStaffMember ? selectedStaffMember.type : '-'}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="border px-4 py-2" colSpan="3">No staff selected for this shift.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

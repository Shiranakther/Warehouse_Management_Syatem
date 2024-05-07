import { useState, useEffect } from 'react';

const AdminSuppliers = () => {
  const [pendingSuppliers, setPendingSuppliers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch pending suppliers data from the server
    const fetchPendingSuppliers = async () => {
      try {
        const res = await fetch('/api/admin/pending');
        if (!res.ok) {
          throw new Error('Failed to fetch pending suppliers');
        }
        const data = await res.json();
        setPendingSuppliers(data);
      } catch (error) {
        console.error('Error fetching pending suppliers:', error);
        setError('Failed to fetch pending suppliers. Please try again later.');
      }
    };

    fetchPendingSuppliers();
  }, []);

  const handleApprove = async (supplierId) => {
    try {
      // Find the selected supplier from pendingSuppliers array
      const selectedSupplier = pendingSuppliers.find(supplier => supplier._id === supplierId);
      
      // Send the selectedSupplier data to backend for approval
      const res = await fetch(`/api/auth/supplier_request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedSupplier),
      });
  
      if (!res.ok) {
        throw new Error('Failed to approve supplier');
      }
  
      console.log('Supplier approved:', supplierId);
  
      // Remove the approved supplier from the pendingSuppliers state
      setPendingSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier._id !== supplierId));
  
      // Delete the approved supplier from the database
      await fetch(`/api/auth/supplier_delete/${supplierId}`, {
        method: 'POST',
      });
  
      // You can also update the UI to remove the approved supplier from the list if needed
    } catch (error) {
      console.error('Error approving supplier:', error);
      setError('Failed to approve supplier. Please try again later.');
    }
  };
  
  return (
    <div className="flex ml-96"> 
      <div className="mt-32">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Pending Supplier Requests</h1>
        <table id="tableToPrint" className="w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Supplier Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone Number</th>
              <th className="py-2 px-4 border">Company Name</th>
              <th className="py-2 px-4 border">Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {pendingSuppliers.map((supplier, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-2 px-4 border">{supplier.supplierName}</td>
                <td className="py-2 px-4 border">{supplier.email}</td>
                <td className="py-2 px-4 border">{supplier.phoneNumber}</td>
                <td className="py-2 px-4 border">{supplier.companyName}</td>
                <td className="py-2 px-4 border"> {/* Actions column */}
                  <button onClick={() => handleApprove(supplier._id)} className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Approve</button>
                  <button onClick={() => handleReject(supplier._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSuppliers;

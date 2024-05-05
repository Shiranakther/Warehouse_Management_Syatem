import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SupplierDetails() {
  const [suppliers, setSuppliers] = useState([]);
  const [sitems, setSItems] = useState([]);

  useEffect(() => {
    fetchSuppliers();
    fetchSItems();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('/api/supplier/');
      setSuppliers(response.data.suppliers);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const fetchSItems = async () => {
    try {
      const response = await axios.get('/api/supplier/sitems');
      setSItems(response.data.sitems);
    } catch (error) {
      console.error('Error fetching SItems:', error);
    }
  };

  return (
    <div className='flex w-3/5 ml-96'>
    <div className="container mx-auto mt-6">
      {/* Table for Suppliers */}
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Suppliers</h1>
        <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
          {/* Table header */}
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Supplier Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone Number</th>
              <th className="py-2 px-4 border">Company Name</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-2 px-4 border">{supplier.supplierName}</td>
                <td className="py-2 px-4 border">{supplier.email}</td>
                <td className="py-2 px-4 border">{supplier.phoneNumber}</td>
                <td className="py-2 px-4 border">{supplier.companyName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table for SItems */}
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Supplier Item List</h1>
        <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
          {/* Table header */}
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Supplier Name</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Item Name</th>
              <th className="py-2 px-4 border">Unit Price</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {sitems.map((sitem, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-2 px-4 border">{sitem.supplierName}</td>
                <td className="py-2 px-4 border">{sitem.category}</td>
                <td className="py-2 px-4 border">{sitem.itemName}</td>
                <td className="py-2 px-4 border">{sitem.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

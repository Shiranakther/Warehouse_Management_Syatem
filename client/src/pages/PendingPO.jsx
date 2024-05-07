import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MdFormatUnderlined } from 'react-icons/md';

export default function PendingPO() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState(null); // Initialize with null
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();
  const aboutContentRef = useRef(null);

  useEffect(() => {
    handleShowListings();
  }, []);

  const formatDate = (date) => {
    const createdAtDate = new Date(date);
    return createdAtDate.toLocaleDateString();
  };

  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (!res.ok) { // Handle fetch errors
        throw new Error(data.message || 'Failed to fetch data');
      }
      setUserListings(data);
    } catch (error) {
      console.log(error.message);
      setUserListings([]); // Set empty array or handle error state accordingly
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      handleShowListings(); // Reset to original listings
    } else {
      const filteredListings = userListings.filter((listing) =>
        listing.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUserListings(filteredListings);
    }
  };

  const handleFilterByDate = () => {
    const filteredListings = userListings.filter((listing) => {
      const listingDate = new Date(listing.createdAt);
      return listingDate >= new Date(startDate) && listingDate <= new Date(endDate);
    });
    setUserListings(filteredListings);
  };

  
const handleListingDelete = async (listingId) => {
  try {
    const res = await fetch(`/api/listing/delete/${listingId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }

    setUserListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );
  } catch (error) {
    console.log(error.message);
  }
};



const handleListingApprove = async (listing) => {
  try {
    const res = await fetch('/api/approve-po', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listing),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to approve listing');
    }

    // After successful approval, remove the listing from the current list
    setUserListings(prevListings =>
      prevListings.filter(prevListing => prevListing._id !== listing._id)
    );

    // Delete the listing after approval
    handleListingDelete(listing._id);
  } catch (error) {
    console.log(error.message);
  }
};





  return (
    <div className="p-3 w-4/6 mx-auto ml-96  " ref={aboutContentRef}>
      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      {loading && <p>Loading...</p>}
      {userListings && (
        <div className="flex flex-col gap-4 mt-16   p-10  " >
          <h1 className="text-gray-700 font-roboto text-4xl mb-8">Pending Purchase Order Requests</h1>
          <div className="flex gap-4 mb-4 " >
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-blue-400 py-2 px-4 rounded-md"
            />
            <button onClick={handleSearch} className="text-white uppercase bg-blue-500 px-2 rounded-md  mr-10  text-sm">
              Search By Name
            </button>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-blue-400 py-2 px-4 rounded-md ml-6"
            />
             
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-blue-400 py-2 px-4 rounded-md"
            />
           
            <button onClick={handleFilterByDate} className="text-white uppercase bg-blue-500 px-2 rounded-md text-sm">
              Filter By Date
            </button>
          </div>
          <table id="tableToPrint" className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-white py-2 px-4">supplier Name</th>
                <th className="border border-white py-2 px-4">Item Name</th>
                <th className="border border-white py-2 px-4">Item Code</th>
                <th className="border border-white py-2 px-4">Order Quantity</th>
                <th className="border border-white py-2 px-4">Created Date</th>
                <th className="border border-white py-2 px-4">Last Update</th>
                <th className="border border-white py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
  {userListings.map((listing) => (
    <tr key={listing._id} className="border-b">
      <td className="py-2 px-4 border text-slate-800 font-semibold truncate flex-1 align-center">
        {listing.supplierName}
      </td>
      <td className="py-2 px-4 border text-slate-800 font-semibold truncate flex-1">
        {listing.itemName}
      </td>
      <td className="py-2 px-4 border text-slate-800 font-semibold truncate flex-1">
        {listing.itemCode}
      </td>
      <td className="py-2 px-4 border text-slate-800 font-semibold truncate flex-1">
        {listing.orderQuentity}
      </td>
      <td className="py-2 px-4 border text-slate-800 font-semibold truncate flex-1">
        {formatDate(listing.createdAt)}
      </td>
      <td className="py-2 px-4 border text-slate-800 font-semibold truncate flex-1">
        {formatDate(listing.updatedAt)}
      </td>
      <td className="py-2 px-4 border">
        <div className="flex flex-col item-center">
        <button className="bg-green-500 text-white uppercase rounded-md border-none mt-2 mb-2 p-2" onClick={() => handleListingApprove(listing)}>Approve</button>
        <button className="bg-red-500 text-white uppercase rounded-md border-none mt-2 mb-2 p-2" onClick={() => handleListingDelete(listing._id)}>Reject</button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

          </table>
          
        </div>
      )}
    </div>
  );
}

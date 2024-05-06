import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import Item from '../../../api/models/Item.model';

export default function LowInventoryReport() {
  const [AllItems,getAllItems] = useState([]);
  const [search, setSearch] = useState(''); //a save state for search bar
  const [loading, setLoading] = useState(false); //a save state for loading status
  const [error,setError] = useState(false); //a save state for an error mostly for fetching
  const [input, setInput] = useState(''); //a save state for input data

  //fetching all the item data from api
  //useEffect is a hook that runs after the first render and every update
  useEffect(() => {
  fetchItems(); //running async function to fetch data from api
}, []);

const fetchItems = async () => {
  try{
  setError(false);  //trying unless error occurs, set the error status to false
  setLoading(true); //loding while fetching data form api

  //fetching related data from the api
  const response = await fetch('/api/Item/getitem',
  {method:'post',headers:{'Content-Type':'application/json'}, //a workaround for api and client loading into two different ports by a proxy
  body:JSON.stringify(AllItems)});
  
  //turns fetched data to json
  const itemData = await response.json();//turns fetched data to json
  getAllItems(itemData); // assing json data to a state
  setLoading(false);   //ends loading state onece the fetching done
}catch(error){
  setError(true); //if an error occurs set error true
}};



//searching items by ItemID
const searchItems = AllItems.filter((item) => 
  item.ItemID.toLowerCase().includes(search.toLowerCase()));

//a function to handle search through setting the search data to states
const handleSearch = (e) => {
  e.preventDefault();
  fetchItems(searchItems);
  renderItems(searchItems);
}

//generating a pdf report on all avalable items
function generatePDF(item) {
  const doc = new jsPDF();

  // Add header border
  doc.setDrawColor(0); // Set border color to black
  doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, 40); // Draw header border with increased height

  // Add header content
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 255); // Set color to blue
  doc.text('Chaminda Stores', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(130,130,130);
  doc.text('No 125 Mapatana Horana', doc.internal.pageSize.getWidth() / 2, 27, { align: 'center' });
  doc.text('TP - 0756175658', doc.internal.pageSize.getWidth() / 2, 34, { align: 'center' });

  // Calculate space needed for date and time text
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
  const formattedTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'UTC' });
  const dateTimeText = 'Date: ' + formattedDate + ' Time: ' + formattedTime;
  const textWidth = doc.getStringUnitWidth(dateTimeText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const availableWidth = doc.internal.pageSize.getWidth() - 20; // Subtracting 20 to provide padding
  const xPos = 78;
  const yPos = 40; // Adjust as needed

  // Add current date and time
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0); // Set color to black
  doc.text(dateTimeText, xPos, yPos, { align: 'left' }); // Adjust the position as needed

  // Add document border
  doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10); // Draw document border

  // Add title with underline
  doc.setFontSize(16);
  doc.setDrawColor(0); // Set underline color to black
  doc.textWithLink('Item Report', doc.internal.pageSize.getWidth() / 2, 60, { align: 'center', url: 'javascript:void(0)', underline: true }); // Adjust the vertical position


  doc.setFontSize(10);
  doc.setTextColor(255, 0, 0); // Set color to red
  doc.text('*****Keep this report Confidential*****', doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 15, { align: 'center' });

  
  // Generate table data
  const tableCol = ["ItemID", "ItemType", "ItemNoOfUints", "curruntlevel"];
  const tableRow = [];

  item.forEach(item => {
      const itemData = [
          item.ItemID,
          item.ItemDiscription,
          item.ItemType,
          item.ItemNoOfUints
      ];
      tableRow.push(itemData);
  });

  // Add the table
  doc.autoTable(tableCol, tableRow, { startY: 70 });

  // Save PDF
  doc.save("report.pdf");
}


//rendering all the items from the api
const renderItems = (data) => {
    return (
      <div className='p-3 w-5/6  mx-auto me-96 '>
        <table className=' w-full border-collapse '>
          <thead>
          <tr className=' bg-gray-200 text-gray-700'>
            <th className='border border-gray-400 py-2 px-4'>ItemID</th>
            <th className='border border-gray-400 py-2 px-4'>Item Type</th>
            <th className='border border-gray-400 py-2 px-4'>No of Units</th>
            <th className='border border-gray-400 py-2 px-4'>Inventory level</th>

            <th className='border border-gray-400 py-2 px-4'>Added Date</th>
            <th className='border border-gray-400 py-2 px-4'>Updated Date</th>
            <th className='border border-gray-400 py-2 px-4'>Action</th>
            </tr>
          </thead>
          <tbody >
          {data.map((item) => (
  // Add a condition to render rows only when the number of units is lower than the current level
  item.ItemNoOfUints < item.curruntlevel && (
    <tr key={item.ItemID} className=' border-b '>
      <td className='py-2 px-4 border' id='iid'>{item.ItemID}</td>
      <td className='py-2 px-4 border' id='itype'>{item.ItemType}</td>
      <td className='py-2 px-4 border' id='noofunits'>{item.ItemNoOfUints}</td>
      <td className='py-2 px-4 border' id='noofunits'>{item.curruntlevel}</td>
      <td className='py-2 px-4 border'>{new Date(item.createdAt).toDateString()}</td>
      <td className='py-2 px-4 border'>{new Date(item.updatedAt).toDateString()}</td>
      <td  className='py-2 px-4 border '>
        <div className='flex flex-col item-center'>
        <Link to={`/lowInventory_Update/${item.ItemID}`}><button className='text-green-700 uppercase'>Edit</button></Link>
        </div>
        
      </td>
      
    </tr>
  )
))}

        </tbody>
        </table>
      </div>
    );
  
    };

  //returning the main component of Item_main
  return (
    
    <div className='w-3/4 ml-96 pt-10  '>
      <h1 className='text-gray-700 font-roboto text-4xl mb-8 mt-16 pl-2 '>
               Low Inventory Items
             </h1>
      <div className='flex justify-between p-0'>
      
      <div className=' ml-3 flex justify-between gap-5 items-center pt-5 pb-5'>
      
      <form onSubmit={handleSearch}>
      <input className='w-80 h-12 rounded-md outline outline-2 outline-black  hover:outline-slate-600 pl-10' 
      type='string'  placeholder='Search Items By Id  ' value= {input} 
      onChange={e=>
        {setInput(e.target.value);
          setSearch(e.target.value)}} 
          
          />
         
      </form>
      
     
      
      </div>
      </div>
      
      <div className=''>
        <div className='flex flex-col gap-4'>
          {loading?'Loading....':renderItems(AllItems)&&renderItems(searchItems)}
          {searchItems.length === 0 && <p className='text-red-700'>No Low Inventory Items Found</p>}
          <p className='text-red-700'>{error && 'An Error Occured! Please try again'}</p>
          </div>
      </div>
      <button className='w-64 h-12 ml-3 bg-blue-600 rounded-md  text-white  hover:bg-slate-700' onClick={() => generatePDF(AllItems)}>Genarate Low Inventory Report</button>
    </div>
  )
}

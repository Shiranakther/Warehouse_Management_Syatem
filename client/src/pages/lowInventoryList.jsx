import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import Item from '../../../api/models/Item.model';

export default function Item_main() {
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
function generatePDF(item){
  const doc = new jsPDF();
  const tableCol = ["ItemID","ItemType","ItemNoOfUints","curruntlevel"];
  const tableRow = [];

  item.forEach(item=>{
    const itemData = [
      item.ItemID,
      item.ItemDiscription,
      item.ItemType,
      item.ItemNoOfUints
    ];
    tableRow.push(itemData);
  });

  doc.autoTable(tableCol,tableRow,{startY:20});
  doc.text("Item Report",14,15);
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
      type='string' placeholder='Search Items by ItemID' value= {input} 
      onChange={e=>
        {setInput(e.target.value);
          setSearch(e.target.value)}} />
      </form>
      
     
      <Link to='/Item_add'>
      <button className='w-20 h-100 bg-blue-600 rounded-md p-3  text-white  hover:bg-slate-700' >New+</button>
      </Link>
      </div>
      </div>
      
      <div className=''>
        <div className='flex flex-col gap-4'>
          {loading?'Loading....':renderItems(AllItems)&&renderItems(searchItems)}
          {searchItems.length === 0 && <p className='text-red-700'>No Low InventoryItems Found</p>}
          <p className='text-red-700'>{error && 'An Error Occured! Please try again'}</p>
          </div>
      </div>
      <button className='w-64 h-12 ml-3 bg-blue-600 rounded-md  text-white  hover:bg-slate-700' onClick={() => generatePDF(AllItems)}>Genarate Low Inventory Report</button>
    </div>
  )
}

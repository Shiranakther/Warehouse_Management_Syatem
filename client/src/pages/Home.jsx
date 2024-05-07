// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import SwiperCore from 'swiper';
// import 'swiper/css/bundle';
// import ListingItem from '../components/POItem';

// export default function Home({ userType }) {
  
//   console.log("home User type selected:", userType);
  
//   return (
//     <div>
//       {/* top */}
//       <div className='flex flex-row gap-6 p-28 px-3 max-w-6xl mx-auto me-2 bg-red-300 justify-center'>
//         <h1 className='text-gray-700 font-roboto text-6xl'>
//         Chaminda stores
//         </h1>
//         <br/>
       
        
        
        
//       </div>

      

//       {/* listing results for offer, sale and rent */}

      
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import Item from '../../../api/models/Item.model';

export default function Home(userType) {

  console.log("home User type selected:", userType);
  
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


const itemCount = AllItems.length;
const totalUnitsCount = AllItems.reduce((total, item) => total + item.ItemNoOfUints, 0);
//rendering all the items from the api
const renderItems = (data) => {
    return (
      <div className='w-full '>
        
        
      </div>
    );
    };

  //returning the main component of Item_main
  return (
    <div className=' p-28 px-3 max-w-6xl mx-auto me-2 pt-18 pb-20 '>
      <div className='w-full  '>
      <h1 className='text-blue-600 font-roboto text-6xl w-full ml-72 mb-12'>
        Chaminda stores
         </h1>

         <div className='w-3/6 bg-blue-500 flex flx-row justify-center h-20  pt-6 mb-6 rounded-xl ml-56 mt-20'>
       <p className='text-3xl text-white'>Total Item Count: {itemCount}</p>
       </div>
       <div className='w-3/6 bg-blue-900 flex flx-row justify-center h-20  pt-6 rounded-xl ml-56 mt-12'>
       <p className='text-3xl text-white'>Stock In Hand :   {totalUnitsCount}</p>

       </div>
       
      </div>
        
       
        
<div className='p-10 ml-72 justify-between'>

      
<div className=' '>
  <div className=''>
    {loading?'Loading....':renderItems(AllItems)&&renderItems(searchItems)}
    {searchItems.length === 0 && <p className='text-red-700'>No Items Found</p>}
    <p className='text-red-700'>{error && 'An Error Occured! Please try again'}</p>
    </div>
</div>
</div>
        
      </div>
    
    
  )
}
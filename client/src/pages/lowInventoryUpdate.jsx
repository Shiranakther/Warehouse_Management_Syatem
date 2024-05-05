import React ,{useState,useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom';

function LowInventoryUpdate(){
  const [item,setItem] = useState({
    ItemID:'',
    ItemType:'',
    ItemDiscription:'',
    NoOfUnits:'',
    curruntlevel:'',

  });
  
  const {ItemID} = useParams();
  const navigate = useNavigate();

   const fetchItems = async () => {
    await fetch(`/api/Item/getitem/${ItemID}`,{
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },body:JSON.stringify({item})
  })
  .then(res => res.json())
  .then(data => setItem(data))
  .then(err => console.log(err));
}

  useEffect(() => {
    fetchItems();

  },[ItemID]);

  const handleUpdate = (e) => {
    const {name,value} = e.target;
    setItem(prevItem => (
      {
        ...prevItem,
        [name]:value
      }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/Item/Item_update/${ItemID}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    })
    .then(res=>res.json())
    .then(() => navigate('/lowInventory'))
    .catch(err => console.log(err));
  }
  console.log(item);
  console.log(ItemID);
  return (
    <div className='p-5 ml-72 justify-between w-full'>
      <div className=' flex justify-between p-8'>
      <div className=' rounded-xl p-10 w-4/6'>
        <h1 className='text-gray-700 font-roboto text-4xl mb-8 mt-0 pl-2-semibold text-3xl'>Update Low Inventory Level</h1>

        <form className='items-start justify-normal p-3 ' onSubmit={handleSubmit}>
          <div className='flex flex-row justify-between w-full mb-5'>
            <div className='w-36 flex flex-row'>
            ItemID
            </div>
          <input className='border w-full rounded-md p-3 text-center ml-20' type="text" value={item.ItemID} onChange={handleUpdate} readOnly/> 

          </div>

          <div className='flex flex-row justify-between w-full mb-5'>
          <div className='w-36 flex flex-row'>
          Item Type
                      </div>
          <input className=' border w-full rounded-md p-3 text-center ml-20' type="text" name='ItemType' value={item.ItemType} onChange={handleUpdate} /> 

          </div>
     
          <div className='flex flex-row justify-between w-full mb-5'>
          <div className='w-36 flex flex-row'>
          No. of Units         
          </div>
          <input className='border w-full rounded-md p-3 text-center ml-20' type="number" name='ItemNoOfUints' value={item.ItemNoOfUints} onChange={handleUpdate}/> 

          </div>
          <div className='flex flex-row justify-between w-full mb-5'>
          <div className='w-36 flex flex-row'>
          curruntlevel                      </div>
          <input className='border w-full rounded-md p-3 text-center ml-20' type="number" name='curruntlevel' value={item.curruntlevel}   /> 

          </div>

          <div className='flex flex-row justify-between w-full mb-5'>
          <div className='w-36 flex flex-row'>
          New Level 
             </div>
          <input className='border w-full rounded-md p-3 text-center ml-20' type="number" name='curruntlevel'  onChange={handleUpdate}/> 

          </div>







      <div className='w-full flex flex-row justify-between me-0' >
      <button className='w-64 bg-green-600 rounded-md p-3 my-3 text-white' type='submit'>Update Level</button>
       <button className='w-64 bg-blue-600 rounded-md p-3 my-3 text-white' type='reset'>Reset Level</button>
      </div>
      
     </form>
    </div>
  </div></div>
  );
}

export default LowInventoryUpdate;


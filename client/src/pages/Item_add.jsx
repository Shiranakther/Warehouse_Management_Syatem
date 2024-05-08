import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

export default function Item_add() {
  //a save state for the form data
  const [addItemData, setAddItemData] = useState({});
  const [error,setError] = useState(false); //a save state for an error mostly for fetching
  const [loading, setLoading] = useState(false); //a save state for loading status
  const [success, setSuccess] = useState(false); //a save state for errorless status



  // useEffect(() => {
  //   fetchItems(); //running async function to fetch data from api
  // }, []);
  
  // const fetchItems = async () => {
  //   try{
  //   setError(false);  //trying unless error occurs, set the error status to false
  //   setLoading(true); //loding while fetching data form api
  
  //   //fetching related data from the api
  //   const response = await fetch('/api/Item/getitem',
  //   {method:'post',headers:{'Content-Type':'application/json'}, //a workaround for api and client loading into two different ports by a proxy
  //   body:JSON.stringify(AllItems)});
    
  //   //turns fetched data to json
  //   const itemData = await response.json();//turns fetched data to json
  //   getAllItems(itemData); // assing json data to a state
  //   setLoading(false);   //ends loading state onece the fetching done
  // }catch(error){
  //   setError(true); //if an error occurs set error true
  // }};

  
  //fetching the data from the form via handelchange function
  const handleChange = (e) => {
    setAddItemData({ ...addItemData, [e.target.id]: e.target.value });
  };
  //handle submit function. this function should wait and fetching the data from the form,hence async
  // const handleSubmit = async (e) => {
  //   e.preventDefault(); //preventing the default action of the form
    
  //   try{
  //     setLoading(true);
  //     setError(false); //setting the error status to null afther sending the data
  //     const res = await fetch("/api/Item", 
  //     {method:'post',headers:{'Content-Type':'application/json'}, //a workaround for api and client loading into two different ports by a proxy
  //     body:JSON.stringify(addItemData)}) //fetching the data from the api
    
  //     const data = await res.json(); //converting the data into json format
  //     setLoading(false); //setting the loading status to false after sending the data
  //     setSuccess(true); //setting the success status to true after sending the data
  //     //sometimes try catch is ignored by the browser, so we need to check if the data is sent or not for further actions
  //     if(data.success==false) {
  //       setError(true);
  //       return;} //setting the error status to true if the data is not sent 
      
  // } catch(error){
  //   setLoading(false); //setting the loading status to false after error
  //   setError(true); //setting the error status to error after error
  // }};
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing the default action of the form
    
    try {
      setLoading(true);
      setError(false); // Resetting error status to false before sending the data
      const res = await fetch("/api/Item", {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addItemData)
      });
      
      const data = await res.json();
      setLoading(false); // Setting the loading status to false after sending the data
  
      // Checking if the data was successfully sent
      if (data.success === false) {
        setError(true);
        setSuccess(false); // Setting success to false if there's an error
        return;
      }
  
      setSuccess(true); // Setting success to true if the data was sent successfully
    } catch (error) {
      setLoading(false); // Setting the loading status to false after error
      setError(true); // Setting the error status to true after error
      setSuccess(false); // Setting success to false if there's an error
    }
  };
  

  return (
    <div className='bg-sky-900 ml-72' style={{padding:50,alignItems:'center'}}>
      <div className='bg-slate-200 rounded-xl p-10 mt-10'>
        <h1 className='font-semibold text-3xl'><Link to={'/'} >Item Management</Link>/Add Item</h1>
        <form onSubmit={handleSubmit} className='items-start justify-normal p-3'>

        ItemID<input className='w-full rounded-md p-3 text-center' 
        type="text" 
        placeholder='ItemID - Ex: A1234' 
        id='ItemID' onChange={handleChange} required pattern="[A-Z]\d{4}"/> 

        Item Name<input className='w-full rounded-md p-3 text-center' 
        type="text" 
        placeholder='Item Name' 
        id='ItemType' onChange={handleChange}/> 
        Supplier Name<input className='w-full rounded-md p-3 text-center' 
        type="text" 
        placeholder='Supplier Name' 
        id='supplierName' onChange={handleChange}/> 

        Item Desription<input className='w-full rounded-md p-3 text-center'
        type="text" 
        placeholder='description' 
        id='ItemDiscription' onChange={handleChange} required/>

        No. of Units<input className='w-full rounded-md p-3 text-center'
        type="number" 
        placeholder='No. of Units' 
        id='ItemNoOfUints' onChange={handleChange} required/> 

       
        
        Add Low Inventory Level<input className='w-full rounded-md p-3 text-center'
        type="number" 
        placeholder='Add Inventory Level' 
        id='curruntlevel' onChange={handleChange} required/> 

        

        <button className='w-full bg-red-600 rounded-md p-3 my-3 text-white'>{loading?'Adding Item...':'Add Item'}</button>
        <button type='reset' className='w-full bg-blue-600 rounded-md p-3  text-white'>Reset</button>
        </form>
        <p className='text-red-700 mt-5 font-semibold align-middle'>{error && 'An Error Occured! Please try again'}{success && 'The Item added Successfully'}</p>
      </div>
      
    </div>

  )
}


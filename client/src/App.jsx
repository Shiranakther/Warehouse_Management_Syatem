
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreatePO from './pages/CreatePO';
import UpdatePO from './pages/UpdatePO';
import Display from './pages/Display';
import UpdateLowInventory from './pages/UpdateLowInventory';
import CreateLowInventory from './pages/CreateLowInventory';
import DisplayLowInventory from './pages/DisplayLowInventory';
import POReport from './pages/POReport';
import Dashboard from './components/Dashboard';
import CurruntPO from './pages/CurruntPO';
import Item_main from './pages/Item_main';
import Item_add from './pages/Item_add';

import Item_Update from './pages/Item_Update';
import CreateSalesOrder from './pages/createSalesOrder';
import SelesOrders from './pages/SalesOrders';
import UpdatePendingSelesOrders from './pages/UpdatePendingSelesOrders';

import ShippingMNG from './pages/ShippingMNG';
import VehicleMNG from './pages/vehicleList';
import ShippingList from './pages/shippingList';
import Updatevehicle from './pages/updatevehicle';
import UpdateShipping from './pages/updateShipping';


import AddVehicles from './pages/AddVehicles';
import AddShipping from './pages/AddShipping';
import EnterReturnItems from './pages/EnterReturnItems';
import UplodeReturnItems from './pages/UplodeReturnItems';
import ViewreturnItemsDetails from './pages/ViewreturnItemsDetails';
import EnterWastageItem from './pages/EnterWastageItem';
import UplodeWastageItems from './pages/UplodeWastageItems';
import ViewWastageItem from './pages/ViewWastageItem';
import AddLostItem from './pages/add_lost_item';
import Lostitemlist from './pages/lost_item_list';
import EditItemPage from './pages/edit_lost_item';
import Addmaintance from './pages/add_maintance_task';
import MaintenanceList from './pages/MaintenanceListPage';
import Addworkers from './pages/Addworkers';
import Workerlist from './pages/Workerlist';
import Addshift from './pages/Addshift';
import Shiftlist from './pages/Shiftlist';
import Login from './pages/login';
import Staffmanagement from './pages/Staffmanagement';
import Updatestaff from './pages/Updatestaff';
import Updateshift from './pages/Updateshift';
import AssignWorkerToShift from './pages/AssignWorkerToShift';
import WorkersAssignList from './pages/WorkersAssignList';
import React, { useState } from 'react';
import VehicleList from './pages/vehicleList';



export default function App() {
  const [userType, setUserType] = useState(null);
  return (
    <BrowserRouter>
  
      <ToastContainer />
      <Routes>
        
      <Route path='/sign-in' element={<SignIn UserType={setUserType} />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute userType={userType} />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/display' element={<Display />} /> 
          <Route path='/displaylowinventory' element={<DisplayLowInventory />} />
          <Route path='/create-po' element={<CreatePO />} />
          <Route path='/createlowinventoy' element={<CreateLowInventory />} />
          <Route path='/po-report' element={<POReport />} />
          <Route path='/listing/:listingId' element={<CurruntPO />} />
          <Route path='/Item_main' element={<Item_main />} />
          <Route path='/Item_add' element={<Item_add />} />
          <Route path='/Item_Update/:ItemID' element={<Item_Update/>} />
          <Route path="/Create-Sales-Order" element={<CreateSalesOrder />} />
          <Route path="/sales-orders" element={<SelesOrders />} />
          <Route path="/update-pending-orders/:id" element={<UpdatePendingSelesOrders />} />
          <Route path='/shippingmng' element={<ShippingMNG />} />
          <Route path='/shippings' element={<ShippingMNG />} />
          <Route path='/addShipping' element={<AddShipping />} />
          <Route path="/return" element={<EnterReturnItems />} />
          <Route path="/UplodeReturnItems/:id" element={<UplodeReturnItems />} />
          <Route path="/ViewreturnItemsDetails" element={<ViewreturnItemsDetails />} />
          <Route path="/EnterWastageItem" element={<EnterWastageItem />} />
          <Route path="/UplodeWastageItems/:id" element={<UplodeWastageItems />} />
          <Route path="/ViewWastageItem" element={<ViewWastageItem />} />
          <Route path='/addVehicles' element={<AddVehicles />} />
          <Route path='/vehicles' element={<VehicleMNG />} />
          <Route path='/update-po/:listingId' element={<UpdatePO />} />
          <Route path='/update-lowinventory/:updateLowInventoryId' element={<UpdateLowInventory />} />
        
        <Route path="/add_lost_item" element={<AddLostItem />} />
        <Route path="/lost_item_list" element={<Lostitemlist />} />
        <Route path='/edit_lost_item/:id' element={<EditItemPage />} />
        <Route path='/add_maintance_task' element={<Addmaintance />} />
        <Route path='/MaintenanceListPage' element={<MaintenanceList />} />
        <Route path="/Staffmanagement" element={<Staffmanagement />} />
        <Route path="/Addworkers" element={<Addworkers />} />
        <Route path="/Workerlist" element={<Workerlist />} />
        <Route path="/Updatestaff/:staffId" element={<Updatestaff />} />
        <Route path="/Updateshift/:shiftId" element={<Updateshift />} />
        <Route path="/Addshift" element={<Addshift />} />
        <Route path="/Shiftlist" element={<Shiftlist />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AssignWorkerToShift" element={<AssignWorkerToShift />} />
        <Route path="/WorkersAssignList" element={<WorkersAssignList />} />



        <Route path="/AddVehicles" element={<AddVehicles />} />
        <Route path="/AddShipping" element={<AddShipping />} />
        <Route path="/vehicleList" element={<VehicleList />} />
        <Route path="/shippingList" element={<ShippingList />} />
        <Route path="/updatevehicle/:vehicleId" element={<Updatevehicle />} />
        <Route path="/updateShipping/:shippingId" element={<UpdateShipping />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

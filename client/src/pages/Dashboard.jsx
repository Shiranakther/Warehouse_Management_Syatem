import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <>
            <div className="dashboard-container bg-gray-900 w-72 h-screen fixed left-0">
                <div className="shopName flex items-center justify-center bg-gray-800 h-15 pt-1 pb-1  ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="40" viewBox="0 0 54 51" fill="none">
                        
                    </svg>
                    <div className="shopName-name text-white text-lg  font-bold ml-8">
                        Chaminda WMS
                    </div>
                </div>
                <div className="navigation-button-bar flex flex-col items-center mt-8">


                    <a className="w-60 cursor-pointer bg-blue-500 flex items-center justify-start px-4 py-2 rounded-xl mt-3" onClick={() => {navigate("")}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 30 32" fill="none">
                        </svg>
                        <div className="font-normal text-base w-48 text-white font-sans ml-10 flex justify-start">
                            Dashboard
                        </div>
                    </a>

                    <a onClick={() => {navigate("/shippings")}} className="w-60 bg-blue-500 flex items-center justify-start px-4 py-2 rounded-xl mt-3 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 30 32" fill="none">
                        </svg>
                        <div className="font-normal text-base w-48 text-white font-sans ml-10 flex justify-start">
                            Shipping MNG
                        </div>
                    </a>
                    <a onClick={() => {navigate("/addShipping")}} className="w-60 bg-blue-500 flex items-center justify-start px-4 py-2 rounded-xl mt-3 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 30 32" fill="none">
                            
                        </svg>
                        <div className="font-normal text-base w-48 text-white font-sans ml-10 flex justify-start">
                            Add Shiping Details
                        </div>
                    </a>
                    <a onClick={() => {navigate("/vehicles")}} className="w-60 bg-blue-500 flex items-center justify-start px-4 py-2 rounded-xl mt-3 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 30 32" fill="none">
                        </svg>
                        <div className="font-normal text-base w-48 text-white font-sans ml-10 flex justify-start">
                            Vehicle MNG
                        </div>
                    </a>
                    <a onClick={() => {navigate("/addVehicles")}} className="w-60 bg-blue-500 flex items-center justify-start px-4 py-2 rounded-xl mt-3 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 30 32" fill="none">
                        </svg>
                        <div className="font-normal text-base w-48 text-white font-sans ml-10 flex justify-start">
                            Add Vehicles
                        </div>
                    </a>
                </div>
            </div>
            <div className="fixed w-2/3 right-10 ">
                <Outlet />
            </div>
        </>

    );
}
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserType } from '../redux/access/accessSlice';

export default function Dashboard() 
  {
    const userType = useSelector(selectUserType);
  console.log("User type received in Dashboard:", userType);
    const { currentUser } = useSelector((state) => state.user);

    const [showInventoryLinks, setShowInventoryLinks] = useState(false);
    const [showPurchasesLinks, setShowPurchasesLinks] = useState(false);
    const [showReportLinks, setShowReportLinks] = useState(false);
    const [showOperationLinks, setShowOperationLinks] = useState(false);
    const [showStaffLinks, setShowStaffLinks] = useState(false);
    const [showShippingLinks, setshowShippingLinks] = useState(false);
  
    const handleInventoryButtonClick = () => {
      setShowInventoryLinks(!showInventoryLinks); // Toggle the state of showInventoryLinks
      // Hide other link sections when Inventory button is clicked
      setShowPurchasesLinks(false);
      setShowReportLinks(false);
      setShowOperationLinks(false);
      
    };
  
    const handlePurchasesButtonClick = () => {
      setShowPurchasesLinks(!showPurchasesLinks); // Toggle the state of showPurchasesLinks
      // Hide other link sections when Purchases button is clicked
      setShowInventoryLinks(false);
      setShowReportLinks(false);
      setShowOperationLinks(false);
    };
  
    const handleReportButtonClick = () => {
      setShowReportLinks(!showReportLinks); // Toggle the state of showReportLinks
      // Hide other link sections when Reports button is clicked
      setShowInventoryLinks(false);
      setShowPurchasesLinks(false);
      setShowOperationLinks(false);
    };
  
    const handleOperationButtonClick = () => {
      setShowOperationLinks(!showOperationLinks); // Toggle the state of showOperationLinks
      // Hide other link sections when Operations button is clicked
      setShowInventoryLinks(false);
      setShowPurchasesLinks(false);
      setShowReportLinks(false);
    };

    const handleStaffButtonClick = () => {
      setShowStaffLinks(!showStaffLinks); // Toggle the state of showOperationLinks
      // Hide other link sections when Operations button is clicked
      setShowInventoryLinks(false);
      setShowPurchasesLinks(false);
      setShowReportLinks(false);
    };

    const handleShippingButtonClick = () => {
      setshowShippingLinks(!showShippingLinks); // Toggle the state of showOperationLinks
      // Hide other link sections when Operations button is clicked
      setShowInventoryLinks(false);
      setShowPurchasesLinks(false);
      setShowReportLinks(false);
    };

  const [isRotated1, setIsRotated1] = useState(false);
  const [isRotated2, setIsRotated2] = useState(false);
  const [isRotated3, setIsRotated3] = useState(false);
  const [isRotated4, setIsRotated4] = useState(false);
  const [isRotated5, setIsRotated5] = useState(false);
  const [isRotated6, setIsRotated6] = useState(false);

  const handleRotate1 = () => {
    setIsRotated1(!isRotated1);
  };

  const handleRotate2 = () => {
    setIsRotated2(!isRotated2);
  };

  const handleRotate3 = () => {
    setIsRotated3(!isRotated3);
  };

  const handleRotate4 = () => {
    setIsRotated4(!isRotated4);
  };

  const handleRotate5 = () => {
    setIsRotated5(!isRotated5);
  };

  const handleRotate6 = () => {
    setIsRotated6(!isRotated6);
  };

  const handleBothClicks1 = () => {
    handleRotate1();
    handleInventoryButtonClick();
  };
  const handleBothClicks2 = () => {
    handleRotate2();
    handlePurchasesButtonClick();
  };
  const handleBothClicks3 = () => {
    handleRotate3();
    handleReportButtonClick();
  };
  const handleBothClicks4 = () => {
    handleRotate4();
    handleOperationButtonClick();
  };
  const handleBothClicks5 = () => {
    handleRotate5();
    handleStaffButtonClick();
  };
  const handleBothClicks6 = () => {
    handleRotate6();
    handleShippingButtonClick();
  };
    return (

        <div className="dashboard-container bg-gray-900 w-72 h-screen fixed left-0 ">
        <div className="shopName flex items-center justify-center bg-gray-800 h-15  pb-1 pt-4  ">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="35" height="40" viewBox="0 0 54 51" fill="none">
    <path d="M19.5 42.5658C18.61 42.5658 17.74 42.7964 16.9999 43.2284C16.2599 43.6605 15.6831 44.2746 15.3425 44.993C15.0019 45.7115 14.9128 46.5021 15.0865 47.2648C15.2601 48.0275 15.6887 48.7281 16.318 49.278C16.9474 49.8279 17.7492 50.2024 18.6221 50.3541C19.495 50.5059 20.3998 50.428 21.2221 50.1304C22.0443 49.8328 22.7471 49.3288 23.2416 48.6822C23.7361 48.0356 24 47.2754 24 46.4977C24 45.4549 23.5259 44.4548 22.682 43.7174C21.8381 42.98 20.6935 42.5658 19.5 42.5658ZM51 34.7019H15C14.2044 34.7019 13.4413 34.4257 12.8787 33.9341C12.3161 33.4425 12 32.7758 12 32.0806C12 31.3854 12.3161 30.7186 12.8787 30.2271C13.4413 29.7355 14.2044 29.4593 15 29.4593H40.4736C42.4279 29.4538 44.3275 28.8951 45.8878 27.8668C47.448 26.8386 48.5849 25.3962 49.128 23.7559L53.8843 9.20949C54.0119 8.81937 54.0341 8.40869 53.9492 8.00979C53.8643 7.61089 53.6746 7.23465 53.395 6.9107C53.1154 6.58674 52.7536 6.32392 52.338 6.14291C51.9224 5.96191 51.4644 5.86766 51 5.8676H14.2172C13.5962 4.34032 12.4513 3.01749 10.9387 2.07933C9.42602 1.14118 7.61912 0.633338 5.76417 0.625H3C2.20435 0.625 1.44129 0.901172 0.87868 1.39276C0.31607 1.88435 0 2.55109 0 3.2463C0 3.94151 0.31607 4.60825 0.87868 5.09984C1.44129 5.59143 2.20435 5.8676 3 5.8676H5.76417C6.41542 5.86959 7.04841 6.05585 7.56836 6.39849C8.08831 6.74114 8.46725 7.22173 8.64843 7.7683L9.11499 9.19623L9.11571 9.20949L14.0376 24.2615C11.7473 24.4768 9.63862 25.4512 8.1458 26.9841C6.65297 28.517 5.88964 30.4916 6.01298 32.5015C6.13632 34.5114 7.13693 36.4034 8.80879 37.788C10.4806 39.1726 12.6965 39.9444 15 39.9445H51C51.7957 39.9445 52.5587 39.6683 53.1213 39.1767C53.6839 38.6851 54 38.0184 54 37.3232C54 36.628 53.6839 35.9612 53.1213 35.4697C52.5587 34.9781 51.7957 34.7019 51 34.7019ZM47.023 11.1102L43.3594 22.3147C43.1784 22.8617 42.7993 23.3428 42.2791 23.6857C41.7588 24.0286 41.1253 24.2149 40.4736 24.2167H20.2632L19.4983 21.8779L15.9793 11.1102H47.023ZM43.5 42.5658C42.61 42.5658 41.74 42.7964 40.9999 43.2284C40.2599 43.6605 39.6831 44.2746 39.3425 44.993C39.0019 45.7115 38.9128 46.5021 39.0865 47.2648C39.2601 48.0275 39.6887 48.7281 40.318 49.278C40.9474 49.8279 41.7492 50.2024 42.6221 50.3541C43.495 50.5059 44.3998 50.428 45.2221 50.1304C46.0443 49.8328 46.7471 49.3288 47.2416 48.6822C47.7361 48.0356 48 47.2754 48 46.4977C48 45.4549 47.5259 44.4548 46.682 43.7174C45.8381 42.98 44.6935 42.5658 43.5 42.5658Z" fill="white"/>
            </svg> */}
            <div className="shopName-name text-white text-lg  font-bold ml-8">
                Chaminda WMS
            </div>
        </div>
        <div className="navigation-button-bar flex flex-col items-center mt-8">
             
        {userType === 'user' && (
                    <Link to='/'>
                        <button
                            className="w-60 bg-blue-500 flex items-center justify-start px-4 py-2 rounded-xl mt-3"
                        >
                            {/* Icon */}
                            <div className="font-normal text-base w-48 text-white font-sans ml-10 flex justify-start">
                                Home
                            </div>
                        </button>
                    </Link>
                )} 
            <div>
            <button className=" w-60 flex items-center justify-start px-4 py-2 rounded-xl mt-3 hover:bg-blue-400 " onClick={handleBothClicks1}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 30 32" fill="none" >
            <path d="M30.564 22.3379C30.5603 21.3425 30.2508 20.3711 29.6757 19.5493C29.1005 18.7275 28.2861 18.0931 27.3378 17.7281L30.5131 6.12069C30.5794 5.87348 30.5864 5.61465 30.5333 5.3644C30.4803 5.11415 30.3688 4.87925 30.2075 4.67805C30.0425 4.48952 29.8364 4.33951 29.6042 4.23907C29.3721 4.13863 29.1198 4.09031 28.866 4.09768H5.60341L5.04307 2.00834C4.94564 1.65499 4.73127 1.34304 4.43336 1.12109C4.13544 0.899141 3.77071 0.77966 3.396 0.781266H0V4.09768H2.08854L6.29959 19.4527C6.39909 19.8144 6.62109 20.1326 6.92942 20.3554C7.23775 20.5782 7.61424 20.6926 7.99759 20.6797H25.47C25.9204 20.6797 26.3523 20.8544 26.6707 21.1654C26.9891 21.4764 27.168 21.8981 27.168 22.3379C27.168 22.7777 26.9891 23.1995 26.6707 23.5105C26.3523 23.8214 25.9204 23.9961 25.47 23.9961H3.396C2.94567 23.9961 2.51377 24.1708 2.19534 24.4818C1.8769 24.7928 1.698 25.2146 1.698 25.6543C1.698 26.0941 1.8769 26.5159 2.19534 26.8269C2.51377 27.1378 2.94567 27.3125 3.396 27.3125H5.39965C5.12039 28.0639 5.03065 28.87 5.13804 29.6624C5.24542 30.4548 5.54677 31.2103 6.01656 31.8649C6.48635 32.5195 7.11075 33.0539 7.83688 33.4228C8.56301 33.7918 9.36948 33.9844 10.188 33.9844C11.0065 33.9844 11.813 33.7918 12.5391 33.4228C13.2653 33.0539 13.8897 32.5195 14.3595 31.8649C14.8293 31.2103 15.1306 30.4548 15.238 29.6624C15.3454 28.87 15.2556 28.0639 14.9764 27.3125H18.9837C18.7294 27.9967 18.6321 28.7271 18.6984 29.452C18.7647 30.1769 18.9931 30.8789 19.3675 31.5082C19.7419 32.1375 20.2531 32.679 20.8651 33.0944C21.4771 33.5097 22.175 33.7889 22.9096 33.9121C23.6441 34.0354 24.3974 33.9997 25.1163 33.8077C25.8352 33.6156 26.5021 33.2719 27.0702 32.8007C27.6382 32.3294 28.0934 31.7422 28.4037 31.0805C28.714 30.4187 28.8718 29.6986 28.866 28.9708C28.8629 28.1141 28.6286 27.2733 28.1868 26.5332C28.9129 26.0861 29.5116 25.4671 29.9272 24.7337C30.3428 24.0003 30.5618 23.1762 30.564 22.3379ZM23.9249 17.3633H9.33901L6.52033 7.41409H26.6586L23.9249 17.3633ZM10.188 30.629C9.85218 30.629 9.52389 30.5317 9.24465 30.3495C8.96542 30.1673 8.74778 29.9083 8.61926 29.6053C8.49075 29.3023 8.45712 28.9689 8.52264 28.6473C8.58815 28.3256 8.74987 28.0301 8.98734 27.7982C9.22481 27.5663 9.52737 27.4084 9.85675 27.3444C10.1861 27.2804 10.5275 27.3133 10.8378 27.4388C11.1481 27.5643 11.4133 27.7768 11.5998 28.0495C11.7864 28.3222 11.886 28.6428 11.886 28.9708C11.886 29.4105 11.7071 29.8323 11.3887 30.1433C11.0702 30.4543 10.6384 30.629 10.188 30.629ZM23.772 30.629C23.4362 30.629 23.1079 30.5317 22.8287 30.3495C22.5494 30.1673 22.3318 29.9083 22.2033 29.6053C22.0748 29.3023 22.0411 28.9689 22.1067 28.6473C22.1722 28.3256 22.3339 28.0301 22.5714 27.7982C22.8088 27.5663 23.1114 27.4084 23.4408 27.3444C23.7701 27.2804 24.1116 27.3133 24.4218 27.4388C24.7321 27.5643 24.9973 27.7768 25.1839 28.0495C25.3704 28.3222 25.47 28.6428 25.47 28.9708C25.47 29.4105 25.2911 29.8323 24.9727 30.1433C24.6543 30.4543 24.2224 30.629 23.772 30.629Z" fill="white"/>
                </svg>
                <div className="font-normal text-base w-48 text-white font-sans ml-10 flex justify-start">
                
                Inventory
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none" style={{ transform: isRotated1 ? 'rotate(90deg)' : 'none' }}>
                <path d="M0.000411301 8.95104L0.00799345 0.900488C0.00805214 0.821971 0.0292754 0.744854 0.0695296 0.676889C0.109784 0.608924 0.167653 0.552505 0.237315 0.513305C0.306977 0.474105 0.38598 0.453504 0.46638 0.453575C0.546781 0.453645 0.625747 0.474384 0.695338 0.513707L7.8306 4.54557C7.89597 4.58808 7.94955 4.64572 7.98659 4.71334C8.02363 4.78097 8.04298 4.85649 8.04291 4.93318C8.04283 5.00987 8.02335 5.08536 7.98618 5.15292C7.94901 5.22047 7.89532 5.27801 7.82987 5.3204L0.687026 9.33909C0.617361 9.37828 0.538356 9.39888 0.457956 9.3988C0.377555 9.39872 0.298591 9.37797 0.229003 9.33864C0.159415 9.29932 0.101653 9.24279 0.0615262 9.17475C0.0214 9.10671 0.000322093 9.02956 0.000411301 8.95104Z" fill="white"/>
                </svg>
            </button>
            {showInventoryLinks  && (
        <div className='pl-3'>
          <Link to="/Item_main" className="block p-2 text-blue-200 hover:text-white">
            View Item List
          </Link>
          <Link to="/Item_add" className="block p-2 text-blue-200 hover:text-white">
            Add Items
          </Link>
          <Link to="/lowInventory" className="block p-2 text-blue-200 hover:text-white">
         Low Inventery Item List
          </Link>
          <Link to="/createlowinventoy" className="block p-2 text-blue-200 hover:text-white">
          Asign Low Inventory Level
          </Link>
          <Link to="/return" className="block p-2 text-blue-200 hover:text-white">
          Add Return Items
          </Link>
          
          <Link to="/EnterWastageItem" className="block p-2 text-blue-200 hover:text-white">
          Add Wastage Items
          </Link>
          
          
        </div>
      )}
      </div>
            <div>
            <button className=" w-60 flex items-center justify-start px-4 py-2 rounded-xl mt-3 hover:bg-blue-400" onClick={handleBothClicks2}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 30 32" fill="none" >
                <path d="M25.5 8.53516H20.4V6.875C20.4 5.1138 19.6836 3.42473 18.4083 2.17937C17.1331 0.93401 15.4035 0.234375 13.6 0.234375C11.7965 0.234375 10.0669 0.93401 8.79167 2.17937C7.51643 3.42473 6.8 5.1138 6.8 6.875V8.53516H1.7C1.24913 8.53516 0.816731 8.71007 0.497919 9.02141C0.179107 9.33274 0 9.75501 0 10.1953V28.457C0 29.7779 0.53732 31.0447 1.49376 31.9788C2.45019 32.9128 3.7474 33.4375 5.1 33.4375H22.1C23.4526 33.4375 24.7498 32.9128 25.7062 31.9788C26.6627 31.0447 27.2 29.7779 27.2 28.457V10.1953C27.2 9.75501 27.0209 9.33274 26.7021 9.02141C26.3833 8.71007 25.9509 8.53516 25.5 8.53516ZM10.2 6.875C10.2 5.9944 10.5582 5.14986 11.1958 4.52718C11.8335 3.90451 12.6983 3.55469 13.6 3.55469C14.5017 3.55469 15.3665 3.90451 16.0042 4.52718C16.6418 5.14986 17 5.9944 17 6.875V8.53516H10.2V6.875ZM23.8 28.457C23.8 28.8973 23.6209 29.3196 23.3021 29.6309C22.9833 29.9423 22.5509 30.1172 22.1 30.1172H5.1C4.64913 30.1172 4.21673 29.9423 3.89792 29.6309C3.57911 29.3196 3.4 28.8973 3.4 28.457V11.8555H6.8V13.5156C6.8 13.9559 6.97911 14.3782 7.29792 14.6895C7.61673 15.0009 8.04913 15.1758 8.5 15.1758C8.95087 15.1758 9.38327 15.0009 9.70208 14.6895C10.0209 14.3782 10.2 13.9559 10.2 13.5156V11.8555H17V13.5156C17 13.9559 17.1791 14.3782 17.4979 14.6895C17.8167 15.0009 18.2491 15.1758 18.7 15.1758C19.1509 15.1758 19.5833 15.0009 19.9021 14.6895C20.2209 14.3782 20.4 13.9559 20.4 13.5156V11.8555H23.8V28.457Z" fill="white"/>
                </svg>
                <div className="font-normal text-base w-48 text-white font-sans ml-10 flex justify-start">
              
                Purchases
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none" style={{ transform: isRotated2 ? 'rotate(90deg)' : 'none' }}>
                <path d="M0.000411301 8.95104L0.00799345 0.900488C0.00805214 0.821971 0.0292754 0.744854 0.0695296 0.676889C0.109784 0.608924 0.167653 0.552505 0.237315 0.513305C0.306977 0.474105 0.38598 0.453504 0.46638 0.453575C0.546781 0.453645 0.625747 0.474384 0.695338 0.513707L7.8306 4.54557C7.89597 4.58808 7.94955 4.64572 7.98659 4.71334C8.02363 4.78097 8.04298 4.85649 8.04291 4.93318C8.04283 5.00987 8.02335 5.08536 7.98618 5.15292C7.94901 5.22047 7.89532 5.27801 7.82987 5.3204L0.687026 9.33909C0.617361 9.37828 0.538356 9.39888 0.457956 9.3988C0.377555 9.39872 0.298591 9.37797 0.229003 9.33864C0.159415 9.29932 0.101653 9.24279 0.0615262 9.17475C0.0214 9.10671 0.000322093 9.02956 0.000411301 8.95104Z" fill="white"/>
                </svg>
            </button>
            {showPurchasesLinks && (
        <div className='pl-3'>
          <Link to="/create-po" className="block p-2 text-blue-200 hover:text-white">
            Create Purchase Order
          </Link>
          <Link to="/display" className="block p-2 text-blue-200 hover:text-white">
            Purchase Orders List
          </Link>
          <Link to="/Create-Sales-Order" className="block p-2 text-blue-200 hover:text-white">
            Create Sales Order
          </Link>
          <Link to="/sales-orders" className="block p-2 text-blue-200 hover:text-white">
            View Sales Orders
          </Link>
          <Link to="/shippings" className="block p-2 text-blue-200 hover:text-white">
          Shipping MNG
          </Link>
          <Link to="/addShipping" className="block p-2 text-blue-200 hover:text-white">
          Add Shiping Details     
          </Link>
               
        </div>
      )}
            </div>
            <div>
            <button className="  w-60 flex items-center justify-start px-4 py-2 rounded-xl mt-3 hover:bg-blue-400" onClick={handleBothClicks3}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 30 32" fill="none">
        <path d="M12.312 28.7106H4.10401C3.74119 28.7106 3.39324 28.546 3.13669 28.2531C2.88014 27.9601 2.73601 27.5628 2.73601 27.1486V5.27989C2.73601 4.86561 2.88014 4.4683 3.13669 4.17536C3.39324 3.88242 3.74119 3.71784 4.10401 3.71784H10.944V8.40399C10.944 9.64683 11.3764 10.8388 12.1461 11.7176C12.9157 12.5964 13.9596 13.0901 15.048 13.0901H19.1521V20.9004C19.1521 21.3146 19.2962 21.712 19.5527 22.0049C19.8093 22.2978 20.1572 22.4624 20.5201 22.4624C20.8829 22.4624 21.2308 22.2978 21.4874 22.0049C21.7439 21.712 21.8881 21.3146 21.8881 20.9004V11.5281C21.8881 11.5281 21.8881 11.5281 21.8881 11.4344C21.8738 11.2909 21.8463 11.1495 21.806 11.0126V10.872C21.7402 10.7114 21.6525 10.5638 21.5461 10.4346L13.338 1.06236C13.2249 0.940862 13.0957 0.84068 12.955 0.765575C12.9097 0.75653 12.8635 0.75653 12.8182 0.765575C12.6852 0.684353 12.5422 0.626431 12.3941 0.59375H4.10401C3.01556 0.59375 1.97169 1.08747 1.20204 1.96629C0.432386 2.84511 0 4.03705 0 5.27989V27.1486C0 28.3914 0.432386 29.5833 1.20204 30.4622C1.97169 31.341 3.01556 31.8347 4.10401 31.8347H12.312C12.6748 31.8347 13.0228 31.6701 13.2794 31.3772C13.5359 31.0842 13.68 30.6869 13.68 30.2726C13.68 29.8584 13.5359 29.4611 13.2794 29.1681C13.0228 28.8752 12.6748 28.7106 12.312 28.7106ZM13.68 5.92033L17.2232 9.96603H15.048C14.6852 9.96603 14.3373 9.80146 14.0807 9.50852C13.8242 9.21558 13.68 8.81827 13.68 8.40399V5.92033ZM6.84002 19.3383H15.048C15.4109 19.3383 15.7588 19.1737 16.0154 18.8808C16.2719 18.5879 16.416 18.1905 16.416 17.7763C16.416 17.362 16.2719 16.9647 16.0154 16.6717C15.7588 16.3788 15.4109 16.2142 15.048 16.2142H6.84002C6.4772 16.2142 6.12924 16.3788 5.87269 16.6717C5.61614 16.9647 5.47201 17.362 5.47201 17.7763C5.47201 18.1905 5.61614 18.5879 5.87269 18.8808C6.12924 19.1737 6.4772 19.3383 6.84002 19.3383ZM12.312 22.4624H6.84002C6.4772 22.4624 6.12924 22.627 5.87269 22.9199C5.61614 23.2129 5.47201 23.6102 5.47201 24.0245C5.47201 24.4387 5.61614 24.8361 5.87269 25.129C6.12924 25.4219 6.4772 25.5865 6.84002 25.5865H12.312C12.6748 25.5865 13.0228 25.4219 13.2794 25.129C13.5359 24.8361 13.68 24.4387 13.68 24.0245C13.68 23.6102 13.5359 23.2129 13.2794 22.9199C13.0228 22.627 12.6748 22.4624 12.312 22.4624ZM6.84002 13.0901H8.20802C8.57084 13.0901 8.9188 12.9256 9.17535 12.6326C9.4319 12.3397 9.57603 11.9424 9.57603 11.5281C9.57603 11.1138 9.4319 10.7165 9.17535 10.4235C8.9188 10.1306 8.57084 9.96603 8.20802 9.96603H6.84002C6.4772 9.96603 6.12924 10.1306 5.87269 10.4235C5.61614 10.7165 5.47201 11.1138 5.47201 11.5281C5.47201 11.9424 5.61614 12.3397 5.87269 12.6326C6.12924 12.9256 6.4772 13.0901 6.84002 13.0901ZM25.5953 22.9154C25.4682 22.769 25.3169 22.6528 25.1502 22.5735C24.9835 22.4942 24.8047 22.4534 24.6241 22.4534C24.4435 22.4534 24.2647 22.4942 24.098 22.5735C23.9313 22.6528 23.78 22.769 23.6528 22.9154L19.1521 28.0702L17.3873 26.0395C17.2598 25.8939 17.1084 25.7783 16.9417 25.6995C16.775 25.6207 16.5964 25.5801 16.416 25.5801C16.2357 25.5801 16.057 25.6207 15.8904 25.6995C15.7237 25.7783 15.5723 25.8939 15.4448 26.0395C15.3172 26.1851 15.216 26.358 15.147 26.5483C15.078 26.7386 15.0424 26.9426 15.0424 27.1486C15.0424 27.3545 15.078 27.5585 15.147 27.7488C15.216 27.9391 15.3172 28.112 15.4448 28.2576L18.1808 31.3817C18.3079 31.5281 18.4592 31.6443 18.6259 31.7236C18.7927 31.8029 18.9715 31.8438 19.1521 31.8438C19.3326 31.8438 19.5114 31.8029 19.6782 31.7236C19.8449 31.6443 19.9962 31.5281 20.1233 31.3817L25.5953 25.1335C25.7236 24.9883 25.8253 24.8155 25.8948 24.6252C25.9642 24.4348 26 24.2307 26 24.0245C26 23.8182 25.9642 23.6141 25.8948 23.4237C25.8253 23.2334 25.7236 23.0606 25.5953 22.9154Z" fill="white"/>
                </svg>
                <div className="font-normal text-base w-48 text-white font-sans ml-10 flex justify-start">
               
                Reports
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none" style={{ transform: isRotated3 ? 'rotate(90deg)' : 'none' }}>
                <path d="M0.000411301 8.95104L0.00799345 0.900488C0.00805214 0.821971 0.0292754 0.744854 0.0695296 0.676889C0.109784 0.608924 0.167653 0.552505 0.237315 0.513305C0.306977 0.474105 0.38598 0.453504 0.46638 0.453575C0.546781 0.453645 0.625747 0.474384 0.695338 0.513707L7.8306 4.54557C7.89597 4.58808 7.94955 4.64572 7.98659 4.71334C8.02363 4.78097 8.04298 4.85649 8.04291 4.93318C8.04283 5.00987 8.02335 5.08536 7.98618 5.15292C7.94901 5.22047 7.89532 5.27801 7.82987 5.3204L0.687026 9.33909C0.617361 9.37828 0.538356 9.39888 0.457956 9.3988C0.377555 9.39872 0.298591 9.37797 0.229003 9.33864C0.159415 9.29932 0.101653 9.24279 0.0615262 9.17475C0.0214 9.10671 0.000322093 9.02956 0.000411301 8.95104Z" fill="white"/>
                </svg>
            </button>
            {showReportLinks && (
        <div  className='pl-3'>
          
          
          <Link to="/po-report" className="block p-2 text-blue-200 hover:text-white">
            Purchase Orders Report
          </Link>
          <Link to="/ViewWastageItem" className="block p-2 text-blue-200 hover:text-white">
            View Wastage Item Report
          </Link>
          <Link to="/ViewreturnItemsDetails" className="block p-2 text-blue-200 hover:text-white">
            View Return Item Report
          </Link>
          <Link to="/lost_item_list" className="block p-2 text-blue-200 hover:text-white">
            Lost Item Report
          </Link>
        </div>
      )}
            </div>
            <div>
            <button className=" w-60 flex items-center justify-start px-4 py-2 rounded-xl mt-3 hover:bg-blue-400" onClick={handleBothClicks4}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 30 32" fill="none">
        <path d="M25.2264 9.05273V1.46484C25.2264 1.07634 25.0786 0.703754 24.8154 0.429043C24.5522 0.154331 24.1953 0 23.8231 0C23.4509 0 23.094 0.154331 22.8308 0.429043C22.5677 0.703754 22.4198 1.07634 22.4198 1.46484V9.05273C21.6071 9.36065 20.9049 9.92231 20.4087 10.6614C19.9124 11.4004 19.6462 12.2811 19.6462 13.1836C19.6462 14.0861 19.9124 14.9667 20.4087 15.7058C20.9049 16.4449 21.6071 17.0065 22.4198 17.3145V27.832C22.4198 28.2205 22.5677 28.5931 22.8308 28.8678C23.094 29.1425 23.4509 29.2969 23.8231 29.2969C24.1953 29.2969 24.5522 29.1425 24.8154 28.8678C25.0786 28.5931 25.2264 28.2205 25.2264 27.832V17.3145C26.0391 17.0065 26.7413 16.4449 27.2376 15.7058C27.7338 14.9667 28 14.0861 28 13.1836C28 12.2811 27.7338 11.4004 27.2376 10.6614C26.7413 9.92231 26.0391 9.36065 25.2264 9.05273ZM23.8231 14.6484C23.5456 14.6484 23.2742 14.5625 23.0435 14.4016C22.8127 14.2406 22.6328 14.0118 22.5266 13.7442C22.4204 13.4765 22.3926 13.182 22.4468 12.8978C22.5009 12.6137 22.6346 12.3527 22.8308 12.1478C23.0271 11.9429 23.2771 11.8034 23.5493 11.7469C23.8215 11.6904 24.1037 11.7194 24.3601 11.8303C24.6165 11.9411 24.8357 12.1289 24.9899 12.3698C25.1441 12.6107 25.2264 12.8939 25.2264 13.1836C25.2264 13.5721 25.0786 13.9447 24.8154 14.2194C24.5522 14.4941 24.1953 14.6484 23.8231 14.6484ZM15.4033 17.8418V1.46484C15.4033 1.07634 15.2555 0.703754 14.9923 0.429043C14.7291 0.154331 14.3722 0 14 0C13.6278 0 13.2709 0.154331 13.0077 0.429043C12.7445 0.703754 12.5967 1.07634 12.5967 1.46484V17.8418C11.784 18.1497 11.0818 18.7114 10.5855 19.4504C10.0893 20.1895 9.82311 21.0701 9.82311 21.9727C9.82311 22.8752 10.0893 23.7558 10.5855 24.4949C11.0818 25.2339 11.784 25.7956 12.5967 26.1035V27.832C12.5967 28.2205 12.7445 28.5931 13.0077 28.8678C13.2709 29.1425 13.6278 29.2969 14 29.2969C14.3722 29.2969 14.7291 29.1425 14.9923 28.8678C15.2555 28.5931 15.4033 28.2205 15.4033 27.832V26.1035C16.216 25.7956 16.9182 25.2339 17.4145 24.4949C17.9107 23.7558 18.1769 22.8752 18.1769 21.9727C18.1769 21.0701 17.9107 20.1895 17.4145 19.4504C16.9182 18.7114 16.216 18.1497 15.4033 17.8418ZM14 23.4375C13.7225 23.4375 13.4511 23.3516 13.2204 23.1906C12.9896 23.0297 12.8097 22.8009 12.7035 22.5332C12.5973 22.2656 12.5695 21.971 12.6237 21.6869C12.6778 21.4027 12.8115 21.1417 13.0077 20.9369C13.204 20.732 13.454 20.5925 13.7262 20.536C13.9984 20.4794 14.2806 20.5084 14.537 20.6193C14.7934 20.7302 15.0126 20.9179 15.1668 21.1588C15.321 21.3997 15.4033 21.6829 15.4033 21.9727C15.4033 22.3612 15.2555 22.7337 14.9923 23.0085C14.7291 23.2832 14.3722 23.4375 14 23.4375ZM5.58019 6.12305V1.46484C5.58019 1.07634 5.43235 0.703754 5.16918 0.429043C4.90601 0.154331 4.54907 0 4.17689 0C3.80471 0 3.44778 0.154331 3.18461 0.429043C2.92144 0.703754 2.77359 1.07634 2.77359 1.46484V6.12305C1.96087 6.43096 1.25867 6.99262 0.762439 7.73169C0.266206 8.47075 0 9.35139 0 10.2539C0 11.1564 0.266206 12.0371 0.762439 12.7761C1.25867 13.5152 1.96087 14.0768 2.77359 14.3848V27.832C2.77359 28.2205 2.92144 28.5931 3.18461 28.8678C3.44778 29.1425 3.80471 29.2969 4.17689 29.2969C4.54907 29.2969 4.90601 29.1425 5.16918 28.8678C5.43235 28.5931 5.58019 28.2205 5.58019 27.832V14.3848C6.39292 14.0768 7.09511 13.5152 7.59135 12.7761C8.08758 12.0371 8.35379 11.1564 8.35379 10.2539C8.35379 9.35139 8.08758 8.47075 7.59135 7.73169C7.09511 6.99262 6.39292 6.43096 5.58019 6.12305ZM4.17689 11.7188C3.89935 11.7188 3.62803 11.6328 3.39726 11.4719C3.16649 11.3109 2.98662 11.0821 2.88041 10.8145C2.7742 10.5468 2.74641 10.2523 2.80056 9.96813C2.8547 9.68398 2.98835 9.42297 3.18461 9.21811C3.38086 9.01324 3.63091 8.87373 3.90312 8.81721C4.17534 8.76069 4.45749 8.7897 4.71391 8.90057C4.97033 9.01144 5.1895 9.19919 5.34369 9.44008C5.49789 9.68097 5.58019 9.96419 5.58019 10.2539C5.58019 10.6424 5.43235 11.015 5.16918 11.2897C4.90601 11.5644 4.54907 11.7188 4.17689 11.7188Z" fill="white"/>
                </svg>
                <div className="font-normal text-base w-48 text-white font-sans ml-10 flex justify-start">
             
                Operations
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none" style={{ transform: isRotated4 ? 'rotate(90deg)' : 'none' }}>
                <path d="M0.000411301 8.95104L0.00799345 0.900488C0.00805214 0.821971 0.0292754 0.744854 0.0695296 0.676889C0.109784 0.608924 0.167653 0.552505 0.237315 0.513305C0.306977 0.474105 0.38598 0.453504 0.46638 0.453575C0.546781 0.453645 0.625747 0.474384 0.695338 0.513707L7.8306 4.54557C7.89597 4.58808 7.94955 4.64572 7.98659 4.71334C8.02363 4.78097 8.04298 4.85649 8.04291 4.93318C8.04283 5.00987 8.02335 5.08536 7.98618 5.15292C7.94901 5.22047 7.89532 5.27801 7.82987 5.3204L0.687026 9.33909C0.617361 9.37828 0.538356 9.39888 0.457956 9.3988C0.377555 9.39872 0.298591 9.37797 0.229003 9.33864C0.159415 9.29932 0.101653 9.24279 0.0615262 9.17475C0.0214 9.10671 0.000322093 9.02956 0.000411301 8.95104Z" fill="white"/>
                </svg>
            </button>
            {showOperationLinks && (
        <div  className='pl-3'>
          <Link to="/#" className="block p-2 text-blue-200 hover:text-white">
          <div>
            <button className="  " onClick={handleBothClicks6}>
               
            <div className="flex items-center">
  <h1 className="mr-2">Shipping Management</h1>
  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="15" viewBox="0 0 9 10" fill="none" className="transform" style={{ transform: isRotated6 ? 'rotate(90deg)' : 'none' }}>
    <path d="M0.000411301 8.95104L0.00799345 0.900488C0.00805214 0.821971 0.0292754 0.744854 0.0695296 0.676889C0.109784 0.608924 0.167653 0.552505 0.237315 0.513305C0.306977 0.474105 0.38598 0.453504 0.46638 0.453575C0.546781 0.453645 0.625747 0.474384 0.695338 0.513707L7.8306 4.54557C7.89597 4.58808 7.94955 4.64572 7.98659 4.71334C8.02363 4.78097 8.04298 4.85649 8.04291 4.93318C8.04283 5.00987 8.02335 5.08536 7.98618 5.15292C7.94901 5.22047 7.89532 5.27801 7.82987 5.3204L0.687026 9.33909C0.617361 9.37828 0.538356 9.39888 0.457956 9.3988C0.377555 9.39872 0.298591 9.37797 0.229003 9.33864C0.159415 9.29932 0.101653 9.24279 0.0615262 9.17475C0.0214 9.10671 0.000322093 9.02956 0.000411301 8.95104Z" fill="white"/>
  </svg>
</div>

            </button>
            {showShippingLinks  && (
        <div className='pl-3'>
         
         <Link to="/AddVehicles" className="block p-2 text-blue-200 hover:text-white">
Add Vehicles 
 </Link>
<Link to="/AddShipping" className="block p-2 text-blue-200 hhover:text-white">
Add Shipping
</Link>
<Link to="/vehicleList" className="block p-2 text-blue-200 hhover:text-white">
Vehicle List
</Link>
<Link to="/shippingList" className="block p-2 text-blue-200 hhover:text-white">
Shipping List
</Link>

         
          
        </div>
      )}
      </div>
          </Link>
          <Link to="/MaintenanceListPage" className="block p-2 text-blue-200 hover:text-white">
            Maintanance Schedule
          </Link>
          <Link to="/Staffmanagement" className="block p-2 text-blue-200">


          

          <div>
            <button className="  " onClick={handleBothClicks5}>
               
            <div className="flex items-center">
  <h1 className="mr-2">Staff Management</h1>
  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="15" viewBox="0 0 9 10" fill="none" className="transform" style={{ transform: isRotated5 ? 'rotate(90deg)' : 'none' }}>
    <path d="M0.000411301 8.95104L0.00799345 0.900488C0.00805214 0.821971 0.0292754 0.744854 0.0695296 0.676889C0.109784 0.608924 0.167653 0.552505 0.237315 0.513305C0.306977 0.474105 0.38598 0.453504 0.46638 0.453575C0.546781 0.453645 0.625747 0.474384 0.695338 0.513707L7.8306 4.54557C7.89597 4.58808 7.94955 4.64572 7.98659 4.71334C8.02363 4.78097 8.04298 4.85649 8.04291 4.93318C8.04283 5.00987 8.02335 5.08536 7.98618 5.15292C7.94901 5.22047 7.89532 5.27801 7.82987 5.3204L0.687026 9.33909C0.617361 9.37828 0.538356 9.39888 0.457956 9.3988C0.377555 9.39872 0.298591 9.37797 0.229003 9.33864C0.159415 9.29932 0.101653 9.24279 0.0615262 9.17475C0.0214 9.10671 0.000322093 9.02956 0.000411301 8.95104Z" fill="white"/>
  </svg>
</div>

            </button>
            {showStaffLinks  && (
        <div className='pl-3'>
         
          <Link to="/Addworkers" className="block p-2 text-white hover:text-slate-400">
          Add Workers
          </Link>
          <Link to="/Workerlist" className="block p-2  text-white hover:text-slate-400">
          Workers List
          </Link>
         
          <Link to="/Addshift" className="block p-2  text-white hover:text-slate-400">
          Add Shift
          </Link>
          
          <Link to="/Shiftlist" className="block p-2  text-white hover:text-slate-400">
          Shift List
          </Link>

          <Link to="/AssignWorkerToShift" className="block p-2  text-white hover:text-slate-400">
          Assign Worker To Shift
          </Link>

         
          
        </div>
      )}
      </div>
       
          </Link>
        </div>
      )}
            </div>
            
            
        </div>
    </div>
      
        
    );
}




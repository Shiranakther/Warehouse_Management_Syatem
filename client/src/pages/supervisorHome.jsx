import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/POItem';

export default function Home() {
  
  
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto pl-64'>
        <h1 className='text-gray-700 font-roboto text-4xl'>
           Purchase Order Management System
        </h1>
        <br/>
        <h1 className='text-black-700 font-roboto text-4xl'>
          Chaminda stores
        </h1>
        
        
        
      </div>

      

      {/* listing results for offer, sale and rent */}

      
    </div>
  );
}

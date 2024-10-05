"use client"

import { useState } from 'react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import OurBestSellerCard from '../Card/OurBestSellerCard/page';
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

interface Product {
  category: string;
  description: string;
}



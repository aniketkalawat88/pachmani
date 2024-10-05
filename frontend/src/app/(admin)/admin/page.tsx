"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import api from "@/lib/axios";
import axios from "axios";
import { Icons } from "@/app/icons";
import AdminLeftGraph from "./_components/adminLeftGraph";
import { Loader } from "lucide-react";
import RecentOrders from "./_components/recentOrders";

interface RecentActivity {
  name: string;
  count: number;
}

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: string;
  totalRevenue: number;
  recentUsers: RecentActivity[];
  recentOrders: RecentActivity[];
}

const initialState: DashboardStats = {
  totalProducts: 0,
  totalOrders: 0,
  totalUsers: "0",
  totalRevenue: 0,
  recentUsers: [],
  recentOrders: [],
};

export default function Admin() {
  const [posts, setPosts] = useState<DashboardStats>(initialState);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/admin/info");
        setPosts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log("error", err);
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      let source = axios.CancelToken.source();
      source.cancel("Component unmounted, operation canceled");
    };
  }, []);

  if (isLoading)
    return (
      <div className="w-full h-[80vh]  flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin mr-2" />
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white w-full px-4 py-6 rounded-xl flex justify-between">
          <div>
            <p className="text-sm text-[#8E95A9] font-medium">Total Product</p>
            <h1 className="text-2xl text-[#1C2A53] font-semibold">
              {posts?.totalProducts + ""}
            </h1>
          </div>
          <div className="">
            {/* <p className="font-bold text-primaryMain text-end w-full">+ 22%</p> */}
            <Icons.admin1 />
          </div>
        </div>
        <div className="bg-white w-full px-4 py-6 rounded-xl flex justify-between">
          <div>
            <p className="text-sm text-[#8E95A9] font-medium">Total order</p>
            <h1 className="text-2xl text-[#1C2A53] font-semibold">
              {posts.totalOrders}
            </h1>
          </div>
          <div className="">
            {/* <p className="font-bold text-[#FF392B] text-end w-full">+ 22%</p> */}
            <Icons.admin2 />
          </div>
        </div>
        <div className="bg-white w-full px-4 py-6 rounded-xl flex justify-between">
          <div>
            <p className="text-sm text-[#8E95A9] font-medium">Total user</p>
            <h1 className="text-2xl text-[#1C2A53] font-semibold">
              {posts.totalUsers}
            </h1>
          </div>
          <div className="">
            {/* <p className="font-bold text-primaryMain text-end w-full">+ 22%</p> */}
            <Icons.admin3 />
          </div>
        </div>
        <div className="bg-white w-full px-4 py-6 rounded-xl flex justify-between">
          <div>
            <p className="text-sm text-[#8E95A9] font-medium">Total Revenue</p>
            <h1 className="text-2xl text-[#1C2A53] font-semibold">
              {(posts.totalRevenue ?? 0).toFixed(2)}
            </h1>
          </div>
          <div className="">
            {/* <p className="font-bold text-[#FFA000] text-end w-full">+ 22%</p> */}
            <Icons.admin4 />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <AdminLeftGraph recentUsers={posts.recentUsers} text={"users register in past 7 days"}/>
        <AdminLeftGraph recentUsers={posts.recentOrders} text={"order in past 7 days"}/>
      </div>
      <RecentOrders></RecentOrders>
    </div>
  );
}

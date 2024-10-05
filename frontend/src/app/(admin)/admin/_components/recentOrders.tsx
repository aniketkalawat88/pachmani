import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const RecentOrders = () => {
  const arr = [""];
  return (
    <div>
      {/* <div className="shadow-[0px_4px_16.3px_0px_rgba(0,0,0,0.08)]  bg-white rounded-xl">
        <div className="flex justify-between items-center sm:p-4 md:p-5 xl:p-6 font-medium">
          <div className="text-xl font-medium capitalize text-[#4C535F]">
            Recent Orders
          </div>
          <div>More &#8594;</div>
        </div>
        <div className="text-[#8E95A9] grid grid-cols-8 justify-items-center bg-[#F8F8F8] w-full p-5">
          <div>Orders</div>
          <div>Customers</div>
          <div>Qty</div>
          <div>Date</div>
          <div>Revenue</div>
          <div>Net Profit</div>
          <div>Status</div>
          <div>Action</div>
        </div>
        <div className="">
          {arr?.map((ele, i) => (
            <div
              key={i}
              className="text-[#555F7E] grid grid-cols-8 justify-items-center w-full p-5"
            >
              <div>#32000200</div>
              <div>Priscilla Warren</div>
              <div>2</div>
              <div>Jan 10, 2020</div>
              <div>$253.82</div>
              <div>$60.76</div>
              <div>Completed</div>
              <div className="flex text-xl gap-2 text-[#C8CAD8]">
                <CiEdit />
                <MdDeleteOutline />
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default RecentOrders;

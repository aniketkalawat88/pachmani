"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Allorder, IOrder } from "@/lib/types/order";
import Image from "next/image";
import { CiEdit, CiMenuKebab } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineSearch } from "react-icons/md";
import DeleteToggle from "../_components/delete-toggle";
import { Contact } from "@/lib/types/comman";
import { RiArrowDropDownLine } from "react-icons/ri";
import { constructQueryString, FilterObj } from "@/lib/constants/queryString";

const UpdateProducts: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [istotalOrders, setisTotalOrders] = useState<Allorder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isUser , setIsUser] = useState("");

  const [loading, setLoading] = useState(false);
  const [isData, setIsData] = useState<IOrder[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async (filterObj: FilterObj): Promise<void> => {
    try {
      const queryString = constructQueryString(filterObj);
      console.log(queryString)
      const { data } = await api.get(`/order?${queryString}`);
      setOrders(data.orders);
      setisTotalOrders(data.totalOrders);
      // console.log(data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  console.log(isUser, "cvbhnj")
  const itemsPerPage = 10;
  const totalItems : any = istotalOrders; 
  useEffect(() => {
    fetchProducts({
      page: currentPage,
      limit: 10,
      username: "",
      id: isUser,
      endDate: "",
      startDate: "",
    });
  }, [currentPage ,isUser]);

  const updateStatus = async (orderId: string, status: IOrder["status"]) => {
    try {
      await api.put(`order`, { status, orderId });
      setOrders((prevState) =>
        prevState.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.log(err, "update status error");
      setError("Failed to update status");
    }
  };

  const getStatusColor = (status: IOrder["status"]) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "processing":
        return "text-blue-500";
      case "shipped":
        return "text-purple-500";
      case "delivered":
        return "text-green-500";
      default:
        return "";
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/order/${id}`);
      setIsData(isData.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between w-full items-center p-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <MdOutlineSearch />
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for User Id"
              value={isUser}
              onChange={(e)=> setIsUser(e.target.value)}
            />
          </div>
          {/* <div className="">
            <button
              id="dropdownActionButton"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 relative"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Action button</span>
              Action
              <RiArrowDropDownLine />
            </button>
            <div
              id="dropdownAction"
              className={`z-10 ${
                isOpen ? "block" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-5`}
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownActionButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Date
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Time
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Month
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Year
                </a>
              </div>
            </div>
          </div> */}
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                S.no.
              </th>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Customers
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order?._id}
                </th>
                <td className="px-6 py-4">
                  {order?.shippingAddress?.firstname === undefined
                    ? "NaN"
                    : order?.shippingAddress?.firstname +
                      " " +
                      order?.shippingAddress?.lastname}{" "}
                </td>
                {/* <td className="px-6 py-4">{order?.items}</td> */}
                <td className="px-6 py-4">{order?.items?.[0]?.quantity}</td>
                <td className="px-6 py-4">
                  {new Date(order?.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {new Date(order?.createdAt).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4">{order?.totalPrice} &#8377; </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value as IOrder["status"]
                      )
                    }
                    className={`bg-transparent ${getStatusColor(
                      order?.status
                    )}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <button
                    id="apple-imac-27-dropdown-button"
                    data-dropdown-toggle="apple-imac-27-dropdown"
                    className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                    type="button"
                  >
                    {" "}
                    <DeleteToggle
                      onDelete={handleDelete}
                      id={order?._id}
                    />{" "}
                  </button>
                  <CiMenuKebab />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalItems)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalItems}
        </span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              onClick={() => setCurrentPage(index + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight border ${currentPage === index + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
      </div>
    </div>
  );
};

export default UpdateProducts;

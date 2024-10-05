"use client";

import { forum } from "@/app/font";
import { Icons } from "@/app/icons";
import AboutComp from "@/components/AboutComp/page";
import { cn } from "@/lib/utils";
import { getuserProfile, updateProfile } from "@/redux/action/profileAction";
import { logoutAsyn } from "@/redux/action/userAction";
import { AppDispatch, RootState } from "@/redux/store";
import CustomHead from "@/UI/customHead";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.profile
  );

  const [isEdit, setIsEdit] = useState(false);
  const [formValues, setFormValues] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

  useEffect(() => {
    if (user) {
      setFormValues({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    } else {
      dispatch(getuserProfile());
    }
  }, [user, dispatch]);

  const {isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const router = useRouter();
  
  const handelLogout = async () => {
    dispatch(logoutAsyn());
    router.push("/");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile(formValues));
    setIsEdit(false);
  };

  return (
    <div>
      <AboutComp name="Profile Information" />
      <div className="max-w-7xl mx-auto w-full h-full bg-[#00AB550D] p-4 my-10 rounded-sm">
        <div className="flex justify-between items-center">
          <CustomHead name="Profile Information" className="w-1/2" />
          <div onClick={() => setIsEdit(!isEdit)}>
            <p
              className={cn(
                "text-xl text-black font-normal flex gap-2 items-center sm:mr-10 cursor-pointer",
                forum.className
              )}
            >
              <Icons.edit /> {isEdit ? '' : 'Edit'}
            </p>
          </div>
        </div>
        {isEdit ? (
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6 gap-x-8"
          >
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Full Name</h3>
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                className="border border-[#625D60] outline-none md:p-2.5 sm:p-2 p-1.5 rounded-lg w-full mt-1.5 bg-transparent"
                placeholder="Please Enter Your Name"
                required
              />
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Email Id</h3>
              <input
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="border border-[#625D60] outline-none md:p-2.5 sm:p-2 p-1.5 rounded-lg w-full mt-1.5 bg-transparent"
                placeholder="Please Enter Your Email"
                required
              />
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">
                Phone Number
              </h3>
              <input
                type="text"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleChange}
                className="border border-[#625D60] outline-none md:p-2.5 sm:p-2 p-1.5 rounded-lg w-full mt-1.5 bg-transparent"
                placeholder="Please Enter Your Number"
                required
              />
            </div>
            <button
              type="submit"
              className="md:col-span-2 w-44 bg-primaryMain text-white p-2 rounded-sm"
            >
              Update
            </button>
          </form>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 gap-x-8">
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Full Name</h3>
              <p className="border border-[#625D60] md:p-2.5 sm:p-2 p-1.5  rounded-lg w-full mt-1.5 bg-transparent">
                {user?.username}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Email Id</h3>
              <p className="border border-[#625D60] md:p-2.5 sm:p-2 p-1.5  rounded-lg w-full mt-1.5 bg-transparent">
                {user?.email}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Phone Number</h3>
              <p className="border border-[#625D60] md:p-2.5 sm:p-2 p-1.5  rounded-lg w-full mt-1.5 bg-transparent">
                {user?.phoneNumber}
              </p>
            </div>
            <div className="md:col-span-2 text-primaryMain font-medium text-xl">
              {loading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : isAuthenticated ? (
                <button onClick={handelLogout} className="flex items-center gap-2">Log Out <IoIosLogOut /></button>
              ) : (
                <Link href="/login" className="">Log In</Link>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}






// "use client";

// import { forum } from "@/app/font";
// import { Icons } from "@/app/icons";
// import AboutComp from "@/components/AboutComp/page";
// import api from "@/lib/axios";
// import { cn } from "@/lib/utils";
// import { getuserProfile } from "@/redux/action/profileAction";
// import { AppDispatch, RootState } from "@/redux/store";
// import CustomHead from "@/UI/customHead";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function Profile() {
//   const dispatch = useDispatch<AppDispatch>();

//   const { user, loading, error } = useSelector(
//     (state: RootState) => state.profile
//   );
//   console.log(user, loading, error, "====");
//   const [isEdit, setIsEdit] = useState(true);

//   useEffect(()=>{
//     dispatch(getuserProfile())
//   },[])


// //   const [isVal, setIsVal] = useState({});
// //   const handleChange = (e: { target: { name: any; value: any } }) => {
// //     setIsVal({
// //       ...isVal,
// //       [e.target.name]: e.target.value,
// //     });
// //   };
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     dispatch(getuserProfile());
//     // console.log(isVal);
//   };

//   //   useEffect(() => {
//   //     const isFetch = async () => {
//   //       try {
//   //         const res = await api.patch("user/profile");
//   //         console.log(res.data.user);
//   //         const userData = res.data.user;
//   //         setIsVal({
//   //             name:userData.username,
//   //             email:userData.email,
//   //             number:userData.phoneNumber
//   //         })
//   //       } catch (e) {
//   //         console.log(e);
//   //       }
//   //     };
//   //     isFetch();
//   //   }, []);

//   return (
//     <div>
//       <AboutComp name="Profile Information" />
//       <div className="max-w-7xl mx-auto w-full h-full bg-[#00AB550D] p-4 my-10 rounded-sm">
//         <div className=" flex justify-between items-center">
//           <CustomHead name="Profile Information" className=" w-1/2" />
//           <div onClick={() => setIsEdit(!isEdit)}>
//             <p
//               className={cn(
//                 "text-xl text-black font-normal flex gap-2 items-center mr-10 cursor-pointer",
//                 forum.className
//               )}
//             >
//               <Icons.edit /> Edit
//             </p>
//           </div>
//         </div>
//         {isEdit ? (
//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-2 gap-6 gap-x-8"
//           >
//             <div>
//               <h3 className="text-sm text-[#332F32] font-medium">Full Name</h3>
//               <input
//                 type="text"
//                 name=""
//                 value={user?.username}
//                 // onChange={handleChange}
//                 className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5 bg-transparent"
//                 placeholder="Please Enter Your Name"
//                 required
//               />
//             </div>
//             <div>
//               <h3 className="text-sm text-[#332F32] font-medium">Email Id</h3>
//               <input
//                 type="text"
//                 name="email"
//                 value={user?.email}
//                 // onChange={handleChange}
//                 className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5 bg-transparent"
//                 placeholder="Please Enter Your Email"
//                 required
//               />
//             </div>
//             <div>
//               <h3 className="text-sm text-[#332F32] font-medium">
//                 Phone Number
//               </h3>
//               <input
//                 type="text"
//                 name="number"
//                 value={user?.phoneNumber}
//                 // onChange={handleChange}
//                 className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5 bg-transparent"
//                 placeholder="Please Enter Your Number"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="col-span-2 w-44 bg-primaryMain text-white p-2 rounded-sm"
//             >
//               Update
//             </button>
//           </form>
//         ) : (
//           // <div>
//           //     <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-6 gap-x-8'>
//           //         <div>
//           //         <h3 className="text-sm text-[#332F32] font-medium">Full Name</h3>
//           //         <input
//           //             type="text"
//           //             name="name"
//           //             value={isVal.name}
//           //             onChange={handleChange}
//           //             className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5 bg-transparent"
//           //             placeholder="Please Enter Your Name"
//           //             required
//           //         />
//           //         </div>
//           //         <div>
//           //         <h3 className="text-sm text-[#332F32] font-medium">Email Id</h3>
//           //         <input
//           //             type="text"
//           //             name="email"
//           //             value={isVal.email}
//           //             onChange={handleChange}
//           //             className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5 bg-transparent"
//           //             placeholder="Please Enter Your Email"
//           //             required
//           //         />
//           //         </div>
//           //         <div>
//           //         <h3 className="text-sm text-[#332F32] font-medium">Phone Number</h3>
//           //         <input
//           //             type="text"
//           //             name="number"
//           //             value={isVal.number}
//           //             onChange={handleChange}
//           //             className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5 bg-transparent"
//           //             placeholder="Please Enter Your Number"
//           //             required
//           //         />
//           //         </div>
//           //     </form>
//           //     <p className='text-2xl text-primaryMain py-8 cursor-pointer b'>Sign out</p>
//           // </div>
//           ""
//         )}
//       </div>
//     </div>
//   );
// }

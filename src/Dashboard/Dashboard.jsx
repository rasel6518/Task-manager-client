import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { MdOutlineEventNote } from "react-icons/md";
import { PiArchiveTrayDuotone } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";


const Dashboard = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="flex w-11/12 mx-auto flex-col md:flex-row ">

            <div className="w-full md:w-64 min-h-screen px-5 py-2 bg-gray-200">
                <div className="">
                    <img src={user?.photoURL} alt="" className="rounded-full w-[45px] h-[45] mx-auto" />
                    <p className="text-center text-sm ">{user?.displayName}</p>
                    <p className="text-center text-sm ">{user?.email}</p>
                </div>
                <hr className="border-2 border-black my-5 hidden md:block" />
                <ul className="space-y-5">
                    <NavLink
                        to="/dashboard/alltask"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active flex  items-center bg-[#52ab98] gap-3 border-2 text-xl text-center  text-white rounded-lg py-2 px-5" : "hover:border-b-2 flex  items-center gap-2 text-xl text-center  hover:border-black text-black"
                        }
                    >
                        <MdOutlineEventNote /> Notes
                    </NavLink>
                    <NavLink
                        to="/dashboard/priority"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active flex  items-center bg-[#52ab98] gap-3 border-2 text-xl text-center  text-white rounded-lg py-2 px-5" : "hover:border-b-2 flex  items-center gap-2 text-xl text-center  hover:border-black text-black"
                        }
                    >
                        <PiArchiveTrayDuotone /> Priority
                    </NavLink>

                </ul>
                <hr className="border-2 border-black my-10 hidden md:block" />
                <ul className="flex flex-col items-center  md:items-baseline">
                    <NavLink
                        to="/"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active flex  items-center gap-3 border-2 text-xl text-center  border-b-black" : "hover:border-b-2 flex  items-center gap-2 text-xl text-center  hover:border-black text-black"
                        }
                    >
                        <AiOutlineHome></AiOutlineHome> Home
                    </NavLink>

                </ul>
            </div>
            <div className="flex-1 my-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
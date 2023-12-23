import { useContext, useState } from "react";
import logo from '../../../public/logo.png'
import { AiOutlineCloseCircle, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const NavBar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
    const { user, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
            .then(() => {

            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleToggleUserDropdown = () => {
        setUserDropdownOpen(!isUserDropdownOpen);
    };
    const handleToggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const navlinks = <>

        <NavLink
            to="/"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active border-2 text-xl text-center  border-b-black" : "hover:border-b-2 text-xl text-center  hover:border-black text-black"
            }
        >
            Home
        </NavLink>
        <NavLink
            to="/about"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active  border-2 text-xl text-center border-b-black" : "hover:border-b-2 text-xl text-center  hover:border-black text-black"
            }
        >
            About
        </NavLink>
        <NavLink
            to="/contact"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active border-2 text-xl text-center px-3 py-2 border-b-black" : "hover:border-b-2 text-xl text-center  hover:border-black text-black"
            }
        >
            Contact
        </NavLink>




    </>

    return (
        <div>
            <div className="text-black shadow-md">
                <nav className="relative px-4 py-4 flex justify-between items-center bg-gray-200">
                    <div className="md:hidden">
                        <button
                            className="navbar-burger flex items-center  p-3"
                            onClick={handleToggleMenu}
                        >
                            <AiOutlineMenu className="text-xl text-[#52ab98] "></AiOutlineMenu>
                        </button>
                    </div>

                    <a className="text-3xl font-bold leading-none" href="#">
                        <img src={logo} alt="" className="w-[170px] h-[80px]" />
                    </a>
                    <div className="flex gap-2 justify-center items-center">
                        <div className="flex mx-5 gap-5 items-center">
                            <div
                                className="  rounded-full"
                                onClick={handleToggleUserDropdown}
                            >
                                {user ?
                                    <img src={user.photoURL} className="w-[40px] h-[40px] rounded-full " alt="" />
                                    : <AiOutlineUser></AiOutlineUser>}
                            </div>

                            {isUserDropdownOpen && (
                                <div className={`absolute right-24 mt-[170px]  z-30 bg-white border  rounded shadow-md transition-max-height transition-opacity overflow-hidden ${isUserDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-3 pt-2">{user?.displayName}</div>
                                    <div className="px-3 text-sm ">{user?.email}</div>
                                    <hr />

                                    {user ? <button onClick={handleLogout} className=" border-none  text-black px-3 mt-3   ">Log Out</button> : <Link to='/login'>   <div className=" border-none  text-black px-3 mt-3   ">Log In</div></Link>}
                                    {/* {
                                    user ? <Link></Link> : <Link></Link>
                                } */}

                                </div>
                            )}


                        </div>
                        <Link className=" hidden md:block" to='/dashboard/alltask'>
                            <button className="px-3 py-2 text-white rounded hover:bg-[#6ec0af] bg-[#52ab98]">Let’s Explore</button>
                        </Link>
                    </div>



                    <ul className={` absolute top-1/2 left-1/2 transform    -translate-y-1/2  -translate-x-1/2 md:flex md:mx-auto md:items-center md:w-auto md:space-x-6 ${isMenuOpen ? '' : ' hidden'}`}>
                        {navlinks}
                    </ul>


                </nav>
                <div className={`navbar-menu w-[450px] duration-1000 top-0 left-0 h-[100vh] md:hidden absolute transition-all z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-[1000px]'}`}>

                    <nav className="fixed   top-0 left-0 bottom-0 flex  justify-center   w-5/6 max-w-sm py-6 px-6  bg-white border-r overflow-y-auto">
                        <ul className="flex flex-col space-y-2 w-20 ">
                            {navlinks}
                            <Link to='/explore'>
                                <button className="px-3 py-2 text-white rounded hover:bg-[#6ec0af] bg-[#52ab98]">Let’s Explore</button>
                            </Link>
                        </ul>
                    </nav>
                    <div className="navbar-backdrop top-2 right-20  fixed " onClick={handleToggleMenu}> <AiOutlineCloseCircle className="text-3xl text-red-500"></AiOutlineCloseCircle> </div>

                </div>
            </div>
        </div>
    );
};

export default NavBar;



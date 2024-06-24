import { NavLink, Outlet } from "react-router-dom"
import Sidebar from "../components/Dashboard/Sidebar/Sidebar"

//logo
import logo from '../assets/images/MCPITC_logo_transparant.png'

//drawer
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import useRole from "../hooks/useRole";
import AdminMenu from "../components/Dashboard/Menu/AdminMenu";
import { FaHome } from "react-icons/fa"
import useAuth from "../hooks/useAuth"
import { Helmet } from "react-helmet-async"


const DashboardLayout = () => {
    const { user } = useAuth();
    const [role] = useRole()
    const [isOpen, setIsOpen] = useState(false)


    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <div className="md:flex">
            <Helmet>
                <title>MCPITC | Dashboard</title>
            </Helmet>


            {/* Mobile and tablets Drawer */}
            <button className="block lg:hidden relative md:absolute left-5 md:left-10 top-8 md:top-5" onClick={toggleDrawer}><GiHamburgerMenu /></button>

            <div className="block lg:hidden gap-5 items-center absolute right-5 md:top-3">
                <p className="inline mr-5">Hi, {user?.displayName}</p>

                <img src={user?.photoURL} className="w-12 rounded-full inline" alt="" />
            </div>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='bla bla bla'
            >
                <div className="flex items-center">
                    <img src={logo} className="w-24" alt="" /> <h1 className="font-bold text-3xl text-white">MCPITC</h1>
                </div>
                {role === "admin" && <AdminMenu />}
                <hr />
                <li><NavLink to={'/'}><h1 className="font-bold text-white ml-6 flex items-center gap-2"><FaHome size={20} />Home</h1></NavLink></li>
            </Drawer>


            {/* Desktop */}
            <div className="hidden lg:block w-64 bg-gradient-to-b from-[#0101a3] to-[#00004c]">
                <Sidebar />
            </div>
            <div className="flex-1">
                <div className="p-5 mt-10 md:mt-12 lg:mt-0">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
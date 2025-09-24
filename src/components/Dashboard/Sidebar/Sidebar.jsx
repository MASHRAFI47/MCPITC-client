import { NavLink } from "react-router-dom"

import './sidebar.css'

//logo
// import logo from '../../../assets/images/MCPITC_logo_transparant.png'
import logo from '../../../assets/mcpic-logo.png'
import AdminMenu from "../Menu/AdminMenu"

//icons
import { FaHome } from "react-icons/fa";
import useRole from "../../../hooks/useRole";
import MemberMenu from "../Menu/MemberMenu";
import { CgProfile } from "react-icons/cg";


const Sidebar = () => {
    const [role] = useRole();


    return (
        <div className="min-h-screen">
            <div className="flex items-center md:ml-4">
                <img src={logo} className="w-24" alt="" /> <h1 className="font-bold text-3xl text-white">MCPIC</h1>
            </div>
            <ul className="menu space-y-2">
                {role === "admin" && <AdminMenu />}
                {role === "member" && <MemberMenu />}
                <hr />
                <li><NavLink to={'/'}><h1 className="font-bold text-white md:ml-2 flex items-center gap-2"><FaHome size={20} />Home</h1></NavLink></li>
                <li><NavLink to={'/dashboard/profile'}><h1 className="font-bold text-white md:ml-2 flex items-center gap-2"><CgProfile size={20} />Profile</h1></NavLink></li>
            </ul>


        </div>
    )
}

export default Sidebar
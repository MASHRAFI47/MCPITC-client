import { NavLink } from "react-router-dom"

//react icons
import { GoGraph } from "react-icons/go";
import { MdAddAlert, MdOutlineEvent, MdAddBox } from "react-icons/md";
import { GrBlog } from "react-icons/gr";
import { ImBlog } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { FaUsersRays } from "react-icons/fa6";



const AdminMenu = () => {
    return (
        <div>
            <ul className="menu space-y-2">
                <li><NavLink to={'/dashboard'} end><h1 className="font-bold text-white flex items-center gap-2"><GoGraph size={20} />Statistics</h1></NavLink></li>
                <li><NavLink to={'manage-users'}><h1 className="font-bold text-white flex items-center gap-2"><FaUsers size={20} />Manage Users</h1></NavLink></li>
                <li><NavLink to={'add-event'}><h1 className="font-bold text-white flex items-center gap-2"><MdAddAlert size={20} />Add Event</h1></NavLink></li>
                <li><NavLink to={'all-events'}><h1 className="font-bold text-white flex items-center gap-2"><MdOutlineEvent size={20} />All Events</h1></NavLink></li>
                <li><NavLink to={'add-event-segment'}><h1 className="font-bold text-white flex items-center gap-2"><MdAddBox size={20} /> Add Event Segment</h1></NavLink></li>
                <li><NavLink to={'add-blog'}><h1 className="font-bold text-white flex items-center gap-2"><ImBlog size={20} />Add Blog</h1></NavLink></li>
                <li><NavLink to={'all-blogs'}><h1 className="font-bold text-white flex items-center gap-2"><GrBlog size={20} />All Blogs</h1></NavLink></li>
                <li><NavLink to={'recruit'}><h1 className="font-bold text-white flex items-center gap-2"><FaUsersRays size={20} />Recruit</h1></NavLink></li>
            </ul>
        </div>
    )
}

export default AdminMenu
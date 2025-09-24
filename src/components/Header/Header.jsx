import { Link, NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react"


//logo
// import logo from '../../assets/images/uni-color.png'
import logo2 from '../../assets/images/w-bg.png'
import mcpicLogo from '../../assets/mcpic-logo.png'
// import logo3 from '../../assets/images/MCPITC_logo_transparant.png'
import { AuthContext } from "../../providers/AuthProvider/AuthProvider"
import useAuth from "../../hooks/useAuth"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import toast from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../hooks/useAxiosCommon"

const Header = () => {
    const { user, loading, logOut } = useAuth()
    const { theme, setTheme } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosCommon = useAxiosCommon();


    const handleTheme = (e) => {
        if (e.target.checked) {
            setTheme("synthwave")
        }
        else {
            setTheme("")
        }
    }


    const handleApplyForEx = () => {
        if (!user?.emailVerified) {
            toast.error("Please verify your email from dashboard profile")
            return;
        }

        navigate("/apply-for-executive")
    }

    const links = <>
        <li><NavLink to={'/'} className={({ isActive }) => isActive ? "!bg-black font-bold text-white" : "bg-white text-black font-bold"}><h1>Home</h1></NavLink></li>
        <li><NavLink to={'/about'} className={({ isActive }) => isActive ? "!bg-black font-bold text-white" : "bg-white text-black font-bold"}><h1>About</h1></NavLink></li>
        <li><NavLink to={'/events'} className={({ isActive }) => isActive ? "!bg-black font-bold text-white" : "bg-white text-black font-bold"}><h1>Events</h1></NavLink></li>
        <li><NavLink to={'/blogs'} className={({ isActive }) => isActive ? "!bg-black font-bold text-white" : "bg-white text-black font-bold"}><h1>Blogs</h1></NavLink></li>
        <li><NavLink to={'/executives'} className={({ isActive }) => isActive ? "!bg-black font-bold text-white" : "bg-white text-black font-bold"}><h1>Executives</h1></NavLink></li>
        <li><NavLink to={'/contact'} className={({ isActive }) => isActive ? "!bg-black font-bold text-white" : "bg-white text-black font-bold"}><h1>Contact</h1></NavLink></li>
        <li>
            <NavLink onClick={handleApplyForEx} to={'/apply-for-executive'} data-aos="fade-in" className="md:hidden btn glass md:mr-5 bg-[#4B70F5] hover:bg-[#ff3535] text-white transition-all ease-in-out duration-1000">Apply For Executives</NavLink>
        </li>
    </>





    //activate or deactivate apply for executives button
    const { data: onOffSwitch, isPending } = useQuery({
        queryKey: ['onOff', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon("/recruitment-onOff")
            return data;
        }
    })

    if (isPending || loading) return <LoadingSpinner />

    console.log(onOffSwitch?.status?.onOff)

    return (
        <div className={`${theme === "" ? "bg-[#f4f6f8]" : ""} border-b-8 border-[#d8dbe5]`}>
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown text-white z-[1000]">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="bg-black menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <Link to={'/'}><img src={mcpicLogo} className="w-24" alt="mcpic logo" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? onOffSwitch?.status?.onOff === "on" ?
                            <button onClick={handleApplyForEx} to={'/apply-for-executive'} data-aos="fade-in" className="hidden md:block btn glass md:mr-5 bg-[#4B70F5] hover:bg-[#ff3535] text-white transition-all ease-in-out duration-1000">Apply For Executives</button>
                            :
                            ""
                            :
                            <NavLink to={"/login"} data-aos="fade-in" className="btn glass md:mr-5 bg-[#4B70F5] hover:bg-[#ff3535] text-white transition-all ease-in-out duration-1000">Login</NavLink>
                    }

                    {
                        user ?
                            <div className="dropdown dropdown-end z-[1000] relative mr-4">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Mcpic avatar image" src={user?.photoURL ? user?.photoURL : "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[100] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link to={'/dashboard'}>Dashboard</Link>
                                    </li>
                                    <li onClick={logOut}><a>Logout</a></li>
                                </ul>
                            </div>
                            :
                            ""
                    }

                    {/* <label className="cursor-pointer grid place-items-center">
                        <input type="checkbox" onChange={handleTheme} value={theme} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                        <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                        <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </label> */}


                    <label className="swap swap-rotate">

                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" onChange={handleTheme} className="theme-controller" value={theme} />

                        {/* sun icon */}
                        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                        {/* moon icon */}
                        <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                    </label>
                    {/* <a className="btn">Button</a> */}
                </div>
            </div>
        </div>
    )
}

export default Header
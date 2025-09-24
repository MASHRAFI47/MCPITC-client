import { FaWpforms } from 'react-icons/fa'
import { GoGraph } from 'react-icons/go'
import { Link, NavLink } from 'react-router-dom'

const MemberMenu = () => {
    return (
        <div>
            <div>
                <ul className="menu space-y-2">
                    <li><NavLink to={'/dashboard'} end><h1 className="font-bold text-white flex items-center gap-2"><GoGraph size={20} />Statistics</h1></NavLink></li>
                    <li><NavLink to={'my-forms'}><h1 className="font-bold text-white flex items-center gap-2"><FaWpforms size={20} />My Forms</h1></NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default MemberMenu
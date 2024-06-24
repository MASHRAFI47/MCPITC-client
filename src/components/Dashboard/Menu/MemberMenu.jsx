import { GoGraph } from 'react-icons/go'
import { Link } from 'react-router-dom'

const MemberMenu = () => {
    return (
        <div>
            <div>
                <ul className="menu space-y-2">
                    <li><Link><h1 className="font-bold text-white flex items-center gap-2"><GoGraph size={20} />Statistics</h1></Link></li>
                </ul>
            </div>
        </div>
    )
}

export default MemberMenu
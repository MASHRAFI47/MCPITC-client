import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import useRole from '../../../hooks/useRole';
import AdminStatistics from '../Admin/AdminStatistics';
import GuestStatistics from './GuestStatistics';
import './statistics.css'


const Statistics = () => {
    const [role, isLoading] = useRole();

    if (isLoading) return <LoadingSpinner />


    return (
        <div>
            {
                (role === "admin") ?
                    <AdminStatistics />
                    :
                    <GuestStatistics />
            }
        </div>
    )
}

export default Statistics
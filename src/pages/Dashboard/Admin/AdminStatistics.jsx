import { FaUsers } from "react-icons/fa";
import { GrBlog } from "react-icons/gr";
import { FaBook } from "react-icons/fa";


import { useQuery } from "@tanstack/react-query";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import StatisticsCard from "../../../components/Cards/StatisticsCard";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const AdminStatistics = () => {
    const [role, isLoading] = useRole();
    const axiosSecure = useAxiosSecure();

    const { data, isPending } = useQuery({
        queryKey: ['admin-stats', role],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/admin-stats`)
            return data
        }
    })

    if (isLoading || isPending) return <LoadingSpinner />

    console.log(data)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
            <div>
                <StatisticsCard icon={FaUsers} title={"Total Users"} amount={data?.usersCount} bgColor={"bg-green-500"} />
            </div>

            <div>
                <StatisticsCard icon={GrBlog} title={"Events Posted"} amount={data?.eventsCount} bgColor={"bg-orange-500"} />
            </div>

            <div>
                <StatisticsCard icon={FaBook} title={"Recruit Pending"} amount={data?.recruitFormCount} bgColor={"bg-pink-500"} />
            </div>
        </div>
    )
}

export default AdminStatistics
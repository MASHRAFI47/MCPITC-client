import { GrBlog } from "react-icons/gr";
import { FaBook } from "react-icons/fa";


import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import StatisticsCard from "../../../components/Cards/StatisticsCard";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const GuestStatistics = () => {
    const { user, loading } = useAuth();
    const axiosCommon = useAxiosCommon();

    // const { data, isPending } = useQuery({
    //     queryKey: ['order', user?.email],
    //     queryFn: async () => {
    //         const { data } = await axiosCommon.get(`/my-orders/${user?.email}`)
    //         return data
    //     },
    //     enabled: !!user?.email
    // })

    // if (loading || isPending) return <LoadingSpinner />

    if(loading) return <LoadingSpinner />



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
            {/* <div>
                <StatisticsCard icon={FaBook} title={"Orders Booked"} amount={data?.pendingOrders?.length} bgColor={"bg-green-500"} />
            </div>

            <div>
                <StatisticsCard icon={GrBlog} title={"Total Delivered"} amount={data?.completedOrders?.length} bgColor={"bg-orange-500"} />
            </div> */}
            <h1 className="text-2xl font-bold">No Statistics Data Available Yet</h1>
        </div>
    )
}

export default GuestStatistics
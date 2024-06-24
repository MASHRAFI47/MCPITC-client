import { useQuery } from "@tanstack/react-query"
import { axiosSecure } from "../../../hooks/useAxiosSecure"
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner"
import AllEventsDataRow from "../../../components/Dashboard/TableRows/AllEventsDataRow"

const AllEvents = () => {
    const { data: events = [], isLoading, refetch } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/events")
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />
    console.log(events)
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Added By</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            events?.map(eve => <AllEventsDataRow key={eve?._id} eve={eve} refetch={refetch} />)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default AllEvents
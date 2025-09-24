import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { format } from 'date-fns'
import useAuth from "../../hooks/useAuth";

const EventSegmentDetails = () => {
    const { theme } = useAuth()
    const { id } = useParams()

    const axiosCommon = useAxiosCommon();

    const { data: segment, isLoading } = useQuery({
        queryKey: ['segment'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/segment-details/${id}`)
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />

    return (
        <section className={`min-h-screen ${theme === "" ? "bg-[#dee8f6]" : ""}`}>
            <div className="container mx-auto px-5 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="col-span-3">
                        <h2 className={`text-2xl ${theme === "" ? "text-black" : "text-gray-200"}`}><span className="font-bold text-[#0052cc]">Segment Name:</span> {segment?.segmentName}</h2>
                        <img src={segment?.image_url} className="w-full rounded-xl mt-5 mb-5 md:mb-0" alt="event segment picture" />
                    </div>
                    <div className="md:ml-10 md:mt-20 space-y-5">
                        <p className={`${theme === "" ? "text-black" : "text-gray-200"} text-xl`}><span className={`font-bold text-[#0052cc]`}>From:</span> {format(new Date(segment?.from), 'P')}</p>
                        <p className={`${theme === "" ? "text-black" : "text-gray-200"} text-xl`}><span className="font-bold text-[#0052cc]">To:</span> {format(new Date(segment?.to), 'P')}</p>
                    </div>
                </div>
                <div>
                    <p className={`${theme === "" ? "text-black" : "text-gray-200"} text-xl mt-10 whitespace-pre-wrap`}><span className="font-bold text-[#0052cc]">Description:</span> {segment?.description}</p>
                </div>
            </div>
        </section>
    )
}

export default EventSegmentDetails
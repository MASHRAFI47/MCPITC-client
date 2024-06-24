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

    console.log(segment)


    return (
        <section className={`min-h-screen ${theme === "" ? "bg-[#4C3BCF]" : ""}`}>
            <div className="container mx-auto px-5 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="col-span-3">
                        <h2 className="text-2xl text-white"><span className="font-bold text-[#3DC2EC]">Segment Name:</span> {segment?.segmentName}</h2>
                        <img src={segment?.image_url} className="w-full rounded-xl mt-5 h-[23rem] mb-5 md:mb-0" alt="" />
                    </div>
                    <div className="md:ml-10 md:mt-20">
                        <p className="text-white text-xl"><span className="font-bold text-[#3DC2EC]">From:</span> {format(new Date(segment?.from), 'P')}</p>
                        <p className="text-white text-xl"><span className="font-bold text-[#3DC2EC]">To:</span> {format(new Date(segment?.to), 'P')}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xl text-white mt-10"><span className="font-bold text-[#3DC2EC]">Description:</span> {segment?.description}</p>
                </div>
            </div>
        </section>
    )
}

export default EventSegmentDetails
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const EventSegments = () => {
    let i = 50;
    const { theme } = useAuth()
    const axiosCommon = useAxiosCommon()
    const { name: eventName } = useParams();

    const { data: segments = [], isLoading } = useQuery({
        queryKey: ['segments'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/segment/${eventName}`)
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />

    console.log(segments)

    return (
        <section className={`min-h-screen ${theme === "" ? "bg-[#dee8f6]" : ""}`}>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        segments?.map(segment => <div key={segment?._id} className="card bg-base-100 shadow-xl image-full" data-aos="flip-left" data-aos-delay={i += 50}>
                            <figure><img src={segment?.image_url} className="w-full h-[8rem]" alt={segment?.segmentName} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{segment?.segmentName}</h2>
                                <p>{segment?.description.length < 20 ? segment?.description : segment?.description.slice(0, 35).concat('...')}</p>
                                <div className="card-actions justify-end">
                                    <Link className="btn glass bg-[#4B70F5] hover:bg-[#ff3535] text-white" to={`/event-segment-details/${segment?._id}`}>Read More</Link>
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default EventSegments
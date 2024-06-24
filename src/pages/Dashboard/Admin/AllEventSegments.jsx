import { useMutation, useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { Link, useParams } from "react-router-dom";


//icons
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";



const AllEventSegments = () => {
    const { user } = useAuth();
    const { id: eventName } = useParams()

    const axiosSecure = useAxiosSecure();


    const { data: segments = [], isLoading, refetch } = useQuery({
        queryKey: ['segments', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/segment/${eventName}`)
            return data
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/segment/${id}`)
            return data
        },
        onSuccess: (data) => {
            toast.success("Segment Updated Successfully")
            refetch()
            console.log(data)
        }
    })


    if (isLoading) return <LoadingSpinner />



    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                mutateAsync(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }


    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    segments.length == 0 ?
                        <h1 className="text-2xl font-bold">No Segments Uploaded Yet</h1>
                        :
                        segments?.map(segment => <div key={segment?._id} className="card bg-base-100 shadow-xl image-full">
                            <figure><img src={segment?.image_url} className="w-full h-[8rem]" alt={segment?.segmentName} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{segment?.segmentName}</h2>
                                <p>{segment?.description.length < 20 ? segment?.description : segment?.description.slice(0, 35).concat('...')}</p>
                                <div className="card-actions justify-end">
                                    <Link className="btn glass bg-[#e92bde] hover:bg-[#ff3535] text-white" to={`/event-segment-details/${segment?._id}`}>View</Link>
                                    <Link to={`../update-event-segment/${segment?._id}`} className="btn btn-success text-white text-xl"><FaRegEdit /></Link>
                                    <button className="btn btn-error text-white text-xl" onClick={() => handleDelete(segment?._id)}><FaRegTrashAlt /></button>
                                </div>
                            </div>
                        </div>
                        )
                }
            </div>
        </div>
    )
}

export default AllEventSegments
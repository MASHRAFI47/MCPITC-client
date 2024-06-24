import { useForm } from "react-hook-form"

//
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { DateRange } from "react-date-range";
import { useEffect, useState } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../hooks/imageUpload";
import toast from "react-hot-toast";

const UpdateEventSegment = () => {
    // const [isImageUpload, setIsImageUpload] = useState("")
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();

    const { id } = useParams();

    const { data: eve } = useQuery({
        queryKey: ['eve', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/segment-details/${id}`)
            return data
        }
    })


    const { mutateAsync } = useMutation({
        mutationFn: async (segmentData) => {
            const { data } = await axiosSecure.put(`/segment-details/${id}`, segmentData)
            return data
        },
        onSuccess: (data) => {
            toast.success("Event Updated Successfully")
            console.log(data)
            setLoading(false)
        }
    })


    const [loading, setLoading] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(eve?.from),
            endDate: new Date(eve?.to),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        setDates([
            {
                startDate: new Date(eve?.from),
                endDate: new Date(eve?.to),
                key: 'selection'
            }
        ])
    }, [eve?.from, eve?.to]);



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const response = await fetch(`https://mcpitc-server.vercel.app/segment-details/${id}`)
            const data = await response.json();
            return {
                eventName: data?.eventName,
                segmentName: data?.segmentName,
                description: data?.description
            }
        }
    })

    const onSubmit = async (data) => {
        setLoading(true)
        const { eventName, segmentName, description, image } = data;
        const displayImage = image[0];

        //edit image handle
        let imageUrl;

        if (displayImage) {
            imageUrl = await imageUpload(displayImage)
        }

        const picture = imageUrl ? imageUrl : eve?.image_url;
        console.log(picture)

        mutateAsync({ eventName, segmentName, description, image_url: picture, from: dates[0].startDate, to: dates[0].endDate, updateTimestamp: Date.now() })
    }

    // const handleImageUpload = async () => {
    //     await imageUpload(displayImage)
    // }

    const { data: events = [], isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/events')
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />



    return (
        <div>
            <div className="card shrink-0 w-full max-w-3xl shadow-2xl bg-base-100 border mx-auto">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-bold text-center">Update Event Segment</h1>
                    <p className="text-center mb-2 md:mb-5">Set details for upcoming event segment</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Select Event Name*</span>
                            </label>
                            <select className="select select-bordered w-full"  {...register("eventName", { required: true })}>
                                <option disabled>Select Event Name</option>
                                {
                                    events?.map(eve => <option key={eve?._id}>{eve?.name}</option>)
                                }
                            </select>
                            {errors.eventName && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Segment Name*</span>
                            </label>
                            <input type="text" placeholder="Programming Contest" className="input input-bordered" {...register("segmentName", { required: true })} />
                            {errors.segmentName && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="label">
                                <span className="label-text font-bold">Select Date Range*</span>
                            </label>
                            <DateRange
                                rangeColors={["#e92bde"]}
                                editableDateInputs={true}
                                onChange={item => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                            />
                        </div>

                        <div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-bold">Upload Segment Image*</span>
                                </label>
                                <input type="file" className="file-input file-input-bordered w-full" accept="image/*" {...register("image")} />
                                {errors.image && <span className="text-red-600">This field is required</span>}
                            </div>


                            <div>
                                <label className="label">
                                    <span className="label-text font-bold">Segment Description*</span>
                                </label>
                                <textarea className="textarea textarea-bordered w-full" rows={10} placeholder="write here..." {...register("description", { required: true })}></textarea>
                                {errors.description && <span className="text-red-600">This field is required</span>}
                            </div>
                        </div>
                    </div>




                    <div className="form-control mt-6">
                        <button className="btn glass bg-[#e92bde] hover:bg-[#ff3535] text-white" disabled={loading}>Update {loading ? <CgSpinnerTwoAlt className="animate-spin" /> : ""}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateEventSegment
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner"

//date
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from "react";
import { imageUpload } from "../../../hooks/imageUpload";
import toast from "react-hot-toast";

//react icons
import { CgSpinnerTwoAlt } from "react-icons/cg";

const AddEventSegment = () => {
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const [dates, setDates] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    );
    console.log(dates.endDate)

    const handleDates = item => {
        console.log(item)
        setDates(item.selection)
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()


    //get all events
    const { data: events = [], isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/events')
            return data
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (segment) => {
            const { data } = await axiosSecure.post('/event-segment', segment)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Event Segment Added Successfully")
            setLoading(false)
        }
    })

    if (isLoading) return <LoadingSpinner />


    const onSubmit = async (data) => {
        setLoading(true)
        const { eventName, segmentName, image, description } = data;

        const displayImage = image[0];

        const picture = await imageUpload(displayImage)

        await mutateAsync({ eventName, segmentName, image_url: picture, description, from: dates.startDate, to: dates.endDate })
        reset()
    }
    return (
        <div>
            <div className="card shrink-0 w-full max-w-3xl shadow-2xl bg-base-100 border mx-auto">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-bold text-center">Add Event Segment</h1>
                    <p className="text-center mb-2 md:mb-5">Set details for upcoming event segment</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Select Event Name*</span>
                            </label>
                            <select className="select select-bordered w-full" {...register("eventName", { required: true })}>
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
                                rangeColors={['#e92bde']}
                                editableDateInputs={true}
                                onChange={item => handleDates(item)}
                                moveRangeOnFirstSelection={false}
                                ranges={[dates]}
                            />
                        </div>

                        <div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-bold">Upload Segment Image*</span>
                                </label>
                                <input type="file" className="file-input file-input-bordered w-full" {...register("image", { required: true })} />
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
                        <button className="btn glass bg-[#e92bde] hover:bg-[#ff3535] text-white" disabled={loading}>Add {loading ? <CgSpinnerTwoAlt className="animate-spin" /> : ""}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEventSegment
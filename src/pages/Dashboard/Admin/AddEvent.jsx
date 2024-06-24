import { useForm } from "react-hook-form"
import { DateRange } from 'react-date-range';
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { imageUpload } from "../../../hooks/imageUpload";
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
//react icons
import { CgSpinnerTwoAlt } from "react-icons/cg";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const AddEvent = () => {
    const navigate = useNavigate()
    const { user } = useAuth();
    const [loading, setLoading] = useState(false)
    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async (event) => {
            const { data } = await axiosSecure.post('/events', event)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Event Added Successfully");
            setLoading(false);
            navigate('/dashboard/all-events')
        }
    })

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true)
        // console.log({ ...data, from: date[0].startDate, to: date[0].endDate })
        const { name, image, description } = data;
        const displayImage = image[0];

        const picture = await imageUpload(displayImage);
        console.log(picture)
        await mutateAsync({ userName: user?.displayName, name, description, image_url: picture, from: date[0].startDate, to: date[0].endDate, timestamp: Date.now() })
    }


    return (
        <div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto border">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-bold text-center">Add Event</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Event Name</span>
                        </label>
                        <input type="text" placeholder="CyberSprint" className="input input-bordered" {...register("name", { required: true })} />
                        {errors.name && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Event Description</span>
                        </label>
                        <input type="text" placeholder="Add short description for this event..." className="input input-bordered" {...register("description", { required: true })} />
                        {errors.description && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register("image", { required: true })} />
                        {errors.image && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <DateRange
                            rangeColors={["#e92bde"]}
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn glass bg-[#e92bde] text-white" disabled={loading}>Add {loading ? <CgSpinnerTwoAlt className="animate-spin" /> : ""}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEvent
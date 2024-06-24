import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { CgSpinnerTwoAlt } from "react-icons/cg";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "../../../hooks/imageUpload";
import useAuth from "../../../hooks/useAuth";

const AddBlog = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)

    const { mutateAsync } = useMutation({
        mutationFn: async (blog) => {
            const { data } = await axiosSecure.post('/blogs', blog)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Blog Added Successfully")
            setLoading(false)
        }
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true)
        const { title, description, image } = data;
        const displayImage = image[0];
        const picture = await imageUpload(displayImage)
        reset()
        mutateAsync({ publisher: user?.displayName, title, description, image_url: picture, timestamp: Date.now() })
    }
    return (
        <div>
            <div className="card shrink-0 w-full max-w-2xl shadow-2xl bg-base-100 mx-auto border">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-bold text-center">Add Blog</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Blog Title</span>
                        </label>
                        <input type="text" placeholder="title" className="input input-bordered" {...register("title", { required: true })} />
                        {errors.title && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Blog Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered" placeholder="write here..." rows={6} {...register("description", { required: true })}></textarea>
                        {errors.description && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full" {...register("image", { required: true })} />
                        {errors.image && <span className="text-red-600">This field is required</span>}
                    </div>


                    <div className="form-control mt-6">
                        <button className="btn glass bg-[#e92bde] hover:bg-[#ff3535] text-white" disabled={loading}>Add {loading ? <CgSpinnerTwoAlt className="animate-spin" /> : ""}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBlog
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { imageUpload } from "../../../hooks/imageUpload";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const UpdateBlog = () => {
    const { user } = useAuth()
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()
    const { id } = useParams();
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {

            //method-1 (using direct fetch)
            // return fetch(`https://mcpitc-server.vercel.app/blog/${id}`)
            //     .then(res => res.json())
            //     .then(data => {
            //         return {
            //             title: data.title
            //         }
            //     })

            // method-2(using async await)
            const response = await fetch(`${import.meta.env.VITE_Api_Url}/blog/${id}`);
            const data = await response.json();
            return {
                title: data?.title,
                description: data?.description,
            }
        },
    })


    const onSubmit = async (data) => {
        setLoading(true)
        const { title, description, image } = data;
        //

        const displayImage = image[0];

        //handle image update
        let imageUrl;
        if (displayImage) {
            imageUrl = await imageUpload(displayImage)
        }
        const picture = imageUrl ? imageUrl : blog?.image_url

        mutateAsync({ title, description, image_url: picture, updateTimestamp: Date.now() })
    }


    const { data: blog, isLoading, refetch } = useQuery({
        queryKey: ['blogs', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/blog/${id}`)
            return data
        }
    })


    const { mutateAsync } = useMutation({
        mutationFn: async (blogData) => {
            const { data } = await axiosSecure.put(`/blog/${id}`, blogData)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Blog Updated Successfully")
            reset()
            setLoading(false)
            refetch()
            navigate('/dashboard/all-blogs')
        },
        onError: (data) => {
            console.log(data)
            setLoading(false)
        }
    })

    if (isLoading) return <LoadingSpinner />







    return (
        <div>
            <div className="card shrink-0 w-full max-w-2xl shadow-2xl bg-base-100 mx-auto border">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-bold text-center">Update Blog</h1>
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
                        <input type="file" className="file-input file-input-bordered w-full" {...register("image")} />
                        {errors.image && <span className="text-red-600">This field is required</span>}
                    </div>


                    <div className="form-control mt-6">
                        <button className="btn glass bg-[#e92bde] hover:bg-[#ff3535] text-white" disabled={loading}>Update {loading ? <CgSpinnerTwoAlt className="animate-spin" /> : ""}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateBlog
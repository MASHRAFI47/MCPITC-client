import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { imageUpload } from '../../../hooks/imageUpload';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import PropTypes from 'prop-types';


const UpdateBlogModal = ({ blogData, setBlogData }) => {
    console.log(blogData)
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const { mutateAsync } = useMutation({
        mutationFn: async (blog) => {
            const { data } = await axiosSecure.put(`/blog/${blog?._id}`)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Blog Updated Successfully")
            reset()
            setLoading(false)
        },
        onError: (data) => {
            toast.error(data.message)
            setLoading(false)
        }
    })

    const onSubmit = async (data) => {
        const { title, description, image } = data;
        const displayImage = image[0];
        const picture = await imageUpload(displayImage)
        setLoading(true)
        console.log(data)
        await mutateAsync({ title, description, image_url: picture })
    }

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 text-red-600">✕</button>
                </form>

                <div className="card shrink-0 w-full max-w-2xl shadow-2xl bg-base-100 mx-auto border">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-2xl font-bold text-center">Update Blog</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Blog Title</span>
                            </label>
                            <input type="text" placeholder="title" value={blogData?.title} onChange={e => setBlogData({ ...blogData, title: e.target.title })} className="font-normal input input-bordered" {...register("title", { required: true })} />
                            {errors.title && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Blog Description</span>
                            </label>
                            <textarea className="textarea textarea-bordered" value={blogData?.description} onChange={(e) => setBlogData({ ...blogData, description: e.target.description })} placeholder="write here..." rows={6} {...register("description", { required: true })}></textarea>
                            {errors.description && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input type="file" accept="image/*" className="file-input file-input-bordered w-full" {...register("image", { required: true })} />
                            {errors.image && <span className="text-red-600">This field is required</span>}
                        </div>


                        <div className="form-control mt-6">
                            <button className="btn glass bg-[#e92bde] hover:bg-[#ff3535] text-white" disabled={loading}>Add {loading ? <CgSpinnerTwoAlt className="animate-spin" /> : ""}</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

UpdateBlogModal.propTypes = {
    blogData: PropTypes.object,
    setBlogData: PropTypes.func
}

export default UpdateBlogModal
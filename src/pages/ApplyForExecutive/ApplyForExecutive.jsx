import { useForm } from "react-hook-form"
import useAuth from "../../hooks/useAuth"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import toast from "react-hot-toast";
import { useState } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const ApplyForExecutive = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const { user, loading } = useAuth();
    const axiosCommon = useAxiosCommon();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()


    const { mutateAsync } = useMutation({
        mutationFn: async (executiveData) => {
            const { data } = await axiosCommon.post("/executiveFormCollection", executiveData)
            return data
        },
        onSuccess: (data) => {
            toast.success("Form submitted successfully. Edit options are available in dashboard")
            console.log(data)
            reset();
            setBtnLoading(false);
        },
        onError: (error) => {
            console.log(error.message)
            toast.error("Already submitted, please wait for admin to finalize")
            setBtnLoading(false)
        }
    })


    const onSubmit = async (data) => {
        setBtnLoading(true);
        const userData = {
            fullName: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
        }
        await mutateAsync({...data, ...userData})
    }


    if (loading) return <LoadingSpinner />

    return (
        <div className="">
            <div className="container mx-auto py-20">
                <p className="text-red-500 text-center w-full mb-2">N.B: Only fill the form if you want to become an executive</p>
                <div className="card shrink-0 w-full max-w-2xl shadow-2xl bg-base-100 mx-auto border">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-2xl font-bold text-center mb-5">Apply For Executive</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Why do you want to become an executive?</span>
                            </label>
                            <input type="text" placeholder="write a reason" className="input input-bordered" {...register("whyExecutive", { required: true })} />
                            {errors.whyExecutive && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">How many hours per week can you commit to club activities?</span>
                            </label>
                            <input type="text" placeholder="type in hours" className="input input-bordered" {...register("howManyHours", { required: true })} />
                            {errors.howManyHours && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">What technical skills do you have?</span>
                            </label>
                            <input type="text" placeholder="technical skills like programming, graphics designing" className="input input-bordered" {...register("techSkills", { required: true })} />
                            {errors.techSkills && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Do you have prior experience in clubs/organizations? If yes briefly describe your role</span>
                            </label>
                            <textarea className="textarea textarea-bordered" placeholder="write here..." rows={2} {...register("experience", { required: true })}></textarea>
                            {errors.experience && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Rate your leadership, teamwork, and communication skills (1–5)</span>
                            </label>
                            <input type="text" placeholder="1 to 5" className="input input-bordered" {...register("rate", { required: true })} />
                            {errors.rate && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Do you have github? (if yes, provide your profile link and best two repositories link) </span>
                            </label>
                            <textarea className="textarea textarea-bordered" placeholder="Share link..." rows={2} {...register("githubProfile", { required: true })}></textarea>
                            {errors.githubProfile && <span className="text-red-600">This field is required</span>}
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Do you have any awards or certificates? (if yes, provide google drive link) </span>
                            </label>
                            <textarea className="textarea textarea-bordered" placeholder="Share link..." rows={2} {...register("awards", { required: true })}></textarea>
                            {errors.awards && <span className="text-red-600">This field is required</span>}
                        </div>


                        <div className="form-control mt-6">
                            <button className="btn glass bg-[#e92bde] hover:bg-[#ff3535] text-white" disabled={btnLoading}>Add {btnLoading ? <CgSpinnerTwoAlt className="animate-spin" /> : ""}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ApplyForExecutive
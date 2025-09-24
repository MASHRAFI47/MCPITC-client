import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import Swal from "sweetalert2";

const RecruitDataRow = ({ recruit, refetch }) => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [currentEmail, setCurrentEmail] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const axiosCommon = useAxiosCommon();
    const axiosSecure = useAxiosSecure();


    const { data: recruitData, isLoading } = useQuery({
        queryKey: ['recruitData', recruit?._id],
        queryFn: async () => {
            const { data } = await axiosCommon(`/executiveFormCollection/${recruit?._id}`)
            return data
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (designationData) => {
            const { data } = await axiosSecure.patch(`/user/designation/${currentEmail}`, designationData);
            const { delData } = await axiosSecure.delete(`/executiveFormCollection/${currentEmail}`)
            return { data, delData };
        },
        onSuccess: (data) => {
            toast.success("Designation Updated Successfully");
            refetch();
            setBtnLoading(false);
        },
        onError: (err) => {
            toast.error(err.message);
            setBtnLoading(false);
        }
    })


    if (isLoading) return <LoadingSpinner />


    const handleRecruit = (userEmail) => {
        setCurrentEmail(userEmail)
        document.getElementById(`recruitModal_${recruit?._id}`).showModal()
    }

    const handleDelete = (userEmail) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/executiveFormCollection/${userEmail}`)
                refetch();

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }


    const onSubmit = (data) => {
        if (!currentEmail) return toast.error("No email selected");
        setBtnLoading(true);
        const { designation } = data;
        mutateAsync({ designation });
    }



    return (
        <>
            <tr>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                    src={recruit?.image}
                                    alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{recruit?.fullName}</div>
                        </div>
                    </div>
                </td>
                <td>
                    {recruit?.email}
                </td>
                <td className="space-y-2 md:space-x-2">
                    <button className="btn btn-primary btn-xs" onClick={() => document.getElementById(`my_modal_3_${recruitData?._id}`).showModal()}>View</button>

                    {/* View Modal */}
                    <dialog id={`my_modal_3_${recruit?._id}`} className="modal">
                        <div className="modal-box">
                            <button onClick={() => document.getElementById(`my_modal_3_${recruitData?._id}`).close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <form className="space-y-5">
                                <h1 className="text-2xl font-bold text-center mb-5">Recruit For Executive</h1>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Email</span>
                                    </label>
                                    <input type="text" placeholder="write a reason" defaultValue={recruitData?.email} className="input input-bordered" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Why do you want to become an executive?</span>
                                    </label>
                                    <input type="text" placeholder="write a reason" defaultValue={recruitData?.whyExecutive} className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">How many hours per week can you commit to club activities?</span>
                                    </label>
                                    <input type="text" placeholder="type in hours" defaultValue={recruitData?.howManyHours} className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">What technical skills do you have?</span>
                                    </label>
                                    <input type="text" className="input input-bordered" defaultValue={recruitData?.techSkills} placeholder="technical skills like programming, graphics designing" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Do you have prior experience in clubs/organizations? If yes briefly describe your role</span>
                                    </label>
                                    <textarea className="textarea textarea-bordered" defaultValue={recruitData?.experience} placeholder="write here..." rows={2}></textarea>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Rate your leadership, teamwork, and communication skills (1–5)</span>
                                    </label>
                                    <input type="text" placeholder="1 to 5" defaultValue={recruitData?.rate} className="input input-bordered" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Do you have github? (if yes, provide your profile link and best two repositories link) </span>
                                    </label>
                                    <textarea className="textarea textarea-bordered" defaultValue={recruitData?.githubProfile} placeholder="Share link..." rows={2}></textarea>
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Do you have any awards or certificates? (if yes, provide google drive link) </span>
                                    </label>
                                    <textarea className="textarea textarea-bordered" defaultValue={recruitData?.awards} placeholder="Share link..." rows={2}></textarea>
                                </div>


                                {/* <div className="form-control mt-6">
                                    <button className="btn glass bg-[#e92bde] hover:bg-[#ff3535] text-white" disabled={btnLoading}>Recruit {btnLoading ? <CgSpinnerTwoAlt className="animate-spin" /> : ""}</button>

                                    <RecruitExecutiveModal isOpen={isOpen} open={open} close={close} recruitEmail={recruit?.email} />
                                </div> */}
                            </form>
                        </div>
                    </dialog>


                    {/* Recruit Button */}
                    <button className="btn btn-success text-white btn-xs" onClick={() => handleRecruit(recruit?.email)}>Recruit</button>
                    <dialog id={`recruitModal_${recruit?._id}`} className="modal">
                        <div className="modal-box">
                            <button onClick={() => document.getElementById(`recruitModal_${recruit?._id}`).close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <h3 className="font-bold text-lg text-center">Choose Designation</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="md:flex items-center justify-center gap-5 mt-3">
                                <select className="select select-bordered w-full max-w-xs" {...register("designation", { required: true })} >
                                    <option disabled selected>Member</option>
                                    <option value={"Moderator"}>Moderator</option>
                                    <option value={"Advisor"}>Advisor</option>
                                    <option value="President">President</option>
                                    <option value="Vice President">Vice President</option>
                                    <option value="Secretary">Secretary</option>
                                    <option value="Assistant Secretary">Assistant Secretary</option>
                                    <option value="Joint Secretary">Joint Secretary</option>
                                    <option value="IT Head">IT Head</option>
                                    <option value="Treasurer">Treasurer</option>
                                    <option value="Organizing Secretary">Organizing Secretary</option>
                                    <option value="Assistant Organizing Secretary">Assistant Organizing Secretary</option>
                                    <option value="Field Manager">Field Manager</option>
                                    <option value="Content Manager">Content Manager</option>
                                    <option value="Public Relations Officer">Public Relations Officer</option>
                                    <option value="Information Technology Officer">Information Technology Officer</option>
                                    <option value="Designer">Designer</option>
                                    <option value="Executive">Executive</option>
                                    <option value="IT Officer">IT Officer</option>
                                </select>
                                {errors.designation && <span>This field is required</span>}

                                <div className="form-control">
                                    <button className="btn glass bg-[#e92bde] hover:bg-[#ff3535] text-white" disabled={btnLoading}>Set {btnLoading ? <CgSpinnerTwoAlt className="animate-spin" /> : ""}</button>
                                </div>
                            </form>
                        </div>
                    </dialog>


                    {/* Delete Button */}
                    <button className="btn btn-error text-white btn-xs" onClick={() => handleDelete(recruit?.email)}>Delete</button>
                </td>
            </tr>
        </>
    )
}

export default RecruitDataRow
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import RecruitDataRow from "../../../components/Dashboard/TableRows/RecruitDataRow";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

const Recruit = () => {
    const [btnLoading, setBtnLoading] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: recruitForm, isLoading, refetch } = useQuery({
        queryKey: ['recruitForm'],
        queryFn: async () => {
            const { data } = await axiosSecure("/executiveFormCollection")
            return data
        }
    })

    const handleRecruitment = () => {
        document.getElementById('recruitmentModal').showModal()
    }


    const { mutateAsync } = useMutation({
        mutationFn: async (stat) => {
            const { data } = await axiosSecure.put(`/recruitment-onOff`, { status: stat });
            return data;
        },
        onSuccess: (data) => {
            console.log(data);
            toast.success("Successful")
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })


    const onSubmit = (data) => {
        const { onOff } = data;
        mutateAsync({ onOff })
    }


    if (isLoading || loading) return <LoadingSpinner />

    return (
        <section className="">
            <button className="btn btn-warning" onClick={handleRecruitment}>Turn on or off Recruitment</button>
            {/* recruitment button modal */}
            <dialog id="recruitmentModal" className="modal">
                <div className="modal-box">
                    <button onClick={() => document.getElementById(`recruitmentModal`).close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg text-center">Choose On or Off</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="md:flex items-center justify-center gap-5 mt-3">
                        <select className="select select-bordered w-full max-w-xs" {...register("onOff", { required: true })} >
                            <option value={"off"}>off</option>
                            <option value={"on"}>on</option>
                        </select>

                        {errors.onOff && <span>This field is required</span>}

                        <div className="form-control">
                            <button className="btn glass bg-[#e92bde] hover:bg-[#ff3535] text-white" disabled={btnLoading}>Set {btnLoading ? <CgSpinnerTwoAlt className="animate-spin" /> : ""}</button>
                        </div>
                    </form>
                </div>

            </dialog>



            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recruitForm?.length === 0 && <p className="text-red-600 text-xl">No one available to recruit</p>}

                        {
                            recruitForm?.map(recruit => <RecruitDataRow recruit={recruit} key={recruit._id} refetch={refetch} />)
                        }
                    </tbody>

                </table>
            </div>
        </section>
    )
}

export default Recruit
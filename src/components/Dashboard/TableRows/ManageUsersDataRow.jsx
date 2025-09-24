import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ManageUsersDataRow = ({ user, refetch }) => {
    const [btnLoading, setBtnLoading] = useState(false)
    const [userID, setUserID] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const axiosSecure = useAxiosSecure()


    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.patch(`/user/${id}`, { role: "admin" })
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            refetch()
        }
    })

    const handleDesignation = (userId) => {
        setUserID(userId)
        document.getElementById(`designationModal_${userId}`).showModal()
    }


    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                mutateAsync(id)
                Swal.fire({
                    title: "Successful!",
                    text: "User has been updated.",
                    icon: "success"
                });
            }
        });
    }


    const { mutateAsync: mutateDesignation} = useMutation({
        mutationFn: async (designation) => {
            const { data } = await axiosSecure.patch(`/user/${userID}`, designation)
            return data
        },
        onSuccess: (data) => {
            refetch()
            toast.success("Designation updated successfully")
            setBtnLoading(false)
        },
        onError: (err) => {
            toast.error(err.message)
            setBtnLoading(false)
        }
    })

    const onSubmit = (data) => {
        setBtnLoading(true)
        console.log(userID)
        mutateDesignation(data)
    }

    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={user?.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{user?.name}</div>
                    </div>
                </div>
            </td>
            <td>
                {user?.email}
                <br />
            </td>
            <td>{user?.role}</td>
            <td><button className='btn btn-primary btn-xs' onClick={() => handleDesignation(user?._id)}>{user?.designation ? user?.designation : "member"}</button></td>



            <th>
                <button className="btn glass btn-xs bg-green-500 hover:bg-green-600 text-white" onClick={() => handleMakeAdmin(user?._id)} disabled={user?.role === "admin"}>Make Admin</button>
            </th>


            {/* designation modal */}
            <dialog id={`designationModal_${user?._id}`} className="modal">
                <div className="modal-box">
                    <button onClick={() => document.getElementById(`designationModal_${user?._id}`).close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
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
                            <option value="member">member</option>


                            <option value="Former President">Former President</option>
                            <option value="Former Vice President">Former Vice President</option>
                            <option value="Former Secretary">Former Secretary</option>
                            <option value="Former Assistant Secretary">Former Assistant Secretary</option>
                            <option value="Former Joint Secretary">Former Joint Secretary</option>
                            <option value="Former IT Head">Former IT Head</option>
                            <option value="Former Treasurer">Former Treasurer</option>
                            <option value="Former Organizing Secretary">Former Organizing Secretary</option>
                            <option value="Former Assistant Organizing Secretary">Former Assistant Organizing Secretary</option>
                            <option value="Former Field Manager">Former Field Manager</option>
                            <option value="Former Content Manager">Former Content Manager</option>
                            <option value="Former Public Relations Officer">Former Public Relations Officer</option>
                            <option value="Former Information Technology Officer">Former Information Technology Officer</option>
                            <option value="Former Designer">Former Designer</option>
                            <option value="Former Executive">Former Executive</option>
                            <option value="Former IT Officer">Former IT Officer</option>
                        </select>
                        {errors.designation && <span>This field is required</span>}

                        <div className="form-control">
                            <button className="btn glass bg-[#e92bde] hover:bg-[#ff3535] text-white" disabled={btnLoading}>Set {btnLoading ? <CgSpinnerTwoAlt className="animate-spin" /> : ""}</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </tr>
    )
}

ManageUsersDataRow.propTypes = {
    user: PropTypes.object,
    refetch: PropTypes.func
}

export default ManageUsersDataRow
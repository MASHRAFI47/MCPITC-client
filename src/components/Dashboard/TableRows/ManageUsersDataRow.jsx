import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';

const ManageUsersDataRow = ({ user, refetch }) => {
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
            <th>
                <button className="btn glass btn-xs bg-green-500 hover:bg-green-600 text-white" onClick={() => handleMakeAdmin(user?._id)} disabled={user?.role === "admin"}>Make Admin</button>
            </th>
        </tr>
    )
}

ManageUsersDataRow.propTypes = {
    user: PropTypes.object,
    refetch: PropTypes.func
}

export default ManageUsersDataRow
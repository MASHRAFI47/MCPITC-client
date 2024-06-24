import moment from 'moment';
import PropTypes from 'prop-types';
import { format } from "date-fns";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const AllEventsDataRow = ({ eve, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/event/${id}`)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            refetch()
            toast.success("Event Deleted Successfully")
        }
    })

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            mutateAsync(id)
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
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
                            <img src={eve?.image_url} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{eve?.name}</div>
                        <div className="text-sm opacity-50">{eve?.timestamp ? moment(eve?.timestamp).format('MMMM Do YYYY, h:mm:ss a') : null}</div>
                    </div>
                </div>
            </td>
            <td>
                {eve?.userName}
                <br />
            </td>
            <td>{format(new Date(eve?.from), "P")}</td>
            <td>{format(new Date(eve?.to), "P")}</td>
            <th className=''>
                <Link to={`../all-event-segments/${eve?.name}`} className="btn btn-success text-white btn-xs mr-2">Edit</Link>
                <button className="btn btn-error text-white btn-xs" onClick={() => handleDelete(eve?._id)}>Delete</button>
            </th>
        </tr>
    )
}

AllEventsDataRow.propTypes = {
    eve: PropTypes.object,
    refetch: PropTypes.func
}

export default AllEventsDataRow
import moment from 'moment';
import PropTypes from 'prop-types';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// import { useState } from 'react';
// import UpdateBlogModal from '../Modal/UpdateBlogModal';


const AllBlogsDataRow = ({ blog, refetch }) => {
    // const [blogData, setBlogData] = useState(blog)

    const handleDelete = (blogId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://mcpitc-server.vercel.app/blog/${blogId}`, {
                    credentials: "include",
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        refetch()
                    })

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }


    //handle image update
    // const handleImage = async image => {
    //     try {
    //         const picture = await imageUpload(image)
    //         setBlogData({ ...blogData, image_url: picture })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={blog?.image_url} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{blog?.title}</div>
                        <div className="text-sm opacity-50"> Last Updated: {blog?.updateTimestamp ? moment(blog?.updateTimestamp).format('MMMM Do YYYY, h:mm:ss a') : "No updates yet"}</div>
                    </div>
                </div>
            </td>
            <td>
                {blog?.publisher}
                <br />
                {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
            </td>
            <td>{moment(blog?.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <th>
                <Link className="btn btn-ghost text-green-600 text-xl" to={`../update-blog/${blog?._id}`}>
                    <FaRegEdit />
                </Link>


                {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>Edit</button>
                <UpdateBlogModal blogData={blogData} setBlogData={setBlogData} /> */}


                <button className="btn btn-ghost text-red-600 text-xl" onClick={() => handleDelete(blog?._id)}><FaRegTrashCan /></button>
            </th>
        </tr>
    )
}

AllBlogsDataRow.propTypes = {
    blog: PropTypes.object,
    refetch: PropTypes.func,
}

export default AllBlogsDataRow
import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import AllBlogsDataRow from "../../../components/Dashboard/TableRows/AllBlogsDataRow"

const AllBlogs = () => {
    const axiosSecure = useAxiosSecure()
    const { data: blogs = [], isLoading, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/blogs')
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Publisher</th>
                            <th>Published Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(blogs) ? blogs?.map(blog => <AllBlogsDataRow key={blog._id} blog={blog} refetch={refetch} />) : null
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default AllBlogs
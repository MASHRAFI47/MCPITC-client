import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ManageUsersDataRow from "../../../components/Dashboard/TableRows/ManageUsersDataRow";

const ManageUsers = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users')
            return data
        },
        enabled: !!user?.email,
    })

    if (loading || isLoading) return <LoadingSpinner />

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Designation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            users?.map(user => <ManageUsersDataRow key={user?._id} user={user} refetch={refetch} />)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default ManageUsers
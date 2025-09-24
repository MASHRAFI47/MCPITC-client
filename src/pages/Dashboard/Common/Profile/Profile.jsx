import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";

const Profile = () => {
    const { user, loading, resetPassword, emailVerification } = useAuth();

    const handleResetPass = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Send!"
        }).then((result) => {
            if (result.isConfirmed) {
                resetPassword(user?.email)
                Swal.fire({
                    title: "Success!",
                    text: "Check your Email",
                    icon: "success"
                });
            }
        });
    }


    const handleVerifyEmail = () => {
        try {
            emailVerification()
            toast.success("Email Verification Link sent to your mail")
        } catch (error) {
            toast.error(error.message)
        }
    }

    if (loading) return <LoadingSpinner />

    return (
        <div>

            <title>MCPIC | Profile</title>
            <meta name="profile" content="mcpic profile" />
            <link rel="canonical" href="https://mcpic.com/profile" />

            <div className="h-screen block md:flex items-center justify-center">
                <div className="card bg-[#031848] w-96 shadow-sm p-5">
                    <h1 className="text-center font-semibold text-2xl mb-2 text-gray-200">USER PROFILE</h1>
                    <figure>
                        <div className="w-full flex justify-center">
                            <img
                                src={user?.photoURL} className="object-cover w-44 rounded-full h-44"
                                alt="Shoes" />
                        </div>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-gray-200">{user?.displayName}</h2>
                        <p className="text-gray-200">{user?.email}</p>
                        <div className="card-actions">
                            <button onClick={handleResetPass} className="btn glass bg-[#4B70F5] hover:bg-[#ff3535] text-white transition-all ease-in-out duration-200">Reset Password</button>
                            {!user?.emailVerified && <button onClick={handleVerifyEmail} className="btn glass bg-[#4B70F5] hover:bg-[#ff3535] text-white transition-all ease-in-out duration-200">Verify Email</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
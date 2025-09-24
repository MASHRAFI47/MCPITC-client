import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import toast from "react-hot-toast"
import axios from "axios"
import ForgetPassModal from "../../components/Modals/ForgetPassModal/ForgetPassModal"
import { useState } from "react"
// import axios from "axios"


const Login = () => {
    const [isOpen, setIsOpen] = useState(false)

    // const { user } = useAuth();
    const navigate = useNavigate()
    const { signInUser } = useAuth()

    const loginForm = useForm();
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: loginErrors },
    } = loginForm

    const loginSubmit = (data) => {
        const { email, password } = data;
        signInUser(email, password)
            .then(result => {
                toast.success("Sign In Successful")
                navigate('/')
                const user = { email }
                axios.post(`${import.meta.env.VITE_Api_Url}/jwt`, user, {
                    withCredentials: true
                })
                    .then(res => console.log(res.data))
                console.log(result.user)
            })
            .catch(error => {
                console.log(error.message)
                toast.error("Invalid email or password")
            })
    }


    const open = () => {
        setIsOpen(true)
    }

    const close = () => {
        setIsOpen(false)
    }



    return (
        <section className="min-h-screen flex flex-col items-center justify-center">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border mx-auto">
                <form className="card-body" onSubmit={handleSubmitLogin(loginSubmit)}>
                    <h1 className="text-2xl font-bold text-center">Sign In</h1>
                    <p className="text-center text-neutral-500">Sign in to access your account</p>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" {...registerLogin("email", { required: true })} />
                        {loginErrors.email && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" {...registerLogin("password", { required: true })} />
                        {loginErrors.password && <span className="text-red-600">This field is required</span>}
                        <label className="label">
                            <span onClick={() => setIsOpen(true)} className="label-text-alt link link-hover">Forgot password?</span>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn glass bg-[#4B70F5] hover:bg-[#ff3535] text-white">Login</button>
                    </div>

                </form>

                <ForgetPassModal open={open} close={close} isOpen={isOpen} />


                <p className="text-center mb-10">New user? <Link to={'/register'} className="font-bold hover:text-red-600">Register Now</Link></p>

            </div>
        </section>
    )
}

export default Login
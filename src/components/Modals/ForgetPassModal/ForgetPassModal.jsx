import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form"
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgetPassModal = ({ open, close, isOpen }) => {
    const { resetPassword } = useAuth();
    const forgetPassForm = useForm();
    const [loading, setLoading] = useState(false);

    const {
        register: forgetPassRegister,
        handleSubmit: forgetPassHandleSubmit,
        formState: { errors: forgetPassErrors },
    } = forgetPassForm

    const forgetPassOnSubmit = async (data) => {
        try {
            setLoading(true);
            const { email } = data
            await resetPassword(email)
            toast.success("Password reset mail has been sent. Please check your inbox and spam")
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }

    return (
        <div>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-[#031848] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >

                            <DialogTitle as="h3" className="text-base/7 mb-2 font-medium text-white">
                                Please Type Your Email
                            </DialogTitle>
                            <form onSubmit={forgetPassHandleSubmit(forgetPassOnSubmit)}>
                                <div className="form-control">
                                    {/* <label className="label">
                                        <span className="label-text">Email</span>
                                    </label> */}
                                    <input type="email" placeholder="email" className="input input-bordered" {...forgetPassRegister("email", { required: true })} />
                                    {forgetPassErrors.email && <span className="text-red-600">This field is required</span>}
                                </div>

                                <div className="form-control mt-6">
                                    <button type="submit" className="btn glass md:w-3/12 bg-[#4B70F5] hover:bg-[#ff3535] text-white" disabled={loading}>Login</button>
                                </div>

                            </form>
                            {/* <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    onClick={close}
                                >
                                    Got it, thanks!
                                </Button>
                            </div> */}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default ForgetPassModal
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

import Lottie from "lottie-react";
import contactAnimation from "../../assets/contact.json";
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';



const Contact = () => {
  const { theme } = useAuth()

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(`${import.meta.env.VITE_Email_Service_Id}`, `${import.meta.env.VITE_Email_Template_Id}`, form.current, {
        publicKey: `${import.meta.env.VITE_Email_Public_Key}`,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success("Message Sent")
          e.target.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };


  return (
    <section className={`${theme === "" ? "bg-[#dee8f6]" : ""} px-5 md:px-0 py-20`}>
      <Helmet>
        <title>MCPITC | Contact</title>
      </Helmet>
      {/* <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" required />
        <label>Email</label>
        <input type="email" name="user_email" required />
        <label>Message</label>
        <textarea name="message" required />
        <input type="submit" value="Send" />
      </form> */}

      <div className='grid grid-cols-1 md:grid-cols-2 items-center'>
        <div data-aos="fade-right">
          <Lottie animationData={contactAnimation} loop={true} />
        </div>
        <div data-aos="fade-in">
          <h1 className={`${theme === "" ? "text-black" : "text-gray-200"} text-4xl font-bold text-center`}>Contact Us</h1>
          <p className={`${theme === "" ? "text-black" : "text-gray-200"} leading-loose	mt-3 text-center mb-5`}>Question, reports, feedback - We&apos;re here for you.</p>
          <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 border mx-auto">
            <form className="card-body" ref={form} onSubmit={sendEmail}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="your full name" className="input input-bordered" name="user_name" required />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="your email" className="input input-bordered" name="user_email" required />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea className="textarea textarea-bordered w-full" rows={4} placeholder="write here..." name="message" required></textarea>
              </div>
              <div className="form-control mt-6">
                <input type="submit" className='btn glass bg-[#4B70F5] hover:bg-[#ff3535] text-white' value="Send" />
              </div>

            </form>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Contact
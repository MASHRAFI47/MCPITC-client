import Lottie from "lottie-react";
import techAnimation from "../../../assets/aboutAnimation.json";

import './about.css'
import useAuth from "../../../hooks/useAuth";

const About = () => {
  const { theme } = useAuth()
  return (
    <div className={`py-10 shapedividers_com-2171  pt-24 px-5 md:px-0 ${theme === "" ? "bg-[#312684]" : ""}`} id="about">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="flex justify-center" data-aos="zoom-in" data-aos-delay="100">
          <Lottie animationData={techAnimation} className="w-3/4" loop={true} />
        </div>
        <div data-aos="fade-right" data-aos-delay="300">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
          <p className="leading-loose	mt-3 text-white"><strong>Mirpur Cantt Public Information and Technology Club </strong>is dedicated to fostering a community of innovative thinkers, tech enthusiasts, and future leaders in the fields of information technology and computer science. Our mission is to provide members with opportunities for learning, collaboration, and professional growth, equipping them with the skills and knowledge necessary to thrive in the rapidly evolving tech landscape.</p>
        </div>
      </div>
    </div>
  )
}

export default About
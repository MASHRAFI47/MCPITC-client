import developer from '../../assets/images/developer/developer.jpg'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import useAuth from '../../hooks/useAuth'


//images
import facebook from '../../assets/images/social-icons/facebook.png'
import instagram from '../../assets/images/social-icons/instagram.png'
import linkedin from '../../assets/images/social-icons/linkedin.png'
import github from '../../assets/images/social-icons/github.png'


const Developers = () => {
    const { theme } = useAuth()
    return (
        <section className={`${theme === "" ? "bg-[#f4f6f8]" : ""} py-20`} data-aos="fade-in">
            <SectionTitle title={"Developer"} desc={"Learn about our developer"} />
            <div className="container mx-auto">
                <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center'>
                    <div className='mt-4 md:mt-10'>
                        <img src={developer} className='rounded-xl mb-3 md:mb-3' alt="Mashrafi Bin Nur" />
                    </div>
                    <div>
                        <div className='text-center'>
                            <div className='space-y-2 md:pl-5 px-2 md:px-0'>
                                <h1 className={`text-2xl md:text-4xl font-bold ${theme === "" ? "text-black" : "text-gray-200"}`}>Mashrafi Bin Nur</h1>
                                <p className={`text-[#fff] font-semibold text-xl ${theme === "" ? "text-black" : "text-gray-200"}`}>Advisor | Former President | First President of MCPITC</p>
                                <div>
                                    <p className={`mt-5 leading-normal ${theme === "" ? "text-black" : "text-gray-200"}`}>
                                        As the full stack developer of the <strong>Mirpur Cantt Public Information and Technology Club</strong> Website, The journey of my web development career led me to undertake this project feeling the necessity of today&apos;s online presence and digital world, I felt the strong neccesity for people to connect and contact to our club. Not only that but also I felt the necessity to track every upcoming fest and events. From the backend, this website can handle all the event managements and segments for fest very easily. The idea of creating this website was born out of my passion for our club and its vision. I believed that a well crafted website can lead our members on another level of engagement. Let us promote our IT to the next level.
                                    </p>
                                </div>
                                <div className='space-y-1'>
                                    <h2 className={`mt-10 leading-normal text-2xl ${theme === "" ? "text-black" : "text-gray-200"}`}>Want to contact me?</h2>
                                    <h3 className={`${theme === "" ? "text-black" : "text-gray-200"}`}><strong>Email: </strong> <a className='underline' href='mailto:mbngms@gmail.com'>mbngms@gmail.com</a></h3>
                                    <h3 className={`${theme === "" ? "text-black" : "text-gray-200"}`}><strong>Contact: </strong> <span className='font-sans'>+8801910467562</span></h3>
                                </div>


                                {/* social icons images */}
                                <div className='flex justify-center items-center gap-3 pt-5 md:pt-2 md:pb-0'>
                                    <a href="https://www.facebook.com/mashrafi.binnur" target='_blank'><img src={facebook} alt="developer-facebook-id" className='w-12' /></a>
                                    <a href="https://www.instagram.com/mashrafi_47/" target='_blank'><img src={instagram} alt="developer-instagram-id" className='w-12' /></a>
                                    <a href="https://www.linkedin.com/in/mashrafi47/" target='_blank'><img src={linkedin} alt="developer-linkedin-id" className='w-12' /></a>
                                    <a href="https://github.com/MASHRAFI47" target='_blank'><img src={github} alt="developer-github-id" className='w-12' /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Developers
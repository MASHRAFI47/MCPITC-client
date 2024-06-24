import developer from '../../assets/images/developer/developer.jpg'
import useAuth from '../../hooks/useAuth'


const Developers = () => {
    const { theme } = useAuth()
    return (
        <section className={`${theme === "" ? "bg-[#4C3BCF]" : ""} pt-0 md:pt-5`} data-aos="fade-in">
            <div className="container mx-auto">
                <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center'>
                    <div>
                        <img src={developer} className='rounded-xl mb-3 md:mb-3' alt="" />
                    </div>
                    <div>
                        <div className='text-center'>
                            <div className='space-y-2 pl-5'>
                                <h1 className='text-2xl md:text-4xl text-white font-bold'>Mashrafi Bin Nur</h1>
                                <p className='text-[#fff] font-semibold text-xl'>Advisor | Former President | First President of MCPITC</p>
                                <div>
                                    <p className='mt-5 text-white leading-normal'>
                                        As the full stack developer of the <strong>Mirpur Cantt Public Information and Technology Club</strong> Website, The journey of my web development career led me to undertake this project feeling the necessity of today&apos;s online presence and digital world, I felt the strong neccesity for people to connect and contact to our club. Not only that but also I felt the necessity to track every upcoming fest and events. From the backend, this website can handle all the event managements and segments for fest very easily. The idea of creating this website was born out of my passion for our club and its vision. I believed that a well crafted website can lead our members on another level of engagement. Let us promote our IT to the next level.
                                    </p>
                                </div>
                                <div className='space-y-1'>
                                    <h2 className='mt-10 text-white leading-normal text-2xl'>Want to contact me?</h2>
                                    <h3 className='text-white'><strong>Email: </strong> <a className='underline' href='mailto:mbngms@gmail.com'>mbngms@gmail.com</a></h3>
                                    <h3 className='text-white'><strong>Contact: </strong> <span className='font-sans'>+8801910467562</span></h3>
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
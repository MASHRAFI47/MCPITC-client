import SectionTitle from "../../../components/SectionTitle/SectionTitle"

import './sectors.css'


//images
import webdev from '../../../assets/images/sectors/coding-white.png'
import multimedia from '../../../assets/images/sectors/multimedia-white.png'
import photoshop from '../../../assets/images/sectors/photoshop-white.png'
import excel from '../../../assets/images/sectors/excel-white.png'
import useAuth from "../../../hooks/useAuth"


const Sectors = () => {
    const { theme } = useAuth()


    return (
        <section className={` py-32 ${theme === "" ? "bg-[#4C3BCF] shapedividers_com-7127" : ""}`}>
            <div className="container mx-auto px-5 md:px-0">
                <SectionTitle title={"Sectors"} desc={'Check our sectors to shine your skills'} />


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5" data-aos="slide-left">
                    <div className="card card-compact border py-8 sector-card" >
                        <figure><img src={webdev} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title mx-auto text-white">Website Development</h2>
                        </div>
                    </div>


                    <div className="card card-compact border py-8 sector-card">
                        <figure><img src={multimedia} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title mx-auto text-white">Multimedia Presentation</h2>
                        </div>
                    </div>


                    <div className="card card-compact border py-8 sector-card">
                        <figure><img src={photoshop} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title mx-auto text-white">Photoshop</h2>
                        </div>
                    </div>

                    <div className="card card-compact border py-8 sector-card">
                        <figure><img src={excel} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title mx-auto text-white">Microsoft Excel</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Sectors
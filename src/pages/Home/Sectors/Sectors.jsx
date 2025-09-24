import SectionTitle from "../../../components/SectionTitle/SectionTitle"

import './sectors.css'

import useAuth from "../../../hooks/useAuth"

//images
import webdev from '../../../assets/images/sectors/coding.png'
import multimedia from '../../../assets/images/sectors/multimedia.png'
import photoshop from '../../../assets/images/sectors/photoshop.png'
import excel from '../../../assets/images/sectors/excel.png'

import webdevWHITE from '../../../assets/images/sectors/coding-white.png'
import multimediaWHITE from '../../../assets/images/sectors/multimedia-white.png'
import photoshopWHITE from '../../../assets/images/sectors/photoshop-white.png'
import excelWHITE from '../../../assets/images/sectors/excel-white.png'


const Sectors = () => {
    const { theme } = useAuth()


    return (
        // shape: shapedividers_com-7127 bg:4C3BCF add to css
        <section className={` py-32 ${theme === "" ? "bg-[#dee8f6]" : ""}`}>
            <div className="container mx-auto px-5 md:px-0">
                <SectionTitle title={"Sectors"} desc={'Check our sectors to shine your skills'} />


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5" data-aos="slide-left">
                    <div className="card card-compact border py-8 sector-card" >
                        <figure><img src={webdev} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className={`card-title mx-auto ${theme === "" ? "text-black" : "text-black"}`}>Website Development</h2>
                        </div>
                    </div>


                    <div className="card card-compact border py-8 sector-card">
                        <figure><img src={multimedia} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className={`card-title mx-auto ${theme === "" ? "text-black" : "text-black"}`}>Multimedia Presentation</h2>
                        </div>
                    </div>


                    <div className="card card-compact border py-8 sector-card">
                        <figure><img src={photoshop} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className={`card-title mx-auto ${theme === "" ? "text-black" : "text-black"}`}>Photoshop</h2>
                        </div>
                    </div>

                    <div className="card card-compact border py-8 sector-card">
                        <figure><img src={excel} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className={`card-title mx-auto ${theme === "" ? "text-black" : "text-black"}`}>Microsoft Excel</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Sectors
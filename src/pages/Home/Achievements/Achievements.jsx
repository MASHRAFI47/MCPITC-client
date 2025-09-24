import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import useAuth from "../../../hooks/useAuth"
import AchievementSlider from "./AchievementSlider"

import './achievements.css'

const Achievements = () => {
    const {theme} = useAuth()

    return (
        <section className={`${theme === "" ? "bg-[#f4f6f8]" : ""} py-12`} >
            <div className="container mx-auto py-14">
                <SectionTitle title={"Achievements"} desc={"Our achievements from various institutions"} />

                <AchievementSlider />
            </div>
        </section>
    )
}

export default Achievements
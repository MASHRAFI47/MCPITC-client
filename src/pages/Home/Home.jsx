import About from "./About/About"
import Achievements from "./Achievements/Achievements"
import Banner from "./Banner/Banner"
import Sectors from "./Sectors/Sectors"

const Home = () => {
  return (
    <div>
      <Banner />
      <About />
      <Sectors />
      <Achievements />
    </div>
  )
}

export default Home
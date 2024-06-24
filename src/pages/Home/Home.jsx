import { Helmet } from "react-helmet-async"
import About from "./About/About"
import Achievements from "./Achievements/Achievements"
import Banner from "./Banner/Banner"
import Sectors from "./Sectors/Sectors"

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MCPITC | Home</title>
      </Helmet>
      
      <Banner />
      <About />
      <Sectors />
      <Achievements />
    </div>
  )
}

export default Home
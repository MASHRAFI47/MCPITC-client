import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import moment from "moment/moment"

//images
import fbfollow from '../../assets/images/follow/followfb.webp'
import instafollow from '../../assets/images/follow/followinsta.jpeg'
import useAuth from "../../hooks/useAuth"
import { Helmet } from "react-helmet-async"

const Blogs = () => {
  const { theme } = useAuth()
  const axiosCommon = useAxiosCommon()

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data } = await axiosCommon.get('/blogs')
      return data
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <section className={`min-h-screen ${theme === "" ? "bg-[#dee8f6]" : ""} px-5 md:px-0 py-12`}>
      <Helmet>
        <title>MCPIC | Blogs</title>
      </Helmet>

      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {
            blogs?.map(blog => <div className="col-span-3 border border-neutral-500 rounded-xl mb-20 p-3 text-wrap space-y-5" key={blog?._id} data-aos="fade-in">
              <h3 className={`${theme === "" ? "text-black" : "text-gray-200"} text-lg`}><span className="text-[#0052cc] font-bold text-lg">Publisher:</span> {blog?.publisher}</h3>
              <p className={`${theme === "" ? "text-black" : "text-gray-200"} whitespace-pre-wrap`}><span className="text-[#0052cc] font-bold text-md">Description:</span> {blog?.description}</p>
              <p className={`${theme === "" ? "text-black" : "text-gray-200"}`}><span className="text-[#0052cc] font-bold text-md">Publish Date:</span> {moment(blog?.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
              <img src={blog?.image_url} className="w-full h-[35rem] rounded-lg" alt="blog image" />
            </div>)
          }


          <div className="hidden md:inline-block absolute right-0 border-neutral-500">
            {/* Social or others */}
            <div className="">
              <a href="https://www.facebook.com/ictclub.mcpsc" target="_blank"><img src={fbfollow} className="w-[10rem]" alt="mcpic facebook" /></a>
              <a href="https://www.instagram.com/ictclub.mcpsc/" target="_blank"><img src={instafollow} className="w-[10rem]" alt="mcpic instagram" /></a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Blogs
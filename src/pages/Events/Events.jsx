import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import { Link } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

//date-fns
import { format } from "date-fns"
import useAuth from "../../hooks/useAuth"

const Events = () => {
  let i = 100;
  const { theme } = useAuth()
  const axiosCommon = useAxiosCommon()

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data } = await axiosCommon.get('/events')
      return data
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <section className={`min-h-screen ${theme === "" ? "bg-[#4C3BCF]" : ""} px-5 md:px-0`}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          events?.map(eve => <div key={eve?._id} className="" data-aos="flip-left" data-aos-delay={i += 100}>
            <Link to={`/event/${eve?.name}`}>
              <div className="card bg-base-100 shadow-xl">
                <figure><img src={eve?.image_url} className="h-[15rem]" alt="Shoes" /></figure>
                <div className="card-body bg-blue-100">
                  <h2 className="card-title text-black">
                    {eve?.name}
                    {/* <div className="badge badge-secondary">NEW</div> */}
                  </h2>
                  <p className="text-black">{eve?.description.length < 40 ? eve.description : eve.description.slice(0, 40).concat('...')}</p>
                  <div className="card-actions justify-end items-center">
                    <div className="badge badge-outline text-red-600">{format(new Date(eve?.from), 'P')}</div>
                    <div>-</div>
                    <div className="badge badge-outline text-red-600">{format(new Date(eve?.to), 'P')}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>)
        }
      </div>
    </section>
  )
}

export default Events
// import { useEffect, useState } from "react"
// import ExecutiveYearsCol from "./ExecutiveYearsCol";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



//panel member pictures 2022-2023
import mashrafi from '../../assets/images/panel/mashrafi.jpg'
import arik from '../../assets/images/panel/Arik.jpg'
import areeb from '../../assets/images/panel/Areeb.jpg'
import samiulsami from '../../assets/images/panel/samiulsami.jpg'


import mehreen from '../../assets/images/panel/mehreen.jpg'
import nowshin from '../../assets/images/panel22to23/nowshin.jpg'
import labiba from '../../assets/images/panel22to23/labiba.jpeg'




import blankImage from '../../assets/images/blank.webp'
import sabiq from '../../assets/images/panel/sabiq.jpeg'
import ajwad from '../../assets/images/panel/ajwadAbrar.jpeg'
import fahad from '../../assets/images/panel/fahad.jpg'
import raiyan from '../../assets/images/panel/raiyan.jpg'
import aviv from '../../assets/images/panel/aviv.png'
import adib from '../../assets/images/panel/adib.jpg'
import proloy from '../../assets/images/panel/proloy.jpg'


//panel member pictures 2023-2024
import azora from '../../assets/images/panel23to24/azora.jpg'
import tanzilZerin from '../../assets/images/panel23to24/tanzil-zerin.jpg'
import tasniha from '../../assets/images/panel23to24/tasniha.jpg'
import maisha from '../../assets/images/panel23to24/maisha.jpg'
import mahfuz from '../../assets/images/panel23to24/mahfuz.jpg'
import ayaan from '../../assets/images/panel23to24/ayaan.jpeg'
import adnan from '../../assets/images/panel23to24/adnan.jpg'
import faqid from '../../assets/images/panel23to24/faqid.jpeg'
import tashfia from '../../assets/images/panel23to24/tashfia.jpeg'
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';



const Executives = () => {
    const { theme } = useAuth()


    // const [years, setYears] = useState(null)
    // useEffect(() => {
    //     fetch(`executiveYears.json`)
    //         .then(res => res.json())
    //         .then(data => setYears(data))
    // }, [])


    const panelMembers22to23 = [
        {
            id: 101251,
            name: "Afiun Nahar",
            post: "Moderator",
            image: blankImage
        },
        {
            id: 1,
            name: "Mashrafi Bin Nur",
            post: "President",
            image: mashrafi
        },
        {
            id: 2,
            name: "MD. Arikuzzaman",
            post: "Vice President (Admin)",
            image: arik
        },
        {
            id: 3,
            name: "Samiul Haque Chowdhury",
            post: "Vice President (Event)",
            image: samiulsami
        },
        {
            id: 4,
            name: "Raiyan Hasan",
            post: "Vice President (IT)",
            image: raiyan
        },
        {
            id: 3123,
            name: "Abdullah Islam Sabiq",
            post: "General Secretary",
            image: sabiq
        },
        {
            id: 4123,
            name: "Zaima Khanam Warda",
            post: "Organizing Secretary",
            image: blankImage
        },
        {
            id: 5,
            name: "Ahnaf Muttaki Adib",
            post: "Treasurer",
            image: adib
        },
        {
            id: 6,
            name: "Fahad Hossain",
            post: "Field Officer",
            image: fahad
        },
        {
            id: 7,
            name: "Aryan Kamal Aviv",
            post: "Field Officer",
            image: aviv
        },
        {
            id: 8,
            name: "Tanzim Hasan Bhuiyan",
            post: "Event Manager",
            image: blankImage
        },
        {
            id: 9,
            name: "Afrida Ahnaf Chowdhury",
            post: "Public Relations Officer",
            image: blankImage
        },
        {
            id: 10,
            name: "Zarin Tasnim Nowshin",
            post: "Content Writer",
            image: nowshin
        },
        {
            id: 11,
            name: "Areeb Jawad",
            post: "IT Secretary",
            image: areeb
        },
        {
            id: 12,
            name: "Afsheen Iqbal",
            post: "Content Writer",
            image: blankImage
        },
        {
            id: 13,
            name: "Proloy Charushi",
            post: "Designer",
            image: proloy
        },
        {
            id: 14,
            name: "Ajwad Abrar",
            post: "Executive Member (IT)",
            image: ajwad
        },
        {
            id: 15,
            name: "Junaira Mehreen",
            post: "Executive Member (IT)",
            image: mehreen
        },
        {
            id: 16,
            name: "Faria Afrin Raisa",
            post: "Executive Member (Admin)",
            image: blankImage
        },
        {
            id: 17,
            name: "Mahdi Ashyam",
            post: "Executive Member (Event)",
            image: blankImage
        },
        {
            id: 18,
            name: "Israt Jahan Labiba",
            post: "Executive Member",
            image: labiba
        },
        {
            id: 19,
            name: "Riad Amin",
            post: "Executive Member (Admin)",
            image: blankImage
        },
    ]


    const panelMembers23to24 = [
        {
            id: 101251,
            name: "Afiun Nahar",
            post: "Moderator",
            image: blankImage
        },
        {
            id: 20,
            name: "Mashrafi Bin Nur",
            post: "Advisor",
            image: mashrafi
        },
        {
            id: 21,
            name: "MD. Arikuzzaman",
            post: "Advisor",
            image: arik
        },
        {
            id: 22,
            name: "Samiul Haque Chowdhury",
            post: "Advisor",
            image: samiulsami
        },
        {
            id: 23,
            name: "Areeb Jawad",
            post: "President",
            image: areeb
        },
        {
            id: 24,
            name: "MD. Fahad Hossain",
            post: "Vice President",
            image: fahad
        },
        {
            id: 25,
            name: "Abdullah Islam Sabiq",
            post: "General Secretary",
            image: sabiq
        },
        {
            id: 26,
            name: "Raiyan Hasan",
            post: "Head of IT",
            image: raiyan
        },
        {
            id: 27,
            name: "MD. Salehin Alam",
            post: "Organizing Secretary",
            image: blankImage
        },
        {
            id: 28,
            name: "Proloy Charushi",
            post: "Asst. General Secretary",
            image: proloy
        },
        {
            id: 29,
            name: "Yasar Faqid Zaman",
            post: "Asst. Organizing Secretary",
            image: faqid
        },
        {
            id: 30,
            name: "Tasnia Naushin Ela",
            post: "Organizing Secretary",
            image: tasniha
        },
        {
            id: 31,
            name: "Tashfia Tasnim",
            post: "Public Relations Officer",
            image: tashfia
        },
        {
            id: 32,
            name: "Ajwad Abrar",
            post: "Joint Secretary",
            image: ajwad
        },
        {
            id: 33,
            name: "Soyad Sorower",
            post: "Media Councilor",
            image: blankImage
        },
        {
            id: 34,
            name: "Mustakim Nur Salin",
            post: "IT Secretary",
            image: blankImage
        },
        {
            id: 35,
            name: "Tasniha Tanzil Zerin",
            post: "IT Officer",
            image: tanzilZerin
        },
        {
            id: 36,
            name: "Azora Islam",
            post: "HR Manager",
            image: azora
        },
        {
            id: 37,
            name: "Muhammad Irteza",
            post: "Designer",
            image: adnan
        },
        {
            id: 38,
            name: "Maisha Majed",
            post: "Content Manager",
            image: maisha
        },
        {
            id: 39,
            name: "Sazzatul Meraz Ayaan",
            post: "Executive",
            image: ayaan
        },
        {
            id: 40,
            name: "Mahfuz Ahmed Likhon",
            post: "IT Officer",
            image: mahfuz
        },
        {
            id: 41,
            name: "Aryan Kamal Aviv",
            post: "Field Officer",
            image: aviv
        },
        {
            id: 42,
            name: "Ahnaf Muttaki Adib",
            post: "Field Officer",
            image: adib
        },
    ]





    return (
        <section className={`${theme === "" ? "bg-[#4C3BCF]" : ""}`}>
            <Helmet>
                <title>MCPITC | Executives</title>
            </Helmet>
            <div className="container mx-auto">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Meet Our <br /> <span className="text-[#e92bde]">Executives</span></h1>
                        {
                            years?.map(year => <ExecutiveYearsCol key={year?.id} year={year} />)
                        }
                    </div>

                    <div>

                    </div>
                </div> */}

                <Tabs className={'text-center'} data-aos="fade-down">
                    <TabList>
                        <Tab style={{ color: "#3DC2EC" }}><h1 className='text-xl font-bold'>2023-2024</h1></Tab>
                        <Tab style={{ color: "#3DC2EC" }}><h1 className='text-xl font-bold'>2022-2023</h1></Tab>
                    </TabList>

                    <TabPanel>
                        <div>
                            <div className='mt-10'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                    {
                                        panelMembers23to24?.map(panel => <div key={panel?.id} className="card">
                                            <figure><img src={panel?.image} className='h-[20rem] w-[20rem] object-cover rounded-full' alt="Shoes" /></figure>
                                            <div className="card-body p-0 mt-4 gap-0">
                                                <h2 className="card-title mx-auto text-white">{panel?.name}</h2>
                                                <p className='font-semibold text-[#3DC2EC]'>{panel?.post}</p>
                                            </div>
                                        </div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <div className='mt-10'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                    {
                                        panelMembers22to23?.map(panel => <div key={panel?.id} className="card">
                                            <figure><img src={panel?.image} className='h-[20rem] w-[20rem] object-cover rounded-full' alt="Shoes" /></figure>
                                            <div className="card-body p-0 mt-4 gap-0">
                                                <h2 className="card-title mx-auto text-white">{panel?.name}</h2>
                                                <p className='font-semibold text-[#3DC2EC]'>{panel?.post}</p>
                                            </div>
                                        </div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </section>
    )
}

export default Executives
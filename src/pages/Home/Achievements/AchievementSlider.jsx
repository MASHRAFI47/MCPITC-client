import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './achievementSlider.css'

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';



//images
import achievementPic1 from '../../../assets/images/achievements/achievement1.jpg'
import achievementPic2 from '../../../assets/images/achievements/achievement2.jpg'
import achievementPic3 from '../../../assets/images/achievements/achievement3.jpg'
import achievementPic4 from '../../../assets/images/achievements/achievement4.jpg'
import achievementPic5 from '../../../assets/images/achievements/achievement5.jpg'
import achievementPic6 from '../../../assets/images/achievements/achievement6.jpg'
import achievementPic7 from '../../../assets/images/achievements/achievement7.jpeg'


const AchievementSlider = () => {
    return (
        <div data-aos="fade-down" data-aos-delay="200">
            <div>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    initialSlide={3}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper2"
                >

                    <SwiperSlide className='swiper-slide-slides'>
                        <img src={achievementPic5} />
                    </SwiperSlide>
                    <SwiperSlide className='swiper-slide-slides'>
                        <img src={achievementPic6} />
                    </SwiperSlide>
                    <SwiperSlide className='swiper-slide-slides'>
                        <img src={achievementPic7} />
                    </SwiperSlide>
                    <SwiperSlide className='swiper-slide-slides'>
                        <img src={achievementPic1} />
                    </SwiperSlide>
                    <SwiperSlide className='swiper-slide-slides'>
                        <img src={achievementPic2} />
                    </SwiperSlide>
                    <SwiperSlide className='swiper-slide-slides'>
                        <img src={achievementPic3} />
                    </SwiperSlide>
                    <SwiperSlide className='swiper-slide-slides'>
                        <img src={achievementPic4} />
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    )
}

export default AchievementSlider
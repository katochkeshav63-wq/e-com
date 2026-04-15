
import { getData } from '../context/DataContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Category from './Category';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
    const { data } = getData();
const navigate = useNavigate()
    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} style={{ zIndex: 3 }}>
                <AiOutlineArrowLeft
                    className='arrows'
                    style={{
                        ...style,
                        display: "block",
                        borderRadius: "50px",
                        background: "#f53347",
                        color: "white",
                        position: "absolute",
                        padding: "2px",
                        left: "50px"
                    }}
                />
            </div>
        )
    }

    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`}>
                <AiOutlineArrowRight
                    className='arrows'
                    style={{
                        ...style,
                        display: "block",
                        borderRadius: "50px",
                        background: "#f53347",
                        color: "white",
                        position: "absolute",
                        padding: "2px",
                        right: "50px"
                    }}
                />
            </div>
        )
    }

    const settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div>
            <Slider {...settings}>
                {data?.slice(0, 7)?.map((item) => (
                    <div key={item.id} className='bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]'>
                        <div className='flex flex-col md:flex-row gap-10 justify-center h-[600px] items-center px-4'>

                            {/* LEFT CONTENT */}
                            <div className='md:space-y-6 space-y-3'>
                                <h3 className='text-red-500 font-semibold text-sm'>
                                    Powering Your World with the Best 
                                </h3>

                                <h1 className='md:text-4xl text-xl font-bold uppercase text-white line-clamp-2 md:line-clamp-3 md:w-[500px]'>
                                    {item.title}
                                </h1>

                                <p className='md:w-[500px] line-clamp-3 text-gray-400 pr-7'>
                                    {item.description}
                                </p>

                            
                            </div>

                            {/* RIGHT IMAGE */}
                           <div className="flex justify-center items-center h-[250px] md:h-[400px]">
  <img
    src={item.image}
    alt={item.title}
    onClick={() => navigate(`/products/${item.id}`)}
    className="max-h-full w-auto object-contain hover:scale-105 transition duration-300 drop-shadow-2xl cursor-pointer"
  />
</div>

                        </div>
                    </div>
                ))}
            </Slider>

            {/* CATEGORY */}
            <Category />
        </div>
    )
}

export default Carousel;
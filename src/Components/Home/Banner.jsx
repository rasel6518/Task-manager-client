import 'aos/dist/aos.css';
import Aos from "aos";
import { useEffect } from 'react';

const Banner = () => {
    useEffect(() => {
        Aos.init()
    }, [])
    return (
        <div data-aos="fade-right" className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/ZgBD9c0/task2.jpg" className="w-full h-5/6" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/TqVCjkS/task1.jpg" className="w-full h-5/6" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>


        </div>
        // <div>
        //     <img src="https://i.ibb.co/TqVCjkS/task1.jpg" alt="" />
        //     <img src="https://i.ibb.co/ZgBD9c0/task2.jpg" alt="" />
        // </div>
    );
};

export default Banner;
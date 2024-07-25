import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import './index.css'; // Ensure this import is present to include Tailwind CSS

const CarouselComponent = () => {
    return (
        <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false}>
            <div className="h-[400px]"> {/* Tailwind class to control the height */}
                <img src="https://via.placeholder.com/600x400" alt="Slide 1" className="object-cover h-full w-full" />
                <p className="legend">Slide 1</p>
            </div>
            <div className="h-[400px]"> {/* Tailwind class to control the height */}
                <img src="https://via.placeholder.com/600x400" alt="Slide 2" className="object-cover h-full w-full" />
                <p className="legend">Slide 2</p>
            </div>
            <div className="h-[400px]"> {/* Tailwind class to control the height */}
                <img src="https://via.placeholder.com/600x400" alt="Slide 3" className="object-cover h-full w-full" />
                <p className="legend">Slide 3</p>
            </div>
        </Carousel>
    );
};

export default CarouselComponent;

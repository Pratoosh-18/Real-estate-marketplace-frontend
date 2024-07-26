import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import './index.css'; // Ensure this import is present to include Tailwind CSS

const CarouselComponent = () => {
    return (
        <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false}>
            <div className="h-[300px] md:h-[500px]"> {/* Tailwind class to control the height */}
                <img src="https://i.pinimg.com/564x/10/cb/ae/10cbae7abbf7a5145fd571dbab47a79c.jpg" alt="Slide 1" className="object-cover h-full w-full" />
            </div>
            <div className="h-[300px] md:h-[500px]"> {/* Tailwind class to control the height */}
                <img src="https://i.pinimg.com/564x/b9/5f/5e/b95f5efdfc791dfc66148148b46ff0b9.jpg" alt="Slide 2" className="object-cover h-full w-full" />
                
            </div>
            <div className="h-[300px] md:h-[500px]"> {/* Tailwind class to control the height */}
                <img src="https://i.pinimg.com/564x/92/09/ce/9209ceb32a7d64976d17e003e2dd7355.jpg" alt="Slide 3" className="object-cover h-full w-full" />
                
            </div>
        </Carousel>
    );
};

export default CarouselComponent;

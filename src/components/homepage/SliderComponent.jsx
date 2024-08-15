import React, { useEffect, useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import AOS from "aos";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "aos/dist/aos.css";

const items = [
    <figure className="flex flex-col sm:flex-row justify-center items-center gap-2" data-aos="flip-right">
  <img src="public/homepageimg/cstad-removebg-preview.png" alt="Logo" className="w-[70px]"/>
  <figcaption className="text-4xl flex flex-col sm:items-center sm:justify-center font-bold text-primary">CSTAD</figcaption>
</figure>,
    <figure className="flex flex-col sm:flex-row justify-center items-center gap-2" data-aos="flip-right">
  <img src="public/homepageimg/ptc.png" alt="Logo" className="w-[70px]"/>
  <figcaption className="text-4xl flex flex-col items-center justify-center font-bold text-primary">MOPAT</figcaption>
</figure>,
    <figure className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:mt-0 mt-1" data-aos="flip-right">
  <img src="https://imgs.search.brave.com/2tLOaXfzpOFGvZFlJV7wnaiuKXMReayFH4NB_Yr83lI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d29ybGR2ZWN0b3Js/b2dvLmNvbS9sb2dv/cy9mcmVlcGlrLnN2/Zw" alt="Logo" className="w-[76px]"/>
  <figcaption className="text-4xl flex flex-col items-center justify-center font-bold text-primary">FREEPIK</figcaption>
</figure>,
    <figure className="flex flex-col sm:flex-row justify-center items-center gap-2" data-aos="flip-right">
  <img src="https://imgs.search.brave.com/MwQnPAbW12wotTnSZM9IdCLTU9UOw8BWwdXHt_YElWM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvc29jaWFsLWlj/b25zLTMzLzEyOC9H/aXRodWItNTEyLnBu/Zw" alt="Logo" className="w-[70px]"/>
  <figcaption className="text-4xl flex flex-col items-center justify-center font-bold text-primary">GITHUB</figcaption>
</figure>,
    <figure className="flex flex-col sm:flex-row justify-center items-center gap-2" data-aos="flip-right">
  <img src="https://imgs.search.brave.com/G_l2TPBtXMARgbLnxsmEPByyDDRn2v1iRrXuGGI2Y7Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/Lzc0L0NhbnZhX2xv/Z28ucG5n" alt="Logo" className="w-[70px]"/>
  <figcaption className="text-4xl flex flex-col items-center justify-center font-bold text-primary">CANVA</figcaption>
</figure>,
  // Add more images if needed
];

const responsive = {
    0: { items: 1 },
    360: {items: 2},
    480: { items: 2 },
    768: { items: 3 },
    1024: { items: 4 },
    1280: { items: 5 },
    1536: { items: 5 },
};

function SliderComponent() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 1000 });

        // Simulate a loading state
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const loadingItems = [1, 2, 3, 4, 5].map((_, index) => (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2" key={index}>
            <Skeleton circle height={70} width={70} />
            <Skeleton width={100} height={40}/>
        </div>
    ));

    return (
        <div className="dark:bg-gray-900">
            <div className="container mx-auto p-10 flex flex-row items-center justify-center gap-5 3xl:w-[80%] sm:w-full">
                {isLoading ? (
                    <AliceCarousel
                        mouseTracking
                        items={loadingItems}
                        responsive={responsive}
                        autoPlay
                        autoPlayInterval={100}
                        autoPlayStrategy="none"
                        infinite
                        disableDotsControls
                        disableButtonsControls
                        animationDuration={1000}
                    />
                ) : (
                    <AliceCarousel
                        mouseTracking
                        items={items}
                        responsive={responsive}
                        autoPlay
                        autoPlayInterval={100}
                        autoPlayStrategy="none"
                        infinite
                        disableDotsControls
                        disableButtonsControls
                        animationDuration={1000}
                        animationType="slide"
                    />
                )}
            </div>
            
        </div>
    );
}

export default SliderComponent;

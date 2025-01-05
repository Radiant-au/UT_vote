import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper core styles
import "swiper/css/effect-coverflow"; // Coverflow effect styles
import { EffectCoverflow } from "swiper/modules";
import { SelectionResponse } from "@/api/selectionApi";
import { base_api_url } from "@/api/apiClient";
import { useState } from "react";

interface SwiperComponentProps {
  title: string;
  data: SelectionResponse[];
  onActiveIndexChange: (newIndex: number) => void;
}

function SwiperComponent({ title, data , onActiveIndexChange}: SwiperComponentProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const handleSlideChange = (newIndex: number) => {
    // Trigger fade-out animation
    setFade(true);

    // Change the active slide after the fade-out animation
    setTimeout(() => {
      setActiveIndex(newIndex);
      onActiveIndexChange(newIndex);
      setFade(false); // Trigger fade-in animation
    }, 300); // Match the CSS transition duration
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[390px] py-10 px-4">
        {/* Header */}
        <h1 className="text-primary font-poppins text-2xl font-bold mb-6 text-center">
          {title}
        </h1>

        {/* Swiper Container */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1.4}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3,
          }}
          modules={[EffectCoverflow]}
          onActiveIndexChange={(swiper) => handleSlideChange(swiper.realIndex)}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} className="p-4">
              <div className="size-60 bg-gradient-to-r from-pink-300 via-red-400 to-violet-700 rounded-full flex items-center justify-center text-white font-bold glow-container mb-4">
                <img
                  className="size-56 object-cover rounded-full"
                  src={base_api_url + "/" + item.profileImg}
                  alt={item.name}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {data[activeIndex] && (
          <div className="flex items-center justify-center mt-3">
            <div className="font-poppins flex flex-col gap-3 w-1/3 items-center ml-4">
              <h2>Name:</h2>
              <h2>Major:</h2>
              <h2>Hobby:</h2>
              <h2>Dream:</h2>
            </div>
            <div
              className={`font-poppins flex flex-col gap-3 w-2/3 transition-opacity duration-300 ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              <h2>{data[activeIndex].name}</h2>
              <h2>{data[activeIndex].major}</h2>
              <h2>{data[activeIndex].hobby}</h2>
              <h2>{data[activeIndex].dream || "-"}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SwiperComponent;

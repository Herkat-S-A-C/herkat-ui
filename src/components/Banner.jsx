import React from "react";

function Banner() {
  return (
    <section className="relative w-full h-64 md:h-80 overflow-hidden">
      <img
        src="https://i.ibb.co/C3GjBtm9/banner.png"
        alt="Banner"
        className="w-full h-70 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center ">
      </div>
    </section>
  );
}
export default Banner;

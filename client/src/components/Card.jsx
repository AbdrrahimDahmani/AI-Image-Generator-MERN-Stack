import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Card = ({ _id, name, prompt, photo }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      key={_id}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      exit="hidden"
      transition={{ duration: 0.5, delay: 0.25 }}
      className="rounded-xl group relative shadow-card hover:shadow-cardhover card"
    >
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] p-4 rounded-md">
        <p className="text-white text-sm font-semibold overflow-y-auto">
          {prompt}
        </p>
        <div className="mt-4 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-orange-500 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm font-semibold">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;

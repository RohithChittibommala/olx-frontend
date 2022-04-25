import React from "react";

function Listing({ image, name, price, ...rest }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg ">
      <img
        className="w-full h-[180px] object-contain"
        src={image}
        alt="Sunset in the mountains"
      />

      <div className="border-l-4 border-yellow-400 mt-1">
        <div className="px-6 py-4  ">
          <h2 className="font-semibold text-xl  font-open my-2">
            {" "}
            &#8377;{" "}
            <span className="font-poppins">
              {Intl.NumberFormat("en-IN").format(price)}
            </span>
          </h2>
          <h3 className="text-gray-500 text-md my-2">{name}</h3>

          <h5 className="text-md text-gray-600 line-clamp-2">
            {rest.description}
          </h5>
        </div>
        <div className="p-2">
          <h5 className="text-gray-600 text-xs text-right">
            {new Date(rest.updatedAt).toDateString()}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Listing;

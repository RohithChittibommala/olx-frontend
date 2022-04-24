import React from "react";

function Listing({ image, name, price, ...rest }) {
  return (
    <div className="w-full aspect-square  my-3  rounded-md border border-gray-300 bg-white transition  cursor-pointer">
      <div className="w-full">
        <img
          className="rounded block h-full w-full aspect-square"
          src={image}
          alt="listing"
        />
      </div>

      <div className=" p-3">
        <h2 className="font-semibold text-xl font-sans">
          &#8377;{" "}
          <span className="font-poppins">
            {Intl.NumberFormat("en-IN").format(price)}
          </span>
        </h2>
        <h4 className="text-lg text-gray-600">{name}</h4>

        <h5 className="text-gray-600 text-sm text-right">
          {/* {new Date(updated_at).toDateString()} */}
        </h5>
      </div>
    </div>
  );
}

export default Listing;

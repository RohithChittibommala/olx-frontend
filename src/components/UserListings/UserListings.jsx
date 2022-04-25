import React from "react";
import { toast } from "react-toastify";
import api from "../../network";
import Listing from "../Listing/Listing";

function UserListings(props) {
  const [listings, setListings] = React.useState(props.listings);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 ">
      {listings.map((listing) => (
        <div key={listing._id}>
          <div className="flex items-center  space-x-6 p-2">
            <h2
              className={`uppercase px-4 rounded-sm py-1 my-2 font-semibold inline-block ${
                listing.status === "unsold"
                  ? "bg-yellow-200 text-yellow-500"
                  : "bg-green-200 text-green-500"
              }`}
            >
              {listing.status}
            </h2>
            {listing.status === "unsold" && (
              <button
                className="h-8 uppercase  bg-red-200 text-red-600 font-bold px-4 rounded-sm py-1 "
                onClick={() =>
                  api
                    .deleteListing(listing._id)
                    .then(() => {
                      setListings(
                        listings.filter((l) => l._id !== listing._id)
                      );
                      toast("Listing deleted successfully", {
                        type: "success",
                      });
                      props.refetch();
                    })
                    .catch((er) => {
                      console.log(er);
                    })
                }
              >
                Delete
              </button>
            )}
          </div>
          <Listing {...listing} />
        </div>
      ))}
    </div>
  );
}

export default UserListings;

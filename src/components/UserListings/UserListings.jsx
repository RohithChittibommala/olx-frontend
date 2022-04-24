import React from "react";
import { toast } from "react-toastify";
import api from "../../network";
import Listing from "../Listing/Listing";

function UserListings(props) {
  const [listings, setListings] = React.useState(props.listings);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {listings.map((listing) => (
        <div key={listing._id} className="">
          <h2
            className={`uppercase px-2 py-1 font-semibold inline-block ${
              listing.status === "unsold"
                ? "bg-yellow-400 text-yellow-800"
                : "bg-green-400 text-green-800"
            }`}
          >
            {listing.status}
          </h2>
          <Listing {...listing} />
          {listing.status === "unsold" && (
            <div className="flex space-x-2">
              <button
                className="py-2 px-4 rounded-md bg-red-600 flex-1 text-white "
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
                    })
                    .catch((er) => {
                      console.log(er);
                    })
                }
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserListings;

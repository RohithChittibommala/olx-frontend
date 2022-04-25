import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../network";
import Loading from "../Loading/Loading";

function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: listing, isLoading } = useQuery(
    ["detail", id],
    () => api.getListing(id),
    {
      select: ({ data }) => data.listing,
    }
  );

  const { mutate } = useMutation(api.purchaseListing, {
    onSuccess: () => {
      toast("Listing purchased successfully", {
        type: "success",
      });

      navigate("/profile");
    },

    onError: (er) => {
      toast(er?.response?.data?.message || "error occureds", {
        type: toast?.TYPE.ERROR,
      });
    },
  });

  if (isLoading) return <Loading />;

  console.log(listing);

  return (
    <div className="w-full bg-gray-50 min-h-screen p-4 font-poppins">
      <div className="md:w-1/2 mx-auto p-5">
        <button className="flex items-center mb-3" onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="w-6 h-6 mr-3 font-light" /> Go Back
        </button>

        <div>
          <img className="rounded w-full" src={listing?.image} alt="" />
        </div>

        <div className="bg-white p-4 my-6">
          <h1 className="text-4xl font-semibold">
            {" "}
            &#8377;{" "}
            <span className="font-poppins">
              {Intl.NumberFormat("en-IN").format(listing.price)}
            </span>
          </h1>

          <h3 className="text-2xl my-4 font-semibold text-gray-500">
            {listing.name}
          </h3>

          <p className="my-3 text-gray-600">{listing.description}</p>

          <p>SOLD BY</p>
          <p className="font-normal text-lg capitalize">
            {listing.authorId.name}
          </p>
        </div>
        <button
          className="py-2 px-4 rounded-md text-white bg-pink-500"
          onClick={() => mutate(id)}
        >
          Make An Offer
        </button>
      </div>
    </div>
  );
}

export default ListingDetail;

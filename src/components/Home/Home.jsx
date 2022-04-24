import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import api from "../../network";
import Listing from "../Listing/Listing";
import Loading from "../Loading/Loading";

function Home() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    ["listings", page],
    () => api.getListingsByPage(page),
    {
      select: (data) => data.data,
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Loading />;

  return (
    <div className="bg-gray-50 min-h-screen  md:p-10 font-poppins ">
      <div className="grid gap-y-3 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 items-center ">
        {data.listings.map((listing) => (
          <Link key={listing._id} to={`/listing/${listing._id}`}>
            <Listing {...listing} />
          </Link>
        ))}
      </div>
      {page * 10 < data.count ? (
        <div className="w-40  mx-auto">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="w-full my-4 transition hover:bg-blue-500 font-bold rounded-md  px-4 py-2 bg-blue-400 text-white"
          >
            Load More
          </button>
        </div>
      ) : (
        <h2 className="text-3xl text-center font-light">Thats All Folks</h2>
      )}
    </div>
  );
}

export default Home;

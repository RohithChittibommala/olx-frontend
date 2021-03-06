import React from "react";
import { useQuery } from "react-query";
import api from "../../network";
import Loading from "../Loading/Loading";
import UserListings from "../UserListings";
import UserPurchases from "../UserPurchases";

function Profile() {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery("profile", () => api.getProfile(), {
    select: ({ data }) => data.user,
  });

  const [activeTab, setActiveTab] = React.useState(0);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-8 font-poppins">
      <div className="flex flex-col md:space-x-4 md:justify-center space-y-2   md:flex-row p-4 w-full md:w-4/5 mx-auto  my-8">
        <div className="h-[120px] w-[123px] rounded-full   bg-orange-500 justify-center  items-center flex">
          <p className="text-white uppercase text-7xl ">
            {user.name.charAt(0)}
          </p>
        </div>
        <div className="flex  flex-col justify-center">
          <p className="text-gray-600 text-2xl font-bold capitalize">
            {user.name}
          </p>
          <p className="text-gray-600 text-xl">{user.email}</p>
        </div>
      </div>

      <div className="w-full  md:w-11/12 mx-auto">
        <div className="flex space-x-8 py-6 border-b border-gray-200 px-4">
          <h2
            className={`font-medium text-lg cursor-pointer 
          ${activeTab === 1 ? "text-gray-500" : ""}`}
            onClick={() => setActiveTab(0)}
          >
            Listings{" "}
            <span className="text-gray-400 font-light">
              {user.listings.length}
            </span>
          </h2>
          <h2
            className={`font-medium text-lg cursor-pointer 
          ${activeTab === 0 ? "text-gray-500" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            Purchases{" "}
            <span className="text-gray-400 font-light">
              {user.purchases.length}
            </span>
          </h2>
        </div>

        <div className="p-2 md:p-4 my-4">
          {activeTab === 0 && (
            <UserListings listings={user.listings} refetch={refetch} />
          )}
          {activeTab === 1 && <UserPurchases purchases={user.purchases} />}
        </div>
      </div>
    </div>
  );
}

export default Profile;

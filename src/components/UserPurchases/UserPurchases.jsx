import React from "react";
import Listing from "../Listing/Listing";

function UserPurchases({ purchases }) {
  return (
    <div className="grid  gap-4 p-4 grid-cols-1 md:grid-cols-4">
      {purchases.map((purchase) => (
        <Listing {...purchase} key={purchase._id} />
      ))}
    </div>
  );
}

export default UserPurchases;

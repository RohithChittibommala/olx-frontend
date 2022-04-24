import React from "react";
import Listing from "../Listing/Listing";

function UserPurchases({ purchases }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {purchases.map((purchase) => (
        <Listing {...purchase} key={purchase._id} />
      ))}
    </div>
  );
}

export default UserPurchases;

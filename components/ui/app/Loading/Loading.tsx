import React from "react";
import Logo from "../Logo";
import DashboardSkeleton from "@/app/(routes)/dashboard/_components/DashboardSkeleton";

const Loading = () => {
  return (
    <div className="w-full h-full flex ">
      <DashboardSkeleton />
    </div>
  );
};

export default Loading;

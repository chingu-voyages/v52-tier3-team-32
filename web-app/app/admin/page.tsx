"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminsDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/map-view");
  }, []);
  return <></>;
};

export default AdminsDashboard;

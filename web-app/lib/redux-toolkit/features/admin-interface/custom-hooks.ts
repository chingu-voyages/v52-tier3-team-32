"use client";
import { useAppSelector } from "../../redux-hooks";

export const useAdminInterfaceStates = () => {
  const employeeLoc = useAppSelector(
    (state) => state.adminInterface.employeeLoc
  );
  const isAskedEmployeeLoc = useAppSelector(
    (state) => state.adminInterface.isAskedEmployeeLoc
  );
  const toastDuration = useAppSelector(
    (state) => state.adminInterface.toastDuration
  );
  const appointments = useAppSelector(
    (state) => state.adminInterface.appointments
  );
  const decodedRoute = useAppSelector(
    (state) => state.adminInterface.decodedRoute
  );
  return {
    employeeLoc,
    isAskedEmployeeLoc,
    toastDuration,
    appointments,
    decodedRoute,
  };
};

import { Appointment } from "@/app/admin/map-view/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LatLngExpression } from "leaflet";

export interface AdminInterfaceStateType {
  isAskedEmployeeLoc: boolean;
  employeeLoc: [number, number];
  toastDuration: number;
  appointments: Appointment[];
  decodedRoute: LatLngExpression[];
}

const initialState: AdminInterfaceStateType = {
  isAskedEmployeeLoc: false,
  employeeLoc: [34.053718, -118.242759],
  toastDuration: 0,
  appointments: [],
  decodedRoute: [],
};

export const adminInterfaceSlice = createSlice({
  name: "adminInterface",
  initialState,
  reducers: {
    updateIsAskedEmployeeLoc: (state, action: PayloadAction<boolean>) => {
      state.isAskedEmployeeLoc = action.payload;
    },
    updateEmployeeLoc: (state, action: PayloadAction<[number, number]>) => {
      state.employeeLoc = action.payload;
    },
    updateToastDuration: (state, action: PayloadAction<number>) => {
      state.toastDuration = action.payload;
    },
    updateAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
    },
    updateDecodeRoute: (state, action: PayloadAction<LatLngExpression[]>) => {
      state.decodedRoute = action.payload;
    },
  },
});

export const {
  updateIsAskedEmployeeLoc,
  updateEmployeeLoc,
  updateToastDuration,
  updateAppointments,
  updateDecodeRoute,
} = adminInterfaceSlice.actions;
export default adminInterfaceSlice.reducer;

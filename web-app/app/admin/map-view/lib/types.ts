export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  preferred_timeslot: string;
  status: string;
  date_timestamp: number;
  latitude: number;
  longitude: number;
}

export interface FetchAppointments {
  fetchAppointments: Appointment[] | null;
}

export interface FetchRouteInterface {
  fetchOptimisedRoute: {
    decodedRoute: string;
    prorityOrder: number[];
  };
}

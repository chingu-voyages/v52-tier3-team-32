import { NextResponse } from "next/server";

export const GET = async () => {
  const apiKey = process.env.ORS_API_TOKEN ?? "";

  const url = "https://api.openrouteservice.org/optimization";

  try {
    const jobs = [
      {
        id: 1,
        service: 1200,
        location: [2.03655, 48.61128],
        skills: [1],
        time_window: [30000, 40000],
      },
      {
        id: 2,
        service: 1200,
        location: [2.03655, 48.61128],
        skills: [1],
        time_window: [32400, 36000],
      },
    ];

    const vehicles = [
      {
        id: 1,
        profile: "driving-car",
        start: [2.35044, 48.71764],
        end: [2.35044, 48.71764],
        capacity: [3],
        skills: [1, 2],
      },
    ];

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept:
          "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        Authorization: apiKey,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ jobs, vehicles }),
    });
    console.log(
      "ORS Optimization Response:",
      JSON.stringify(await response.json())
    );

    return NextResponse.json("success!", { status: 200 });
  } catch (error: any) {
    console.error("ORS Optimization Failed:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
};

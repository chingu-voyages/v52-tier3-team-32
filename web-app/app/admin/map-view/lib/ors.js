
import Openrouteservice from 'openrouteservice-js'

export const optimisedRoute = async() => {
    let Optimization = new Openrouteservice.Optimization({api_key: process.env.ORS_API_TOKEN ?? ""});
    console.log("api key: ", process.env.ORS_API_TOKEN)
    try {
        const response = await Optimization.optimize({
            jobs: [
                {
                  id: 1,
                  service: 300,
                  amount: [1],
                  location: [2.03655, 48.61128],
                  skills: [1]
                },
                {
                  id: 2,
                  service: 300,
                  amount: [1],
                  location: [2.03655, 48.61128],
                  skills: [2]
                },
              ],
              vehicles: [
                {
                  id: 1,
                  profile: 'driving-car',
                  start: [2.35044, 48.71764],
                  end: [2.35044, 48.71764],
                  capacity: [3],
                  skills: [1, 2],
                }
              ],
        })

        console.log("ORS route Optimisation Response: ", response);
    } catch (error) {
        console.log("ORS route Optimisation Failed: ", error);
        return null
    }
}


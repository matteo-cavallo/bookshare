import axios from "axios";
import {GOOGLE_MAP_KEY} from '@env'


const getLocationName = async (lat:number,lng:number): Promise<String> => {

    try {
        const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng})&key=${GOOGLE_MAP_KEY}`) //

        const data = result.data

        console.log(data)

        return "data"
    } catch (r) {
        return Promise.reject()
    }
}


export const GoogleMapsAPI = {
    getLocationName
}

import axios from "axios";
import {GOOGLE_MAP_KEY} from '@env'
import {LocationResult} from "../model/googleMapsApi.model";
import {BookSharePosition} from "../model/position";


const getLocationName = async (lat:number,lng:number): Promise<BookSharePosition> => {

    try {
        const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${GOOGLE_MAP_KEY}`) //

        const locationResult = result.data as LocationResult


        const formattedAddress = locationResult.results[0].formatted_address
        const placeId = locationResult.results[0].place_id

        const position = {
            address: formattedAddress,
            lat: lat,
            lng: lng,
            placeId: placeId

        } as BookSharePosition

        return position
    } catch (r) {
        console.log("REJECT, with error",r)
        return Promise.reject()
    }
}

const getNameFromLocationCoordinates = () => {

}


export const GoogleMapsAPI = {
    getLocationName
}

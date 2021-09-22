import axios from "axios";
// @ts-ignore
import {GOOGLE_MAP_KEY} from '@env'
import {LocationResult} from "../model/googleMapsApi.model";
import {BookSharePosition} from 'model/bookSharePosition.model';

const getLocationName = async (lat:number,lng:number,radius:number): Promise<BookSharePosition> => {
    try {
        const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${GOOGLE_MAP_KEY}`) //

        const locationResult = result.data as LocationResult


        const formattedAddress = locationResult.results[0].formatted_address
        const placeId = locationResult.results[0].place_id

        const position = {
            address: formattedAddress,
            lat: lat,
            lng: lng,
            placeId: placeId,
            radius: radius,
            geoHash: `${lat} ${lng}` //TODO: add geohash.encode(lat, lng)

        } as BookSharePosition

        return position
    } catch (r) {
        console.log("REJECT, with error",r)
        return Promise.reject()
    }
}

const getLocationCoordinates = async (address:string,language:string,radius:number) => {

    try {
        const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&language=${language}&key=${GOOGLE_MAP_KEY}`) //

        const locationResult = result.data as LocationResult


        const formattedAddress = locationResult.results[0].formatted_address
        const placeId = locationResult.results[0].place_id
        const location = locationResult.results[0].geometry.location

        const position = {
            address: formattedAddress,
            lat: location.lat,
            lng: location.lng,
            placeId: placeId,
            radius:radius,
            geoHash: `${location.lat} ${location.lng}` //TODO: add geohash.encode(lat, lng)
        } as BookSharePosition

        return position
    } catch (r) {
        console.log("REJECT, with error",r)
        return Promise.reject()
    }
}


export const GoogleMapsAPI = {
    getLocationName,
    getLocationCoordinates
}

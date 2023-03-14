import { INIT_CITY,CHANGE_CITY } from '../constance';

export function initcity(cityName){
    return {
        type:INIT_CITY,
        cityName,
    }
}

export function changecity(cityName){
    return {
        type:CHANGE_CITY,
        cityName,
    }
}
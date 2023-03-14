import { INIT_CITY,CHANGE_CITY } from '../constance';

const defaultState={
    cityName:'北京'
}

const city = (state=defaultState, action)=>{
    switch(action.type){
        case INIT_CITY:
            return action.cityName;
        case CHANGE_CITY:
            return action.cityName;
        default:
            return state;
    }
}

export default city

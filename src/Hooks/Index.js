import axios from "axios";
import {useMutation, useQuery} from "react-query";

export const useGetAllUsers = (onSuccess) => {
    const  getAllUsersHandler = async () => {
        const response = await axios.get('https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view', {
            headers: {
                'Authorization': `Bearer keyfXgn8PL6pB3x32` ,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return response.data;
    }
    return useQuery('getUsers', getAllUsersHandler, {
        onSuccess,
        onError: async (data) => {
            return data;
        },
    });
}
export const useGetAllResturants = (onSuccess) => {
    const  getAllResturantsHandler = async () => {
        const response = await axios.get('https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?maxRecords=100&view=Grid%20view', {
            headers: {
                'Authorization': `Bearer keyfXgn8PL6pB3x32` ,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return response.data;
    }
    return useQuery('getAllResturants', getAllResturantsHandler, {
        onSuccess,
        onError: async (data) => {
            return data;
        },
    });
}
export const usePostNewMap = () => {
    const postNewMapHandler = async (data) => {
        const response = await axios.post('https://loop-bfc9d-default-rtdb.firebaseio.com/maps.json', data)
    }
    return useMutation(postNewMapHandler)
}
export const useGetAllMap = (onSuccess) => {
    const  getAllMapsHandler = async () => {
        const response = await axios.get('https://loop-bfc9d-default-rtdb.firebaseio.com/maps.json')
        return response.data;
    }
    return useQuery('getAllMaps', getAllMapsHandler, {
    onSuccess
    })
}
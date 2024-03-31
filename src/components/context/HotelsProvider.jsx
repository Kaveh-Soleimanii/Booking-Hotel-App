import { createContext, useContext, useState } from "react"
import { useSearchParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
const HotelContext = createContext();
function HotelsProvider({ children }) {
const BASE_URL = "https://hotel-app.liara.run/hotels"


    const [currentHotel , setCurrentHotel] = useState(null);
    const [isLoadingCurrHotel , setIsLoadingCurrHotel] = useState(false);
    const [searchParams, setSearchParams ] = useSearchParams();
    const destination = searchParams.get("destination");
    const room = JSON.parse(searchParams.get("options"))?.room;
    const { isLoading, data: hotels } = useFetch(BASE_URL, `q=${destination || ""}&accommodates_gte=${room || 1}`);


    async function getHotel(id){
        setIsLoadingCurrHotel(true);
        try {
            const {data} = await axios.get(`${BASE_URL}/${id}`);
            setCurrentHotel(data)
        } catch (error) {
            toast.error(error.message)
        } finally{
            setIsLoadingCurrHotel(false);
        }
    }

    return (
        <HotelContext.Provider value={{ isLoading, hotels , getHotel  , isLoadingCurrHotel , currentHotel}}>
            {children}
        </HotelContext.Provider>
    ); 
}

export default HotelsProvider;


export function useHotels() {
    return useContext(HotelContext);
}  
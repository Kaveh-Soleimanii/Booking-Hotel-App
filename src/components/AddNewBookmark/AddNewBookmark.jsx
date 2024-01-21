import { useNavigate } from "react-router-dom"
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmar } from "../context/BookmarkListContext";

const BASE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function AddNewBookmark() {
    const [lat, lng] = useUrlLocation();
    const navigate = useNavigate();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("")
    const [countryCode, setCountryCode] = useState("");
    const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
    const [geoCodingError, setGeoCodingError] = useState(null);
    const { createBookmark } = useBookmar();

    useEffect(() => {
        if (!lat || !lng) return;
        async function fetchLocationData() {
            setIsLoadingGeoCoding(true);
            setGeoCodingError(null);
            try {
                const { data } = await axios.get(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`);

                if (!data.countryCode) throw new Error("this Location is not a city! please click somewhere else. ✋🚫")

                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setCountryCode(data.countryCode);
            } catch (error) {
                setGeoCodingError(error.message);
            } finally {
                setIsLoadingGeoCoding(false);
            }
        }
        fetchLocationData()
    }, [lat, lng]);

    const handleBack = (e) => {
        e.preventDefault();
        navigate(-1);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cityName || !country) return;

        const newBookmark = {
            cityName,
            country,
            countryCode,
            latitude: lat,
            longitude: lng,
            host_location: cityName + " " + country,
          };
          await createBookmark(newBookmark);
          navigate("/bookmark");
        };

    if (isLoadingGeoCoding) return <Loader />;
    if (geoCodingError) return <strong>{geoCodingError}</strong>



    return (
        <div>
            <h1>Bookmark New Location</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="formControl">
                    <label htmlFor="cityName">CityName</label>
                    <input
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)} type="text"
                        name="cityName"
                        id="cityName"
                    />
                </div>
                <div className="formControl">
                    <label htmlFor="Country">Country</label>
                    <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text"
                        name="Country"
                        id="Country"
                    />
                    <ReactCountryFlag className="flag" svg countryCode={countryCode} />
                    {/* <span className="flag">{countryCode}</span> */}
                </div>
                <div className="buttons">
                    <button className="btn btn--back" onClick={handleBack}>&larr; Back</button>
                    <button className="btn btn--primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewBookmark
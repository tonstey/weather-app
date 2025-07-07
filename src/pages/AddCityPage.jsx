import React from "react"

import { useSelector } from "react-redux";
import { LuLoader } from "react-icons/lu";
import SearchCity from "../components/SearchCity";

// BEGIN DEBOUNCE
function useDebounceValue(value, time=50) {
  const [debounceValue, setDebounceValue] = React.useState(value)

  React.useEffect(() => {
    const timeout=setTimeout( ()=> {
      setDebounceValue(value)
    }, time)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, time])

  return debounceValue
}
// END DEBOUNCE

export default function AddCityPage(props) {

  const key = import.meta.env.VITE_KEY

  const savedCities = useSelector(state => state.savedCities.cities)
  const [searchCity, setSearchCity] = React.useState("")
  const [searchResults, setSearchResults] = React.useState([])
  const debounceQuery = useDebounceValue(searchCity)

  React.useEffect(() => {
    ( async () => {
      setSearchResults([])
      if (debounceQuery.length > 0) {
        await fetch(`https://api.weatherapi.com/v1/search.json?key=${key}&q=${debounceQuery}`)
              .then(res=>res.json()).then(data=>setSearchResults(data))
      }
    })()

  }, [debounceQuery])

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-white text-xl mb-3">Search for a city below!</h1>
        <div className="h-10 w-[40%]">
          <input 
            className="bg-slate-600 rounded-lg w-full p-2 text-white  overflow-ellipsis"
            type="text" 
            value={searchCity} 
            onChange={e=>setSearchCity(e.target.value)}
          />

          { searchCity.length > 0 ? 
            <div className="flex flex-col w-full bg-slate-800 rounded-lg py-4 max-h-72 overflow-scroll gap-0.5">
              { searchResults.length > 0 ? 
                searchResults.map((city) => (
                  <SearchCity 
                    key={city.id} 
                    data={city} 
                    isChecked={savedCities.includes(Number(city.id))}
                  />)) :
                <div className=" h-8 flex justify-center items-center">
                  <LuLoader className="text-white text-2xl"/>
                </div>
              }
            </div>
            :<></>
          }
        </div>
      </div>
  
    </>
  )
}
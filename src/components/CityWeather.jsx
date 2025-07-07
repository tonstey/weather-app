import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeCity,clearCities } from "../redux/citySlice"

export default function CityWeather({id, data, setUserCities}) {

  // BEGIN DELETE CITY
  const newData = useSelector(state => state.savedCities.cities)
  const dispatch = useDispatch()
  const deleteCity = () => {

    if (newData.length > 1) {
      dispatch(removeCity(id))
    }
    else {
      dispatch(clearCities())
    }

    setUserCities(prev => {
      const updatedCities = { ...prev }
      delete updatedCities[id]
      return updatedCities
    })

    if (newData.length > 1 ){
      localStorage.setItem('cities', JSON.stringify(newData))
    }
    else {
      localStorage.removeItem('cities')
    }
  
  }
  // END DELETE CITY

  return (
    <>
      <div className="flex flex-col justify-center items-center text-gray-300 bg-white bg-opacity-10 mx-12 w-96 h-128 rounded-xl flex-none relative"> 
        <h1 
          className="absolute top-5 left-5 text-2xl rounded-full bg-slate-500 w-8 text-center hover:cursor-pointer"
          onClick={deleteCity}
        >-</h1>
        {/* BEGIN CELL INFO */}
        <h1 className="text-3xl text-center font-medium w-[90%]">{`${data.location.name},`}<br/>{`${data.location.country}`}</h1>
        <img className="mx-auto border my-5 w-36  object-cover" src={`${data.current.condition.icon}`} />
        <div className="flex justify-center text-lg leading-8 font-light w-[85%]">
          <table className="border-separate border-spacing-x-4">
            <tbody>
              <tr>
                <td>Condition:</td>
                <td>{data.current.condition.text}</td>
              </tr>
              <tr>
                <td>Temp:</td>
                <td>{`${data.current.temp_c} \u00b0 C / ${data.current.temp_f} \u00b0 F`}</td>
              </tr>
              <tr>
                <td>Humidity:</td>
                <td>{data.current.humidity}</td>
              </tr>
              <tr>
                <td>Last Updated:</td>
                <td>{data.current.last_updated}</td>
              </tr>
            </tbody>
          </table>
        </div> 
        {/* END CELL INFO */}
      </div>
    
    </>
  )
}
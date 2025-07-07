import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { addCity } from "../redux/citySlice";
import { FaCheck } from "react-icons/fa";

export default function SearchCity({data, isChecked}) {
  
  // BEGIN ADD CITY
  const dispatch = useDispatch()
  const saveCity = () => {
    dispatch(addCity(data.id))
  }
  // END ADD CITY

  // BEGIN UPDATE LOCAL STORAGE
  const newData = useSelector(state => state.savedCities.cities)
  React.useEffect(()=>{
    localStorage.setItem('cities', JSON.stringify(newData))
  }, [newData])
  // END UPDATE LOCAL STORAGE

  return (
    <>
      <div>
        <div
          onClick={saveCity} 
          className="hover:bg-slate-700 hover:cursor-pointer h-8 flex justify-between items-center px-4 text-white ">
          {data.name + ', ' + data.region + ', ' + data.country}
          {isChecked ? <FaCheck/>: <></>}
        </div>
      </div>
    </>
  )
}
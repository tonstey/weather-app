import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import { setCities } from "../redux/citySlice.js"
import CityWeather from'../components/CityWeather.jsx'
import '../App.css'

export default function DefaultPage(props) {
  
  const key = import.meta.env.VITE_KEY
  const navigate = useNavigate()
  const [userCities, setUserCities] = React.useState({}) // Stores all city info

  // BEGIN FETCH LOCAL STORAGE
  const dispatch = useDispatch()
  React.useEffect(() => {
    const getStorage = localStorage.getItem('cities')
    if (getStorage) {
      const saveState = JSON.parse(getStorage)

      if (saveState) {
        dispatch(setCities(saveState))
      }
    }
  }, [dispatch])
  // END FETCH LOCAL STORAGE

  // BEGIN FETCH CITY INFO
  const cityArr = useSelector(state => state.savedCities.cities)
  React.useEffect(() => {
     if (cityArr.length > 0) {
    const newCities = {};
    Promise.all(
      cityArr.map(city =>
        fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=id:${city}&aqi=yes`)
          .then(res => res.json())
          .then(data => {
            newCities[city] = data
          })
      )
    ).then(() => setUserCities(newCities)) // Only set once all data is loaded
  } else {
    setUserCities({});
  }
  }, [cityArr]) 
  // END FETCH CITY INFO
  
  // BEGIN SCROLL FEATURE
  const [displayNum, setDisplayNum] = React.useState(0)
  const scrollLeft = () => {
    if (displayNum > 0){
      setDisplayNum(prev => prev - 1)
    }
  }
  const scrollRight = () => {
    if (displayNum < cityArr.length - 1) {
      setDisplayNum(prev => prev + 1)
    }
  }
  // END SCROLL FEATURE

  return (
    <>
      <main className="w-full flex flex-col justify-center items-center">

        {/* BEGIN WEBSITE DESCRIPTION */}
        <p className="text-white text-3xl font-medium mx-auto w-160 text-center mb-12">
          Seeing the weather of the whole world with <span className="text-descColor">Weather Wise!</span>
        </p>
        {/* END WEBSITE DESCRIPTION */}

        <section className="flex justify-center align-center w-[60rem] relative">

          {/* BEGIN DATA DISPLAY */}
          <button 
            className={`${displayNum <= 0 ? `opacity-25 hover:cursor-default` : `hover:cursor-pointer`} bg-neutral-400 absolute -left-12 top-[45%] text-6xl rounded-lg w-12`}
            onClick={scrollLeft}
          >{'<'}</button>

          <div className="flex justify-start align-center overflow-hidden w-[100%] relative">
            <div 
              className="flex transition-transform duration-300" 
              style={{ transform: `translateX(${-displayNum * 30}rem)` }}
            >
                { Object.keys(userCities).length > 0 ? 
                  Object.entries(userCities).map( city => <CityWeather key={city[0]} id={Number(city[0])} data={city[1]} setUserCities={setUserCities}  />) : 
                  <p className="text-slate-300 ml-36 text-2xl">There are no cities, please press the '+' button to add one!</p>
                }
            </div>
          </div>

          <button 
            className={`${displayNum >= cityArr.length-1 ? `opacity-25 hover:cursor-default` : `hover:cursor-pointer`} bg-neutral-400 absolute -right-12 top-[45%] text-6xl rounded-lg w-12`}
            onClick={scrollRight}
          >{'>'}</button>
          {/* END DATA DISPLAY */}
          
          <button 
            className="bg-descColor w-12 h-12 text-2xl rounded-2xl absolute right-5 -top-20"
            onClick={() => navigate('/addcity')}
          >+</button>

        </section>
      </main>
    </>
  )
}
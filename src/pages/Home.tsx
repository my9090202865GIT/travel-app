import React, { useEffect } from 'react'
import Img_json from '../travel.json'
import { useAppDispatch } from '../redux/hooks'
import { addLocation } from '../redux/features/locationSlice'
import { addCurrentLocation } from '../redux/features/locationSlice'
import { useAppSelector } from '../redux/hooks'
import ProductCard from '../components/productCard'
import { json_type } from '../models/json_type'
import { doLogout } from '../redux/features/authSlice'

const Home = () => {

    const dispatch = useAppDispatch()
    const Alllocations = useAppSelector(state => state.LocReducer.locations)
    const Allimages = useAppSelector(state => state.LocReducer.images)
    const currentlocation = useAppSelector((state) => state.LocReducer.currentLocation)
    const [showImage, setShowImage] = React.useState<json_type[]>([])
    // const [currentlocation, setcurrentlocation] = React.useState<string>("all")

    useEffect(() => {
        if (Alllocations.length === 0 || Allimages.length !== Alllocations.length) {
            const locArray = Img_json.map((item) => item.loc)
            dispatch(addLocation({ locations: locArray, images: Img_json }))
        }
    }, [])

    useEffect(() => {
        setShowImage(Allimages)
    }, [Alllocations, Allimages]);

    useEffect(() => {
        if (currentlocation !== "all") {
            setShowImage(Allimages.filter(obj => obj.loc === currentlocation))
        }
    }, [currentlocation])

    return (
        <div>
            <div className="col-span-1">
                <h1 className="font-bold mb-2">Locations</h1>
                <div className="space-y-1">
                    <button type="button" onClick={() => {
                        dispatch(doLogout())
                    }} className=" absolute top-0 right-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Logout</button>
                    <ul className=''>
                        <li onClick={() => {
                            dispatch(addCurrentLocation({ currentLocation: "all" }));
                            setShowImage(Allimages)
                        }} className={`relative top-[-15px] left-[370px] inline-block cursor-pointer hover:text-blue-500 `}>All Locations</li>
                        {Alllocations.map((_location) => (
                            <li
                                key={_location}
                                className={`inline m-2 cursor-pointer hover:text-blue-500 ${_location === currentlocation ? "text-blue-500" : ""
                                    }`}
                                onClick={() => {
                                    dispatch(addCurrentLocation({ currentLocation: _location }))
                                }}
                            >
                                {_location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ProductCard images={showImage} />
        </div>
    )
}

export default Home
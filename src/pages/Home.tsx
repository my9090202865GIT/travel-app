import React, { useEffect } from 'react'
import Img_json from '../travel.json'
import { useAppDispatch } from '../redux/hooks'
import { addLocation } from '../redux/features/locationSlice'
import { useAppSelector } from '../redux/hooks'
import ProductCard from '../components/productCard'
import { json_type } from '../models/json_type'

const Home = () => {

    const dispatch = useAppDispatch()
    const Alllocations = useAppSelector(state => state.LocReducer.locations)
    const Allimages = useAppSelector(state => state.LocReducer.images)
    const [showImage, setShowImage] = React.useState<json_type[]>([])
    const [currentlocation, setcurrentlocation] = React.useState<string>("all")

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
                    <div onClick={() => {
                        setcurrentlocation("all");
                        setShowImage(Allimages)
                    }} className={`cursor-pointer hover:text-blue-500 `}>All Locations</div>
                    {Alllocations.map((_location) => (
                        <div
                            key={_location}
                            className={`cursor-pointer hover:text-blue-500 ${_location === currentlocation ? "text-blue-500" : ""
                                }`}
                            onClick={() => {
                                setcurrentlocation(_location);
                            }}
                        >
                            {_location}
                        </div>
                    ))}
                </div>
            </div>
            <ProductCard images={showImage} />
        </div>
    )
}

export default Home
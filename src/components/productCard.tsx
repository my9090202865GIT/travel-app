import React, { FC } from 'react'
import { json_type } from '../models/json_type'

interface propType {
    locations?: string[],
    images: json_type[]
}

const ProductCard: FC<propType> = ({ locations, images }) => {
    return (
        <div className=' grid grid-rows-3 grid-flow-col gap-2'>
            {images.map((item) => Object.values(item.pic).map((pic) => {
                return < div className=" row-span-3 hover:row-span-4 w-full max-w-[26rem] rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg" >
                    <div className="relative  mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                        <img
                            src={pic}
                            alt="ui/ux review check" />
                    </div>
                </div >
            }))}
        </div>
    )
}

export default ProductCard
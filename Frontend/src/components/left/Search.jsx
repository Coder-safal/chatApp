import React from 'react'
import { IoSearch } from "react-icons/io5";

function Search() {
    return (
        <div className='px-4 py-4 h-[12vh]'>
            <form action="">
                <div className='flex space-x-3'>
                    <label className="input input-bordered flex items-center gap-2 w-[80%]">
                        <input type="text" className="grow" placeholder="Search" />
                    </label>
                    <button >
                        <IoSearch className='text-5xl p-2 hover:bg-gray-500 rounded-full duration-300'/>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Search
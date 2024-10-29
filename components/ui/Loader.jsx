import React from 'react'

function Loader() {
  return (
    <div className='fixed top-0 left-0 w-full h-[100dvh] flex justify-center items-center bg-black bg-opacity-50 z-[100]'>
        <div className="loader"></div>
    </div>
  )
}

export default Loader
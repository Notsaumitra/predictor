import React from 'react'

const Header = () => {
  return (
    <>
        <h1 className="mb-1 px-3 py-10 sm:px-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Enter a name to predict <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-800 from-sky-600">Age, Gender and Countries</span></h1>
        <p className="mb-1 px-2 py-10 text-lg font-normal text-gray-500 lg:text-xl sm:px-32 xl:px-48 dark:text-gray-400 text-center">Searching names will give result for a person's age, gender and list of all countries with probability(click on three dots ... to reveal all countries)</p>
    </>
  )
}

export default Header
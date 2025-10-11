import React from 'react'
import Image from 'next/image'

const Favorites = () => {
  return (
    <main className="dark:bg-background bg-neutral-50 globalColor min-h-screen max-h-fit p-20 flex flex-col w-full justify-start gap-20 items-center">
      <h3>Hi John, Your favorite locations go here...</h3>
      <Image alt="Weather" src={"./weather.svg"} width={300} height={300}></Image>

    </main>
  )
}

export default Favorites

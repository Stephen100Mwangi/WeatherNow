import React from "react";
import Image from "next/image";

const CompareLocations = () => {
  return (
    <main className="dark:bg-background bg-neutral-50 globalColor min-h-screen max-h-fit p-20 flex flex-col w-full justify-start gap-20 items-center">
      <h3>Compare the weather side by side and plan your next adventure!</h3>
      <div className="flex gap-20">
        <div className="border border-white  p-2  flex flex-col justify-start items-center gap-10">
          <h6>Location 1</h6>
          <Image
            alt="Weather"
            src={"./clouds.svg"}
            width={300}
            height={300}
          ></Image>
        </div>
        <div className="border border-white  p-2 flex flex-col justify-start items-center gap-10">
          <h6>Location 2</h6>
          <Image
            alt="Weather"
            src={"./seasonChange.svg"}
            width={300}
            height={300}
          ></Image>
        </div>
      </div>
    </main>
  );
};

export default CompareLocations;

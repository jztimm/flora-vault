import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="relative w-[100vw] h-[50vw]">
      <Image
        src={"/images/herbs-in-jars.jpg"}
        alt="FloralVault Logo"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="flex flex-col items-center min-h-screen gap-4 text-white">
        <section className="z-10 flex items-center justify-center ">
          <h2 className="z-10 pt-20 font-semibold text-4xl text-center justify-center">
            Welcome to FloralVault
          </h2>
          {/* <span> 🌿</span> */}
        </section>
        <p className="z-10 text-lg">You&apos;re personal garden of Eden</p>
      </div>
    </div>
  );
}

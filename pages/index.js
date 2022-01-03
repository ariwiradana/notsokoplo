import React from 'react'
import { logo } from '../public/assets/img'

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500">
      {/* <img src={logo.src} alt="logo" className="w-60 h-60 animate-pulse" /> */}
      <p className="text-3xl">Hello</p>
    </div>
  );
}

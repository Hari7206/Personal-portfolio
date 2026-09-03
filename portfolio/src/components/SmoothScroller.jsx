"use client";
import useLenis from '../hooks/useLenis'

function SmoothScroller({ children }) {

    useLenis(); // Initialize Lenis for smooth scrolling
  return (
   <>{children}</>
  )
}

export default SmoothScroller
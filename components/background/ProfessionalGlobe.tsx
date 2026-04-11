'use client'

import { useEffect, useRef, forwardRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with Three.js
const GlobeGL = dynamic(() => import('react-globe.gl').then(mod => {
  // Wrap the component with forwardRef to handle refs properly
  return forwardRef((props: any, ref: any) => {
    const Component = mod.default
    return <Component {...props} ref={ref} />
  })
}), { ssr: false })

export default function ProfessionalGlobe() {
  const globeEl = useRef<any>()

  useEffect(() => {
    if (globeEl.current) {
      // Set initial view
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 })
      
      // Disable rotation
      globeEl.current.controls().autoRotate = false
      globeEl.current.controls().enableZoom = false
    }
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
      <div 
        className="relative"
        style={{
          width: '650px',
          height: '650px',
          transform: 'translateY(8%)',
        }}
      >
        <GlobeGL
          ref={globeEl}
          width={650}
          height={650}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          atmosphereColor="rgba(34, 197, 94, 0.3)"
          atmosphereAltitude={0.15}
          showAtmosphere={true}
          enablePointerInteraction={false}
        />
      </div>
    </div>
  )
}

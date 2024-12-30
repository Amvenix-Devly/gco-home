/* eslint-disable jsx-a11y/alt-text */
'use client'

import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import trees from './trees.json'



const CustomMap = () => {
  const [popupInfo, setPopupInfo] = useState<any>(null)

  const pins = useMemo(
    () =>
      trees.map((tree, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={Number(tree.lon)}
          latitude={Number(tree.lat)}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation()
            setPopupInfo(tree)
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  )
  return (
    <div className="w-full h-full">
      <ReactMapGL
        initialViewState={{
          latitude: 24.1989618,
          longitude: 88.8359021,
          zoom: 12,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={
          'pk.eyJ1Ijoic2h1dm8xNTU2IiwiYSI6ImNtMzlzZnZ6bjEycncya3M1MWdoZ3RpMjQifQ.pW23rGOMoemOE5Vsv1kofg'
        }
      >
        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.lon)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
            className="p-0"
          >
            <div>
              <Image
                alt="tree"
                width={150}
                height={150}
                className="object-cover aspect-video object-center rounded-[2px]"
                src={popupInfo?.TreeImage[0]?.imageUrl}
              />
              <a
                className="underline focus:no-underline"
                autoFocus={false}
                target="_new"
                href={popupInfo?.TreeImage[0]?.imageUrl}
              >
                See full size↗
              </a>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  )
}

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`

const Pin = ({ size = 20 }) => {
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      style={{
        cursor: 'pointer',
        fill: '#d00',
        stroke: 'none',
      }}
    >
      <path d={ICON} />
    </svg>
  )
}

export default CustomMap

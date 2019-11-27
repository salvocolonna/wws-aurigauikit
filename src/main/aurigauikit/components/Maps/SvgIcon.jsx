import React from 'react'

const SvgIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="map-marker-alt"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <g>
        <path
          stroke={'black'}
          strokeWidth={'1'}
          fill={props && props.color ? props.color : '#267fca'}
          d="M192 0C86 0 0 86 0 192c0 77.41 27 99 172.27 309.67a24 24 0 0 0 39.46 0C357 291 384 269.41 384 192 384 86 298 0 192 0zm0 288a96 96 0 1 1 96-96 96 96 0 0 1-96 96z"
        />
        <path d="M192 288a96 96 0 1 1 96-96 96 96 0 0 1-96 96z" fill={'white'} />
      </g>
    </svg>
  )
}

export default SvgIcon

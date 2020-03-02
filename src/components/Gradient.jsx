import React from 'react'
import PropTypes from 'prop-types'

const Gradient = ( { id, colors, type, ...props } ) => {
  const stops = ( 
    <>
      {colors.map( ( color, i ) => (
        <stop
          key={i}
          offset={`${i * 100 / ( colors.length - 1 )}%`}
          stopColor={color}
        />
      ) )}
    </> 
  )

  if( type === 'linear' ){
    return (
      <linearGradient id={id} gradientUnits="userSpaceOnUse" spreadMethod="pad" {...props}>
        {stops}
      </linearGradient>
    )

  } else if ( type === 'radial' ) {
    return (
      <radialGradient id={id} gradientUnits="userSpaceOnUse" spreadMethod="pad" {...props}>
        {stops}
      </radialGradient>
    )

  }
}

Gradient.propTypes = {
  id: PropTypes.string,
  colors: PropTypes.arrayOf(
    PropTypes.string,
  ),
  type: PropTypes.oneOf( ['linear', 'radial'] ),
}

Gradient.defaultProps = {
  id: 'gradient',
  colors: [],
  type: 'linear'
}

export default Gradient
// export const callAccessor = ( accessor, d, i ) => ( typeof accessor === 'function' ? accessor( d, i ) : accessor );

// export const dimensionsPropsType = PropTypes.shape( {
//   height: PropTypes.number,
//   width: PropTypes.number,
//   marginTop: PropTypes.number,
//   marginRight: PropTypes.number,
//   marginBottom: PropTypes.number,
//   marginLeft: PropTypes.number,
// } );

// let lastId = 0;
// export const useUniqueId = ( prefix = '' ) => {
//   lastId++;
//   return [prefix, lastId].join( '-' );
// };

import { useEffect, useState, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import * as d3 from 'd3';

const defaultDimensions = {
  marginTop: 40,
  marginRight: 30,
  marginBottom: 80,
  marginLeft: 75,
};

const makeDimensions = ( dimensions ) => ( { ...defaultDimensions, ...dimensions } );

const useResponsiveChart = ( appliedDimensions ) => {
  const ref = useRef();
  const [height, setHeight] = useState( 0 );
  const [width, setWidth] = useState( 0 );

  const dimensions = makeDimensions( appliedDimensions );


  useEffect( () => {
    const element = ref.current;

    const resizeObserver = new ResizeObserver( ( entries ) => {
      if ( !Array.isArray( entries ) ) return;
      if ( !entries.length ) return;
      const entry = entries[0];

      if ( width !== entry.contentRect.width ) setWidth( entry.contentRect.width );
      if ( height !== entry.contentRect.height ) setHeight( entry.contentRect.height );
    } );

    resizeObserver.observe( element );

    return () => resizeObserver.unobserve( element );
  }, [height, width, appliedDimensions, dimensions] );

  const updatedDimensions = {
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  };

  updatedDimensions.boundedHeight = d3.max( [
    updatedDimensions.height
        - updatedDimensions.marginTop
        - updatedDimensions.marginBottom,
    0,
  ] );
  updatedDimensions.boundedWidth = d3.max( [
    updatedDimensions.width
        - updatedDimensions.marginLeft
        - updatedDimensions.marginRight,
    0,
  ] );

  return [ref, updatedDimensions];
};

export default useResponsiveChart;

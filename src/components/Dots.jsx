import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const Dots = ( {
  data,
  fill,
  xAccessor,
  yAccessor,
  widthAccessor,
  heightAccessor,
  radius,
  mapKey,
  onMouseEnter,
  id,
  className,
  ...props
} ) => {
  return (
    <>
      {data.map( ( d, i ) => (
        <circle
          id={`${id}-${xAccessor( d )}-${yAccessor( d )}`}
          className={className}
          key={mapKey ? d[mapKey] : i}
          cx={xAccessor( d )}
          cy={yAccessor( d )}
          r={typeof radius === 'function' ? radius( d ) : radius}
          fill={typeof fill === 'function' ? fill( d ): fill}
          onMouseEnter={( e ) => onMouseEnter( e, d )}
          {...props}
        />
      ) )}
    </> );
};

export default Dots;

Dots.propTypes = {
  data: PropTypes.array.isRequired,
  fill: PropTypes.oneOfType( [ PropTypes.number, PropTypes.func] ),
  xAccessor: PropTypes.func.isRequired,
  yAccessor: PropTypes.func.isRequired,
  radius: PropTypes.oneOfType( [PropTypes.number, PropTypes.func] ),
  mapKey: PropTypes.oneOfType( [PropTypes.string, PropTypes.number] ),
  id: PropTypes.oneOfType( [PropTypes.string, PropTypes.number] ),
  className: PropTypes.string,
  onMouseEnter: PropTypes.func,
};

Dots.defaultProps = {
  fill: '#000000',
  id: 'dot',
  radius: 4, 
};

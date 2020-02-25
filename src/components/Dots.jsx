import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const Dots = ( {
  data,
  xAccessor,
  yAccessor,
  widthAccessor,
  heightAccessor,
  radius,
  mapKey,
  id,
  className,
} ) => (
  <>
    {data.map( ( d, i ) => (
      <circle
        id={`${id}-${i}`}
        className={className}
        key={d[mapKey] || i}
        cx={xAccessor( d )}
        cy={yAccessor( d )}
        r={radius}
        fill="red"
        width={d3.max( [widthAccessor( d ), 0] )}
        height={d3.max( [heightAccessor( d ), 0] )}
      />
    ) )}
  </>
);

export default Dots;

Dots.propTypes = {
  // eslint-disable-next-line
  data: PropTypes.array.isRequired,
  xAccessor: PropTypes.func.isRequired,
  yAccessor: PropTypes.func.isRequired,
  radius: PropTypes.number.isRequired,
  widthAccessor: PropTypes.func.isRequired,
  heightAccessor: PropTypes.func.isRequired,
  // eslint-disable-next-line
  mapKey: PropTypes.oneOfType( [PropTypes.string, PropTypes.number] ),
  // eslint-disable-next-line
  id: PropTypes.oneOfType( [PropTypes.string, PropTypes.number] ),
  // eslint-disable-next-line
  className: PropTypes.string,
};

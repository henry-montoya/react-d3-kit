import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const Bars = ( {
  data,
  xAccessor,
  yAccessor,
  widthAccessor,
  heightAccessor,
  mapKey,
  id,
  className,
} ) => (
  <>
    {data.map( ( d, i ) => {

      return (
        <rect
          id={`${id}-${i}`}
          className={className}
          key={mapKey ? d[mapKey] : i}
          x={xAccessor( d )}
          y={yAccessor( d )}
          fill="red"
          width={d3.max( [widthAccessor( d ), 0] )}
          height={d3.max( [heightAccessor( d ), 0] )}
        />
      );
    } )}
  </>
);
export default Bars;

Bars.propTypes = {
  data: PropTypes.array.isRequired,
  xAccessor: PropTypes.func.isRequired,
  yAccessor: PropTypes.func.isRequired,
  widthAccessor: PropTypes.func.isRequired,
  heightAccessor: PropTypes.func.isRequired,
  mapKey: PropTypes.oneOfType( [PropTypes.string, PropTypes.number] ),
  id: PropTypes.oneOfType( [PropTypes.string, PropTypes.number] ),
  className: PropTypes.string,
};

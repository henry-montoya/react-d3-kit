import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const Bars = ( {
  data,
  fill,
  xAccessor,
  yAccessor,
  widthAccessor,
  heightAccessor,
  mapKey,
  id,
  className,
  showLabels,
  ...props
} ) => (
  <>
    {data.map( ( d, i ) => {

      return (
        <Fragment key={mapKey ? d[mapKey] : i}>
          {showLabels && d.length > 0 && (
            <text 
              transform={`translate(${xAccessor( d ) + ( d3.max( [widthAccessor( d ), 0] ) / 2 )}, ${yAccessor( d ) - 5 })`}
              style={{ textAnchor: 'middle' }}
            >
              {d.length}
            </text>
          )}
          <rect
            id={`${id}-${i}`}
            className={className}
            x={xAccessor( d )}
            y={yAccessor( d )}
            fill={fill}
            width={d3.max( [widthAccessor( d ), 0] )}
            height={d3.max( [heightAccessor( d ), 0] )}
            {...props}
          />
        </Fragment>
      );
    } )}
  </>
);
export default Bars;

Bars.propTypes = {
  data: PropTypes.array.isRequired,
  fill: PropTypes.string,
  xAccessor: PropTypes.func.isRequired,
  yAccessor: PropTypes.func.isRequired,
  widthAccessor: PropTypes.func.isRequired,
  heightAccessor: PropTypes.func.isRequired,
  mapKey: PropTypes.oneOfType( [PropTypes.string, PropTypes.number] ),
  id: PropTypes.oneOfType( [PropTypes.string, PropTypes.number] ),
  className: PropTypes.string,
  showLabels: PropTypes.bool,
};

Bars.defaultProps = {
  fill: '#000000',
  showLabels: false,
}

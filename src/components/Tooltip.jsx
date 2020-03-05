import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { scaleBand } from 'd3';

const Tooltip = ( {
  fill,
  height,
  width,
  position,
  x,
  ...props
} ) => {

  return (
    <rect
      // id={`${id}-${i}`}
      // className={className}
      x={x}
      y={0}
      fill={fill}
      width={100}
      height={100}
      {...props}
    />
  );
};
export default Tooltip;

Tooltip.propTypes = {
//   data: PropTypes.array.isRequired,
//   fill: PropTypes.string,
//   xAccessor: PropTypes.func.isRequired,
//   yAccessor: PropTypes.func.isRequired,
//   widthAccessor: PropTypes.func.isRequired,
//   heightAccessor: PropTypes.func.isRequired,
//   mapKey: PropTypes.oneOfType( [PropTypes.string, PropTypes.number] ),
//   id: PropTypes.oneOfType( [PropTypes.string, PropTypes.number] ),
//   className: PropTypes.string,
//   showLabels: PropTypes.bool,
//   labelColor: PropTypes.string,
};

Tooltip.defaultProps = {
  fill: '#000000',
//   showLabels: false,
//   labelColor: '#bdc3c7',
};
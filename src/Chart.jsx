import React from 'react';
import PropTypes from 'prop-types';

const Chart = ( { dimensions, children } ) => {
  const {
    width, height, marginLeft, marginTop,
  } = dimensions;
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${marginLeft}, ${marginTop})`}>{children}</g>
    </svg>
  );
};

export default Chart;

Chart.propTypes = {
  dimensions: PropTypes.object.isRequired,
  children: PropTypes.any,
};

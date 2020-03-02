import React from 'react';
import PropTypes from 'prop-types';

const AxisHorizontal = ( {
  classes,
  dimensions,
  label,
  formatTick,
  scale,
  strokeColor,
  strokeWidth,
  ...props
} ) => {
  const { boundedWidth, boundedHeight } = dimensions;

  const tickCount = boundedWidth < 500 ? boundedWidth / 100 : boundedWidth / 200;

  const ticks = scale.ticks( tickCount );

  return (
    <g transform={`translate(0, ${boundedHeight})`} {...props}> 
      <line className={classes.axis} stroke={strokeColor} strokeWidth={strokeWidth} x2={boundedWidth} />
      {ticks.map( ( tick ) => (
        <text
          style={{textAnchor: 'middle'}}
          className={classes.values}
          key={tick}
          transform={`translate(${scale( tick )}, 25)`}
        >
          {formatTick( tick )}
        </text>
      ) )}
      {label && (
        <text
          className={classes.label}
          transform={`translate(${boundedWidth / 2}, 60)`}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default AxisHorizontal;

AxisHorizontal.propTypes = {
  classes: PropTypes.object,
  dimensions: PropTypes.object.isRequired,
  label: PropTypes.oneOfType( [
    PropTypes.string,
    PropTypes.number,
  ] ),
  formatTick: PropTypes.func.isRequired,
  scale: PropTypes.func.isRequired,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.oneOfType( [
    PropTypes.string,
    PropTypes.number,
  ] ),

};

AxisHorizontal.defaultProps = {
  classes: {
    axis:  {},
    label: {},
    values: {},
  },
  label: null,
  strokeColor: '#bdc3c7',
  strokeWidth: 1,
};

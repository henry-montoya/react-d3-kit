import React from 'react';
import PropTypes from 'prop-types';

const AxisHorizontal = ( {
  dimensions,
  label,
  formatTick,
  scale,
  strokeColor,
  strokeWidth,
} ) => {
  const { boundedWidth, boundedHeight } = dimensions;

  const tickCount = boundedWidth < 500 ? boundedWidth / 100 : boundedWidth / 200;

  const ticks = scale.ticks( tickCount );

  return (
    <g transform={`translate(0, ${boundedHeight})`}>
      <line className="Axis__line" stroke={strokeColor} strokeWidth={strokeWidth} x2={boundedWidth} />
      {ticks.map( ( tick ) => (
        <text
          key={tick}
          className="Axis__tick"
          transform={`translate(${scale( tick )}, 25)`}
        >
          {formatTick( tick )}
        </text>
      ) )}
      {label && (
        <text
          className="Axis__label"
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
  label: null,
  strokeColor: '#000000',
  strokeWidth: 1,
};

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const AxisVertical = ( {
  dimensions,
  label,
  formatTick,
  scale,
  showTickMarks,
  strokeColor,
  strokeWidth,
} ) => {
  const { boundedHeight } = dimensions;

  const tickCount = dimensions.boundedHeight / 70;

  const ticks = scale.ticks( tickCount );

  return (
    <g transform="translate(0, 0)">
      <line y2={boundedHeight} stroke={strokeColor} strokeWidth={strokeWidth} />
      {ticks.map( ( tick ) => (
        <Fragment key={tick}>
          <text
            key={tick}
            className="Axis__tick"
            transform={`translate(-24, ${scale( tick )})`}
          >
            {formatTick( tick )}
          </text>
          {showTickMarks && (
            <line
              className="vert-tick"
              x1={-5}
              x2={0}
              y1={scale( tick )}
              y2={scale( tick )}
              stroke="black"
            />
          )}
        </Fragment>
      ) )}
      {label && (
        <text
          className="Axis__label"
          style={{
            transform: `translate(-56px, ${boundedHeight / 2}px) rotate(-90deg)`,
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default AxisVertical;

AxisVertical.propTypes = {
  dimensions: PropTypes.object.isRequired,
  label: PropTypes.oneOfType( [
    PropTypes.string,
    PropTypes.number,
  ] ),
  formatTick: PropTypes.func.isRequired,
  scale: PropTypes.func.isRequired,
  showTickMarks: PropTypes.bool,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.oneOfType( [
    PropTypes.string,
    PropTypes.number,
  ] ),
};

AxisVertical.defaultProps = {
  label: null,
  showTickMarks: true,
  strokeColor: '#000000',
  strokeWidth: 1,
};

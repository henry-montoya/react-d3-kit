import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const AxisVertical = ( {
  classes,
  dimensions,
  label,
  labelColor,
  formatTick,
  scale,
  tickValueColor,
  showTickMarks,
  showZeroTick,
  strokeColor,
  strokeWidth,
  ...props
} ) => {
  const { boundedHeight } = dimensions;

  const tickCount = dimensions.boundedHeight / 70;

  const ticks = scale.ticks( tickCount );

  return (
    <g transform="translate(0, 0)" {...props}>
      <line className={classes.axis} y2={boundedHeight} stroke={strokeColor} strokeWidth={strokeWidth} />
      {ticks.slice( showZeroTick ? 0 : 1 ).map( ( tick ) => (
        <Fragment key={tick}>
          <text
            fill={tickValueColor}
            className={classes.values}
            key={tick}
            transform={`translate(-32, ${scale( tick )})`}
          >
            {formatTick( tick )}
          </text>
          {showTickMarks && (
            <line
              className={classes.axis || classes.ticks}
              x1={-5}
              x2={0}
              y1={scale( tick )}
              y2={scale( tick )}
              stroke={strokeColor}
            />
          )}
        </Fragment>
      ) )}
      {label && (
        <text
          fill={labelColor}
          className={classes.label}
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
  labelColor: PropTypes.string,
  formatTick: PropTypes.func.isRequired,
  scale: PropTypes.func.isRequired,
  showTickMarks: PropTypes.bool,
  showZeroTick: PropTypes.bool,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.oneOfType( [
    PropTypes.string,
    PropTypes.number,
  ] ),
  tickValueColor: PropTypes.string,
};

AxisVertical.defaultProps = {
  classes: {
    axis:  null,
    label: null,
    ticks: null,
    values: null,
  },
  label: null,
  labelColor: '#bdc3c7',
  showTickMarks: true,
  showZeroTick: false,
  strokeColor: '#bdc3c7',
  strokeWidth: 1,
  tickValueColor: '#bdc3c7',
};

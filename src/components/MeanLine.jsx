import React from 'react';
import PropTypes from 'prop-types';

const MeanLine = ( {
  classes,
  dimensions,
  id,
  meanValue,
  scale,
  strokeColor,
  dashLength,
  showLabel,
  labelText,
  labelTextColor,
  showValue,
  ...props
} ) => {
  return(
    <>
      <text
        fill={labelTextColor}
        className={classes.label}
        transform={`translate(${scale( meanValue )}, -20)`}
        style={{ textAnchor: 'middle' }}
      >
        {labelText}
      </text>
      <line 
        id={id}
        className={classes.line}
        x1={scale( meanValue )} 
        x2={scale( meanValue )} 
        y1={-15} 
        y2={dimensions.boundedHeight} 
        stroke={strokeColor}
        strokeDasharray={dashLength}
        {...props}
      />
    </> 
  );
};

export default MeanLine;

MeanLine.propTypes = {
  dimensions: PropTypes.object.isRequired,
  scale: PropTypes.func.isRequired,
  strokeColor: PropTypes.string,
  dashLength: PropTypes.number,
  id: PropTypes.oneOfType( [PropTypes.string, PropTypes.number] ),
  classes: PropTypes.object,
  labelText: PropTypes.string,
  labelTextColor: PropTypes.string,
  showLabel: PropTypes.bool,
  showValue: PropTypes.bool,
};

MeanLine.defaultProps = {
  classes: {
    line: null,
    label: null,
    value: null
  },
  dashLength: 5,  
  id: 'meanLine',
  labelText: 'Mean',
  labelTextColor: '#bdc3c7',
  showLabel: false,
  showValue: false,
  strokeColor: '#bdc3c7',
};
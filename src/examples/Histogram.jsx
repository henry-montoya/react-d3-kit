import React, { useState } from 'react';
import useResponsiveChart from '../hooks/useResponsiveChart';
import Chart from '../Chart';
import AxisHorizontal from '../axes/AxisHorizontal';
import AxisVertical from '../axes/AxisVertical';
import Bars from '../components/Bars';
import Gradient from '../components/Gradient';
import useHistogramUtils from '../utils/useHistogramUtils';
import MeanLine from '../components/MeanLine';
import Tooltip from '../components/Tooltip';

const gradientColors = ['red', 'yellow'];
const gradientId = 'bar-gradient';

const Histogram = ( { data } ) => {
  const [hoveredDatum, setHoveredDatum] = useState( null );
  const [ref, dimensions] = useResponsiveChart();
 
  const histogramConfig = {
    metricValueKey: 'x',
    barPadding: 10,
    thresholdCount: 6,
    dimensions,
  };

  const {
    xAxisScale,
    yAxisScale,
    formatTick,
    histogramBins,
    xValueScaled,
    yValueScaled,
    barWidthGetter,
    barHeightGetter,
    meanValue
  } = useHistogramUtils( data.scatter, histogramConfig );

  const handleMouseEnter = e => {
    console.log( 'e', e.clientX );
    setHoveredDatum( e.clientX);
  };

  const handleMouseLeave = e => {
    console.log( 'e' ,e );
    setHoveredDatum( false );
  };


  return (
    <div
      ref={ref}
      style={{ height: window.innerHeight }}
    >
      <Chart dimensions={dimensions}>
        <defs>
          <Gradient id={gradientId} colors={gradientColors} x2="0" y2="100%" />
        </defs>
        <AxisHorizontal
          dimensions={dimensions}
          scale={xAxisScale}
          label="x label"
          formatTick={formatTick}
        />
        <AxisVertical
          dimensions={dimensions}
          scale={yAxisScale}
          label="y label"
          formatTick={formatTick}
        />
        <Bars
          data={histogramBins}
          xAccessor={xValueScaled}
          yAccessor={yValueScaled}
          widthAccessor={barWidthGetter}
          heightAccessor={barHeightGetter}
          style={{ fill: `url(#${gradientId})` }}
          showLabels
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <MeanLine
          dimensions={dimensions}
          scale={xAxisScale}
          meanValue={meanValue}
        />
        {hoveredDatum !== false && (
          <Tooltip x={hoveredDatum}/>
        )}
      </Chart>
    </div>
  );
};

export default Histogram;

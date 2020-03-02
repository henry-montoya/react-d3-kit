import React from 'react';
import useResponsiveChart from '../hooks/useResponsiveChart';
import Chart from '../Chart';
import AxisHorizontal from '../axes/AxisHorizontal';
import AxisVertical from '../axes/AxisVertical';
import Bars from '../components/Bars';
import Gradient from '../components/Gradient';
import useHistogramUtils from '../utils/useHistogramUtils';

const gradientColors = ['red', 'yellow'];
const gradientId = 'bar-gradient'

const Histogram = ( { data } ) => {
  const [ref, dimensions] = useResponsiveChart();

  const histogramConfig = {
    xValueKey: 'x',
    barPadding: 10,
    thresholdCount: 6,
    dimensions,
  };

  const {
    xAxisScale,
    yAxisScale,
    formatTick,
    binsGenerator,
    xValueScaled,
    yValueScaled,
    barWidthGetter,
    barHeightGetter,
  } = useHistogramUtils( data.scatter, histogramConfig );

  const bins = binsGenerator( data.scatter );

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
          data={bins}
          xAccessor={xValueScaled}
          yAccessor={yValueScaled}
          widthAccessor={barWidthGetter}
          heightAccessor={barHeightGetter}
          style={{ fill: `url(#${gradientId})` }}
          showLabels
        />
      </Chart>
    </div>
  );
};

export default Histogram;

import React from 'react';
import useResponsiveChart from '../hooks/useResponsiveChart';
import Chart from '../Chart';
import AxisHorizontal from '../axes/AxisHorizontal';
import AxisVertical from '../axes/AxisVertical';
import Dots from '../components/Dots';
import useScatterUtils from '../utils/useScatterUtils';

const Scatterplot = ( { data } ) => {
  const [ref, dimensions] = useResponsiveChart();

  const scatterConfig = {
    xValueKey: 'x',
    yValueKey: 'y',
    dimensions,
    colorKey: 'x',
    startColor: 'yellow',
    endColor: 'red',
  };

  const handleMouseOver = ( e, datum ) => {
    console.log( 'e', e.target );
    console.log( 'datum', datum );
  };

  const {
    xAxisScale,
    yAxisScale,
    formatTick,
    xValueScaled,
    yValueScaled,
    colorValueScaled,
  } = useScatterUtils( data.scatter, scatterConfig );

  return (
    <div
      ref={ref}
      style={{ height: window.innerHeight }}
    >
      <Chart dimensions={dimensions}>
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
        <Dots
          onMouseEnter={handleMouseOver}
          data={data.scatter}
          fill={colorValueScaled}
          radius={10}
          xAccessor={xValueScaled}
          yAccessor={yValueScaled}
        />
      </Chart>
    </div>
  );
};

export default Scatterplot;
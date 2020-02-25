import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import useResponsiveChart from '../hooks/useResponsiveChart';
import Chart from '../Chart';
import AxisHorizontal from '../axes/AxisHorizontal';
import AxisVertical from '../axes/AxisVertical';
import Bars from '../components/Bars';
import { getScatterData } from '../dataFactory';
import useHistogramUtils from '../utils/useHistogramUtils';

const getData = () => ( {
  scatter: getScatterData(),
} );

function useInterval( callback, delay ) {
  useEffect( () => {
    function tick() {
      callback();
    }
    if ( delay !== null ) {
      const id = setInterval( tick, delay );
      return () => clearInterval( id );
    }
  }, [delay] );
}


const Histogram = () => {
  const [ref, dimensions] = useResponsiveChart();

  const histogramConfig = {
    xKey: 'x',
    barPadding: 10,
    thresholdCount: 6,
    dimensions,
  };

  const [data, setData] = useState( getData() );

  // useInterval( () => setData( getData() ), 4000 );

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
        />

      </Chart>
    </div>
  );
};

export default Histogram;

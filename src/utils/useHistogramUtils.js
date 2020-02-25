import * as d3 from 'd3';

// const configShape = {
//   xKey: string
//   barPadding: number or string
//   dimensions: {}
//   thresholdCount: number,
// };

function useHistogramUtils( data, config ) {
  const {
    dimensions, barPadding, thresholdCount,
  } = config;

  const { boundedWidth, boundedHeight } = dimensions;

  const xValueGetter = ( d ) => d.x;

  const yValueGetter = ( d ) => d.length;


  const xAxisScale = d3.scaleLinear()
    .domain( d3.extent( data, xValueGetter ) )
    .range( [0, boundedWidth] )
    .nice( thresholdCount );


  const binsGenerator = d3.histogram()
    .domain( xAxisScale.domain() )
    .value( xValueGetter )
    .thresholds( xAxisScale.ticks( thresholdCount ) );


  const histogramBins = binsGenerator( data );

  const yAxisScale = d3.scaleLinear()
    .domain( [0, d3.max( histogramBins, yValueGetter )] )
    .range( [boundedHeight, 0] )
    .nice();


  const formatTick = d3.format( ',' );


  const xValueScaled = ( d ) => xAxisScale( d.x0 ) + barPadding;

  const yValueScaled = ( d ) => yAxisScale( yValueGetter( d ) );

  const barWidthGetter = ( d ) => xAxisScale( d.x1 ) - xAxisScale( d.x0 ) - barPadding;

  const barHeightGetter = ( d ) => boundedHeight - yAxisScale( yValueGetter( d ) );

  return {
    xAxisScale,
    yAxisScale,
    formatTick,
    binsGenerator,
    xValueScaled,
    yValueScaled,
    barWidthGetter,
    barHeightGetter,
  };
}

export default useHistogramUtils;

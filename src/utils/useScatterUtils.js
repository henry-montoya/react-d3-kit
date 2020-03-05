import * as d3 from 'd3';

// configShape = {
//   xValueKey: string
//   yValueKey: string
//   dimensions: {}
//   colorKey: string (optional)
//   startColor: string (optional)
//   endColor: string (optional)
// };

function useScatterUtils( data, config ) {
  const { colorKey, dimensions, endColor, startColor, xValueKey, yValueKey } = config;

  const { boundedWidth, boundedHeight } = dimensions;

  const xValueGetter = ( d ) => d[xValueKey];

  const yValueGetter = ( d ) => d[yValueKey];


  const xAxisScale = d3.scaleLinear()
    .domain( d3.extent( data, xValueGetter ) )
    .range( [0, boundedWidth] ); 

  const yAxisScale = d3.scaleLinear()
    .domain( [0, d3.max( data, yValueGetter )] )
    .range( [boundedHeight, 0] );

  const xValueScaled = d => xAxisScale( xValueGetter( d ) );

  const yValueScaled = d => yAxisScale( yValueGetter( d ) );
  
  const formatTick = d3.format( ',' );

  const applyColorScale = colorKey && startColor && endColor;
  let colorValueScaled;

  if( applyColorScale ){
    const colorValueGetter = ( d ) => d[colorKey];
    const colorScale = d3.scaleLinear()
      .domain( d3.extent( data, colorValueGetter ) )
      .range( [startColor, endColor] );
    
    colorValueScaled = d => colorScale( colorValueGetter( d ) );
  }

  return {
    xAxisScale,
    yAxisScale,
    formatTick,
    xValueScaled,
    yValueScaled,
    ...applyColorScale && { colorValueScaled },
  };
}

export default useScatterUtils;

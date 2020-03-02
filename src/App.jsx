import React, { useEffect, useState } from 'react';
import Histogram from './examples/Histogram';
import ScatterPlot from './examples/Scatterplot';

import { getScatterData } from './dataFactory';


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


function App() {
  const [data, setData] = useState( getData() );

  useInterval( () => setData( getData() ), 4000 );

  return (
    <div className="App">
      <Histogram data={data} />
      <ScatterPlot data={data} />
    </div>
  );
}

export default App;

import React from 'react';
import PropTypes from 'prop-types';

import Plotly from 'enterprise/custom-plotly';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

const GenericPlot = ({ chartData }) => (
  <Plot data={chartData}
        useResizeHandler
        layout={{
          autosize: true,
          margin: {
            autoexpand: true,
            t: 10,
            l: 40,
            r: 40,
            b: 30,
            pad: 0,
          },
        }}
        style={{ height: '100%', width: '100%' }}
        config={{ displayModeBar: false }} />
);

GenericPlot.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default GenericPlot;

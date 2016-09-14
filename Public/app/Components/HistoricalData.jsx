/*

React component for historical bitcoin data 

*/ 

class HistoricalData extends React.Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  date: {
  	  	text: 'Choose Date'
  	  }
  	};
  }

  componentDidMount() {

  }

  render() {

  }

};

window.HistoricalData = HistoricalData;
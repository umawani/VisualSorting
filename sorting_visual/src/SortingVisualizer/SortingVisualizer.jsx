import React from 'react';
import './SortingVisualizer.css';


export default class SortingVisualizer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      array : [],
    };

  }

  componentDidMount(){
    this.resetArray();
  }


  resetArray(){
    const array = [];
    for(let i = 0; i < 100; i++){
      array.push(randomIntFromInterval(5,600));
    }
    this.setState({array});
  }

  render() {
    const {array} = this.state;

    return (
      <div className="page-container">
        <div className="title-container">
          Sorting Visualizer!
        </div>
        <div className="array-container">
          {array.map((value, index) => (
            <div className="array-bar"
            key={index}
            style={{backgroundColor : 'turquoise', height : `${value}px`,}}>
            </div>
          ))}
        </div>
        <div className="buttons-container">
          <button onClick={() => this.resetArray()}> Generate Array! </button>
          <button onClick={() => this.mergeSort()}> Merge Sort! </button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max){
  return Math.floor(Math.random() * (max-min + 1) + min);
}

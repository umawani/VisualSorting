import React from 'react';
import './SortingVisualizer.css';


import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


import {getMergeSortAnimations} from '../SortingAlgorithms/MergeSort.js'
import {getInsertionSortAnimations} from '../SortingAlgorithms/InsertionSort.js'
import {getBubbleSortAnimations} from '../SortingAlgorithms/BubbleSort.js'

const INITIAL_COLOR = '#03a9f4';
const PROCESSING_COLOR = 'gold';
const FRONTIER_COLOR = 'red';


export default class SortingVisualizer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      speed : 50,
      size : 100,
      array : [],
      processing : false,
      checked : false,
    };
  }

  componentDidMount(){
    this.resetArray();
  }


  resetArray(){
    const array = [];
    for(let i = 0; i < this.state.size - 1; i++){
      array.push(randomIntFromInterval(5,600));
    }
    array.push(600)
    this.setState({array : array, processing : false});
  }

  mergeSort(){
    const speed = this.setSpeed();
    let aux = this.state.array.slice();
    let final = this.state.array.slice();
    const animations = getMergeSortAnimations(aux);
    const arrayBars = document.getElementsByClassName('array-bar');
    for(let i = 0; i < animations.length; i++){

      const isColorChange = i % 3 !== 2;
      if(isColorChange){
        const [barOneIndx, barTwoIndx] = animations[i];
        const barOneIndxStyle = arrayBars[barOneIndx].style;
        const barTwoIndxStyle = arrayBars[barTwoIndx].style;
        const color = i % 3 === 0 ? PROCESSING_COLOR : INITIAL_COLOR;
        setTimeout(() => {
          barOneIndxStyle.backgroundColor = color;
          barTwoIndxStyle.backgroundColor = color;
        }, i * speed);
      }
      else{
        setTimeout(() => {
          const [barOneIndx, newHeight] = animations[i];
          final[barOneIndx] = newHeight;
          this.setState({array : final});
        }, i * speed);
      }
    }
  }

  insertionSort(){
    const speed = this.setSpeed();
    let aux = this.state.array.slice();
    const animations = getInsertionSortAnimations(this.state.array.slice());
    const arrayBars = document.getElementsByClassName('array-bar');
    for(let  i = 0; i < animations.length; i++){
      if("swap" in animations[i]){
        setTimeout(() => {
        aux[animations[i]["swap"][0]] =animations[i]["swap"][1];
        this.setState({array : aux});
      }, i * speed);
      }
      else if("frontier" in animations[i]){
        setTimeout(() => {
          arrayBars[animations[i]["frontier"]].style.backgroundColor
            = FRONTIER_COLOR;
        },i * speed);
      }
      else if("normal" in animations[i]){
        setTimeout(() => {
          arrayBars[animations[i]["normal"]].style.backgroundColor
            = INITIAL_COLOR;
        },i * speed);
      }
      else{
        setTimeout(() => {
          arrayBars[animations[i]["compare"]].style.backgroundColor
            = PROCESSING_COLOR;
        },i * speed);
      }
    }
  }

  bubbleSort(){
    const speed = this.setSpeed();
    let aux = this.state.array.slice();
    const animations = getBubbleSortAnimations(this.state.array.slice());
    const arrayBars = document.getElementsByClassName('array-bar');
    for(let  i = 0; i < animations.length; i++){
      if("swap" in animations[i]){
        setTimeout(() => {
        aux[animations[i]["swap"][0]] =animations[i]["swap"][1];
        this.setState({array : aux});
      }, i * speed);
      }
      else if("normal" in animations[i]){
        setTimeout(() => {
          arrayBars[animations[i]["normal"]].style.backgroundColor
            = INITIAL_COLOR;
        },i * speed);
      }
      else{
        setTimeout(() => {
          arrayBars[animations[i]["compare"]].style.backgroundColor
            = PROCESSING_COLOR;
        },i * speed);
      }
    }
  }


  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (this.state) {
      Object.entries(this.state).forEach(([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`)
      );
    }
    this.completeAlgorithm();
  }

  completeAlgorithm(){
    if(checkSorted(this.state.array) && !this.state.checked){
      this.setState({processing : false, checked : true});
    }
  }

  setSpeed(){
    return 110-this.state.size;
  }

  render() {
      const handleSliderChange = (event, newValue) =>
        {this.setState({size: newValue}); this.resetArray()};
    const {array} = this.state;
    return (
      <div id="page-container">
        <header>
          <Typography variant="h3" color="inherit">
            Sorting Visualizer
          </Typography>
        </header>
        <body>
          <div id="content-wrap">
              {array.map((value, index) => (
                <div className="array-bar"
                key={index}
                style={{backgroundColor : '#03a9f4',
                  width:`${calculateWidth(this.state.size)}px`, 
                  height : `${value}px`}}>
                </div>
              ))}
          </div>
          <footer>
            <Container fluid>
              <Row>
                <Col>
                  <Button variant='dark' disabled={this.state.processing? true :
                      false} onClick=
                      {() =>
                    (this.setState({processing : true},
                      () => this.resetArray()))}> Generate Array! </Button>
                </Col>
                <Col>
                  <Button variant='dark' disabled={this.state.processing? true :
                     false} onClick={() =>
                       (this.setState({processing : true, checked : false} ,
                         () => this.mergeSort()))}> Merge Sort! </Button>
                </Col>
                <Col>
                  <Button variant='dark'
                    disabled={this.state.processing? true : false}
                    onClick= {() => (this.setState({processing : true,
                     checked : false} ,
                    () => this.insertionSort()))}> Insertion Sort! </Button>
                </Col>
                <Col>
                  <Button
                   variant='dark' disabled={this.state.processing? true : false}
                    onClick= {() =>
                    (this.setState({processing : true, checked : false} ,
                    () => this.bubbleSort()))}> Bubble Sort! </Button>
                </Col>
              </Row>
              <Row>
                <Col className="column">
                  <Slider
                    value={this.state.size}
                    step={10}
                    min={10}
                    max={100}
                    valueLabelDisplay="auto"
                    aria-labelledby="discrete-slider"
                    onChange={handleSliderChange}
                    marks
                    disabled={this.state.processing ? true : false}
                  />
                </Col>
              </Row>
            </Container>
          </footer>
        </body>
      </div>
    );
  }
}

function randomIntFromInterval(min, max){
  return Math.floor(Math.random() * (max-min + 1) + min);
}

function generateRandomArray(){
  let array = []
  let i = 0;
  while(i < 10){
    array.push(randomIntFromInterval(5,600));
    i++;
  }
  return array;
}

function checkSorted(array){
  let i = 0;
  let temp = array[0];
  while(i < array.length){
    if(array[i] < temp){
      return false;
    }
    temp = array[i++];
  }
  return true;
}

function testAlgorithm(){
  let toCheck;
  let i = 0;
  while(i < 100){
    let random = generateRandomArray();
    toCheck = getBubbleSortAnimations(random);
    console.log(checkSorted(toCheck));
    i++;
  }
}

function calculateWidth(size){
  return (1094-((size-1) * 6)) / size;
}

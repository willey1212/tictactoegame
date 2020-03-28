import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const Button = (props) => {
    return (
        <div className="button" onClick={() => props.clickHandler(props.itemKey,props.value)}>
            <h2>{props.value}</h2>  
        </div>
    )
}

class App extends Component {


    state = {
        squares: [],
        current: "x",
        winner: false
    }

    componentDidMount() {
        this.reset()
    }

    reset = () => {
        this.setState({
            squares: Array(9).fill(null),
            current: "x",
            winner: false
        })
    }

    clickHandler = (k, v) => {



        let currentState = this.state.squares
        let currentPlayer = this.state.current

        currentState.forEach((value, key) => {
            if (k === key) {            
                currentState.splice(k, 1, currentPlayer)
            }
        })        

        this.setState({
            squares: currentState,
        })

        this.checkWin()
    }

    checkWin = () => {
        const squares = this.state.squares
        const current = this.state.current
        let winner = false

        squares.map((e, i) => {

            if (squares[0] === current && squares[1] === current && squares[2] === current) {
                winner = true
            } 
            if (squares[3] === current && squares[4] === current && squares[5] === current) {
                winner = true
            } 
            if (squares[6] === current && squares[7] === current && squares[8] === current) {
                winner = true
            } 
            if (squares[0] === current && squares[3] === current && squares[6] === current) {
                winner = true
            } 
            if (squares[1] === current && squares[4] === current && squares[7] === current) {
                winner = true
            } 
            if (squares[2] === current && squares[5] === current && squares[8] === current) {
                winner = true
            } 
            if (squares[0] === current && squares[4] === current && squares[8] === current) {
                winner = true
            } 


        })

        if (winner) {
            this.setState({
                winner: winner
            })
        } else {
            this.changePlayer()
        }

    }

    changePlayer = () => {
      let currentPlayer = this.state.current

      if (currentPlayer === "x") {
            currentPlayer = "y"
        } else {
            currentPlayer = "x"
        }

      this.setState({
          current: currentPlayer
      })
    }


    render() {

        const squares = this.state.squares
        return (
            <div className="container">
            <p>The current player is: {this.state.current}</p>
              <div className="holder">
                {squares.map((e,i) => {
                  return (
                      <Button key={i} itemKey={i} clickHandler={this.clickHandler} value={e} />
                    )
                })
              }
              </div>
                {this.state.winner && <p>Congrats player {this.state.current} you won!</p>}
              <p onClick={this.reset}>reset</p>
            </div>
        );
    }

}

export default App;
var Cell = React.createClass({
  // props
  // x(int): x coordinate 0-99
  // y(int): y coordinate 0-99
  //open(bool): if the cell is open (player can move to it.)

  getInitialState: function(){
      return({open: this.props.open});
  },

  render: function(){

    var style = {"backgroundColor" : this.props.open ? "white" : "black"}
    if(this.props.x == 10 && this.props.y == 10) {
      style["backgroundColor"] = 'red';
    }
    return (
      <div className="cell"
        style={style}
      >
      </div>
    )
  }

})

//ALL OF THE THINGS THAT CAN GO IN A CELL

var Wall = React.createClass({

  render: function(){
    return (<div className="cell wall-cell" />)
  }
})

var Empty = React.createClass({

  render: function(){
    return (<div className="cell empty-cell" />)
  }
})

var Player = React.createClass({

  // NOTE: player attributes will not be stored here! They will be kept in the game component.

  render: function(){
    return (<div className="cell player-cell" />)
  }

})

var Monster = React.createClass({
  // recives props:
    //level (1-3)
    // hp (10 * level)

  getInitialState: function(){

    return {hp: 10 * this.props.level}
  },

  render: function(){
    return (<div className="cell monster-cell" />)
  }

})

var Boss = React.createClass({
  // recives props:
    //level (1-3)
    // hp (10 * level)

  getInitialState: function(){

    return {level: 4, hp: 40}
  },

  render: function(){
    return (<div className="cell boss-cell" />)
  }

})

var Weapon = React.createClass({

  //shhh... weapons don't actually have a damage prop. Instead the players
  // current weapon is simply upgraded.

  render: function(){

    return(<div className="cell weapon-cell" />)
  }
})

var Health = React.createClass({

  render: function(){
    return(<div className="cell health-cell" />)
  }

})

var Row = React.createClass({

  getInitialState: function(){
    // my state should know about each cell in my row.
    return {row: this.props.row}
  },

  eachCell: function(cellValue, i, arr){

    switch(cellValue){

      case("F"):
        // empty cell
        return (<Empty
          x={this.props.key}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)

      case("E"):
        // wall
        return (<Wall
          x={this.props.key}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)

      case("P"):
        return (<Player
          x={this.props.key}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)

      case("M"):

      // pick a level
      var level = Math.floor(Math.random() * 3) + 1 // level between 1 and 3

        return (<Monster
          level={level}
          x={this.props.key}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)

      case("B"):

        return (<Boss
          x={this.props.key}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)

      case("W"):

        return(<Weapon
          x={this.props.key}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)

      case("H"):
        return(<Health
          x={this.props.key}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)


    }

    var open = cellValue == "F";

    return (<Cell
        x={this.props.key}
        y={i}
        open={open}
        key={i}
        id={i}
        ref={i}
      />
    )
  },

  render: function(){

    return (
      <div className="cell-row">
        {this.props.row.map(this.eachCell)}
      </div>
    )

  }


})

var Game = React.createClass({

  getInitialState: function(){
    // my state should know about each row in the game.

    return {
      rows: this.props.gameMap,
      // player attrs go here
    }

  },

  eachRow: function(row, i, arr){
    // contructs a cellRow with the following props

    return (
      <Row
        row={row}
        key={i}
        id={i}
        ref={i}
      />
    )

  },

  render: function(){
    console.log("render game!")
    return (
      <div className="game">
        {this.state.rows.map(this.eachRow)}
      </div>
    )
  }

})

var gameMap = [["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"], ["E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "H", "F", "E", "E", "E", "E", "E", "E", "E", "E"], ["E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "W", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "H", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E"], ["E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "H", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E"], ["E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "F", "E", "F", "M", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E"], ["E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "M", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "E"], ["E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E"], ["E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E"], ["E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E"], ["E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "E"], ["E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "E"], ["E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "F", "F"], ["E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F"], ["E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"], ["E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "E", "E", "E", "F", "E", "F", "F", "W", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F"], ["E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F"], ["E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "H", "F", "F", "F", "F", "E", "F", "E", "F"], ["E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F"], ["E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F"], ["E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "F"], ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "M", "F", "F", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "F"], ["E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F"], ["E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E"], ["E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F"], ["E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "E", "E", "F"], ["E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "B", "F", "E", "F", "F", "M", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "E", "E", "F"], ["E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "E", "E", "F"], ["E", "F", "F", "H", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F"], ["E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "F"], ["E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "E", "F"], ["E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F"], ["E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "M", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "E", "F"], ["E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "H", "F", "E", "F", "E", "E", "E", "E", "E", "H", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F"], ["E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F"], ["E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "F", "W", "F", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "W", "F", "F", "E", "F", "E", "F", "E", "F"], ["E", "F", "M", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "M", "F", "F", "F", "E", "F", "E", "F", "E", "F"], ["E", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "H", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F"], ["E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "F", "F", "H", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F"], ["E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F"], ["E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F"], ["E", "F", "F", "M", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F"], ["E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "M", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F"], ["E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "H"], ["E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"], ["E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "E", "E", "M", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"], ["E", "F", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "E"], ["E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "W", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "P", "E", "F", "E", "E"], ["E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E"], ["E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E"], ["E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "E"]]
React.render(<Game gameMap={gameMap} />, document.getElementById('game-container'));

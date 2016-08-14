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
          type="empty"
          x={this.props.id}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)

      case("E"):
        // wall
        return (<Wall
          type="wall"
          x={this.props.id}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)

      case("P"):
        return (<Player
          type="player"
          x={this.props.id}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)

      case("M"):

      // pick a level
      var level = Math.floor(Math.random() * 3) + 1 // level between 1 and 3

        return (<Monster
          type="monster"
          level={level}
          x={this.props.id}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)

      case("B"):

        return (<Boss
          type="boss"
          x={this.props.id}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)

      case("W"):

        return(<Weapon
          type="weapon"
          x={this.props.id}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)

      case("H"):
        return(<Health
          x={this.props.id}
          y={i}
          key={i}
          id={i}
          ref={i}
          />)


    }

    var open = cellValue == "F";

    return (<Cell
        x={this.props.id}
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

  componentWillMount: function(){
    document.onkeydown = this.keyHandle;
  },

  getCell: function(xAway, yAway){
    // fetches cell given distance from player
    // xAway(int): the x distance from player
    // yAway(int): the y distance from player

    var x = this.state.player.loc.x + xAway
    var y = this.state.player.loc.y + yAway

    var row = this.refs[x];
    return row.refs[y];

  },

  clearCell: function(x, y){

  },

  keyHandle: function(e){

    var keyCode = e.keyCode;
    // left arrow 	37
    // up arrow 	38
    // right arrow 	39
    // down arrow 	40

    function _findCell(x, y){
      // determines which direction player wants to interact in and returns the
      // cell in that direction.
      switch(keyCode){

        case(37):
        //left arrow
        var neighboorCell = this.getCell(1, 0)
        break

        case(38):
        //up arrow
        var neighboorCell = this.getCell(0, 1)
        break
        case(39):
        // right arrow
        var neighboorCell = this.getCell(-1, 0)
        break
        case(40):
        // down arrow
        var neighboorCell = this.getCell(0, -1)
        break
      }
      if(neighboorCell !== undefined){
        return cell
      }
    }

    function interact(cell){

    }

    function bumpintoWall(){
      console.log("ouch!")
    }

    function move(emptyCell){

      var x = cell.props.x;
      var y = cell.props.y;
    }

    function pickupHealth(healthCell){

    }

    function pickupWeapon(weaponCell){

    }

    function fight(badGuy){

    }

    if([37, 38, 39, 40].indexOf(keyCode) > -1) {
      e.preventDefault();
    }

    var cell=


  },

  getInitialState: function(){
    // my state should know about each row in the game and the player

    var game = this;
    // get player's initial loc
    function getPlayerLoc(gameMap){
      for(var r=0; r<game.props.gameMap.length; r++){
        var row = game.props.gameMap[r];
        for(var c=0; c<row.length; c++){
          var char = row[c];
          // console.log(char)
          if(char == "P"){
            return {y:r, x:c }
          }
        }
      }
    }

    var playerLoc = getPlayerLoc();

    return {
      rows: this.props.gameMap,
      player: {
        loc: {x: playerLoc.x, y: playerLoc.y},
        hp: 50,
        level: 1,
        weapon: 4,
        xp: 0
      }
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

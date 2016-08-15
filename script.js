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
  // current damage is simply upgraded.

  render: function(){

    return(<div className="cell weapon-cell" />)
  }
})

var Health = React.createClass({

  render: function(){
    return(<div className="cell health-cell" />)
  }

})


var Game = React.createClass({

  componentWillMount: function(){
    // attach key handler
    document.onkeydown = this.keyHandle;
  },

  getCell: function(x, y){
    // fetches cell given the x,y coordinates

    var gridSide = Math.sqrt(this.state.gameMap.length)
    var i = (x * gridSide) + y
    return this.refs[i]

    // var x = this.state.player.loc.x + xAway
    // var y = this.state.player.loc.y + yAway
    //
    // var row = this.refs[x];
    // return row.refs[y];

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
      // calls the appropriate function to interact with the cell

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



  },

  getInitialState: function(){
    // get player's initial loc
    function getPlayerLoc(gameMap){

      for(var i=0; i<gameMap.length; i++){
        var char = gameMap[i];
        if(char == "P"){
          // found the player!
          // y(column) is array.length % index
          // x(row)

          var x = gameMap.length % i;
          var gridSide = Math.sqrt(gameMap.length)
          var y = Math.floor(c / gridSide);
          return({x:x, y:y})
        }
      }

    }

    var playerLoc = getPlayerLoc();

    return {
      cells: this.props.gameMap,
      player: {
        loc: {x:playerLoc.x, y:playerLoc.y},
        hp: 50,
        level: 1,
        weapon: 4,
        xp: 0
      }
    }

  },

  eachCell: function(cellValue, i, arr){
    // contructs a cell based on its value.
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

  },

  render: function(){
    console.log("render game!")
    return (
      <div className="game">
        {this.state.cells.map(this.eachRow)}
      </div>
    )
  }

})

var gameMap = ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "W", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "M", "M", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "M", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "H", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "P", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "F", "M", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "H", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "M", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "H", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "F", "F", "M", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "M", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "H", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "F", "M", "F", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "H", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "H", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "H", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "W", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "H", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "M", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "W", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "W", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "E", "F", "F", "B", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "H", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "F", "M", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "H", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "E"]
React.render(<Game gameMap={gameMap} />, document.getElementById('game-container'));

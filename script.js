

var Cell = React.createClass({

  render: function(){

    return(<div className={"cell " + this.props.type }/> )

  } // end render

})

var Game = React.createClass({

  componentWillMount: function(){
    // generate cell object based on the letter on the map
    // this means that cell state (like monster hit points) are stored here

    var cells = this.state.cellObjs;
    for(var c=0; c<this.props.gameMap.length; c++){
      var cellValue = this.props.gameMap[c];
      var coords = this.coordsFromIdx(c)
      switch(cellValue){
        case("F"):
          // empty cell
          var cellObj = {
            type: "empty",
            x: coords.x,
            y: coords.y
          }

          cells.push(cellObj);
          break;

        case("E"):
          // wall
          var cellObj = {
            type: "wall",
            x: coords.x,
            y: coords.y
          }

          cells.push(cellObj);
          break;

        case("P"):
          // player cell
          var cellObj = {
            type: "player",
            x: coords.x,
            y: coords.y
          }

          cells.push(cellObj);
          break;

        case("M"):

          // pick a level
          var level = Math.floor(Math.random() * 3) + 1 // level between 1 and 3
          var cellObj = {
            type: "monster",
            x: coords.x,
            y: coords.y,
            level: level,
            hp: 10 * level
          }

          cells.push(cellObj);
          break;

        case("B"):
          var level = 4;
          var cellObj = {
            type: "boss",
            x: coords.x,
            y: coords.y,
            level: level,
            hp: 10 * level
          }

          cells.push(cellObj);
          break;

        case("W"):

          var cellObj = {
            type: "weapon",
            x: coords.x,
            y: coords.y,
          }

          cells.push(cellObj);
          break;

        case("H"):

          var cellObj = {
            type: "health",
            x: coords.x,
            y: coords.y,
          }

          cells.push(cellObj);
          break;
      } // end switch
    } // end loop

    this.setState({cellObjs: cells})

  },

  componentDidMount: function(){
    // attach key handler
    document.onkeydown = this.keyHandle;
  },

  getCell: function(x, y){
    // fetches cellObj given the x,y coordinates

    var i = this.idxFromCoords(x,y)
    return this.state.cellObjs[i]
  },

  clearCell: function(x, y){
    // cell at x,y is removed and replaced with an emptyCell Object

    var cellObjs = this.state.cellObjs;
    var idx = this.idxFromCoords;
    cellObjs[idx] = {
      type: "empty",
      x: x,
      y:  y
    };
    this.setState({cellObjs: cellObjs});

  },

  keyHandle: function(e){

    var keyCode = e.keyCode;
    if([37, 38, 39, 40].indexOf(keyCode) > -1) {
      e.preventDefault();
    }

    console.log("key press!")
    var game = this;

    // left arrow 	37
    // up arrow 	38
    // right arrow 	39
    // down arrow 	40

    function _findCell(keyCode){
      // determines which direction player wants to interact in and returns the
      // cell in that direction.
      var playerX = game.state.player.loc.x;
      var playerY = game.state.player.loc.y
      switch(keyCode){

        case(37):
          //left arrow: y + 1
          console.log("left key!")
          var cell = game.getCell(playerX - 1 , playerY)
          break

        case(38):
          //up arrow: x - 1
          console.log("up key!")
          var cell = game.getCell(playerX, playerY - 1)
          break
        case(39):
          // right arrow: y -1
          console.log("right key!")
          var cell = game.getCell(playerX + 1, playerY)
          break
        case(40):
          // down arrow x + 1
          console.log("down key!")
          var cell = game.getCell(playerX, playerY + 1)
          break
      }
      if(cell !== undefined){return cell;}
    }

    function interact(cell){
      // calls the appropriate function to interact with the cell

      switch(cell.type){

        case("empty"):
          moveTo(cell);
          break;
        case("wall"):
          bumpintoWall();
          break;
        case("monster"):
          fight(cell);
          break;
        case("boss"):
          fight(cell);
          break;
        case("weapon"):
          pickupWeapon(cell);
          break;
        case("health"):
          pickupHealth(cell);
          break;
      }

    }

    function moveTo(emptyCell){
      // change player state to location of emptyCell
      // emptyCell(cellObj)

      var cellObjs = game.state.cellObjs;
      var oldX = game.state.player.loc.x;
      var oldY = game.state.player.loc.y;
      var playerIdx = game.idxFromCoords(oldX, oldY);
      var player = cellObjs[playerIdx];  //pull the player out of the array

      cellObjs[playerIdx] = {
        type: "empty",
        x: oldX,
        y: oldY
      };   // replace the player's loc with an empty array

      var newX = emptyCell.x;
      var newY = emptyCell.y
      var newIdx = game.idxFromCoords(newX, newY);  //insert player into new spot
      cellObjs[newIdx] = player;

      game.setState({cellObjs: cellObjs,
        player: {
          loc: {
            x: newX,
            y: newY
          }
        }
      })
    }

    function bumpintoWall(){
      console.log("ouch!")
    }

    function fight(badGuy){
      console.log("hey there's a bad guy!")

    }
    function pickupWeapon(weaponCell){
      console.log("hey there's a weapon!")

    }
    function pickupHealth(healthCell){
      console.log("hey there's a health pack!")

    }

    var cellObj = _findCell(keyCode)
    if(cellObj !== null){interact(cellObj);}

  },

  coordsFromIdx: function(i){
    // returns x,y coordinates based on an index

    var width = Math.sqrt(this.props.gameMap.length);
    var x = i % width;
    var y = Math.floor(i / width);
    return({x:x, y:y})
  },

  idxFromCoords: function(x,y){
    // returns an index from x,y cordinates

    var gridSide = Math.sqrt(this.props.gameMap.length)
    return (y *  gridSide) + x

  },

  getInitialState: function(){
    // get player's initial loc
    var game = this;
    function getPlayerLoc(gameMap){

      for(var i=0; i<gameMap.length; i++){
        var char = gameMap[i];
        if(char == "P"){return game.coordsFromIdx(i)}
      }

    }

    var playerLoc = getPlayerLoc(this.props.gameMap);

    return {
      cellObjs: [],  // an array of objects representing a cell
      player: {
        loc: {x:playerLoc.x, y:playerLoc.y},
        hp: 50,
        level: 1,
        weapon: 4,
        xp: 0
      }
    }

  },

  eachCell: function(cellObj, i, arr){
    // contructs a cell based on its value.

      return (
        <Cell
          type={cellObj.type}
          x={cellObj.x}
          y={cellObj.y}
          key={i}
          id={i}
          ref={i} />)
  },

  render: function(){
    console.log("Player's location:")
    console.log(this.state.player.loc.x+ ", " + this.state.player.loc.y)
    return (
      <div className="game">
        {this.state.cellObjs.map(this.eachCell)}
      </div>
    )
  }

})

// var gameMap = ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "W", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "M", "M", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "M", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "H", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "P", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "F", "M", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "H", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "M", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "H", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "F", "F", "M", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "M", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "E", "F", "E", "F", "F", "H", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "F", "M", "F", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "F", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "H", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "H", "E", "F", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "H", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "F", "E", "F", "F", "W", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "F", "F", "F", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "H", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "M", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "W", "E", "E", "E", "E", "E", "F", "E", "F", "F", "F", "E", "E", "E", "F", "F", "W", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "E", "F", "F", "B", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "F", "F", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "F", "F", "F", "E", "F", "E", "F", "F", "F", "F", "F", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "F", "E", "E", "E", "F", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "E", "H", "E", "E", "E", "E", "E", "E", "E", "F", "E", "E", "E", "F", "E", "E", "E", "F", "F", "M", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "H", "F", "F", "F", "E", "F", "F", "F", "F", "F", "E", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "F", "F", "E", "E"]
// var simpleMap = ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "P", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"]
var simpleMap = ["P", "F", "F", "F", "F", "F", "F", "F", "F"]
// console.log(gameMap.indexOf("P"))



React.render(<Game gameMap={simpleMap} />, document.getElementById('game-container'));

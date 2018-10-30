import React from 'react'
import {gameConfig} from '../gameConfig'

class Board extends React.Component {
  
    constructor(props) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        this.createUser = this.createUser.bind(this);
        this.apple = {x:20,y:20}
    }

    componentDidMount(){
        
        window.addEventListener('keydown', this.onKeyDown);
        //this.createUser();
        this.gameLoop();
    }


    setupBoard () {


        const boardWidth = 100, boardHeight = 50;
        let b = []
        for (let y = 0; y < boardHeight; ++y) {
            let row = [];
            for (let x = 0; x < boardWidth; ++x) {
                let cell = {};
                cell.class = "emptycell";
                row.push(cell);
            }
            b.push(row);
        }

        let {users} = this.props
       // users = users.map(u => u.active ? u : null)

        // if(users[0]) {
            users.map(u => {
                let snakeClass = (u.self?'snake1':'snake2')
                u.pos.map(p => {
                    b[p.y][p.x].class = snakeClass;
                },this)
            })
        // }
        
        b[this.apple.y][this.apple.x].class = "apple";

        return b;
        
    }

    render() {
        return(
        <div id="board">
            { this.setupBoard().map((r,i) => {
                return r.map((c,j) => {
                    return (<div key={i*100+j} className={c.class}/>);
                });
            })}
        </div>);
    }

    onKeyDown(e) {
        if([37,38,39,40].includes(e.keyCode)){
            this.props.sendChangeDirection(e.keyCode)
            this.props.changeDirection(e.keyCode, true)
        }
            
    }

    createUser() {

        // let userName = prompt("Please enter your name");
        // const socket = setupSocket(store.dispatch, userName)
        // const sagaMiddleware = createSagaMiddleware()


        // this.props.login(userName)
        
	}

    gameLoop(){

        
        if(gameConfig.startGame)
        {
            let {users} = this.props

            // if(users[0]) {

            if(!users || users.length == 0){
                setTimeout(this.gameLoop, 100);
                return;
            }

            users.map(u => {

                if(u.active){

                    let pos = Object.assign([],u.pos);
                    const KEY_UP = 38, KEY_DOWN = 40, KEY_RIGHT = 39, KEY_LEFT = 37;
                    
                
                    for(let i= pos.length -1; i > 0 ; i--){
                    pos[i].x = pos[i-1].x; 
                    pos[i].y = pos[i-1].y; 
                    }
                
                    switch (u.direction) {
                        case KEY_UP:  pos[0].y--; break;
                        case KEY_DOWN:  pos[0].y++; break;
                        case KEY_LEFT:  pos[0].x--; break;
                        case KEY_RIGHT:  pos[0].x++; break;
                    }
                
                    //Hit the wall
                    if(pos[0].x >= 100 || pos[0].x < 0 || pos[0].y < 0 || pos[0].y >= 50){

                    switch (u.direction) {
                        case KEY_UP:  pos[0].y++; break;
                        case KEY_DOWN:  pos[0].y--; break;
                        case KEY_LEFT:  pos[0].x++; break;
                        case KEY_RIGHT:  pos[0].x--; break;
                    }
                    if(u.self){
                        this.props.setActive(false,true);
                        this.props.sendSetActive(false);
                    }

                    return;
                    }
                
                    //Eat the apple
                    if(pos[0].x == this.apple.x && pos[0].y == this.apple.y ){
                    this.props.updatePoint(1);
                    let newApplePlaced = false;
                
                    while(!newApplePlaced){
                        let x =  Math.floor((Math.random() * 95)) + 2;
                        let y =  Math.floor((Math.random() * 45)) + 2;
                
                        if (pos.some(p => p.x == x && p.y == y)) {
                        continue;
                        }
                        newApplePlaced = true;
                        this.apple.x = x;
                        this.apple.y = y;
                    }
                    }

                    this.props.moveSnake(pos,u.userid);

                }

            })
        

        }
    
        
        setTimeout(this.gameLoop, 1);
      }
    
}


export default Board
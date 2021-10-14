import React, {useState} from 'react';
import './App.css'

const App = () => {
   const [boards, setBoards] =useState(  [
       {id: 1, title:"was mache ich heute muss", items: [{id: 1, title: 'lesen'},{id:2, title: 'js lernen'}]},
       {id: 2, title:"was mache ich nicht heute durfen", items: [{id: 4, title: 'socialmedia eintretten'},{id:5, title: 'herausgehen'}]}, 
       {id: 3, title:"Done", items: [{id: 6, title: ''},{id:7, title: ''}]}
   ])
   const [currentBoard, setCurrentBoard] = useState( null)
   const [currentItem, setCurrentItem] = useState( null)
   function dragOverHandler(e){
       e.preventDefault()
       if(e.target.className == 'item') {
           e.target.style.boxShadow = '0 4px 3px gray'
       }

   }
   function dragLeaveHandler(e){
    e.target.style.boxShadow = 'none'

   }
   function dragStartHandler(e, board, item){
setCurrentBoard(board)
setCurrentItem(item)
   }
   function dragEndHandler(e){
    e.target.style.boxShadow = 'none'
   }
   function dropHandler(e, board, item) {
   e.preventDefault()
 const currentIndex = currentBoard.items.indexOf(currentItem)
 currentBoard.items.splice(currentIndex, 1)
 const dropIndex = board.items.indexOf(item)
 board.items.splice( dropIndex + 1, 0, currentItem)

 setBoards(boards.map(b => {
     if(b.id === board.id) {

     return board
     }
     if (b.id === currentBoard.id) {
         return currentBoard
    }
    return b
 }))
 e.target.style.boxShadow = 'none'
   }

   function dropCardHandler(e, board) {
       board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map(b =>{
        if(b.id === board.id){
        return board
        }
        if(b.id === currentBoard.id){
            return currentBoard
       }
       return b
    }))
    e.target.style.boxShadow = 'none'
   }
    function dropCardHandler(e, board) {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)

    setBoards(boards.map(b => {
        if(b.id === board.id) {
   
          return board
        }
        if (b.id === currentBoard.id) {
            return currentBoard
       }
       return b
    }))
    e.target.style.boxShadow = 'none'
    }
    return (
        <div className='app'>
           {boards.map(board => 

<div className='board'
  onDragOver={(e) => dragOverHandler(e)}
  onDrop={(e) => dropCardHandler(e, board)}
>
   <div className="board__title">{board.title}</div>
 {board.items.map(item=>
 <div
 onDragOver={e => dragOverHandler(e)}
 onDragLeave={e => dragLeaveHandler(e)}
 onDragStart={(e) => dragStartHandler(e, board, item)}
 onDragEnd={(e) => dragEndHandler(e)}
 onDrop={(e) => dropHandler(e, board, item)}
 className="todo"
 draggable={true}

 className="item"
 >
     {item.title}</div>
)}
</div>)}
        </div>
    )};

   export default App
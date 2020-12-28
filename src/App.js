import React, {useState, useEffect, useReducer}  from 'react';
import './index.css';

const reducer = (state, action)=>{
switch (action.type){
    case 'SET_TODO_ITEM':{
      return action.payload;
    }
    case "RESET_TODO":{
        return null;
    }
    case "TOGLE_TODO_COMPLETED":{
        return {
            ...state,
            completed: !state.completed
        };
    }
    case "CHANGE_TODO_TITLE":{
        return {
            ...state,
            title: action.payload
        };
    }
    default:{
        console.error('not valid action', action.type);
        return  state;
    }
}
};

const initialState = null;

export default function App(){
const [counter, setCounter] = useState(1);
// const [todo, setTodo] = useState(null);
const [state, dispatch] = useReducer(reducer, initialState);

const [inputValue, inputChange] = useState('');


const fetchData = async ()=>{
    const response= await fetch(`https://jsonplaceholder.typicode.com/todos/${counter}`);
    const json=await response.json();
    dispatch({type:'SET_TODO_ITEM',payload: json});

}

useEffect(()=>{

    console.log('i was called');

    fetchData();



},[counter]);

    const hendleInc=()=> {setCounter((prevState) => prevState+1)};
    const hendleReset=()=> setCounter(1);

    const hendleResetTodo=()=> dispatch({type:"RESET_TODO"});

    const hendleTodoCompleted=()=> dispatch({type:"TOGLE_TODO_COMPLETED"})

    const handlerTitleChange=()=>{
    dispatch({type:"CHANGE_TODO_TITLE", payload:inputValue});

    };




  return (
      <div className="App">
        <h1>Counter: {counter}</h1>

          <button onClick={hendleInc}>Inc</button>
          {/*<button onClick={hendleReset}>Reset</button>*/}
          <button onClick={hendleResetTodo}>Reset_todo</button>
          <button onClick={hendleTodoCompleted}>togle</button>
          <input
              value={inputValue}
              onChange={({target:{value}})=>inputChange(value)}/>
          <button onClick={handlerTitleChange}>change title</button>
          {!!state && <h2>
              {state.id}-{state.title}-{state.completed.toString()}
          </h2>}

      </div>
  );


}









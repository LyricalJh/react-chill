import React, { useState } from 'react';
import {toDoState, ITodo,toDoSeletor,categorState,ICategory} from './api';
import {useForm} from 'react-hook-form';
import { useRecoilState,useRecoilValue } from 'recoil';
import TodoList from './TodoList';

function App() {
  const [value, setValue] = useState("");
  const [todo,SetTodo] = useRecoilState(toDoState);
  const toDos= useRecoilValue(toDoSeletor)
  const {register, handleSubmit} = useForm();
  const [category, setCategory] = useRecoilState(categorState);
  const cat = useRecoilValue(categorState);
  
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
      
      
  }
  const onSubmit =(event:React.FormEvent)=> {
    event.preventDefault();    
    SetTodo((todo) => 
    [{toDo: value, id: Date.now(), category : cat as any}, ...todo]
    )
    setValue("");
    
  }
  const onChangeInput = (event:React.FormEvent<HTMLInputElement>) => {
    const {currentTarget : {value}} = event;
    setValue(value);
  }

  const [catevalue, setCatevalue] = useState("");
  const newCategory = (event:React.FormEvent) => {
        event.preventDefault();
        setCategory((category) => [{category: catevalue}, ...category])
        setCatevalue("");
        
  }
  const onInputCategory = (event: React.FormEvent<HTMLInputElement>) => {
      setCatevalue(event.currentTarget.value);
      
  }
  return (
    <div>
       <h1>make select</h1>
       <hr/>

        <form onSubmit={newCategory}>
          <input {...register("select")} onChange={onInputCategory} value={catevalue}/>
          <button type='submit'>category 생성!</button>
        </form>
      
      <select value={category as any} onInput={onInput}>
        {/* <option value="TO_DO">TO_DO</option>
        <option value="DOING">DOING</option>
        <option value="DONE">DONE</option> */}
        { category.map((item,index) => <option key={index}>{item.category}</option>)}
      </select>
    <form onSubmit={onSubmit}>
    <input {...register("toDo")} onChange={onChangeInput} value={value} />
    <button type="submit">제출하기</button>
    </form>
   {/* {toDos.map((item) => <TodoList key={item.id} {...item} /> )} */}
    
    </div>
  );
}

export default App;

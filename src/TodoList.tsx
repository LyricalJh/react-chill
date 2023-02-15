import { useRecoilValue, useSetRecoilState } from 'recoil'
import {ITodo,toDoState,toDoSeletor ,Categories} from './api'

export default function TodoList({toDo, id, category} :ITodo ){
    const setToDos = useSetRecoilState(toDoState);

    const onClick = (newCategory:ITodo["category"]) => {
        setToDos((oldToDos) => {
            const target = oldToDos.findIndex((todo) => todo.id === id);
            const newTodo = {toDo, id, category : newCategory};
            
            return [...oldToDos.slice(0,target), newTodo, ...oldToDos.slice(target+1)]
        })
    }
    return (
        <div>
            {toDo}
            {category !== "TO_DO" && <button  onClick={()=> onClick("TO_DO")}>TO_DO</button>}
            {category !== "DOING" && <button  onClick={()=> onClick("DOING")}>DOING</button>}
            {category !== "DONE" &&  <button  onClick={()=> onClick("DONE")}>DONE</button>}
        </div>
    )
}
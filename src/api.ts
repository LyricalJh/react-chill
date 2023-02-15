import {atom, selector} from 'recoil'
import { recoilPersist } from 'recoil-persist';


const { persistAtom } = recoilPersist()

export enum Categories {
    "TO_DO",
    "DOING",
    "DONE"
}

export interface ITodo {
    toDo: string;
    id:number;
    category: "TO_DO" | "DOING" | "DONE"
}


export const toDoState = atom<ITodo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export interface ICategory {
    category :string;
    
}

export const categorState  = atom<ICategory[]>({
    key: "category",
    default :[],
    effects_UNSTABLE: [persistAtom],
})

export const toDoSeletor = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categorState);
        // return toDos.filter((toDo) => toDo.category === category);
    }
})
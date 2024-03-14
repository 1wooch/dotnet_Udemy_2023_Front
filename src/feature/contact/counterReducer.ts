import { act } from "react-dom/test-utils";

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';


export interface CounterState {
    data:number;
    title:string;
}

const initialState:CounterState={
    data:42,
    title:'Yarc'
}

export default function counterReducer(state=initialState,action:any){
    switch(action.type){
        case INCREMENT_COUNTER:
            return {...state,data:state.data+1};
        case DECREMENT_COUNTER:
            return {...state,data:state.data-1};
    }
    return state;

}
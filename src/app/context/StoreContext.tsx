import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/Basket";

interface StoreContextValue{
    basket:Basket|null;
    setBasket:(basket:Basket)=>void;
    removeItem:(productId:number,quantity:number)=>void;
}

export const StoreContext=createContext<StoreContextValue|undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext(){
    const context = useContext(StoreContext);

    if(context === undefined){
        throw Error('OOPS- We do not seem to be inside the provider');

    }

    return context;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StoreProvider({children}:PropsWithChildren<unknown>){
    const [basket,setBasket]=useState<Basket|null>(null);
    const removeItem=(productId:number,quantity:number)=>{
        if(!basket)return;
        const items = [...basket.items];
        const itemIndex = items.findIndex(x=>x.productId===productId);
        if(itemIndex>=0){
            items[itemIndex].quantity -= quantity;
            if(items[itemIndex].quantity<=0){
                items.splice(itemIndex,1);
            }
            setBasket(prevState=>{
                return {...prevState!,items}
            })
        }
    }

    return(
        <StoreContext.Provider value={{basket,setBasket,removeItem}}>
            {childern}
        </StoreContext.Provider>
    )
}
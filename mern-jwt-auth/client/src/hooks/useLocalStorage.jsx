import { useState,useEffect } from "react";

    const getLocalValue = (key,initval)=>{
        if (typeof window === 'undefined'){
            return initval
        }
        if (localStorage.getItem(key)){
            return JSON.parse(localStorage.getItem(key))
        }
        if (initval instanceof Function){
            return initval()
        }
        return initval
    }

    const useLocalStorage = (key,initval) => {
        const [value,setValue] = useState(()=>{
            return getLocalValue(key,initval)
        })
        useEffect(()=>{
            localStorage.setItem(key,JSON.stringify(value))
        },[key,value])
        return [value,setValue]
    }

export default useLocalStorage
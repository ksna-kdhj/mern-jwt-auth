import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useInput = (key,initval) => {
  const[value,setValue] = useLocalStorage(key,initval)
  const reset = ()=>setValue(initval)
  const attributes = {
    value,
    onChange: (e)=> setValue(e.target.value)
  }

  return [value,reset, attributes]
}

export default useInput
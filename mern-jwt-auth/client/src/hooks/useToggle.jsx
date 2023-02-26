import useLocalStorage from "./useLocalStorage";

const useToggle = (key,initval) => {
  const [value,setValue] = useLocalStorage(key,initval);
  const toggle =(value)=>{
    setValue(prev=>{
        return typeof value === 'boolean'?value:!prev
    })
  }
  return[value,toggle]
}

export default useToggle
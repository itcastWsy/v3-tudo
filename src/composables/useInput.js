import { ref } from "vue"
export default function useInput() {
  let inpValue = ref("");
  const setInput = (value) => {
    inpValue.value =value;
  }
  return {
    inpValue,
    setInput
  }

}
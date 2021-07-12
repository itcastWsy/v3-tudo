import { reactive, computed } from "vue"

export default function useList() {
  const list = reactive([]);
  const pushList = (value) => {
    if (!list.find(v => v.value === value)) {
      list.push({ id: Date.now(), value, checked: false });
    }
  }
  const changeChecked = (index) => {
    list[index].checked = !list[index].checked;
  }
  const clearDoneList = () => {
    let tmpList = list.filter(v => !v.checked);
    list.length = 0;
    list.push(...tmpList);
  }
  const clearOne = (index) => {
    list.splice(index, 1);
  }

  const undoLength = computed(() => list.filter(v => !v.checked).length);
  const doneLength = computed(() => list.filter(v => v.checked).length);
  return { list, pushList, changeChecked, undoLength, doneLength, clearDoneList, clearOne }

}
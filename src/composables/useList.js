import { ref, computed } from "vue"

export default function useList() {
  const list = ref([]);
  const pushList = (value) => {
    if (!list.value.find(v => v.value === value)) {
      list.value.push({ id: Date.now(), value, checked: false });
    }
  }
  const changeChecked = (index) => {
    list.value[index].checked = !list.value[index].checked;
  }
  const clearDoneList = () => {
    list.value = list.value.filter(v => !v.checked);
  }
  const clearOne = (index) => {
    list.value.splice(index, 1);
  }

  const undoLength = computed(() => list.value.filter(v => !v.checked).length);
  const doneLength = computed(() => list.value.filter(v => v.checked).length);
  return { list, pushList, changeChecked, undoLength, doneLength, clearDoneList, clearOne }

}
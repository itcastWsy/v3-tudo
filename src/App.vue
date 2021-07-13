<template>
  <div class="box">
    <h1>待办列表</h1>
    <div class="tool">
      <input
        autofocus
        type="text"
        :value="inpValue"
        @input="setInput($event.target.value)"
        @keyup.enter="onPushList"
        placeholder="请输入代办事项"
      >
    </div>
    <ul>
      <li
        v-for="(item,index) in list"
        :key="item.id"
      >
        <div> <input
            type="checkbox"
            :checked="item.checked"
            @change="changeChecked(index)"
          >
          <span :class="item.checked&&'finished'">{{item.value}}</span>
        </div>
        <button @click="clearOne(index)">X</button>
      </li>
    </ul>
    <section>
      <span> {{undoLength}} 未完成</span>
      <a
        href="#"
        @click="clearDoneList"
      >清理 <b>{{doneLength}}</b> 已完成</a>
    </section>
  </div>
</template>

<script>
import { ref, computed } from "vue";
// 输入框的hooks
import useInput from "./composables/useInput";
// 数组的hooks
import useList from "./composables/useList";

export default {
  name: "App",
  setup() {
    let { inpValue, setInput } = useInput();
    const {
      list, // 页面显示的数组
      pushList, //  添加到数组
      changeChecked, // 切换选中
      undoLength, // 未完成的数量
      doneLength, // 已经完成的数量
      clearDoneList, // 清除已经完成的元素
      clearOne, // 移除一个元素
    } = useList();

    const onPushList = () => {
      pushList(inpValue.value);
      setInput("");
    };
    return {
      inpValue, // 输入框的值
      setInput, // 存储输入框的值
      list, // 页面显示数据的数组
      changeChecked, // 任务的切换选中
      undoLength, // 未完成的任务的数量
      doneLength, // 已完成的任务的数量
      clearDoneList, // 清除完成的任务
      clearOne, // 移除单个元素
      onPushList, // 输入框的输入事件
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #ccc;
}
ul {
  list-style: none;
}
li {
  padding: 20px;
  text-align: left;
  font-size: 30px;
  border-bottom: 1px dashed #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
li input {
  margin-right: 10px;
}

li button {
  display: none;
  padding: 5px;
}
li:hover button {
  display: inline-block;
  cursor: pointer;
}
.finished {
  text-decoration: line-through;
}
h1 {
  margin-bottom: 10px;
}
.box {
  background-color: #fff;
  width: 60vw;
  padding: 20px;
  margin: 50px auto;
  padding-bottom: 0;
}
.box .tool input {
  /* border: none; */
  width: 100%;
  height: 50px;
  text-indent: 20px;
  font-size: 20px;
  font-style: italic;
  color: #666666;
  font-weight: 700;
}
section {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
a {
  text-decoration-color: #666;
  color: inherit;
}
</style>
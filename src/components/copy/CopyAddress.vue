<template>
  <i
    class="tooltip pi pi-copy cursor-pointer ml-3 text-xl"
    @click="copyToClipBoard()"
    v-show="isShow"
  >
    <span class="tooltiptext tooltip-bottom">{{ toolVal }}</span>
  </i>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    address: {
      type: String,
      default: "",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const toolVal = ref("클립보드에 복사");
    const copyToClipBoard = () => {
      let textareaObj = document.createElement("textarea");
      document.body.appendChild(textareaObj);
      textareaObj.value = props.address;
      textareaObj.select();
      document.execCommand("copy");
      document.body.removeChild(textareaObj);
      toolVal.value = "복사완료";
      setTimeout(() => {
        toolVal.value = "클립보드에 복사";
      }, 10000);
    };
    return {
      copyToClipBoard,
      toolVal,
    };
  },
};
</script>

<style scope>
.tooltip {
  position: relative;
  display: block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 145px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
/* 툴팁 화살표 기본 스타일 설정 시작 */
.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  border-style: solid;
  border-width: 5px;
}
/* 툴팁 화살표 기본 스타일 설정 끝 */
.tooltip .tooltip-bottom {
  width: 145px;
  top: 150%;
  left: 50%;
  margin-left: -60px;
}
.tooltip .tooltip-bottom::after {
  bottom: 100%;
  left: 45%;
  margin-left: -5px;
  border-color: transparent transparent black transparent;
}
</style>
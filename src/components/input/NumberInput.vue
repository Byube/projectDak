<template>
  <InputText
    :id="id"
    :modelValue="modelValue"
    :class="[{ 'p-invalid': isError }, 'w-full']"
    :placeholder="placeholderInfo"
    @input="checkSelfAmount($event.target.value)"
  />
</template>
<script>
import { getCurrentInstance, ref } from "@vue/runtime-core";
import BigNumber from "bignumber.js";
export default {
  name: "NumberInput",
  props: {
    id: String,
    modelValue: {
      type: String,
      default: "",
    },
    placeholderInfo: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { emit } = getCurrentInstance();
    const isError = ref(false);
    const checkSelfAmount = (v) => {
      let removed = v.replace(/(,)/g, "");
      let checkNum = new BigNumber(removed);
      if (!checkNum.isNaN() && !checkNum.isNegative()) {
        emit("update:modelValue", checkNum.decimalPlaces(18).toFormat());
        isError.value = false;
      } else {
        document.getElementById(props.id).value = "";
        emit("update:modelValue", "");
        isError.value = true;
      }
    };
    return {
      checkSelfAmount,
      isError,
    };
  },
};
</script>

<style>
</style>
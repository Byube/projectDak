<template>
  <div class="card">
    <div class="card-container purple-container overflow-hidden">
      <!-- 1 -->
      <h3>컴포넌트 사용설명</h3>
      <div class="flex h-6rem">
        <div class="flex w-1 align-items-center justify-content-start ml-5">
          <span class="text-xl text-black-alpha-80 font-bold"
            >Number Input</span
          >
        </div>
        <div
          class="
            flex
            justify-content-center
            align-items-center
            w-4
            font-medium
            text-black-alpha-60
          "
        >
          <NumberInput
            :id="'number1'"
            :modelValue="numberValue"
            :placeholderInfo="'수량을 입력 하세요 (소수점 포함)'"
            :addClass="myclass"
            @update:modelValue="numberValue = $event"
          />
        </div>
      </div>
      <!-- 1 -->
    </div>
  </div>
</template>

<script>
import NumberInput from "@/components/input/NumberInput.vue";
import { ref } from "vue";
export default {
  components: {
    NumberInput,
  },
  setup() {
    const numberValue = ref("");
    const myclass = ref('flex-1 flex ml-3 w-3 border-round text-blockchain font-medium text-black-alpha-60');
    return {
      numberValue,
      myclass
    };
  },
};
</script>

<style>
</style>
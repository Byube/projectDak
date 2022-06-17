<template>
  <div class="card">
    <div class="flex mt-5 align-items-center justify-content-center">
      <div class="h-16rem w-3">
        <!-- 카드 -->
        <div class="field grid">
          <label for="cardNum" class="col-fixed">Card Number</label>
          <div class="col">
            <InputText v-model:modelValue="cardNum" class="w-full" />
          </div>
        </div>
        <!-- 카드 -->
      </div>
    </div>

    <!-- foot -->
    <div class="grid grid-nogutter justify-content-between">
      <Button label="Back" @click="prevPage()" icon="pi pi-angle-left"></Button>
      <Button
        label="Next"
        @click="complete()"
        icon="pi pi-angle-right"
        icon-pos="right"
      ></Button>
    </div>
    <!-- foot -->
  </div>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
export default {
  emits: ["next-page", "prev-page"],
  setup() {
    const { emit } = getCurrentInstance();
    const cardNum = ref("");

    //페이지 이동
    const complete = () => {
      if (!checkValidation()) {
        return;
      }
      emit("complete", {
        formData: {
          cardNum: cardNum.value,
        },
      });
    };
    const prevPage = () => {
      emit("prev-page", { pageIndex: 2 });
    };
    const checkValidation = () => {
      const reg_onlyNum = /^([0-9]{16})$/;
      const reg_onlyHyphen =
        /^([0-9]{4})([-])([0-9]{4})([-])([0-9]{4})([-])([0-9]{4})$/;
      const reg_onlyBlank =
        /^([0-9]{4})([\s])([0-9]{4})([\s])([0-9]{4})([\s])([0-9]{4})$/;
      console.log("숫자", reg_onlyNum.test(cardNum.value.trim()));
      console.log("하이픈", reg_onlyHyphen.test(cardNum.value.trim()));
      console.log("공백", reg_onlyBlank.test(cardNum.value.trim()));
      console.log(
        "3 테스트 ",
        reg_onlyNum.test(cardNum.value) ||
          reg_onlyHyphen.test(cardNum.value) ||
          reg_onlyBlank.test(cardNum.value)
      );

      let replaceBlank = cardNum.value.replace(/ /gi, "");
    //   console.log("noBlank", replaceBlank);
      let replaceHyphen = replaceBlank.replace(/-/gi, "");
    //   console.log("noHyphen", replaceHyphen);
      let reverseNum = replaceHyphen.split("").reverse();
      let oddSum = 0;
      let evenSum = 0;
      for (let i = 0; i < reverseNum.length; i++) {
        const element = reverseNum[i];
        if (i % 2 === 0) {
          evenSum += parseInt(element);
          //   console.log("even : " + i + " : " + element);
        } else {
          oddSum += oddConvert(element);
          //   console.log("odd : " + i + " : " + element);
        }
      }
      console.log("evenSum : ", evenSum);
      console.log("oddSum : ", oddSum);
      //최종 합계 10의 배수 확인
      console.log("check : ", (oddSum + evenSum) % 10 === 0);

      //reverse 하지 않고 계산
      let originNum = replaceHyphen.split("");
      let orEvenSum = 0;
      let orOddSum = 0;
      for (let i = 0; i < originNum.length; i++) {
        const element = originNum[i];
        if (i % 2 === 0) {
          orOddSum += oddConvert(element);
        } else {
          orEvenSum += parseInt(element);
        }
      }
      console.log("orEvenSum : ", orEvenSum);
      console.log("orOddSum : ", orOddSum);
      console.log("check : ", (orOddSum + orEvenSum) % 10 === 0);

      return false;
    };

    const oddConvert = (odd) => {
      let num = 0;
      let fromNum = parseInt(odd);
      num = fromNum * 2;
    //   console.log("oldNum >> ", num);
      if (num >= 10) {
        let reNum = num.toString().split("");
        num = parseInt(reNum[0]) + parseInt(reNum[1]);
      }
    //   console.log("reNum >> ", num);
      return num;
    };

    return {
      cardNum,
      complete,
      prevPage,
    };
  },
};
</script>

<style>
</style>
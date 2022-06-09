<template>
  <div class="coinintroduction">
    <Dialog
      header="트랜잭션 전송"
      v-model:visible="display"
      :breakpoints="{ '1080px': '75vw', '720px': '100vw' }"
      :style="{ width: '70vw' }"
      :modal="true"
      :closeOnEscape="false"
    >
      <!-- :dismissableMask="true" -->
      <hr class="w-full" />
      <!-- 1 -->
      <div class="flex">
        <div class="flex w-6" :class="[{ 'border-bottom-2': isdirectly }]">
          <Button
            label="직접추가"
            class="p-button-text w-full text-xl font-bold text-black-alpha-80"
            @click="addDirectly"
          />
        </div>
        <div class="flex w-6" :class="[{ 'border-bottom-2': !isdirectly }]">
          <Button
            label="CSV 일괄 추가"
            class="p-button-text w-full text-xl font-bold text-black-alpha-80"
            @click="addCSVall"
          />
        </div>
      </div>
      <!-- 1 -->
      <!-- 2 -->
      <div v-if="isdirectly">
        <!-- 1 -->
        <div class="flex">
          <div class="flex align-items-center justify-content-start ml-2 mt-3">
            <p class="text-xl text-black-alpha-80 font-bold">받는 주소</p>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="flex w-5">
            <InputText
              v-model="toAddress"
              class="w-full p-inputtext-lg"
              :class="[{ 'p-invalid': isAddressError }]"
              placeholder="Ox..."
            >
            </InputText>
          </div>
        </div>
        <!-- 1 -->
        <div class="err-msg-style">
          <span v-show="isAddressError">
            {{ errorMessage }}
          </span>
        </div>
        <!-- 2 -->
        <div class="flex mt-3">
          <div class="flex align-items-center justify-content-start ml-2 mt-3">
            <p class="text-xl text-black-alpha-80 font-bold">수량</p>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="flex w-5">
            <NumberInput
              :id="'amountOnly'"
              :modelValue="selfAmount"
              :placeholderInfo="'수량을 입력 (소수점 포함)'"
              @update:modelValue="selfAmount = $event"
            />
          </div>
        </div>
        <!-- 2 -->
        <div class="err-msg-style">
          <span v-show="isAmountError">
            {{ errorMessage }}
          </span>
        </div>
        <!-- 3 -->
        <div class="flex mt-5">
          <Button label="추가" class="bg-indigolight w-1" @click="addData" />
        </div>
        <!-- 3 -->
      </div>
      <!-- 2 -->
      <div v-else>
        <!-- 1 -->
        <div class="flex">
          <div class="flex align-items-center justify-content-start ml-2 mt-3">
            <p class="text-xl text-black-alpha-80 font-bold">
              CSV 파일 등록 (주소, 수량)
            </p>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="flex w-5">
            <FileUpload
              mode="basic"
              name="demo[]"
              chooseLabel="파일찾기"
              accept=".csv"
              :auto="true"
              :maxFileSize="1000000"
              :customUpload="true"
              @uploader="csvUploade"
            />
          </div>
        </div>
        <!-- 1 -->
        <!-- 2 -->
        <div class="grid mt-5">
          <div class="col-6">
            <p class="text-xl font-bold text-black-alpha-80">총 개수</p>
          </div>
          <div class="col-6">
            <p class="text-xl font-bold text-black-alpha-80">검증 실패</p>
          </div>
        </div>
        <div class="grid">
          <div class="col-6">
            <p class="text-xl font-medium text-black-alpha-60">
              {{ totalLength() }}
            </p>
          </div>
          <div class="col-6">
            <p class="text-xl font-medium text-error">
              {{ errLength() }}
            </p>
          </div>
        </div>
        <!-- 2 -->
      </div>

      <!-- 4 -->
      <div class="flex mt-3">
        <div
          class="
            col-12
            align-items-center
            justify-content-center
            m-2
            px-3
            py-1
            border-round
          "
        >
          <DataTable
            :value="datas"
            :rowHover="true"
            v-model:selection="selectedProduct1"
            selectionMode="single"
            dataKey="count"
            key="index"
            breakpoint="1080px"
            responsiveLayout="stack"
          >
            <template #empty> No datas. </template>
            <template #loading> Loading customers data. Please wait. </template>

            <Column
              field="count"
              bodyStyle="text-align:center"
              bodyClass="text-lg"
              headerStyle="width: 10%"
            >
              <template #body="{ index }">
                <span>{{ index + 1 }}</span>
              </template>
            </Column>
            <Column
              field="address"
              bodyStyle="text-align:start"
              bodyClass="text-lg"
              headerStyle="width: 40%"
            >
              <template #body="{ data }">
                <span v-if="isAccurateAddressData(data)">
                  {{ data.address }}
                </span>
                <span v-else class="text-error">
                  {{ data.address }}
                  <i class="pi pi-exclamation-circle text-xl"></i>
                </span>
              </template>
            </Column>
            <Column
              field="amount"
              bodyStyle="text-align:end"
              bodyClass="text-lg"
              headerStyle="width: 40%"
            >
              <template #body="{ data }">
                <span v-if="isAccurateAmountData(data)">
                  {{ formatAmount(data.amount) }}
                </span>
                <span v-else class="text-error">
                  {{ data.amount }}
                  <i class="pi pi-exclamation-circle text-xl"></i>
                </span>
              </template>
            </Column>
            <Column headerStyle="width: 10%" bodyStyle="text-align:center">
              <template #body="{ data }">
                <Button
                  v-if="data === selectedProduct1"
                  icon="pi pi-minus"
                  class="p-button-rounded p-button-danger"
                  @click="deletedata(data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <!-- 4 -->

      <template #footer>
        <div class="flex justify-content-center align-items-center">
          <Button
            type="button"
            label="등록"
            class="bg-indigolight w-2"
            @click="registrationList"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref, getCurrentInstance, watch } from "@vue/runtime-core";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import { dialogToggleAction } from "@/common/dialogToggle.js";
import * as XLSX from "xlsx/xlsx.mjs";
import constant from "@/common/constant.js";
import NumberInput from "@/components/input/NumberInput.vue";
export default {
  components: {
    NumberInput,
  },
  emits: ["addDataAction"],
  setup() {
    const display = ref(false);
    const isdirectly = ref(true);
    const isAddressError = ref(false);
    const isAmountError = ref(false);
    const datas = ref([]);
    const data = ref({});
    const selectedProduct1 = ref();
    const toAddress = ref("");
    const { emit } = getCurrentInstance();
    const errorDatas = ref([]);
    const errorMessage = ref("");
    const selfAmount = ref("");

    //부모에서 호출한 이벤트 체크, 취소번튼의 이벤트 체크
    // const { display1, which, closeDialog1, showDialog2 } =
    const { display3, closeDialog3 } = dialogToggleAction();

    watch(display3, () => {
      if (display3.value) {
        display.value = true;
      } else {
        display.value = false;
        resetData();
      }
    });

    watch(display, () => {
      if (!display.value) {
        closeDialog3();
        resetData();
      }
    });

    //직접추가 태그
    const addDirectly = () => {
      isdirectly.value = true;
    };

    //데이터 추가
    const addData = () => {
      if (!ethers.utils.isAddress(toAddress.value)) {
        isAddressError.value = true;
        isAmountError.value = false;
        errorMessage.value = constant.errmsg.CHECKADDRESS;
        return;
      } else if (selfAmount.value === "" || selfAmount.value === null) {
        console.log("test >>> ");
        isAmountError.value = true;
        isAddressError.value = false;
        errorMessage.value = constant.errmsg.CHECKAMOUNT;
        return;
      } else {
        data.value.count = createId();
        data.value.address = toAddress.value;
        data.value.amount = selfAmount.value;
        datas.value.push(data.value);
        console.log(datas.value);
      }
      resetData();
    };

    //겹치지 않는 아이디 값 부여
    const createId = () => {
      const date = new Date();
      let timeStamp = date.getTime();
      return timeStamp;
    };

    //데이터 삭제
    const deletedata = (products) => {
      data.value = products;
      datas.value = datas.value.filter((val) => val.count !== data.value.count);
      errorDatas.value = errorDatas.value.filter(
        (val) => val.count !== data.value.count
      );
      data.value = {};
    };

    //CSV 일괄 추가
    const addCSVall = () => {
      isdirectly.value = false;
    };

    //csv 파일 업로드
    const csvUploade = (csvFile) => {
      let file = csvFile.files[0];
      let reader = new FileReader();
      reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, {
          type: "binary",
          cellText: true,
          raw: true,
        });
        workBook.SheetNames.forEach(function (sheetName) {
          let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
          console.log(rows);
          rows.forEach((element) => {
            let removed = element.value.replace(/(,)/g, "");
            let checkNum = new BigNumber(removed);
            let paserData = {
              count: element.__rowNum__ + createId(),
              address: element.address,
              amount: checkNum.isNaN()
                ? element.value
                : checkNum.isNegative()
                ? element.value
                : checkNum.toFormat(),
            };
            if (!ethers.utils.isAddress(element.address)) {
              errorDatas.value.push(paserData);
            } else if (checkNum.isNaN() || checkNum.isNegative()) {
              errorDatas.value.push(paserData);
            }
            datas.value.push(paserData);
          });
        });
      };
      reader.readAsBinaryString(file);
    };

    //csv 업로드 후 값 검증하기
    const isAccurateAddressData = (data) => {
      if (!ethers.utils.isAddress(data.address)) {
        return false;
      } else {
        return true;
      }
    };
    const isAccurateAmountData = (data) => {
      let removed = data.amount.replace(/(,)/g, "");
      let checkNum = new BigNumber(removed);
      if (checkNum.isNaN() || checkNum.isNegative()) {
        return false;
      } else {
        return true;
      }
    };

    const totalLength = () => {
      return datas.value.length;
    };
    const errLength = () => {
      return errorDatas.value.length;
    };

    //데이터만 리셋
    const resetData = () => {
      data.value = {};
      toAddress.value = "";
      selfAmount.value = "";
      isAddressError.value = false;
      isAmountError.value = false;
    };

    const registrationList = () => {
      if (errorDatas.value.length > 0 || datas.value.length === 0) {
        return;
      }
      emit("addDataAction", datas);
      display.value = false;
      closeDialog3();
      datas.value = [];
      errorDatas.value = [];
      resetData();
    };

    const formatAmount = (amount) => {
      let removed = amount.replace(/(,)/g, "");
      return new BigNumber(removed).toFormat();
    };

    return {
      display,
      addDirectly,
      addData,
      addCSVall,
      toAddress,
      isdirectly,
      isAddressError,
      isAmountError,
      selectedProduct1,
      datas,
      data,
      formatAmount,
      registrationList,
      deletedata,
      csvUploade,
      totalLength,
      errLength,
      isAccurateAddressData,
      isAccurateAmountData,
      errorDatas,
      errorMessage,
      selfAmount,
    };
  },
};
</script>

<style>
</style>
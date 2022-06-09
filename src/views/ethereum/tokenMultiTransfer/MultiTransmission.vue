<template>
  <div>
    <div class="card">
      <div class="card-container purple-container overflow-hidden">
        <!-- 1 -->
        <div class="flex h-6rem">
          <div class="flex w-1 align-items-center justify-content-start ml-5">
            <span class="text-xl text-black-alpha-80 font-bold">계약</span>
          </div>
          <div
            class="
              flex
              justify-content-center
              align-items-center
              w-5
              font-medium
              text-black-alpha-60
            "
          >
            <Dropdown
              v-model="contractSelect"
              :options="contractList"
              @change="getOwnerAddress"
              optionLabel="name"
              optionValue="code"
              placeholder="선택하세요"
              class="
                flex-1 flex
                w-3
                border-round
                text-blockchain
                font-medium
                text-black-alpha-60
              "
              :class="[{ 'p-invalid': isSeleted }]"
            />
            <CopyAddress
              :address="contractSelect"
              :isShow="isVisible"
            />
          </div>
        </div>
        <!-- 1 -->
        <!-- 2 -->
        <div class="flex h-6rem">
          <div class="flex w-1 align-items-center justify-content-start ml-5">
            <span class="text-xl text-black-alpha-80 font-bold">Owner</span>
          </div>
          <div class="flex justify-content-start align-items-center w-4">
            <div v-if="isloading">
              <i class="pi pi-spin pi-spinner"></i>
            </div>
            <div v-else>
              <p class="text-xl text-black-alpha-60 font-medium">
                {{ ownerAddress }}
              </p>
            </div>
          </div>
        </div>
        <!-- 2 -->
      </div>
    </div>

    <!-- Update Owner -->
    <div class="card">
      <div class="card-container purple-container overflow-hidden">
        <Accordion
          :activeIndex="0"
          expandIcon="pi-chevron-up"
          collapseIcon="pi-chevron-down"
          class="custom-accordion"
        >
          <AccordionTab>
            <template #header>
              <span class="text-xl text-black-alpha-80 font-bold">
                토큰 멀티 전송
              </span>
            </template>
            <div class="field">
              <!-- 1 -->
              <div class="flex h-6rem">
                <div
                  class="flex w-1 align-items-center justify-content-start ml-5"
                >
                  <span class="text-xl text-black-alpha-80 font-bold"
                    >토큰</span
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
                  <Dropdown
                    v-model="tokenSelect"
                    :options="tokenList"
                    :disabled="isContractSeleted"
                    @change="getTokenBalance"
                    optionLabel="name"
                    optionValue="code"
                    placeholder="선택하세요"
                    class="
                      flex-1 flex
                      w-3
                      border-round
                      text-blockchain
                      font-medium
                      text-black-alpha-60
                    "
                    :class="[{ 'p-invalid': isTokenSeleted }]"
                  />
                </div>
              </div>
              <!-- 1 -->
              <!-- 2 -->
              <div class="flex h-6rem">
                <div
                  class="flex w-1 align-items-center justify-content-start ml-5"
                >
                  <span class="text-xl text-black-alpha-80 font-bold"
                    >토큰잔액</span
                  >
                </div>
                <div class="flex justify-content-start align-items-center w-4">
                  <div v-if="isTokenloading">
                    <i class="pi pi-spin pi-spinner"></i>
                  </div>
                  <div v-else>
                    <p
                      class="text-xl font-medium"
                      :class="[
                        { 'text-error': isLessBalance },
                        { 'text-black-alpha-80': !isLessBalance },
                      ]"
                      v-show="isVisible"
                    >
                      {{ tokenBalance }}
                      <i
                        @click="onRefresh"
                        class="pi pi-sync cursor-pointer ml-3"
                        v-show="isVisible"
                      ></i>
                    </p>
                  </div>
                </div>
              </div>
              <!-- 2 -->
              <div
                class="err-msg-style flex align-items-end ml-5"
                v-if="isLessBalance"
              >
                <span> {{ errorMessage }} </span>
              </div>
              <!-- 2 -->
              <div class="flex h-6rem">
                <div
                  class="flex w-1 align-items-center justify-content-start ml-5"
                >
                  <span class="text-xl text-black-alpha-80 font-bold"
                    >Allowance</span
                  >
                </div>
                <div class="flex justify-content-start align-items-center w-4">
                  <div v-if="isTokenloading">
                    <i class="pi pi-spin pi-spinner"></i>
                  </div>
                  <div v-else>
                    <p
                      class="text-xl font-medium"
                      :class="[
                        { 'text-error': isEmptyAllowance },
                        { 'text-black-alpha-60': !isEmptyAllowance },
                      ]"
                    >
                      {{ tokenAllowance }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- 2 -->
              <div
                class="err-msg-style flex align-items-end ml-5"
                v-if="isEmptyAllowance"
              >
                <span> {{ errorMessage }} </span>
              </div>
              <!-- 4 -->
              <div class="flex h-6rem">
                <div
                  class="
                    flex-initial flex
                    w-2
                    align-items-center
                    justify-content-start
                    font-bold
                    text-black
                    ml-5
                    border-round
                  "
                >
                  <p class="text-2xl">전송 리스트</p>
                </div>
                <div
                  class="
                    flex-1 flex
                    align-items-center
                    justify-content-center
                    m-2
                    px-3
                    py-1
                    border-round
                  "
                ></div>
                <div
                  class="
                    flex-1 flex
                    align-items-center
                    justify-content-end
                    font-bold
                    px-1
                    py-3
                    border-round
                  "
                >
                  <Button
                    icon="pi pi-plus"
                    label="리스트 추가"
                    @click="addList"
                  />
                </div>
              </div>
              <!-- 4 -->
              <!-- 5 -->
              <div class="flex h-full">
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
                    :loading="loading1"
                    v-model:selection="selectedProduct1"
                    selectionMode="single"
                    dataKey="count"
                    key="index"
                    breakpoint="1080px"
                    responsiveLayout="stack"
                  >
                    <template #empty>
                      No datas found.<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    </template>
                    <template #loading>
                      Loading customers data. Please wait.
                    </template>

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
                    />
                    <Column
                      field="amount"
                      bodyStyle="text-align:end"
                      bodyClass="text-lg"
                      headerStyle="width: 40%"
                    >
                      <template #body="{ data }">
                        <span>{{ data.amount }}</span>
                      </template>
                    </Column>
                    <Column
                      headerStyle="width: 10%"
                      bodyStyle="text-align:center"
                    >
                      <template #body="{ data }">
                        <Button
                          v-if="data === selectedProduct1"
                          icon="pi pi-minus"
                          class="p-button-rounded p-button-danger"
                          @click="deleteProduct(data)"
                        />
                      </template>
                    </Column>

                    <template #footer>
                      <div class="flex h-3rem">
                        <div
                          class="
                            flex
                            w-7
                            justify-content-end
                            align-items-center
                          "
                        >
                          <span class="text-2xl font-bold text-black-alpha-80"
                            >총 수량</span
                          >
                        </div>
                        <div
                          class="
                            flex
                            w-5
                            justify-content-end
                            align-items-center
                          "
                        >
                          <span
                            class="text-2xl font-bold text-black-alpha-80"
                            >{{ sumAmount(datas) }}</span
                          >
                        </div>
                      </div>
                    </template>
                  </DataTable>
                </div>
              </div>
              <!-- 5 -->
              <!-- 3 -->
              <div
                class="field align-items-start justify-content-start ml-2 py-3"
              >
                <p class="text-xl text-black-alpha-80 font-bold">
                  Owner 비공개키
                </p>
                <div
                  class="font-medium text-black-alpha-60 inputwrapper-max-width"
                >
                  <Password
                    v-model="privateKey"
                    class="w-full"
                    :class="[{ 'p-invalid': isPrivatekey }]"
                    :feedback="false"
                    placeholder="비공개키 입력할때는 보안에 주의하세요"
                    inputStyle="width: 100%"
                    toggleMask
                  >
                  </Password>
                </div>
                <div class="err-msg-style">
                  <span v-show="isPrivatekey">
                    {{ errorMessage }}
                  </span>
                </div>
              </div>
              <!-- 3 -->
              <!-- 6 -->
              <div
                class="
                  flex
                  align-items-center
                  justify-content-center
                  mt-5
                  h-6rem
                "
              >
                <Button
                  label="전송"
                  class="px-7"
                  @click="doMultiTransfer"
                ></Button>
              </div>
              <!-- 6 -->
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
    <!-- Update Owner -->
    <MultiTransListAdd @addDataAction="addDataList" />
    <TransactionTransfer @dialog-action="closed" />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { sumAmount, isLessThan } from "@/common/formatDate.js";
import { dialogToggleAction } from "@/common/dialogToggle.js";
import { tokenListData } from "@/common/getDataList.js";
import MultiTransListAdd from "@/components/popup/multi/MultiTransListAdd.vue";
import TransactionTransfer from "@/components/popup/token/TransactionTransfer.vue";
import CopyAddress from "@/components/copy/CopyAddress.vue";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import constant from "@/common/constant.js";
export default {
  components: {
    MultiTransListAdd,
    TransactionTransfer,
    CopyAddress,
  },
  setup() {
    const datas = ref([]);
    const data = ref({});
    const contractSelect = ref("");
    const ownerAddress = ref("");
    const isloading = ref(false);
    const isTokenloading = ref(false);
    const isVisible = ref(false);
    const isSeleted = ref(false);
    const isTokenSeleted = ref(false);
    const loading1 = ref(false);
    const isContractSeleted = ref(true);
    const selectedProduct1 = ref();
    const tokenSelect = ref("");
    const tokenAllowance = ref("");
    const tokenBalance = ref();
    const privateKey = ref("");
    const isPrivatekey = ref(false);
    const isEmptyAllowance = ref(false);
    const sendDatas = ref({});
    const errorMessage = ref("");
    const isLessBalance = ref(false);
    const {
      getContractList,
      contractList,
      getMultitransferOwner,
      getTokenList,
      tokenList,
      getBalanceMultiTransfer,
    } = tokenListData();
    //토큰 리스트 호출
    getContractList(1);
    getTokenList(1);

    const { showDialog1, closeDialog1, showDialog3, closeDialog3 } =
      dialogToggleAction();

    //token잔액 새로고침
    const onRefresh = () => {
      getTokenBalance();
    };

    //계약 owner 값 가져오기
    const getOwnerAddress = async () => {
      isSeleted.value = false;
      isloading.value = true;
      let response = await getMultitransferOwner(contractSelect.value);
      ownerAddress.value = response.data;
      isloading.value = false;
      isContractSeleted.value = false;
      if (tokenSelect.value !== "") {
        getTokenBalance();
      }
    };

    //토큰 owner 값 가져오기
    const getTokenBalance = async () => {
      isTokenSeleted.value = false;
      isTokenloading.value = true;
      let response = await getBalanceMultiTransfer(
        contractSelect.value,
        tokenSelect.value
      );
      let banlance = await ethers.utils.formatEther(response.data.balance);
      tokenBalance.value = new BigNumber(banlance).toFormat();
      let allowance = await ethers.utils.formatEther(response.data.allowance);
      tokenAllowance.value = new BigNumber(allowance).toFormat();
      isTokenloading.value = false;
      isVisible.value = true;
    };

    //행 지우기
    const deleteProduct = (products) => {
      data.value = products;
      datas.value = datas.value.filter((val) => val.count !== data.value.count);
      data.value = {};
    };

    //리스트 추가 dialog 팝업 show
    const addList = () => {
      showDialog3();
    };

    //리스트 추가 팝업창 닫기
    const addDataList = (products) => {
      console.log(products.value);
      datas.value = [...datas.value, ...products.value];
      closeDialog3();
    };

    //최종 전송
    const doMultiTransfer = () => {
      if (contractSelect.value === "" || contractSelect.value === null) {
        window.scrollTo(0, 0);
        isSeleted.value = true;
        isPrivatekey.value = false;
        isEmptyAllowance.value = false;
        return;
      } else if (tokenSelect.value === "" || tokenSelect.value === null) {
        window.scrollTo(0, 200);
        isSeleted.value = false;
        isTokenSeleted.value = true;
        isPrivatekey.value = false;
        isEmptyAllowance.value = false;
        isLessBalance.value = false;
        return;
      } else if (datas.value.length === 0) {
        isTokenSeleted.value = false;
        isSeleted.value = false;
        isPrivatekey.value = false;
        isEmptyAllowance.value = false;
        isLessBalance.value = false;
        console.log(" >>>> nodatas ");
        return;
      } else if (isLessThan(datas.value, parseInt(tokenAllowance.value))) {
        isEmptyAllowance.value = true;
        isLessBalance.value = false;
        isPrivatekey.value = false;
        isTokenSeleted.value = false;
        isSeleted.value = false;
        errorMessage.value = constant.errmsg.NOALLOWANCE;
        return;
      } else if (isLessThan(datas.value, parseInt(tokenBalance.value))) {
        isLessBalance.value = true;
        isEmptyAllowance.value = false;
        isPrivatekey.value = false;
        isTokenSeleted.value = false;
        isSeleted.value = false;
        errorMessage.value = constant.errmsg.LESSTOKEN;
        return;
      } else if (
        tokenAllowance.value === "0.0" ||
        parseInt(tokenAllowance.value) === 0
      ) {
        isEmptyAllowance.value = true;
        isLessBalance.value = false;
        isPrivatekey.value = false;
        isTokenSeleted.value = false;
        isSeleted.value = false;
        errorMessage.value = constant.errmsg.NOALLOWANCE;
        return;
      } else if (
        privateKey.value.length !== 64 ||
        privateKey.value === "" ||
        privateKey.value === null
      ) {
        isPrivatekey.value = true;
        isEmptyAllowance.value = false;
        isLessBalance.value = false;
        isTokenSeleted.value = false;
        isSeleted.value = false;
        errorMessage.value = constant.errmsg.CHECKPRIVATEKEY;
        return;
      }
      let transferVOList = [];
      let transfer = {};
      for (let i = 0; i < datas.value.length; i++) {
        let removed = datas.value[i].amount.replace(/(,)/g, "");
        let sendAmount = ethers.utils.parseEther(removed);
        transfer = {
          tokenAddress: tokenSelect.value,
          fromAddress: ownerAddress.value,
          toAddress: datas.value[i].address,
          amount: sendAmount.toString(),
        };
        transferVOList.push(transfer);
      }
      sendDatas.value = {
        actionNm: "멀티전송",
        contractAddress: contractSelect.value,
        ownerPrivateKey: privateKey.value,
        transferVOList: transferVOList,
        totalAmount: sumAmount(datas.value),
      };
      isPrivatekey.value = false;
      isTokenSeleted.value = false;
      isSeleted.value = false;
      isEmptyAllowance.value = false;
      isLessBalance.value = false;
      showDialog1("multiTransferFrom", sendDatas);
      console.log(">>> ", transferVOList);
    };

    const closed = () => {
      closeDialog1();
    };

    //계약주소 복사
    const copyToClipBoard = (address) => {
      let textareaObj = document.createElement("textarea");
      document.body.appendChild(textareaObj);
      textareaObj.value = address;
      textareaObj.select();
      document.execCommand("copy");
      document.body.removeChild(textareaObj);
    };

    return {
      datas,
      data,
      sumAmount,
      addList,
      addDataList,
      contractList,
      getOwnerAddress,
      contractSelect,
      isSeleted,
      loading1,
      selectedProduct1,
      deleteProduct,
      isTokenSeleted,
      isPrivatekey,
      onRefresh,
      tokenSelect,
      tokenList,
      getTokenBalance,
      doMultiTransfer,
      ownerAddress,
      isloading,
      isTokenloading,
      isVisible,
      isContractSeleted,
      tokenBalance,
      tokenAllowance,
      privateKey,
      closed,
      errorMessage,
      isEmptyAllowance,
      isLessBalance,
      copyToClipBoard,
    };
  },
};
</script>

<style>
</style>

<style scoped>
/* .inputwrapper-max-width {
  max-width: 850px;
} */
.custom-accordion::v-deep(.p-accordion-toggle-icon) {
  right: 1%;
  position: absolute;
}
</style>
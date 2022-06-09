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
              justify-content-start
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
                flex
                flex-1
                border-round
                text-blockchain
                font-medium
                text-black-alpha-60
              "
              :class="[{ 'p-invalid': isSeleted }]"
            />
            <CopyAddress :address="contractSelect" :isShow="isVisible" />
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
        <!-- 3 -->
        <div class="flex h-7rem">
          <div class="flex w-1 align-items-center justify-content-start ml-5">
            <span class="text-xl text-black-alpha-80 font-bold">잔액(ETH)</span>
          </div>
          <div class="flex justify-content-start align-items-center w-4">
            <div v-if="isloading">
              <i class="pi pi-spin pi-spinner"></i>
            </div>
            <div v-else>
              <p
                class="text-xl font-medium"
                :class="[
                  { 'text-error': isMoreAmount },
                  { 'text-black-alpha-60': !isMoreAmount },
                ]"
                v-show="isVisible"
              >
                {{ balanceData }}
                <i
                  @click="onRefresh"
                  class="pi pi-sync cursor-pointer ml-3"
                  v-show="isVisible"
                ></i>
              </p>
            </div>
            <div
              class="flex ml-5 align-items-center err-msg-style"
              v-if="isMoreAmount"
            >
              <span> {{ errorMessage }} </span>
            </div>
          </div>
        </div>
        <!-- 3 -->
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
                메인넷 코인 멀티 전송
              </span>
            </template>
            <div class="field">
              <!-- 1 -->
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
              <!-- 1 -->
              <!-- 2 -->
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
                            >총 수량(ETH)</span
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
                          <!-- <span class="text-2xl font-bold text-black-alpha-80">10,000,000.0000000000000158</span> -->
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
              <!-- 2 -->
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
              <!-- 4 -->
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
                  @click="multiSendAction"
                ></Button>
              </div>
              <!-- 4 -->
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
import MultiTransListAdd from "@/components/popup/multi/MultiTransListAdd.vue";
import { tokenListData } from "@/common/getDataList.js";
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
    const loading1 = ref(false);
    const contractSelect = ref("");
    const ownerAddress = ref("");
    const isloading = ref(false);
    const isVisible = ref(false);
    const isSeleted = ref(false);
    const isPrivatekey = ref(false);
    const balanceData = ref();
    const selectedProduct1 = ref();
    const sendDatas = ref({});
    const privateKey = ref("");
    const errorMessage = ref("");
    const isMoreAmount = ref(false);
    const {
      getMultiOwner,
      getContractList,
      contractList,
      getBalanceMultiSend,
    } = tokenListData();
    //토큰 리스트 호출
    getContractList(0);

    const datas = ref([]);
    const data = ref({});
    const { showDialog1, closeDialog1, showDialog3, closeDialog3 } =
      dialogToggleAction();

    //owner 값 가져오기
    const getOwnerAddress = async () => {
      isSeleted.value = false;
      isloading.value = true;
      isVisible.value = false;
      let response = await getMultiOwner(contractSelect.value);
      ownerAddress.value = response.data;
      getbalance();
    };
    const getbalance = async () => {
      let response = await getBalanceMultiSend(contractSelect.value);
      let balance = await ethers.utils.formatEther(response.data);
      balanceData.value = new BigNumber(balance).toFormat();
      isloading.value = false;
      isVisible.value = true;
    };

    //리스트 추가 dialog 팝업 show
    const addList = () => {
      showDialog3();
    };

    //잔액 새로고침
    const onRefresh = () => {
      if (contractSelect.value !== "") {
        isloading.value = true;
        isVisible.value = false;
        getbalance();
      }
      if (!isLessThan(datas.value, parseInt(balanceData.value))) {
        isMoreAmount.value = false;
        errorMessage.value = "";
      }
    };

    //행 지우기
    const deleteProduct = (products) => {
      data.value = products;
      console.log(products);
      datas.value = datas.value.filter((val) => val.count !== data.value.count);
      data.value = {};
    };

    //리스트 추가 팝업창 닫기
    const addDataList = (products) => {
      console.log(products.value);
      datas.value = [...datas.value, ...products.value];
      closeDialog3();
    };

    //최종 전송
    const multiSendAction = () => {
      if (contractSelect.value === "" || contractSelect.value === null) {
        isSeleted.value = true;
        window.scrollTo(0, 0);
        return;
      } else if (isLessThan(datas.value, parseInt(balanceData.value))) {
        isMoreAmount.value = true;
        errorMessage.value = constant.errmsg.NOALLOWANCE;
        return;
      } else if (datas.value.length === 0) {
        isMoreAmount.value = false;
        console.log(" >>>> nodatas ");
        return;
      } else if (
        privateKey.value.length !== 64 ||
        privateKey.value === "" ||
        privateKey.value === null
      ) {
        isPrivatekey.value = true;
        errorMessage.value = constant.errmsg.CHECKPRIVATEKEY;
        return;
      }
      let transferVOList = [];
      let transfer = {};
      for (let i = 0; i < datas.value.length; i++) {
        let removed = datas.value[i].amount.replace(/(,)/g, "");
        let sendAmount = ethers.utils.parseEther(removed);
        transfer = {
          address: datas.value[i].address,
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
      isSeleted.value = false;
      isPrivatekey.value = false;
      isMoreAmount.value = false;
      showDialog1("withdrawls", sendDatas);
    };
    const closed = () => {
      closeDialog1();
    };

    //계약주소 복사
    // const copyToClipBoard = (address) => {
    //   let textareaObj = document.createElement("textarea");
    //   document.body.appendChild(textareaObj);
    //   textareaObj.value = address;
    //   textareaObj.select();
    //   document.execCommand("copy");
    //   document.body.removeChild(textareaObj);
    // };

    return {
      loading1,
      contractSelect,
      contractList,
      getOwnerAddress,
      isSeleted,
      onRefresh,
      datas,
      sumAmount,
      deleteProduct,
      multiSendAction,
      addList,
      selectedProduct1,
      addDataList,
      isloading,
      isVisible,
      ownerAddress,
      balanceData,
      closed,
      privateKey,
      isPrivatekey,
      errorMessage,
      isMoreAmount,
      // copyToClipBoard,
    };
  },
};
</script>

<style>
</style>

<style scoped>
.custom-accordion::v-deep(.p-accordion-toggle-icon) {
  right: 1%;
  position: absolute;
}
</style>
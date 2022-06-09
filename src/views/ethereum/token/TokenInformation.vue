<template>
  <div>
    <div class="card">
      <div class="card-container purple-container overflow-hidden">
        <!-- 1 -->
        <div class="flex h-6rem">
          <div
            class="
              flex-initial flex
              w-1
              align-items-center
              justify-content-start
              ml-5
            "
          >
            <p class="text-xl text-black-alpha-80 font-bold">토큰</p>
          </div>
          <div
            class="
              flex-initial flex
              align-items-center
              justify-content-center
              w-4
              m-2
              py-1
              border-round
            "
          >
            <Dropdown
              :options="tokenList"
              v-model="tokenSelect"
              @change="checkSelect"
              :class="[{ 'p-invalid': isNotSelected }]"
              optionLabel="name"
              optionValue="code"
              placeholder="선택하세요"
              class="
                flex-1 flex
                border-round
                text-blockchain
                font-medium
                text-black-alpha-60
              "
            />
          </div>
          <div
            class="
              flex-1 flex
              align-items-center
              justify-content-center
              text-blockchain
              font-medium
              text-black-alpha-60
              px-1
              py-3
              border-round
              p-inputgroup
            "
          >
            <InputText
              :placeholder="
                tokenSelect === 'directly'
                  ? '토큰 컨트랙트 입력 필드'
                  : tokenSelect
              "
              v-model="keyword1"
              @keydown.enter="searchKeyword1"
              :disabled="isDirectInput"
              :class="[{ 'p-invalid': isDirectAddError }]"
            />
            <Button
              icon="pi pi-search"
              class="bg-indigolight"
              @click="searchKeyword1"
            />
          </div>
        </div>
        <!-- 1 -->
        <div
          class="err-msg-style flex justify-content-evenly align-items-center"
        >
          <span class="ml-5" v-show="isDirectAddError">
            {{ errorMessage }}
          </span>
        </div>

        <!-- 2 -->
        <div class="flex h-6rem">
          <div
            class="
              flex-initial flex
              w-1
              align-items-center
              justify-content-start
              ml-5
            "
          >
            <p class="text-xl text-black-alpha-80 font-bold">이름</p>
          </div>
          <div
            class="
              flex-1 flex
              align-items-center
              justify-content-start
              m-2
              px-3
              py-1
              border-round
            "
          >
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <p class="text-xl text-black-alpha-60 font-medium">
              {{ tokenName }}
            </p>
          </div>
          <div
            class="
              flex-initial flex
              w-3
              align-items-center
              justify-content-start
              pl-8
            "
          >
            <p class="text-xl text-black-alpha-80 font-bold">심볼</p>
          </div>
          <div
            class="
              flex-1 flex
              align-items-center
              justify-content-start
              m-2
              px-3
              py-1
              border-round
            "
          >
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <p class="text-xl text-black-alpha-60 font-medium">
              {{ tokenSymbol }}
            </p>
          </div>
        </div>
        <!-- 2 -->
        <!-- 3 -->
        <div class="flex h-6rem">
          <div
            class="
              flex-initial flex
              w-1
              align-items-center
              justify-content-start
              ml-5
            "
          >
            <p class="text-xl text-black-alpha-80 font-bold">발행량</p>
          </div>
          <div
            class="
              flex-1 flex
              align-items-center
              justify-content-start
              m-2
              px-3
              py-1
              border-round
            "
          >
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <p class="text-xl text-black-alpha-60 font-medium">
              {{ formatDigits(tokenTotalSupply) }}
            </p>
          </div>
          <div
            class="
              flex-initial flex
              w-3
              align-items-center
              justify-content-start
              pl-8
            "
          >
            <p class="text-xl text-black-alpha-80 font-bold">소수점 자리</p>
          </div>
          <div
            class="
              flex-1 flex
              align-items-center
              justify-content-start
              m-2
              px-3
              py-1
              border-round
            "
          >
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <p class="text-xl text-black-alpha-60 font-medium">
              {{ tokenDecimals }}
            </p>
          </div>
        </div>
        <!-- 3 -->
      </div>
    </div>

    <div class="card">
      <div class="card-container purple-container overflow-hidden">
        <!-- 1 -->
        <div class="flex">
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
            <p class="text-2xl">전체 거래내역</p>
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
              justify-content-center
              font-bold
              text-white
              px-1
              py-3
              border-round
              p-inputgroup
            "
          >
            <InputText
              placeholder="주소 검색..."
              :class="[{ 'p-invalid': isAddressError }]"
              v-model="keyword2"
              @keydown.enter="searchKeyword2"
            />
            <Button
              icon="pi pi-search"
              class="bg-indigolight"
              @click="searchKeyword2"
            />
          </div>
        </div>
        <!-- 1 -->
        <div
          class="err-msg-style flex justify-content-evenly align-items-center"
        >
          <span style="margin-left: 33%" v-show="isAddressError">
            {{ errorMessage }}
          </span>
        </div>
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
                header="트랜잭션 해시"
                field="hash"
                bodyStyle="text-align:center"
                bodyClass="hash-txd"
                headerStyle="width: 10%"
              >
                <template #body="{ data }">
                  <a
                    class="cursor-pointer text-blue-300 hover:underline"
                    @click="goScanpage(data.hash)"
                  >
                    <span class="addressS">{{ formatHash(data.hash) }}</span>
                    <span class="addressB">{{ data.hash }}</span>
                  </a>
                </template>
              </Column>
              <Column
                header="시간"
                field="date"
                bodyStyle="text-align:center"
                headerStyle="width: 20%"
              >
                <template #body="{ data }">
                  <span>{{ formatHashDate(data.timeStamp) }}</span>
                </template>
              </Column>
              <Column
                header="From"
                field="from"
                bodyStyle="text-align:center"
                bodyClass="hash-address"
                headerStyle="width: 20%"
              >
                <template #body="{ data }">
                  <span class="addressS addressM">{{
                    formatAddress(data.from)
                  }}</span>
                  <span class="addressB addressN">{{ data.from }}</span>
                </template>
              </Column>
              <Column
                header="To"
                field="to"
                bodyStyle="text-align:center"
                bodyClass="hash-address"
                headerStyle="width: 20%"
              >
                <template #body="{ data }">
                  <span class="addressS addressM">{{
                    formatAddress(data.to)
                  }}</span>
                  <span class="addressB addressN">{{ data.to }}</span>
                </template>
              </Column>
              <Column
                header="수수료(ETH)"
                bodyStyle="text-align:center"
                headerStyle="width: 10%"
              >
                <template #body="{ data }">
                  {{ formatFee(data.gasPrice, data.gasUsed) }}
                </template>
              </Column>
              <Column
                header="수량"
                field="value"
                bodyStyle="text-align:center"
                headerStyle="width: 20%"
              >
                <template #body="{ data }">
                  {{ formatDigits(data.value) }}
                </template>
              </Column>
            </DataTable>
            <Paginator
              v-model:first="firstPage"
              :rows="currentRow"
              :totalRecords="totalLength"
              @page="onPage($event)"
            ></Paginator>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import transactionData from "@/tmp/tokenTransaction.json";
import constant from "@/common/constant.js";
import {
  formatHashDate,
  formatAddress,
  formatHash,
  formatDigits,
  formatFee,
} from "@/common/formatDate.js";
import { ref } from "@vue/reactivity";
import { ethers } from "ethers";
import { tokenListData } from "@/common/getDataList.js";
import api from "@/api/index.js";
export default {
  setup() {
    const datas = ref([]);
    const currentPage = ref(1);
    const currentRow = ref(10);
    const totalLength = ref(0);
    const firstPage = ref(0);
    const loading1 = ref(false);
    const isloading = ref(false);
    const tokenSelect = ref("");
    const keyword1 = ref("");
    const keyword2 = ref("");
    const isDirectInput = ref(true);
    const isError = ref(false);
    const isAddressError = ref(false);
    const isNotSelected = ref(false);
    const isDirectAddError = ref(false);
    const errorMessage = ref("");
    const tokenName = ref("");
    const tokenSymbol = ref("");
    const tokenDecimals = ref("");
    const tokenTotalSupply = ref(null);
    const { tokenList, getTokenList, getTokenInfo, mainNm, goScanpage } =
      tokenListData();

    //토큰List 호출 부분
    getTokenList(0);

    //페이징 처리 부분
    const onPage = (event) => {
      console.log(event);
      currentPage.value = event.page + 1;
      currentRow.value = event.rows;
      if (keyword2.value) {
        getTotalTransaction(keyword2.value);
      } else {
        getTotalTransaction();
      }
    };

    //토큰 선택 부분
    const checkSelect = () => {
      if (tokenSelect.value === "directly") {
        isDirectInput.value = false;
      } else {
        isDirectInput.value = true;
      }
      if (isDirectInput.value) keyword1.value = "";
    };

    //토큰 정보 가져오기
    const searchKeyword1 = async () => {
      tokenName.value = "";
      tokenSymbol.value = "";
      tokenDecimals.value = null;
      tokenTotalSupply.value = null;
      firstPage.value = 0;
      currentPage.value = 1;
      let response;
      if (isDirectInput.value) {
        if (tokenSelect.value === "") {
          isNotSelected.value = true;
          return;
        } else {
          isNotSelected.value = false;
          isloading.value = true;
          response = await getTokenInfo(tokenSelect.value);
          isloading.value = false;
        }
      } else {
        if (!ethers.utils.isAddress(keyword1.value)) {
          isNotSelected.value = false;
          isDirectAddError.value = true;
          errorMessage.value = constant.errmsg.CHECKCONTRACT;
          return;
        } else {
          isNotSelected.value = false;
          isDirectAddError.value = false;
          isloading.value = true;
          response = await getTokenInfo(keyword1.value);
          isloading.value = false;
        }
      }
      tokenName.value = response.data.name;
      tokenSymbol.value = response.data.symbol;
      tokenDecimals.value = response.data.decimals;
      tokenTotalSupply.value = response.data.totalSupply;
      isDirectAddError.value = false;
      isNotSelected.value = false;
      getTotalTransaction();
    };

    //전체거래 내역 호출부분
    const getTotalTransaction = async (searchAddress) => {
      loading1.value = true;
      let URL;
      if (searchAddress) {
        URL =
          constant.url.GETCONINTRANSACTION +
          currentPage.value +
          "&offset=" +
          currentRow.value +
          "&networkId=" +
          mainNm.value +
          "&address=" +
          searchAddress;
      } else {
        URL =
          constant.url.GETCONINTRANSACTION +
          currentPage.value +
          "&offset=" +
          currentRow.value +
          "&networkId=" +
          mainNm.value;
      }
      if (isDirectInput.value) {
        URL += "&contractAddress=" + tokenSelect.value;
      } else {
        URL += "&contractAddress=" + keyword1.value;
      }
      try {
        const res = await api.get(URL);
        const response = await res.data.resultVO;
        datas.value = response.data.history;
        totalLength.value = response.data.totalCount;
      } catch (error) {
        console.log(error);
      }
      loading1.value = false;
    };

    const searchKeyword2 = () => {
      currentPage.value = 1;
      firstPage.value = 0;
      if (isDirectInput.value) {
        if (tokenSelect.value === "") {
          isNotSelected.value = true;
          return;
        }
      } else {
        if (keyword1.value === "") {
          isDirectAddError.value = true;
          errorMessage.value = constant.errmsg.CHECKCONTRACT;
          return;
        }
      }
      if (keyword2.value) {
        if (ethers.utils.isAddress(keyword2.value)) {
          getTotalTransaction(keyword2.value);
          isDirectAddError.value = false;
          isNotSelected.value = false;
          isAddressError.value = false;
        } else {
          isNotSelected.value = false;
          isAddressError.value = true;
          errorMessage.value = constant.errmsg.CHECKCONTRACT;
        }
      } else {
        getTotalTransaction();
        isDirectAddError.value = false;
        isNotSelected.value = false;
        isAddressError.value = false;
      }
      console.log(keyword2.value);
    };

    return {
      datas,
      formatHashDate,
      totalLength,
      currentRow,
      onPage,
      firstPage,
      loading1,
      isloading,
      formatAddress,
      keyword1,
      keyword2,
      searchKeyword1,
      searchKeyword2,
      tokenList,
      tokenSelect,
      formatHash,
      isDirectInput,
      checkSelect,
      isError,
      isAddressError,
      isNotSelected,
      isDirectAddError,
      errorMessage,
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenTotalSupply,
      formatDigits,
      formatFee,
      goScanpage,
    };
  },
};
</script>

<style>
</style>
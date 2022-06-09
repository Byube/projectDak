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
              w-4
              font-medium
              text-black-alpha-60
            "
          >
            <Dropdown
              v-model="contractSelected"
              :options="contractList"
              @change="getbalanceAll"
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
            />
          </div>
        </div>
        <!-- 1 -->
        <!-- 2 -->
        <div class="flex h-6rem">
          <div class="flex w-1 align-items-center justify-content-start ml-5">
            <span class="text-xl text-black-alpha-80 font-bold">잔액(ETH)</span>
          </div>
          <div class="flex justify-content-start align-items-center w-4">
            <div v-if="isloading">
              <i class="pi pi-spin pi-spinner"></i>
            </div>
            <div v-else>
              <p
                class="text-xl text-black-alpha-60 font-medium"
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
          </div>
        </div>
        <!-- 2 -->
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
              justify-content-end
              font-bold
              px-1
              py-3
              border-round
            "
          >
            <i
              @click="getbalanceAll"
              class="pi pi-sync cursor-pointer ml-3 text-2xl"
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
              :paginator="true"
              :rows="10"
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
                field="transactionHash"
                bodyStyle="text-align:center"
                bodyClass="hash-txd"
                headerStyle="width: 10%"
              >
                <template #body="{ data }">
                  <a
                    class="cursor-pointer text-blue-300 hover:underline"
                    @click="goScanpage(data.transactionHash)"
                  >
                    <span>{{ data.transactionHash }}</span>
                  </a>
                </template>
              </Column>
              <Column
                header="메소드"
                field="event"
                bodyStyle="text-align:center"
                headerStyle="width: 20%"
              >
                <template #body="{ data }">
                  <span
                    :class="
                      'customer-badge status-' +
                      (data.event === 'OwnerSet' ? 'proposal' : 'qualified')
                    "
                    >{{
                      data.event === "OwnerSet"
                        ? "Owner 변경"
                        : data.event === "Withdrawls"
                        ? "멀티전송"
                        : data.event
                    }}</span
                  >
                </template>
              </Column>
              <Column
                header="받는주소 수"
                field="data"
                bodyStyle="text-align:center"
                headerStyle="width: 20%"
              >
                <template #body="{ data }">
                  <span>
                    {{
                      data.event === "OwnerSet"
                        ? ""
                        : parseFloat(Number(data.data))
                    }}
                  </span>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
        <!-- 2 -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { tokenListData } from "@/common/getDataList.js";
import { ethers } from "ethers";
export default {
  setup() {
    const datas = ref([]);
    const loading1 = ref(false);
    const isloading = ref(false);
    const contractSelected = ref("");
    const balanceData = ref();
    const isVisible = ref(false);

    const {
      getContractList,
      contractList,
      getBalanceMultiSend,
      getEvents,
      goScanpage,
    } = tokenListData();
    getContractList(0);

    //계약 셀렉 시 전체 데이터 가져오기
    const getbalanceAll = async () => {
      isloading.value = true;
      await getbalance();
      loading1.value = true;
      let response = await getEvents(contractSelected.value, "MultiSend");
      datas.value = await response.data;
      loading1.value = false;
      console.log(response);
    };

    //잔액만 재호출
    const getbalance = async () => {
      let response = await getBalanceMultiSend(contractSelected.value);
      balanceData.value = await ethers.utils.formatEther(response.data);
      isloading.value = false;
      isVisible.value = true;
    };

    //잔액 재호출
    const onRefresh = () => {
      if (contractSelected.value !== "") {
        isloading.value = true;
        isVisible.value = false;
        getbalance();
      }
    };

    //변수값 리셋
    // const resetAll = () => {
    //   contractSelected.value = "";
    //   isVisible.value = false;
    //   isloading.value = false;
    // };

    return {
      datas,
      loading1,
      contractList,
      contractSelected,
      balanceData,
      isloading,
      isVisible,
      onRefresh,
      getbalanceAll,
      goScanpage,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/demo/badges.scss";
</style>
<template>
  <div class="card">
    <div class="card card-w-title">
      <div>
        <Toast />
        <div class="card">
          <Steps :model="items" :readonly="true" />
        </div>

        <router-view
          v-slot="{ Component }"
          :formData="formObject"
          @prevPage="prevPage($event)"
          @nextPage="nextPage($event)"
          @complete="complete"
        >
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import Detail from "@/views/mypro/infomation/info/UserDetail.vue";
import Address from "@/views/mypro/infomation/info/UserAddress.vue";
import Payment from "@/views/mypro/infomation/info/UserCard.vue";
export default {
  components: {
    Detail,
    Address,
    Payment,
  },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const items = ref([
      {
        label: "Detail",
        to: "/userInfomation/detail",
      },
      {
        label: "Address",
        to: "/userInfomation/address",
      },
      {
        label: "Payment",
        to: "/userInfomation/card",
      },
    ]);
    const formObject = ref({});

    const nextPage = (event) => {
      for (let field in event.formData) {
        formObject.value[field] = event.formData[field];
      }
      router.push(items.value[event.pageIndex + 1].to);
    };
    const prevPage = (event) => {
      router.push(items.value[event.pageIndex - 1].to);
    };
    const complete = () => {
      toast.add({
        severity: "success",
        summary: "Order submitted",
        detail:
          "Dear, " +
          formObject.value.firstname +
          " " +
          formObject.value.lastname +
          " your order completed.",
      });
    };

    return {
      items,
      formObject,
      nextPage,
      prevPage,
      complete,
    };
  },
};
</script>

<style>
</style>
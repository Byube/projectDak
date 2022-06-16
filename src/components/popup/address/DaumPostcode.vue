<template>
  <div class="coinintroduction">
    <Dialog
      header="주소검색"
      v-model:visible="display"
      :breakpoints="{ '1080px': '75vw', '720px': '100vw' }"
      :style="{ width: '60vw' }"
      :modal="true"
      class=""
      :dismissableMask="true"
    >
      <VueDaumPostcode @complete="oncomplete" />
    </Dialog>
  </div>
</template>
<script>
import { VueDaumPostcode } from "vue-daum-postcode";
import { ref } from "@vue/reactivity";

export default {
  components: {
    VueDaumPostcode, // export VueDaumPostcode is component
  },
  setup() {
    const display = ref(true);
    const oncomplete = (response) => {
      console.log(response);
    };
    return {
      oncomplete,
      display,
    };
  },
};
</script>
<template>
  <div class="card">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="class">Card Holder Name</label>
        <InputText type="text" v-model="cardholderName"></InputText>
      </div>
      <div class="field col-8">
        <label id="number" for="lastname">Number</label>
        <InputMask
          id="number"
          mask="9999-9999-9999-9999"
          v-model="cardholderNumber"
        ></InputMask>
      </div>
      <div class="field col-2">
        <label id="date" for="date">Date</label>
        <InputMask id="date" mask="99/99" v-model="date"></InputMask>
      </div>
      <div class="field col-2">
        <label for="cvv">CVV</label>
        <InputMask id="cvv" mask="999" v-model="cvv"></InputMask>
      </div>
      <div class="field-checkbox col-12">
        <Checkbox id="remember" v-model="remember" :binary="true"></Checkbox>
        <label for="remember" class="p-checkbox-label"
          >Save credit card information for future</label
        >
      </div>
    </div>
    <div class="grid grid-nogutter justify-content-between">
      <Button label="Back" @click="prevPage()" icon="pi pi-angle-left"></Button>
      <Button
        label="Next"
        @click="nextPage()"
        icon="pi pi-angle-right"
        icon-pos="right"
      ></Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardholderName: "",
      cardholderNumber: "",
      date: "",
      cvv: "",
      remember: false,
    };
  },
  methods: {
    nextPage() {
    //   this.$emit("next-page", {
      this.$emit("complete", {
        formData: {
          cardholderName: this.cardholderName,
          cardholderNumber: this.cardholderNumber,
          date: this.date,
          cvv: this.cvv,
        },
        pageIndex: 2,
      });
    },
    prevPage() {
      this.$emit("prev-page", { pageIndex: 2 });
    },
  },
};
</script>

<style>
</style>
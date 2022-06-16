<template>
  <div class="card">
    <div class="p-fluid">
      <div class="field">
        <label for="firstname">Name</label>
        <InputText
          id="firstname"
          v-model="firstname"
          :class="{ 'p-invalid': validationErrors.firstname && submitted }"
        ></InputText>
        <small v-show="validationErrors.firstname && submitted" class="p-error"
          >Name is required.</small
        >
      </div>
      <div class="field">
        <label for="lastname">Phone</label>
        <InputText
          id="lastname"
          v-model="lastname"
          :class="{ 'p-invalid': validationErrors.lastname && submitted }"
        ></InputText>
        <small v-show="validationErrors.lastname && submitted" class="p-error"
          >Phone is required.</small
        >
      </div>
      <div class="field">
        <label for="age">Email</label>
        <InputText id="age" v-model="age"></InputText>
      </div>
    </div>
    <div class="grid grid-nogutter justify-content-between">
      <i></i>
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
      firstname: "",
      lastname: "",
      age: null,
      submitted: false,
      validationErrors: {},
    };
  },
  methods: {
    nextPage() {
      this.submitted = true;
      if (this.validateForm()) {
        this.$emit("next-page", {
          formData: {
            firstname: this.firstname,
            lastname: this.lastname,
            age: this.age,
          },
          pageIndex: 0,
        });
      }
    },
    validateForm() {
      if (!this.firstname.trim()) this.validationErrors["firstname"] = true;
      else delete this.validationErrors["firstname"];

      if (!this.lastname.trim()) this.validationErrors["lastname"] = true;
      else delete this.validationErrors["lastname"];

      return !Object.keys(this.validationErrors).length;
    },
  },
};
</script>

<style>
</style>
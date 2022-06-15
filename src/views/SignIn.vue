
<template>
  <main class="m-auto text-gray-900">
    <div class="form-signin">
      <div class="flex flex-col place-items-center">
        <p class="text-5xl text-center mt-64 font-semibold">
          Total Wallet Admin
        </p>
        <div
          class="
            card
            grid
            max-w-xl
            grid-cols-1
            gap-4
            content-center
            w-full
            mt-6
            px-6
          "
        >
          <div class="field grid">
            <label class="text-left text-xl font-semibold">ID</label>
            <InputText
              class="flex items-center justify-center shadow-lg rounded-lg"
              id="id"
              type="text"
              placeholder="아이디를 입력하세요"
            />
              <!-- @keyup.enter="moveFocus('pwd')" -->
          </div>
          <div class="field grid">
            <label class="text-left text-xl font-semibold">PASSWORD</label>
            <InputText
              class="flex items-center justify-center shadow-lg rounded-lg"
              id="pwd"
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div class="field grid">
            <label class="text-left text-xl font-semibold">OTP</label>
            <InputText
              class="flex items-center justify-center shadow-lg rounded-lg"
              id="otp"
              type="number"
              placeholder="OTP번호를 입력하세요"
              :useGrouping="false"
              mode="decimal"
            />
          </div>
          <div class="field grid">
            <Button
              class="
                flex
                items-center
                justify-center
                shadow-lg
                rounded-lg
                text-xl
              "
              label="Login"
            />
            <!-- <Message v-show="isLoginFail" severity="error">
              {{ errMessage }}
            </Message> -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  setup() {
    
    return {
      
    };
  },
};
</script>

<style scoped>

</style>
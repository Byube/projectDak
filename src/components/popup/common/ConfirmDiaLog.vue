<template>
  <div>
    <Dialog
      :visible="display2"
      :closable="false"
      header="알림"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div
        class="flex align-items-center justify-content-center"
        style="padding: 1.25rem"
      >
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 1.75rem" />
        <span class="text-md">{{ message }}</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click.once="closeNo"
          class="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          @click.once="closeYes"
          class="p-button-text"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { dialogToggleAction } from "@/common/dialogToggle.js";
import { getCurrentInstance } from "@vue/runtime-core";
export default {
  emits: ["confirm-action"],
  setup() {
    const { emit } = getCurrentInstance();
    const { message, display2, closeDialog2 } = dialogToggleAction();
    const closeYes = () => {
      closeDialog2();
      emit("confirm-action", { state: true });
    };
    const closeNo = () => {
      closeDialog2();
      emit("confirm-action", { state: false });
    };
    return {
      closeYes,
      closeNo,
      message,
      display2,
    };
  },
};
</script>

<style>
</style>
<template>
    <create-brand></create-brand>
    <create-type></create-type>
    <create-device></create-device>
    <create-color></create-color>
</template>

<script setup>
import { ref } from "vue";
import CreateBrand from '../components/modals/CreateBrand.vue'
import CreateType from '../components/modals/CreateType.vue'
import CreateDevice from '../components/modals/CreateDevice.vue'
import CreateColor from '../components/modals/CreateColor.vue'

const visible = ref(false);

</script>

<style scoped>
button {
    width: 500px;
}
</style>
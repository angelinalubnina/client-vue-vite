<template>
    <div>
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import jwt_decode from 'jwt-decode';
import { $authHost, $host } from './http/index';
import { useUserStore } from './stores/userStore';
import { useDeviceStore } from './stores/deviceStore';
import { onBeforeMount, onMounted, ref } from 'vue';
import { mapWritableState } from 'pinia';

const deviceStore = useDeviceStore();

const fetchData = async () => {
    const brandRes = await $host.get('api/brand');
    deviceStore.brands = brandRes.data;

    const typeRes = await $host.get('api/type');
    deviceStore.types = typeRes.data;

    const deviseRes = await $host.get('api/device');
    deviceStore.devices = deviseRes.data;
};
const formObject = ref({});

onBeforeMount(fetchData);
</script>

<style scoped>
</style>

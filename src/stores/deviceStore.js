import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { $authHost } from '../http/index';

export const useDeviceStore = defineStore('deviceStore', () => {
    const types = ref([]);
    const brands = ref([]);
    const devices = ref([]);

    // const needUpdate = ref(true);
    // const basketDevices = computed(async () => {
	// 	try{
	// 		if (needUpdate.value) {
	// 			let generalDevices = []
	// 			const response = await $authHost.get('api/basketDevice');
	// 			for (const basketDevice of response.data) {
	// 				for (const generalDevice of devices.value) {
	// 					if (basketDevice.device == generalDevice._id) {
	// 						generalDevice.amount = basketDevice.amount;
	// 						generalDevices.push(generalDevice);
	// 						break;
	// 					}
	// 				}
	// 			}
	// 			needUpdate.value = false;
	// 			return generalDevices
	// 		} else {
	// 			needUpdate.value = false;
	// 			return [];
	// 		}
	// 	}
	// 	catch(e){
	// 		console.log(e.message)
	// 		return [];
	// 	}
    // });

    // async function init(_devices, _types, _brands){
    //   devices.value = _devices
    //   types.value = _types
    //   brands.value = _brands
    // }
    return { types, brands, devices };
});

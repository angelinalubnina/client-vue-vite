<template>
    <div class="flex" v-if="isDeviceLoaded">
        <div class="card flex justify-content-center">
            <Galleria
                :value="images"
                :responsiveOptions="responsiveOptions"
                :numVisible="5"
                :circular="true"
                containerStyle="max-width: 640px"
                :showItemNavigators="true"
                :showThumbnails="false"
            >
                <template #item="slotProps">
                    <img
                        :src="slotProps.item.name"
                        :alt="'Заглушка'"
                        style="width: 100%; display: block"
                    />
                </template>
                <template #thumbnail="slotProps">
                    <img
                        :src="slotProps.item.name"
                        :alt="'Заглушка'"
                        style="display: block"
                    />
                </template>
            </Galleria>
        </div>
        <div class="col-12 lg:col-6 py-0 lg:pl-5 w-25rem">
            <div class="flex justify-content-around flex-wrap">
                <h2>
                    {{ nameDevice }}
                </h2>
            </div>
            <div class="flex justify-content-around flex-wrap">
                <div style="margin-right: 20px">${{ getPrice() }}</div>
                <Rating :modelValue="rating" readonly :cancel="false"></Rating>
            </div>
            <div>
                <p class="p-0 mt-15 mb-3 line-height-3 text-700 text-justify">
                    {{ getDescription() }}
                </p>
            </div>
            <div>
                <div>
                    <div
                        v-for="(colorCode, index) in colorCodes"
                        :key="index"
                        class="color-option"
                    >
                        <input
                            type="radio"
                            :id="colorCode"
                            :value="colorCode"
                            v-model="selectedCode"
                        />
                        <label
                            :for="colorCode"
                            :style="{ backgroundColor: colorCode }"
                        ></label>
                    </div>
                    <p>Выбранный цвет: {{ selectedCode }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else>Идет загрузка!</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import { $host, $authHost } from '../http/index';
import { SERVER_URL, defaultDeviceImg, DEVICE_ROUTE } from '../utils/consts';

const images = ref([]);
const responsiveOptions = ref([
    {
        breakpoint: '991px',
        numVisible: 4,
    },
    {
        breakpoint: '767px',
        numVisible: 3,
    },
    {
        breakpoint: '575px',
        numVisible: 1,
    },
]);

const device = ref(null);

const rating = computed(() => {
    return device.value === null ? 0 : device.value.rating;
});

const getPrice = () => {
    return device.value.price;
};

const getDescription = () => {
    return device.value.description;
};

let availableColors = ref();
const selectedCode = ref('')
let colors = ref([])
let colorCodes = ref([])
const selectedColor = computed(() => {
    for (const color of colors.value) {
        if (color.code === selectedCode.value){
            return color
        }
    }
    return {}
})

const route = useRoute();
const name = route.params.name;
const nameDevice = ref('');

async function findPictures() {
    if (device.value.images.length > 0) {
        for (const imageName of device.value.images) {
            images.value.push({
                name: SERVER_URL + 'devices/' + device.value.name + '/' + imageName,
            });
        }
    } else {
        images.value.push({ name: defaultDeviceImg });
    }
    nameDevice.value = device.value.name;
}

const isDeviceLoaded = computed(() => {
    if (
        device !== null &&
        device.value !== null &&
        device.value !== undefined
    ) {
        return true;
    } else {
        return false;
    }
});

onBeforeMount(async () => {
    const response = await $host.get('api/device/' + name)
    device.value = response.data;

    colors.value = device.value.availableColors
    colorCodes.value = device.value.availableColors.map(color => color.code)
    
    await findPictures();
});
</script>

<style scoped>
.color-option {
    display: inline-block;
    margin-right: 10px;
}

.color-option input[type='radio'] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.color-option label {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ccc;
    cursor: pointer;
}

.color-option label:hover {
    border: 1px solid #000;
}
</style>

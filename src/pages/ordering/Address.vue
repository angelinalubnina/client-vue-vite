<template>
    <div class="card">
        <Steps :model="items" :readonly="false" aria-label="Form Steps" />
    </div>
    <div class="stepsdemo-content m-auto" style="max-width: 60rem">
        <Card>
            <template v-slot:title> Пункт доставки </template>
            <template v-slot:content>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="class">Страна</label>
                        <Dropdown
                            inputId="class"
                            v-model="selectedCountry"
                            :options="countries"
                            @change="setCities($event)"
                            optionLabel="name"
                            placeholder="Страна..."
                        />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname">Город</label>
                        <Dropdown
                            inputId="wagon"
                            v-model="selectedCity"
                            :options="cities"
                            placeholder="Город..."
                        />
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <Button
                        label="Назад"
                        @click="prevPage()"
                        icon="pi pi-angle-left"
                    />
                    <Button
                        label="Вперед"
                        @click="nextPage()"
                        icon="pi pi-angle-right"
                        iconPos="right"
                    />
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();
const items = ref([
    {
        label: 'Personal',
        to: '/personal',
    },
    {
        label: 'Address',
        to: '/address',
    },
    {
        label: 'Payment',
        to: '/payment',
    },
    {
        label: 'Confirmation',
        to: '/confirmation',
    },
]);

const selectedCountry = ref('');
const countries = [
    { name: 'Россия', cities: ['Санкт-Петербург', 'Екатеринбург', 'Иркутск'] },
    { name: 'Грузия', cities: ['Тбилиси', 'Кутаиси', 'Батуми'] },
    { name: 'Армения', cities: ['Ереван'] },
];

const cities = ref([]);
const selectedCity = ref('');

function setCities(event) {
    if (selectedCountry.value && event.value) {
        cities.value = [];
        for (const city of event.value.cities) {
            cities.value.push(city);
        }
    }
}

const formData = ref(null);

const router = useRouter();
function nextPage() {
    formData.value = userStore.getFormData();
    formData.value.append('country', selectedCountry.value.name);
    formData.value.append('sity', selectedCity.value);

    console.log(Object.fromEntries(formData.value));
    router.push('/payment');
}
function prevPage() {
    router.push('/personal');
}
</script>

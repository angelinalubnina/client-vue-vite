<template>
    <div class="card">
        <Steps :model="items" :readonly="false" aria-label="Form Steps" />
    </div>
    <div class="stepsdemo-content m-auto" style="max-width: 60rem;">
        <Card>
            <template v-slot:title> Confirmation </template>
            <template v-slot:content>
                <div class="field col-12">
                    <label for="class">Name: </label>
                    <b
                        >{{ '' }}
                        {{ formData.firstname ? formData.firstname : '-' }}
                        {{ formData.lastname ? formData.lastname : '-' }}</b
                    >
                </div>
                <div class="field col-12">
                    <label for="Age">Страна отправки: </label>
                    <b>{{ '' }}
                        {{ formData.country ? formData.country : '-' }}</b>
                </div>
                <div class="field col-12">
                    <label for="Age">Город отправки: </label>
                    <b>{{ '' }}
                        {{ formData.sity ? formData.sity : '-' }}</b>
                </div>
                <div class="field col-12">
                    <label for="Age">Имя владельца карты: </label>
                    <b>{{ '' }}
                        {{
                        formData.cardholderName ? formData.cardholderName : '-'
                    }}</b>
                </div>
                <div class="field col-12">
                    <label for="Age">Номер карты: </label>
                    <b>{{ '' }}
                        {{
                        formData.cardholderNumber
                            ? formData.cardholderNumber
                            : '-'
                    }}</b>
                </div>
                <div class="field col-12">
                    <label for="Age">Дата: </label>
                    <b>{{ '' }}
                        {{ formData.date ? formData.date : '-' }}</b>
                </div>
                <div class="field col-12">
                    <label for="Age">CVV: </label>
                    <b>{{ '' }}
                        {{
                        formData.cvv && formData.cvv.length === 3
                            ? '**' + formData.cvv[2]
                            : '-'
                    }}</b>
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
                        label="Завершить"
                        @click="complete()"
                        icon="pi pi-check"
                        iconPos="right"
                        class="p-button-success"
                    />
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const items = ref([
    {
        label: 'Personal',
        to: "/personal"
    },
    {
        label: 'Seat',
        to: "/seat",
    },
    {
        label: 'Payment',
        to: "/payment",
    },
    {
        label: 'Confirmation',
        to: "/confirmation",
    }
]);

const formData = ref(null);
onBeforeMount(() => {
    const userStore = useUserStore();
    formData.value = Object.fromEntries(userStore.getFormData()) 
})

const router = useRouter()

function prevPage() {
    router.push('/payment');
}
function complete() {
    console.log('Отправилось на сервак')
    // this.$emit('complete');
    // надо прописать логику с сохранением или не сохранением данных карты
    router.push('/busket');
}
</script>

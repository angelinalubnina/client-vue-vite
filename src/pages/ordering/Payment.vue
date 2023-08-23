<template>
    <div class="card">
        <Steps :model="items" :readonly="false" aria-label="Form Steps" />
    </div>
    <div class="stepsdemo-content m-auto" style="max-width: 60rem;">
        <Card>
            <template v-slot:title> Платежная информация </template>
            <template v-slot:subtitle>Введите данные вашей карты </template>
            <template v-slot:content>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12">
                        <label for="class">Имя владельца карты</label>
                        <InputText type="text" v-model="cardholderName" />
                    </div>
                    <div class="field col-8">
                        <label id="number" for="lastname">Номер</label>
                        <InputMask
                            id="number"
                            mask="9999-9999-9999-9999"
                            v-model="cardholderNumber"
                        />
                    </div>
                    <div class="field col-2">
                        <label id="date" for="date">Дата</label>
                        <InputMask id="date" mask="99/99" v-model="date" />
                    </div>
                    <div class="field col-2">
                        <label for="cvv">CVV</label>
                        <InputMask id="cvv" mask="999" v-model="cvv" />
                    </div>
                    <div class="field-checkbox col-12">
                        <Checkbox
                            id="remember"
                            v-model="remember"
                            :binary="true"
                        />
                        <label for="remember" class="p-checkbox-label"
                            >Сохраните информацию о кредитной карте на будущее</label
                        >
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
const router = useRouter()

const remember = ref(false)

const items = ref([
    {
        label: 'Personal',
        to: "/personal"
    },
    {
        label: 'Address',
        to: '/address',
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

const cardholderName = ref('');
const cardholderNumber = ref('');
const date = ref('');
const cvv = ref('');
const formData = ref(null);

function nextPage() {
    formData.value = userStore.getFormData()
    formData.value.append('cardholderName', cardholderName.value)
    formData.value.append('cardholderNumber', cardholderNumber.value)
    formData.value.append('date', date.value)
    formData.value.append('cvv', cvv.value)
    console.log(Object.fromEntries(userStore.getFormData()));
    router.push('/confirmation');
}
function prevPage() {
    router.push('/address');
}
</script>

<template>
    <div class="card">
        <Steps :model="items" :readonly="false" aria-label="Form Steps" />
    </div>
    <div class="stepsdemo-content m-auto" style="max-width: 60rem;">
        <Card>
            <template v-slot:title> Персональная инфармация </template>
            <template v-slot:subtitle>
                Введите вашу личную информацию
            </template>
            <template v-slot:content>
                <div class="p-fluid">
                    <div class="field">
                        <label for="firstname">Имя</label>
                        <InputText id="firstname" v-model="firstname" />
                        <!-- <small
                                v-show="validationErrors.value.firstname && submitted"
                                class="p-error"
                                >Firstname is required.</small
                            > -->
                    </div>
                    <div class="field">
                        <label for="lastname">Фамилия</label>
                        <InputText id="lastname" v-model="lastname" />
                        <!-- <small
                                v-show="validationErrors.value.lastname && submitted"
                                class="p-error"
                                >Lastname is required.</small
                            > -->
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <i></i>
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const router = useRouter();


// const firstname = computed(() => {
//   userStore.getFormData().firstname
// //   set: (value) => userStore.commit('updateUserData', { firstname: value }),
// });


const firstname = ref('');
const lastname = ref('');
let submitted = ref(false);
const validationErrors = ref({});

const items = ref([
    {
        label: 'Personal',
        to: '/personal',
    },
    {
        label: 'Seat',
        to: '/seat',
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

const formData = ref(null);

function nextPage() {
    submitted = true;
    if (true) {
        formData.value = userStore.getFormData();
        formData.value.append('firstname', firstname.value);
        formData.value.append('lastname', lastname.value);
        console.log(Object.fromEntries(formData.value));
        router.push('/seat');
    }
}
// function validateForm() {
//     if (!firstname.value.trim())
//         validationErrors.value['firstname'] = true;
//     else
//         delete validationErrors.value['firstname'];

//     if (!lastname.value.trim())
//         validationErrors.value['lastname'] = true;
//     else
//         delete validationErrors.value['lastname'];

//     return !Object.keys(validationErrors.value).length;
// }

// import { useRouter } from 'vue-router';

// export default {
//     data () {
//         return {
//             firstname: '',
//             lastname: '',
//             age: null,
//             submitted: false,
//             validationErrors: {}
//         }
//     },
//     methods: {
//         nextPage() {
//             this.submitted = true;
//             if (this.validateForm() ) {
//                 // this.$emit('next-page', {formData: {firstname: this.firstname, lastname: this.lastname, age: this.age}, pageIndex: 0});
//                 const router = useRouter()
//                 router.push("/seat");
//                 // await new Promise(resolve => setTimeout(resolve, 100));
//                 // window.location.reload();
//             }
//         },
//         validateForm() {
//             if (!this.firstname.trim())
//                 this.validationErrors['firstname'] = true;
//             else
//                 delete this.validationErrors['firstname'];

//             if (!this.lastname.trim())
//                 this.validationErrors['lastname'] = true;
//             else
//                 delete this.validationErrors['lastname'];

//             return !Object.keys(this.validationErrors).length;
//         }
//     }
// }
</script>

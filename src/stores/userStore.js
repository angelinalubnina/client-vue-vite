import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  let user = ref(null)
  let isAuth = ref(false)
  let formData = ref(new FormData());

  function $reset() {
    user.value = null
    isAuth.value = false
  }
  function login(userDto) {
    user.value = userDto
    isAuth.value = true
  }
  function logout(){
    user.value = null
    isAuth.value = false
  }
  function getUser(){
    return user.value
  }
  function getIsAuth(){
    return isAuth.value
  }
  function getFormData() {
    return formData.value
  }
  return { login, logout, $reset, user, isAuth, getUser, getIsAuth, getFormData, formData  }
})

// interface UserDto {
//   role: string
//   isActivated: Boolean
//   _id: string
//   email: string
// }
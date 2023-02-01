import { defineStore } from 'pinia'

export const useUserInfo = defineStore(
  'userInfo', {
  //保持したいデータ
  state: () => {
    return {
      token: '',
      session: '',
    }
  },
  persist: true
}
)
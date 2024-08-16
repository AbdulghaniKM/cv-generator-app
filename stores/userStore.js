import { defineStore } from "pinia";

export const useUserStore = defineStore('user', () => {
    const PersonalInfo = ref({
        name: '',
        email: '',
        birth: '',
        phoneNum: '',
        address: {
            city: '',
            country: ''
        },
        jobTitle: '',
        bio: '',
        website: ''
    })

    return { PersonalInfo }
})
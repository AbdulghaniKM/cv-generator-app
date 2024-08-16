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
    const EducationInfo = ref({
        university: '',
        department: '',
        degree: '',
        graduationYear: ''
    })
    const ExperienceInfo = ref({
        company: '',
        position: '',
        duration: {
            from: '',
            to: ''
        }
    })
    const skills = ref([])
    const currentPage = ref('PersonalInfo')

    return { PersonalInfo, EducationInfo, skills, ExperienceInfo, currentPage, }
})
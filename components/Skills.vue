<script setup>
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { Form as VForm } from 'vee-validate'

const userStore = useUserStore()

const SkillsSchema = yup.object({
    tempskill: yup
        .string()
        .required('At least 1 skill is required')
})

const { handleSubmit, validateField, resetForm } = useForm({
    validationSchema: SkillsSchema,
})

const error = ref('')
const { value: tempskill, errorMessage: tempskillError, setValue: setTempSkillValue } = useField('tempskill', { initialValue: '' })
const skills = ref([])

const addSkill = async () => {
    try {
        const isValid = SkillsSchema.isValidSync({ tempskill: tempskill.value.trim() })

        if (isValid && tempskill.value && tempskill.value.trim() !== '') {
            skills.value.push(tempskill.value.trim())
            setTempSkillValue('')
        }
    } catch (error) {
        console.error('Error adding skill:', error)
    }
}

const deleteSkill = (index) => {
    skills.value.splice(index, 1)
}

const onSubmit = handleSubmit(() => {
    if (skills.value.length > 0) {
        userStore.skills = skills.value
        userStore.currentPage = 'ExperienceInfo'
    } else {
        console.log('No skills added.')
    }
})

const NextPage = () => {
    if (skills.value.length > 0) {
        userStore.currentPage = 'ExperienceInfo'
    }
    else {
        error.value = 'No skills added, please add skills and continue'
    }
}
</script>


<template>
    <div class="container min-h-screen">
        <a-card title="Skills" class="mt-12 border-2">
            <Breadcrumbs />
            <VForm @submit.prevent="onSubmit" class="flex flex-col">
                <div class="w-full flex flex-col items-center justify-center sm:flex-col">
                    <a-card-grid style="width: 100%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="tempskill">Skills:</label>
                            <a-input id="tempskill" v-model:value="tempskill"
                                class="bg-gray-200 pl-2 w-full h-8 rounded" />
                            <span v-if="tempskillError" class="text-red-500">{{ tempskillError }}</span>
                            <span v-else class="text-red-500">{{ error }}</span>
                        </div>
                        <div class="flex items-center justify-center">
                            <a-button @click="addSkill">
                                Add Skill
                            </a-button>
                        </div>
                        <div>
                            <ul class="grid grid-cols-3 gap-4 sm:grid-cols-1 flex-row">
                                <li v-for="(skill, index) in skills" :key="index" class="">
                                    {{ skill }}
                                    <CloseCircleOutlined class="text-red-500 ml-2 cursor-pointer"
                                        @click="deleteSkill(index)" />
                                </li>
                            </ul>
                        </div>
                    </a-card-grid>
                </div>
                <div class="flex items-center gap-4 mt-12 justify-center">
                    <a-button @click="userStore.currentPage = 'EducationInfo'">
                        Back
                    </a-button>
                    <a-button @click="NextPage" type="submit">
                        Next
                    </a-button>
                </div>
            </VForm>
        </a-card>
    </div>
</template>

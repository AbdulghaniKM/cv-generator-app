<script setup>
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { Form as VForm } from 'vee-validate'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore' // Adjust import according to your project structure
import Breadcrumbs from './Breadcrumbs.vue' // Ensure this path is correct
import { CloseCircleOutlined } from '@ant-design/icons-vue'
import { Button as AButton, Input as AInput, Card as ACard, CardGrid as ACardGrid } from 'ant-design-vue' // Adjust import according to your project structure

const userStore = useUserStore()

const error = ref({
    company: '',
    position: '',
    duration: {
        from: '',
        to: ''
    }
})

const ExperienceSchema = yup.object({
    company: yup.string().required('Company name is required'),
    position: yup.string().required('Position is required'),
    duration: yup.object({
        from: yup.string().required('From date is required'),
        to: yup.string()
            .required('To date is required')
            .test('is-greater', 'To date must be after From date', function (value) {
                const { from } = this.parent;
                return new Date(value) > new Date(from);
            })
    }).required('Duration is required').nullable()
});

const { handleSubmit, resetForm } = useForm({
    validationSchema: ExperienceSchema,
})

const { value: company, errorMessage: companyError } = useField('company')
const { value: position, errorMessage: positionError } = useField('position')
const { value: durationFrom, errorMessage: durationFromError } = useField('duration.from')
const { value: durationTo, errorMessage: durationToError } = useField('duration.to')

const experiences = ref([])

const addExperience = async () => {
    try {
        const isValid = await ExperienceSchema.isValid({
            company: company.value.trim(),
            position: position.value.trim(),
            duration: {
                from: durationFrom.value.trim(),
                to: durationTo.value.trim()
            }
        })

        if (isValid && company.value && position.value && durationFrom.value && durationTo.value) {
            experiences.value.push({
                company: company.value.trim(),
                position: position.value.trim(),
                duration: {
                    from: durationFrom.value.trim(),
                    to: durationTo.value.trim()
                }
            })
            resetForm()
        }
    } catch (error) {
        console.error('Error adding experience:', error)
    }
}

const deleteExperience = (index) => {
    experiences.value.splice(index, 1)
}

const onSubmit = handleSubmit(() => {
    if (experiences.value.length > 0) {
        userStore.ExperienceInfo = experiences.value
        userStore.currentPage = 'dsdsdd'
    } else {
        console.log('No skills added.')
    }
})

const NextPage = () => {
    if (experiences.value.length > 0) {
        userStore.currentPage = 'dsdsd'
    } else {
        error.value = 'No Experience added, please add Experience to continue'
    }
}
</script>


<template>
    <div class="container min-h-screen">
        <a-card title="Experience" class="mt-12 border-2">
            <Breadcrumbs />
            <VForm @submit.prevent="onSubmit" class="flex flex-col">
                <div class="w-full flex flex-col items-center justify-center sm:flex-col">
                    <a-card-grid style="width: 100%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="company">Company:</label>
                            <a-input id="company" v-model:value="company" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                            <span v-if="companyError" class="text-red-500">{{ companyError }}</span>
                            <span v-else class="text-red-500">{{ error.value.company }}</span>
                        </div>
                        <div>
                            <label for="position">Position:</label>
                            <a-input id="position" v-model:value="position" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                            <span v-if="positionError" class="text-red-500">{{ positionError }}</span>
                            <span v-else class="text-red-500">{{ error.value.position }}</span>
                        </div>
                        <div>
                            <label for="duration-from">From:</label>
                            <a-input id="duration-from" type="date" v-model:value="durationFrom" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                            <span v-if="durationFromError" class="text-red-500">{{ durationFromError }}</span>
                            <span v-else class="text-red-500">{{ error.value.duration.from }}</span>
                        </div>
                        <div>
                            <label for="duration-to">To:</label>
                            <a-input id="duration-to" type="date" v-model:value="durationTo" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                            <span v-if="durationToError" class="text-red-500">{{ durationToError }}</span>
                            <span v-else class="text-red-500">{{ error.value.duration.to }}</span>
                        </div>
                        <div class="flex items-center justify-center">
                            <a-button @click="addExperience">
                                Add Experience
                            </a-button>
                        </div>
                        <div>
                            <ul class="grid grid-cols-3 gap-4 sm:grid-cols-1 flex-row">
                                <li v-for="(exp, index) in experiences" :key="index" class="">
                                    {{ exp.company }} - {{ exp.position }} (From: {{ exp.duration.from }}, To: {{ exp.duration.to }})
                                    <CloseCircleOutlined class="text-red-500 ml-2 cursor-pointer" @click="deleteExperience(index)" />
                                </li>
                            </ul>
                        </div>
                    </a-card-grid>
                </div>
                <div v-if="error.value.noExperiencesError" class="text-red-500 text-center mt-4">
                    {{ error.value.noExperiencesError }}
                </div>
                <div class="flex items-center gap-4 mt-12 justify-center">
                    <a-button @click="userStore.currentPage = 'Skills'">
                        Back
                    </a-button>
                    <a-button @click="NextPage">
                        Next
                    </a-button>
                </div>
            </VForm>
        </a-card>
    </div>
</template>

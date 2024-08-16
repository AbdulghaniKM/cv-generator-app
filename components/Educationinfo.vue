<script setup>
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { Form as VForm } from 'vee-validate';

const userStore = useUserStore()

const EducationSchema = yup.object({
    university: yup.string().required('University name is required'),
    department: yup.string().required('Department is required'),
    degree: yup.string().required('Degree is required'),
    graduation: yup.string().required('Graduation Year is required')
})

const { handleSubmit, errors, validate } = useForm({
    validationSchema: EducationSchema,
})

const { value: university, errorMessage: universityError } = useField('university')
const { value: department, errorMessage: departmentError } = useField('department')
const { value: degree, errorMessage: degreeError } = useField('degree')
const { value: graduation, errorMessage: graduationError } = useField('graduation')



const onSubmit = handleSubmit(() => {
    validate().then((isValid) => {
        if (isValid) {
            userStore.EducationInfo.university = university.value
            userStore.EducationInfo.department = department.value
            userStore.EducationInfo.degree = degree.value
            userStore.EducationInfo.graduationYear = graduation.value

            userStore.currentPage = "Skills"
        } else {
            console.log('Validation failed:', errors.value)
        }
    })
})
</script>


<template>
    <div class="container min-h-screen">
        <a-card title="Education Info" class="mt-12 border-2">
            <Breadcrumbs />
            <VForm @submit.prevent="onSubmit" class="flex flex-col">
                <div class="w-full flex flex-row sm:flex-col">
                    <a-card-grid style="width: 50%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="university">University Name:</label>
                            <a-input id="university" v-model:value="university"
                                class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                        <span v-if="universityError" class="text-red-500">{{ universityError }}</span>
                    </a-card-grid>

                    <a-card-grid style="width: 50%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="department">Department:</label>
                            <a-input id="department" v-model:value="department"
                                class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                        <span v-if="departmentError" class="text-red-500">{{ departmentError }}</span>
                    </a-card-grid>
                </div>
                <div class="w-full flex flex-row sm:flex-col">
                    <a-card-grid style="width: 50%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="degree">Degree:</label>
                            <a-input id="degree" v-model:value="degree" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                        <span v-if="degreeError" class="text-red-500">{{ degreeError }}</span>
                    </a-card-grid>
                    <a-card-grid style="width: 50%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="graduation">Graduation Year:</label>
                            <a-input id="graduation" v-model:value="graduation" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                        <span v-if="graduationError" class="text-red-500">{{ graduationError }}</span>
                    </a-card-grid>
                </div>
                <div class="flex items-center gap-4 mt-12 justify-center">
                    <a-button @click="userStore.currentPage = 'PersonalInfo'">
                        Back
                    </a-button>
                    <a-button @click="onSubmit()">
                        Next
                    </a-button>
                    
                </div>
            </VForm>
        </a-card>
    </div>
</template>

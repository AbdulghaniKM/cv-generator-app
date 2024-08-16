<script setup>
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { Form as VForm } from 'vee-validate';

const userStore = useUserStore()

const PersonalSchema = yup.object({
    fullName: yup.string().required('Name is required'),
    birth: yup.date().required('Date of Birth is required'),
    email: yup.string().email('Invalid email address').required('Email address is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    phone: yup.string().required('Phone number is required'),
    bio: yup.string().required('Bio is required'),
    jobTitle: yup.string().required('Job Title is required'),
    website: yup.string()
})

const { handleSubmit, errors, validate } = useForm({
    validationSchema: PersonalSchema,
})

const { value: fullName, errorMessage: fullNameError } = useField('fullName')
const { value: birth, errorMessage: birthError } = useField('birth')
const { value: email, errorMessage: emailError } = useField('email')
const { value: city, errorMessage: cityError } = useField('city')
const { value: country, errorMessage: countryError } = useField('country')
const { value: phone, errorMessage: phoneError } = useField('phone')
const { value: bio, errorMessage: bioError } = useField('bio')
const { value: jobTitle, errorMessage: jobTitleError } = useField('jobTitle')
const { value: website } = useField('website')


const onSubmit = handleSubmit(() => {
    validate().then((isValid) => {
        if (isValid) {
            userStore.PersonalInfo.name = fullName.value
            userStore.PersonalInfo.birth = birth.value
            userStore.PersonalInfo.email = email.value
            userStore.PersonalInfo.address.city = city.value
            userStore.PersonalInfo.address.country = country.value
            userStore.PersonalInfo.phoneNum = phone.value
            userStore.PersonalInfo.bio = bio.value
            userStore.PersonalInfo.jobTitle = jobTitle.value
            userStore.PersonalInfo.website = website.value
            alert("data submitted successfully!")
        } else {
            console.log('Validation failed:', errors.value)
        }
    })
})
</script>


<template>
    <div class="container min-h-screen">
        <a-card title="Personal Info" class="mt-12 border-2">
            <VForm @submit.prevent="onSubmit" class="flex flex-col">
                <div class="w-full flex flex-row sm:flex-col">
                    <a-card-grid style="width: 33%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="fullName">Name:</label>
                            <a-input id="fullName" v-model:value="fullName" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                        <span v-if="fullNameError" class="text-red-500">{{ fullNameError }}</span>
                    </a-card-grid>

                    <a-card-grid style="width: 33%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="birth">Date Of Birth:</label>
                            <a-input id="birth" type="date" v-model:value="birth"
                                class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                        <span v-if="birthError" class="text-red-500">{{ birthError }}</span>
                    </a-card-grid>

                    <a-card-grid style="width: 33%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="email">Email Address:</label>
                            <a-input id="email" type="email" v-model:value="email"
                                class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                        <span v-if="emailError" class="text-red-500">{{ emailError }}</span>
                    </a-card-grid>
                </div>
                <div class="w-full flex flex-row sm:flex-col">
                    <a-card-grid style="width: 33%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="city">City:</label>
                            <a-input id="city" v-model:value="city" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                        <span v-if="cityError" class="text-red-500">{{ cityError }}</span>
                    </a-card-grid>

                    <a-card-grid style="width: 33%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="country">Country</label>
                            <a-input id="country" v-model:value="country" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                        <span v-if="countryError" class="text-red-500">{{ countryError }}</span>
                    </a-card-grid>

                    <a-card-grid style="width: 33%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="phone">Phoen Number:</label>
                            <a-input id="phone" v-model:value="phone" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                        <span v-if="phoneError" class="text-red-500">{{ phoneError }}</span>
                    </a-card-grid>
                </div>
                <div class="w-full flex flex-row sm:flex-col">
                    <a-card-grid style="width: 33%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="bio">Bio:</label>
                            <a-textarea id="bio" v-model:value="bio" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                        <span v-if="bioError" class="text-red-500">{{ bioError }}</span>
                    </a-card-grid>

                    <a-card-grid style="width: 33%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="jobTitle">Job Title: </label>
                            <a-input id="jobTitle" v-model:value="jobTitle" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                        <span v-if="jobTitleError" class="text-red-500">{{ jobTitleError }}</span>
                    </a-card-grid>

                    <a-card-grid style="width: 33%;" class="grid gap-4 sm:!w-full" :hoverable="false">
                        <div>
                            <label for="website">Website:</label>
                            <a-input id="website" v-model:value="website" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                        </div>
                    </a-card-grid>
                </div>
                <div class="flex items-center mt-12 justify-center">
                    <a-button @click="onSubmit()">
                        Submit
                    </a-button>
                </div>
            </VForm>
        </a-card>
    </div>
</template>

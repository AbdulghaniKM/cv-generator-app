<script setup>
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { Form as VForm } from 'vee-validate';

const userStore = useUserStore();

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

const { handleSubmit, resetForm, setErrors, errors } = useForm({
    validationSchema: ExperienceSchema,
    initialValues: {
        company: '',
        position: '',
        duration: {
            from: '',
            to: ''
        }
    }
});
const error = ref('');

const { value: company, errorMessage: companyError } = useField('company');
const { value: position, errorMessage: positionError } = useField('position');
const { value: durationFrom, errorMessage: durationFromError } = useField('duration.from');
const { value: durationTo, errorMessage: durationToError } = useField('duration.to');

const experiences = ref([]);

const addExperience = async () => {
    try {
        const values = {
            company: company.value.trim(),
            position: position.value.trim(),
            duration: {
                from: durationFrom.value.trim(),
                to: durationTo.value.trim()
            }
        };

        await ExperienceSchema.validate(values, { abortEarly: false });
        experiences.value.push(values);
        resetForm();
    } catch (validationErrors) {
        const formattedErrors = {};
        validationErrors.inner.forEach(err => {
            formattedErrors[err.path] = err.message;
        });
        setErrors(formattedErrors);
    }
};

const deleteExperience = (index) => {
    experiences.value.splice(index, 1);
};

const onSubmit = handleSubmit(() => {
    if (experiences.value.length > 0) {
        userStore.ExperienceInfo = experiences.value;
        userStore.currentPage = 'dsdsdd';
    } else {
        console.log('No experiences added.');
    }
});

const NextPage = async () => {
    try {
        await Promise.all(experiences.value.map(async (exp) => {
            await ExperienceSchema.validate(exp, { abortEarly: false });
        }));
        if (experiences.value.length > 0) {
            userStore.ExperienceInfo = experiences.value;
            userStore.currentPage = 'dddddd';
        }
        else {
            error.value = 'No experiences added.';
        }
    } catch (validationErrors) {
        const formattedErrors = {};
        validationErrors.inner.forEach(err => {
            formattedErrors[err.path] = err.message;
        });
        setErrors(formattedErrors);
        error.value = 'Please fix the errors before proceeding';
    }
};

const clearError = (field) => {
    setErrors({ [field]: '' });
};

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
                            <a-input id="company" v-model:value="company" @input="clearError('company')"
                                class="bg-gray-200 pl-2 w-full h-8 rounded" />
                            <span v-if="companyError" class="text-red-500">{{ companyError }}</span>
                            <span v-if="error" class="text-red-500">{{ error }}</span>
                        </div>
                        <div>
                            <label for="position">Position:</label>
                            <a-input id="position" v-model:value="position" @input="clearError('position')"
                                class="bg-gray-200 pl-2 w-full h-8 rounded" />
                            <span v-if="positionError" class="text-red-500">{{ positionError }}</span>
                        </div>
                        <div>
                            <label for="duration-from">From:</label>
                            <a-input id="duration-from" type="date" v-model:value="durationFrom"
                                @input="clearError('duration.from')" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                            <span v-if="durationFromError" class="text-red-500">{{ durationFromError }}</span>
                        </div>
                        <div>
                            <label for="duration-to">To:</label>
                            <a-input id="duration-to" type="date" v-model:value="durationTo"
                                @input="clearError('duration.to')" class="bg-gray-200 pl-2 w-full h-8 rounded" />
                            <span v-if="durationToError" class="text-red-500">{{ durationToError }}</span>
                        </div>
                        <div class="flex items-center justify-center">
                            <a-button @click="addExperience">Add Experience</a-button>
                        </div>
                        <div>
                            <ul class="grid grid-cols-2 gap-4 sm:grid-cols-1 flex-row">
                                <li v-for="(exp, index) in experiences" :key="index">
                                    {{ exp.company }} - {{ exp.position }} (From: {{ exp.duration.from }}, To: {{
                                        exp.duration.to }})
                                    <CloseCircleOutlined class="text-red-500 ml-2 cursor-pointer"
                                        @click="deleteExperience(index)" />
                                </li>
                            </ul>
                        </div>
                    </a-card-grid>
                </div>
                <div class="flex items-center gap-4 mt-12 justify-center">
                    <a-button @click="userStore.currentPage = 'Skills'">Back</a-button>
                    <a-button @click="NextPage">Next</a-button>
                </div>
            </VForm>
        </a-card>
    </div>
</template>
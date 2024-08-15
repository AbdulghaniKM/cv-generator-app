<script setup>
import * as yup from 'yup'

const user = useUserStore()

const PersonalSchema = yup.object({
    name: yup.string().required('Name is required'),
})
</script>

<template>
    <div class="container">
        <a-card title="Personal Info" class="mt-12 border-2">
            <Vform class="flex flex-col" :validation-schema="PersonalSchema">
                <div class="w-full flex flex-row">
                    <a-card-grid style="width: 33%;" class="flex gap-4" :hoverable="false">
                        <label for="fullName">
                            Name:
                        </label>
                        <Field name="Fullname" class="bg-gray-200 pl-2 w-full h-6 rounded">
                        </Field>
                        <ErrorMessage name="fullname" class="text-red-500" />

                    </a-card-grid>
                    <a-card-grid style="width: 33%;"></a-card-grid>
                    <a-card-grid style="width: 33%;"></a-card-grid>
                </div>
                <div>
                    <a-button>
                        Submit
                    </a-button>
                </div>
            </Vform>
        </a-card>
    </div>
</template>
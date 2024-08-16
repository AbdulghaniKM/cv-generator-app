<template>
    <a-breadcrumb class="py-4">
        <a-breadcrumb-item>
            <a-button type="link" @click="navigateHome" class="text-black">
                Home
            </a-button>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <a-button type="link" :class="{ '!text-sky-500': currentPage === 'PersonalInfo' }" class="text-black"
                @click="userStore.currentPage = 'PersonalInfo'">Personal Info</a-button>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <a-button type="link" :class="{ '!text-sky-500': currentPage === 'EducationInfo' }" class="text-black"
                @click="userStore.currentPage = 'EducationInfo'">Education Info</a-button>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <a-button type="link" :class="{ '!text-sky-500': currentPage === 'Skills' }" class="text-black"
                @click="userStore.currentPage = 'Skills'">
                Skills
            </a-button>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <a-button type="link" :class="{ '!text-sky-500': currentPage === 'ExperienceInfo' }" class="text-black"
                @click="userStore.currentPage = 'ExperienceInfo'">
                Experience
            </a-button>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script setup>

const userStore = useUserStore()
const router = useRouter()

function navigateHome() {
    router.push('/')
}
const currentPage = computed(() => userStore.currentPage)
</script>

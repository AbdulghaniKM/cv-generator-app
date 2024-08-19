<script setup>
const userStore = useUserStore()
</script>

<template>
    <main>
        <Personalinfo v-if="userStore.currentPage === 'PersonalInfo'" />
        <Educationinfo v-if="userStore.currentPage === 'EducationInfo'" />
        <Skills v-if="userStore.currentPage === 'Skills'" />
        <Experienceinfo v-if="userStore.currentPage == 'ExperienceInfo'" />
    </main>
</template>

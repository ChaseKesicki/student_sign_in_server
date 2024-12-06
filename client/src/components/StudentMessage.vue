<script setup>
import { useStudentStore } from '../stores/StudentStore'
import { storeToRefs } from 'pinia'

const studentStore = useStudentStore()

const { mostRecentStudent } = storeToRefs(studentStore) //calls mostRecentStudent from refs


</script>

<template>
    <!--Displays a welcome or goodbye message for most recent student to be present or absent-->
<div id="welcome-or-goodbye-message" class="m-2">
            
            <div v-if="mostRecentStudent.name">
            
                <div v-if="mostRecentStudent.present" class="alert alert-success">
                    Welcome, {{mostRecentStudent.name}}! 
                </div>
                <div v-else class="alert alert-info">
                    Goodbye {{mostRecentStudent.name}}, see you later!
                </div>
            </div>
        </div>


</template>

<style scoped>
/*CSS for this component here */


</style>
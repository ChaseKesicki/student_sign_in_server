<script setup>

import { ref } from 'vue'
const props = defineProps({  //recived props from the studentTable
    student: Object
})

const emit = defineEmits( [ 'arrived-or-left', 'delete-student'])  //emits data back to studentTable

const isStudentPresent = ref(props.student.present)

const notifyArrivedOrLeft = () => {
    // tell parent that student arrived or left - emit event
    emit( 'arrived-or-left', props.student, isStudentPresent.value)
}

const confirmThenDeleteStudent = () => {
    emit('delete-student', props.student)  //deletes student from the list
}


</script>

<template>
<tr class="align-middle" v-bind:class="{ present: student.present, absent: !student.present}">
 
 <td>{{ student.name }}</td>
 <td>{{ student.starID }}</td>
 <td>
    <!--todo v-model checkbox-->
     <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyArrivedOrLeft(student)">
     <span v-if="student.present" class="mx-3">Here!</span>
     <span v-else class="mx-3">Not present</span>

 </td> <!--Present/absent-->
 <td>
     <button v-on:click="confirmThenDeleteStudent" class="btn btn-danger">
         <i class="bi bi-trash-fill"></i> Delete</button>
 </td> <!--Delete button-->

</tr>


</template>

<style scoped>
.present {
    color: gray;
    font-style: italic;
}

.absent {
    color: black;
    font-weight: bold;
}


</style>
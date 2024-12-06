<script setup>

import {ref, watch} from 'vue'

import { useStudentStore  } from '../stores/StudentStore'
import { storeToRefs } from 'pinia';

const studentStore = useStudentStore()


const newStudentName = ref('')
const newStarID = ref('')

const formErrors = ref([])

const { addNewStudentErrors} = storeToRefs(studentStore) //Sees if there are any errors in program

watch( addNewStudentErrors, () => {
    if (addNewStudentErrors.value && addNewStudentErrors.value.length > 0) {
        alert(addNewStudentErrors.value.join('\n'))
    }
})

function addStudent() {  //Function checks if data was entered, if it is then it adds it to student list

formErrors.value = []
//checks if newStudentName is invalid
if (newStudentName.value.length == 0) {
     formErrors.value.push('Student name must be entered')
}

if (newStarID.value.length == 0) {
    formErrors.value.push('StarID must be entered')
}
//if there are no errors, the form is valid
if ( formErrors.value.length == 0) {
    let student = {
        name: newStudentName.value,
        starID: newStarID.value,
        present: false
    }

    studentStore.addNewStudent(student) //Adds student to list

    newStudentName.value = ''
    newStarID.value = ''
}
}



</script>

<template>
    <!--Asks user for name and starID, adds it to list or displays error message-->

<div id="new-student-form-errors" class="m-2">
            <!-- TODO show errors from form validation -->
             <div v-if="formErrors.length > 0" class="alert alert-danger">
                <li v-for="error in formErrors">
                    {{error}}
                </li>
             </div>
        </div>


        <div id="new-student-form" class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group mb-3">
                <label for="name">Name</label>
                <!-- TODO v-model newStudentName -->
                <input v-model.trim="newStudentName" id="name" class="form-control">
            </div>

            <div class="form-group mb-3">
                <label for="starID">Star ID</label>
                 <!-- TODO v-model newStarID -->
                <input v-model.trim="newStarID" id="starID" class="form-control">
            </div>

            <!-- TODO v-on:click event handler -->
            <button v-on:click="addStudent" class="btn btn-primary">Add</button>
        </div>

</template>

<style scoped>
/*CSS for this component here */


</style>
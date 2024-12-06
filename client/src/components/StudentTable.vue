<script setup>

import { useStudentStore } from '../stores/StudentStore.js'  //calls StudentStore

import { storeToRefs } from 'pinia'  //creates object that stores properties

import { computed } from 'vue'

import StudentRow from './StudentRow.vue'  //calls StudentRow

const studentStore = useStudentStore()

const { sortedStudents, studentCount } = storeToRefs(studentStore)  

const deleteStudent = (student) => {  //removes student from StudentList in StudentStores
    studentStore.deleteStudent(student)
}

const arrivedOrLeft = (student, isStudentPresent) => {
    student.present = isStudentPresent
    studentStore.arrivedOrLeft(student)  //updates if student is present in StudentStores
}

const pluralStudentMessage = computed( () => {  //function is written here, since its not used in the rest of program
    if (studentCount.value === 1) {
        return 'There is 1 student in class'
    } else {
        return `There are ${ studentCount.value } students in class`
    }
})


</script>

<template>
<div id="student-list-table" class="card m-2 p-2">
            <h4 class="card-title">Student List</h4>
            <h5 class="card-subtitle text-muted">{{ pluralStudentMessage }}</h5>
            <div id="student-table">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>StarID</th>
                            <th>Present?</th>
                        </tr>
                    </thead>

                   <tbody>

                        <StudentRow 
                            v-for="student in sortedStudents" 
                            v-bind:student="student"
                            v-on:arrived-or-left="arrivedOrLeft"
                            v-on:delete-student="deleteStudent"
                        ></StudentRow> <!--Recieves emits from StudentRow-->
                      
                   </tbody>

                </table>
            </div>
        </div>

</template>

<style scoped>
#student-table {
    max-height: 400px;
    overflow: scroll;
}

th, tr {
    width: 25%;
}




</style>
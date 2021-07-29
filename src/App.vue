<template>
    <div>
        <Navbar 
            @isLogin="logout" 
            :isLogin2="isLogin"
            @formAdd="addTask"
            @formEdit="editTask"
        ></Navbar>
        <Homepage 
            v-if="!isLogin" 
            @changePage = "changePage"
        ></Homepage>
        <Board 
            v-else-if="isLogin && !formAdd && !formEdit"
            @formEdit="editTask"
            @kirimDataEdit="kirimDataEdit"
        ></Board>
        <Add
            v-else-if="isLogin && formAdd"
            @formAdd="addTask"
        ></Add>
        <Edit
            v-else-if="isLogin && formEdit"
            :dataTask="dataEdit"
            @formEdit="editTask"
        ></Edit>
        
    
            <!-- footer -->
            <div class="foter">
                <p>copyright &copy; 2021 by Nugraha Kiat Saputra</p>
            </div>
            <!-- footer -->
    </div>
</template>

<script>

import Homepage from './components/Homepage'
import Board from './components/Board.vue'
import Navbar from './components/Navbar.vue'
import Add from './components/Add.vue'
import Edit from './components/Edit.vue'

export default {
    name: "App",
    components: {Navbar, Homepage, Board, Add, Edit},
 
    data() {
        return {
            isLogin: false,
            formAdd: false,
            formEdit: false,
            dataEdit: []
        }
    },
    methods: {
        changePage(){
            this.isLogin = true
        },
        cekLogin(){
            let acces_token = localStorage.getItem("access_token")
            if (acces_token) {
                this.isLogin = true
            } else {
                this.isLogin = false
            }
        },
        logout(val){
            // console.log(val)
            // localStorage.removeItem('access_token')
            this.isLogin = val
        },
        addTask(val){
            this.formAdd = val
        },
        editTask(val){
            console.log(val);
            this.formEdit = val
        },
        kirimDataEdit(val){
            this.dataEdit = val
        }
        
        
        
    },
    created(){
        this.cekLogin()
    }
}
</script>

<style>

</style>
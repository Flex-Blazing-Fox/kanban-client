<template>
    <section>
        
        <div class="ui container board">
            <p class="tips">* Tips : Tekan <code><strong>Ctrl + Enter</strong></code> untuk menyimpan perubahan.</p>
            <div class="ui grid">
                <Board 
                    v-for="board in boards" 
                    :key="board.id" 
                    :board="board" 
                    :taskList="filteredTask"
                    @addButton="add"
                    @deleteTask="deleteTask"
                    @changeCategory="changeCategory"
                    @updateTask="updateTask"
                    ></Board>
            </div>
        </div>
        
    </section>
</template>

<script>
import Board from "../components/Board.vue";

export default {
    name:"Dashboard",
    props: ['tasks'],
    components:{ Board },
    data() {
        return {
            boards:[
                { id: 1, name: "backlog"},
                { id: 2, name: "todos"},
                { id: 3, name: "doing"},
                { id: 4, name: "done"},
            ],
        }
    },
    computed:{
        filteredTask(){
            let obj = {}
             
            this.tasks.forEach(e => {
                if(obj[e.category] === undefined) obj[e.category] = []
                obj[e.category].push(e);
            });
                
            return obj;
        }
    },
    methods:{
        add(category){
            this.$emit('addButton', category)
        },
        changeCategory(id, category){
            this.$emit('changeCategory', id, category)
        },
        deleteTask(id){
            this.$emit('deleteTask',id)
        },
        updateTask(id,title){
            this.$emit('updateTask', id,title)
        },
    }
}
</script>

<style scoped>
section{
    height: 100vh;
    display:flex;
    
    justify-content:space-evenly;
}
.board{
    padding-top:80px;
}
.tips{
    color:#fff;
    font-size:11px;
    font-family: 'Montserrat', sans-serif;
}
</style>
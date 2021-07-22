<template>
    <section>
        <div class="ui container board">
            <div class="ui grid">
                <Board v-for="board in boards" :key="board.id" :board="board" :taskList="filteredTask"></Board>
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
                    console.log(obj[e.category]);
                    if(obj[e.category] === undefined) obj[e.category] = []
                    obj[e.category].push(e);
                });
                
            
            // console.log(obj);
            return obj;
        }
    },
}
</script>

<style>
.board{
    padding-top:80px;
}
</style>
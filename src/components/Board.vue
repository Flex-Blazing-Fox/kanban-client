<template>    
    <div class="ui four wide column">
        <div class="ui card board-category">
            <div class="content">
                <div class="board-header">{{ board.name.toUpperCase() }}</div>
            </div>
            <div class="content box">
                <draggable :list="taskList[board.name]" ghost-class="gost-card" v-bind="dragOptions" v-model="taskList[board.name]" @change="log" group="all-tasks">
                    <!-- {{taskList[board.name]}} -->
                    <Card 
                        v-for="task in taskList[board.name]" 
                        :key="task.id" 
                        :taskData="task" 
                        @deleteTask="deleteTask" 
                        @changeCategory="changeCategory" 
                        @updateTask="updateTask"
                        :name="'flip-list'">
                    </Card>
                </draggable>
            </div>
            <AddNewTask @addButton="add" :category="board.name"></AddNewTask>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import Card from "../components/Card.vue";
import AddNewTask from "../components/AddNewTask.vue";

export default {
    name:"Board",
    props: ['board', 'taskList'],
    components:{ Card, draggable, AddNewTask },
    data(){
        return{
            editable: true,
            isDragging: false,
            delayedDragging: false,           
        }
    },
    computed:{
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                disabled: !this.editable,
                ghostClass: "ghost"
            };
        },
    },
    watch: {
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
            });
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
            this.$emit('updateTask', id, title)
        },
        onMove({ relatedContext, draggedContext }) {
            // console.log(relatedContext.element);
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        },
        log(event) {
            // console.log(event);
           if(event.removed){
               console.log(event.removed.element.id)
           }

           if(event.moved){
               console.log(event.moved.element.id)
           }

           if(event.added){
               console.log(event.added.element.id)
           }
        },
    },
    created(){
        
    }
}
</script>

<style scoped>
section{
    height: 100vh;
    display:flex;
    
    justify-content:space-evenly;
}

.flip-list-move {
  transition: transform 0.5s;
}
.board-header{
    color:rgb(255, 255, 255);
    font-size:12pt;
    font-weight: bold;
    text-shadow: 1px 1px #000000;
    letter-spacing: 1px;
    font-family: 'Montserrat', sans-serif;
}
.ui.card.board-category{
    color:teal;
    background: rgba(244, 244, 244, 0.2);
    
}
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
.move {cursor: move;}
.box{
    overflow-y: scroll;
    height: 75vh;
}
::-webkit-scrollbar {
  width: 1px;
}
</style>
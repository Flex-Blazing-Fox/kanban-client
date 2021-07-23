<template>
    <div class="ui cards">
        <div class="ui card card-item">
            <div class="content move">
                <div>
                    <sui-dropdown  text="Options" class="yuhu" pointing>
                        <sui-dropdown-menu >
                            <sui-dropdown-item @click="changeCategory(taskData.id, 'backlog')">BackLog</sui-dropdown-item>
                            <sui-dropdown-item @click="changeCategory(taskData.id, 'todos')">Todos</sui-dropdown-item>
                            <sui-dropdown-item @click="changeCategory(taskData.id, 'doing')">Doing</sui-dropdown-item>
                            <sui-dropdown-item @click="changeCategory(taskData.id, 'done')">Done</sui-dropdown-item>
                        </sui-dropdown-menu>
                    </sui-dropdown>
                    <a href="#" @click="deleteTask(taskData.id)"><i class="right floated close icon close"></i></a>
                </div>
            </div>
            <div class="content description">
                    <textarea
                        placeholder="Type something here..."
                        v-model="taskData.title"
                        class="textarea"
                        @input="resize"
                        v-on:keyup.enter="updateTask(taskData.id, taskData.title)"
                    ></textarea>
            </div>
            <div class="extra content">
                <div class="left floated author">
                    <img :src="imgURL" class="ui avatar"> <span>{{taskData.User.fullname}}</span>
                </div>
            </div>
        </div>          
    </div>
</template>

<script>

export default {
    name:"Card",
    props: ['taskData'],
    data(){
        return {
            imgURL:''
        }
    },
    methods:{
        deleteTask(id){
            this.$emit('deleteTask',id)
        },
        changeCategory(id, category){
            this.$emit('changeCategory', id, category)
        },
        updateTask(id, title){
            this.$emit('updateTask', id, title)
        },
        resize(event) {
            event.target.style.height = "auto";
            event.target.style.height = `${event.target.scrollHeight}px`;
        }
    },
 
    mounted() {
        this.imgURL = `https://ui-avatars.com/api/?name=${this.taskData.User.fullname}&size=32`
        this.$nextTick(() => {
            this.$el.setAttribute("style", "height", `${this.$el.scrollHeight}px`);
        });
    },
    render() {
        return this.$scopedSlots.default({
            resize: this.resize
        });
    }
}
</script>

<style scoped>
    .description{
        color:#fff;
        background:salmon;
    }
    .description p {
        font-size:11px;
        letter-spacing: 0.5px;
        font-weight: 500;
        font-family: 'Montserrat', sans-serif;
    }
    .description textarea{
        display: block;
        box-sizing: padding-box;
        overflow: hidden;
        width:100%;
        min-height: 35px;
        max-height: 350px;
        background: rgba(0, 102, 90, 0.9);
        border:1px solid rgba(1, 122, 108, 0.9);
        color:#fff;
        margin:-7px -10px -7px -7px;
        padding:5px;
        font-size:11px;
        letter-spacing: 0.5px;
        line-height:15px;
        font-weight: 500;
        font-family: 'Montserrat', sans-serif;
        
    }
    .author{
        color:#fff;
        font-weight: bold;
        font-family: 'Montserrat', sans-serif;
    }
    .author span{
        font-size:11px;
    }
    .ui.card.card-item{
        color:rgb(255, 255, 255);
        background: rgba(0, 102, 90, 0.9);
        box-shadow: 1px 2px 5px #000;
    }
    .move {cursor: move;}
    .yuhu{
        font-size:9px;
        font-family: 'Montserrat', sans-serif;
    }
    .nex{
        font-size:9px;
        font-family: 'Montserrat', sans-serif;
    }
    .close{
        color:rgb(213, 191, 191);
        cursor: pointer;
    }
</style>
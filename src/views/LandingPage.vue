<template>
    <div class="ui container content">
        <p>
            “Time is an equal opportunity employer. Each human being has exactly the same number of hours and minutes every day. 
            Rich people can't buy more hours. Scientists can't invent new minutes. And you can't save time to spend it on another day. 
            Even so, time is amazingly fair and forgiving. No matter how much time you've wasted in the past, you still have an entire tomorrow.”
        </p>
        <h3 class="name">-- Denis Waitley --</h3>
        <center class="getting-started-button">
            <div @click="changeView()" class="ui huge primary button">Get Started <i class="right arrow icon"></i></div>
        </center>
    </div>
</template>

<script>
export default {
    name:"LandingPage",
    methods:{
        changeView(){
            this.$emit('changePages', 'login')
        }
    }
}
</script>

<style scoped>
    p{
        font-family: 'Montserrat', sans-serif;
        font-size:16px;
        color:#fff;
        letter-spacing: 2p;
        text-align: center;
    }

    .content{
        padding-top:250px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .name{
        font-family: 'Dancing Script', cursive;
        font-weight: bold;
        color:#fff;
        font-size:28px;
        text-align:center
    }

    .getting-started-button{
        margin-top:50px;
    }
</style>
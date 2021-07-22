<template>
    <div class="ui cards">
        <div class="ui card card-item">
            <div class="content">
                <div>
                    <i class="left floated edit icon"></i>
                    <i class="right floated close icon"></i>
                </div>
            </div>
            <div class="content description">                
                <p>
                    {{taskData.title}}
                </p>
            </div>
            <div class="extra content">
                <div class="left floated author">
                    <img class="ui avatar image" src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"> <span>Arip Budiman</span>
                </div>
            </div>
        </div>          
    </div>
</template>

<script>
export default {
    name:"Card",
    props: ['taskData'],
}
</script>

<style scoped>
    .description{
        color:#fff;
    }
    .description p {
        font-size:11px;
        letter-spacing: 0.5px;
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
</style>
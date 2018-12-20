<template>
        <b-card-group deck class="flexbox01">
            <b-card
                    header="Username"
                    header-tag="header"
                    class="post">
                <button type="button" class="close">
                     <i class="far fa-times-circle"></i>  
                </button>
                <div class="flexbox02">
                    <div class="accountImg"></div>
                    <p class="card-text">ここに投稿内容を表示</p>
                </div>
                <i class="far fa-kiss-wink-heart heartIcon"></i>
                <i class="fas fa-pencil-alt"></i>
            </b-card>
            <b-card
                    header="Username"
                    header-tag="header"
                    class="post">
                <button type="button" class="close">
                     <i class="far fa-times-circle"></i>  
                </button>
                <div class="flexbox02">
                    <div class="accountImg"></div>
                    <p class="card-text">ここに投稿内容を表示</p>
                </div>
                <i class="far fa-kiss-wink-heart heartIcon"></i>
                <i class="fas fa-pencil-alt"></i>
            </b-card>
            <b-card
                    header="Username"
                    header-tag="header"
                    class="post">
                <button type="button" class="close">
                     <i class="far fa-times-circle"></i>  
                </button>
                <div class="flexbox02">
                    <div class="accountImg"></div>
                    <p class="card-text">ここに投稿内容を表示</p>
                </div>
                <i class="far fa-kiss-wink-heart heartIcon"></i>
                <i class="fas fa-pencil-alt"></i>
            </b-card>
         </b-card-group>

</template>

<script>



</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card {
        margin: 10px 50px;
    }

    .flexbox01 {
        display: flex;
        flex-direction: column;
    }

     .flexbox02 {
        display: flex;
        flex-direction: row;
    }


    header {
        text-align: left;
    }

    p {
        margin-left: 20px;
    }

    .accountImg {
        background-color: black;
        width: 100px;
        height: 100px;
        border-radius: 5%;
    }

    b-button {
        text-align: right;
    }

    .close {
        position: absolute;
        top: 0;
        right: 0;
        padding: 10px;
        font-size: 30px;
        color: black;
    }

    /* アイコン */

    .heartIcon {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 10px;
        font-size: 30px;
        color: #ff50ac;
        cursor: pointer;
    }

    .fa-pencil-alt {
        position: absolute;
        bottom: 0;
        right: 45px;
        padding: 10px;
        font-size: 30px;
        color: #ff50ac;
        cursor: pointer;
    }

/* responsive(sp) */
@media (max-width: 765px) {
    .card {
        margin: 5px;
    }
}


</style>

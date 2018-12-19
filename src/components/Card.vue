<template>
     <div class="card">
        <b-card-group deck class="flexbox">
            <b-card
                    header="Username"
                    header-tag="header"
                    footer="Post time"
                    footer-tag="footer"
                    class="post">
                <p class="card-text">ここに投稿内容を表示</p>

                <i class="far fa-times-circle"></i>                      
                <i class="far fa-kiss-wink-heart heartIcon"></i>
                <i class="fas fa-pencil-alt"></i>

            </b-card>
             <b-card
                    header="Username"
                    header-tag="header"
                    footer="Post time"
                    footer-tag="footer">
                <p class="card-text">投稿内容を表示</p>
                <b-button href="#"
                        variant="primary">Go somewhere</b-button>
            </b-card>
             <b-card
                    header="Username"
                    header-tag="header"
                    footer="Post time"
                    footer-tag="footer">
                <p class="card-text">投稿内容を表示</p>
                <b-button href="#"
                        variant="primary">Go somewhere</b-button>
            </b-card>


         </b-card-group>
    </div>
    
    
    <!-- <b-card-group>
    <b-card  
        header="Username"
        bg-variant="default" 
        text-variant="black" 
        title="Card Title">
        <p class="card-text">
            With supporting text below as a natural lead-in to additional content.
        </p>
        <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
    </b-card-group> -->



</template>


<script>


    // Vue.component('b-modal', bModal);
    // Vue.directive('b-modal', bModalDirective);

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card {
        padding: 20px;
    }

    .flexbox {
        display: flex;
        flex-direction: column;
    }

    p, header {
        text-align: left;
    }

    footer, b-button {
        text-align: right;
    }

    /* アイコン */
    .far, .fas {
        font-size: 30px;
        color: tomato;
    }

    i {
        float: right;
        margin: 0 5px;
    }


</style>

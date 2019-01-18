<template>
    <b-card-group deck class="flexbox01">
        <div v-for="(post, key) in allPosts" class="card">
            <div class="card-header">{{ post.userEmail }}
                <button type="button" class="close" v-on:click="deletePost(key)">
                    <i class="far fa-times-circle"></i>  
                </button>
            </div>
                <div class="flexbox02" 
                     v-on:mouseover="activeItem=key"
                     v-on:mouseout="activeItem=''" 
                     v-on:click="selectItem(key)"
                     v-bind:class="{selected:activeItem===key}"

                     >
                    <div class="icon">
                        <img v-bind:src="post.imageUrl" alt="">
                    </div>
                    <p class="card-text">{{ post.body }}</p>

                    <!-- <div v-if="this.selectedItem">
                        編集
                    </div> -->
                    <!-- <p class="card-text">編集</p>
                    <i class="fas fa-pencil-alt"></i>        -->


                </div>
                <i class="far fa-kiss-wink-heart heartIcon"></i>
                <!-- <i class="fas fa-pencil-alt"></i>             -->
        </div>
    </b-card-group>
</template>
<script>
import firebase from 'firebase'

export default {
  name: 'Card',
  data () {
    return {
      database: null,
      postsRef: null,
      newPostBody: '',
      signedIn: false,
      postMsg: false,
      user: {},
      posts: [],
      activeItem: '',
      selectedItem: ''

    }
  },
  created: function() {
    // // ログイン状態によって投稿ボタンの表示を変更する
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      if (user) {
        this.signedIn = true
        // debug
        console.log(this.user)
      } else {
        this.signedIn = false
      }
    })

    // 投稿一覧を取得する
    this.database = firebase.database()
    this.postsRef = this.database.ref('posts')
    var _this = this
    this.postsRef.on('value', function(snapshot) {
      _this.posts = snapshot.val() // データに変化が起きたときに再取得する
    });
  },
  computed: {
    allPosts: function () {
      return this.posts
    }
  },
  methods: {
    createPost: function() {
      if (this.newPostBody == "") { return; }
      let imageUrl = "https://via.placeholder.com/100x100/000000/FFFFFF?text=" + this.user.email.slice(0,1)
      this.postsRef.push({
        body: this.newPostBody,
        imageUrl: imageUrl,
        userUid: this.user.uid,
        userEmail: this.user.email,
      })
      this.newPostBody = "";
      // Post成功時にメッセージを表示する
      this.postMsg = true;
    },
    // updatePost: function (todo, key) {
    //   todo.isComplete = !todo.isComplete
    //   var updates = {};
    //   updates['/todos/' + key] = todo;
    //   this.database.ref().update(updates);
    // },
    deletePost: function (key) {
      this.database.ref('posts').child(key).remove();
    },
    // 編集モーダルを出して編集
    selectItem: function (key) {
        alert("編集中！");
    },
    // bgChange: function (activeItem, key) {
    //     activeItem = key;
    //     alert("bgchange！");
    //     this.addClass(activeItem, key);

    // }


  },
}




</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* マウスオーバー時にCardの背景色を変更 */
    .selected {
        background-color: #ff50ac;
        opacity: 0.5;
    }

    .flexbox01 {
        display: flex;
        flex-direction: column-reverse;
    }

     .flexbox02 {
        display: flex;
        flex-direction: row;
    }

    header {
        text-align: left;
    }

    p {
        margin: 20px;
    }

    .card-text {
        text-align: left;
    }

    .icon img {
        width: 100px;
        height: 100px;
        margin: 20px;
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

/* responsive（カードサイズ） */
/* カードサイズを画面サイズに応じて変更 */
/* 画面が1020px以上の時 */
@media (min-width: 1050px) {
    .card {
        width: 1000px;
        margin: 10px 0;
    }

    .flexbox01 {
        /* カードを左右中央揃え */
        align-items: center;
    }    
}
/* 画面が1019px以下のとき */
@media (max-width: 1049px) {
    .card {
        margin: 10px 50px;
    }
}

</style>

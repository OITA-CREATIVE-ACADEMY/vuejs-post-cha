<template>
    <b-card-group deck class="flexbox01">
        <div v-for="(post, key) in allPosts" class="card">
            <div class="card-header">{{ post.userEmail }}
                <button type="button" class="close" v-on:click="deletePost(key)">
                    <i class="far fa-times-circle"></i>  
                </button>
            </div>
                <div class="flexbox02">
                    <div class="icon">
                        <img v-bind:src="post.imageUrl" alt="">
                    </div>
                    <p class="card-text">{{ post.body }}</p>
                </div>
                <i class="far fa-kiss-wink-heart heartIcon"></i>
                <i class="fas fa-pencil-alt"></i>            
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
      posts: []
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
  },
}




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
        margin: 10px 20px;
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

/* responsive(sp) */
@media (max-width: 765px) {
    .card {
        margin: 5px;
    }
}


</style>
<template>
  <div class="home">
    <div class="wrapper">
      <!-- 新規投稿用カード -->
      <div class="jumbotron">
        <h2 class="display-5">POST-cha!へようこそ！！！！</h2>
        <p class="lead">まずはあなたの言葉で、気楽にPOSTしてみてください。そこから新たな出会いが生まれるかもしれません。</p>
        <hr class="my-4">
        <div v-if="signedIn">
          <p class="attention">入力文字200文字以内</p>
          <div class="input-group mb-3">
            <textarea v-model="newPostBody" name="postdata"></textarea><br>
              <div class="input-group-append">
              </div>
            </div>
          <p class="lead">
            <button type="submit" v-on:click="createPost()" class="btn btn-primary btn-lg">投稿する</button>
          </p>
          <p v-if="postMsg" class="text-success">投稿しました!</p>
        </div>
        <div v-if="!signedIn">
          <p class="lead">
            <router-link to="/signin" class="btn btn-success btn-lg">始める!</router-link>
          </p>
        </div>
      </div>

      <!-- /新規投稿用カード -->
      <!-- 投稿一覧 -->
      <div v-for="(post, key) in allPosts" class="card">
          <h5 class="card-header">{{ post.userEmail }}</h5>
          <div class="card-body">
            <div class="icon">
              <img v-bind:src="post.imageUrl" alt="">
            </div>
            <p class="card-text">{{ post.body }}</p>
            <i class="far fa-kiss-wink-heart heartIcon"></i>
            <div class="btnWrapper">
              <a href="#" class="btn btn-primary">EDIT</a>
              <a href="#" class="btn btn-primary">DELETE</a>
            </div>
          </div>
       </div>
      <!-- /投稿一覧 -->
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Home',
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
    // ログイン状態によって投稿ボタンの表示を変更する
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
    // deletePost: function (key) {
    //   this.database.ref('posts').child(key).remove();
    // },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
    width: 100%;
    height: 50px;
    background-color: black;
}

p{
    margin-bottom: 0;
}

p.title {
    color: white;
    font-size: 15px;

}

.wrapper {
    padding: 20px;
}

.btnWrapper {
    text-align: right;
}

.icon {
    width: 100px;
    height: 100px;
    background-color: aqua;
    float: left;
}

.card {
    margin: 20px;
}

.heartIcon {
    color: tomato;
    font-size: 30px;
}

.attention{
    padding-bottom: 1px;
}

textarea {
    resize: none;
    width:100%;
    height:100px;
}
</style>

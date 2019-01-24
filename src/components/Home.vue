<template>
  <div class="home">
    <div class="wrapper">
      <!-- 新規投稿用カード -->
      <div class="jumbotron">
        <h2 class="display-5">〈POST-cha!〉へようこそ！！</h2>
        <p class="lead-2">まずはあなたの言葉で、気楽にPOSTしてみてください。</p>
        <p class="lead-2">そこから新たな出会いが生まれるかもしれません。</p>
        <hr class="my-4">
        <div v-if="signedIn">
          <div class="input-group mb-3">
            <textarea v-model="newPostBody" name="postdata" placeholder="200字まで入力できます"></textarea><br>
              <div class="input-group-append">
              </div>
            </div>
          <p class="lead">
            <button type="submit" v-on:click="createPost()" class="btn btn-primary btn-lg">投稿する</button>
          </p>
          <p v-if="postMsg" class="text-success">投稿しました!</p>
        </div>
        <div v-if="!signedIn">
        <!-- <button type="button" id="startButton" class="btn btn-primary btn-lg">始める!</button> -->
        <b-btn v-b-modal.modalPrevent>始める</b-btn>
        </div>
      </div>
      <card-lists></card-lists>
    <b-modal id="modalPrevent"
        ref="modal"
        title="Submit your name"
        @ok="handleOk"
        @shown="clearName">
    <form @submit.stop.prevent="handleSubmit">
    <b-form-input type="text"
                  placeholder="Enter your name"
                  v-model="name"></b-form-input>
    </form>
    </b-modal>

    </div>

      <!-- /新規投稿用カード -->
      <!-- 投稿一覧 -->
      <!-- <div v-for="(post, key) in allPosts" class="card">
          <h5 class="card-header">{{ post.userEmail }}</h5>
          <div class="card-body">
            <div class="icon">
              <img v-bind:src="post.imageUrl" alt="">
            </div>
            <p class="card-text">{{ post.body }}</p>
            <i class="far fa-kiss-wink-heart heartIcon"></i>
            <div class="btnWrapper">
              <a href="#" class="btn btn-primary">EDIT</a>
              <button type="submit" v-on:click="deletePost(key)" class="btn btn-danger">削除</button>
            </div>
          </div>
       </div> -->

      <!-- Cardコンポーネントを読み込んでループ表示 -->


      <!-- /投稿一覧 -->


  <!-- signin modal -->
  </div>
</template>

<script>
import firebase from 'firebase';
import Card from '@/components/Card';

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
      posts: [],
      name: '',
      names: []
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
        createdAt: Math.round(+new Date()/1000),
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

    // モーダル
    clearName () {
    this.name = ''
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (!this.name) {
        alert('Please enter your name')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      this.names.push(this.name)
      this.clearName()
      this.$refs.modal.hide()
    }
  },
  components: {
    'card-lists': Card
  }
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

.display-5 {
  text-align-last: center;
  /* font-size: 1rem; */
  margin-bottom: 20px;
}

.lead-2 {
  text-align-last: center;
  font-size: 1rem;
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

textarea {
    resize: none;
    width:100%;
    height:100px;
    padding: 10px;
}

/* タイトルとサブタイトルのサイズを少し修正 */
@media (max-width: 540px) {
.lead-2 {
  text-align-last: left;
} 
.display-5 {
  width: 100%;
  text-align-last: center;
  font-size: 1.7rem;
}
}
</style>

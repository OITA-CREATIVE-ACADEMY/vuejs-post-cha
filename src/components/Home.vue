<template>
  <div class="home">
    <div class="wrappers">
      <!-- 新規投稿用カード -->
      <new-post></new-post>
      <!-- <div class="jumbotron">
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
          <b-btn v-b-modal.signin-modalPrevent>始める</b-btn>
        </div>
      </div> -->
      <!-- <card-lists></card-lists> -->
      <!-- signin modal -->
      <!-- <b-modal hide-footer id="modalPrevent"
          ref="modal"
          title="ログイン">
        <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="text" placeholder="メールアドレス" v-model="email"></b-form-input><br>
        <b-form-input type="password" placeholder="パスワード" v-model="password"></b-form-input><br>
        </form>
        <p><button @click="signIn" type="button" class="btn btn-primary">ログイン</button></p>
        <p>アカウントをお持ちでない方はこちら 
          <router-link to="/signup">新規登録!!</router-link>
        </p>
      </b-modal> -->
      
      <!-- /新規投稿用カード -->

      <!-- 投稿一覧 -->
      <!-- Cardコンポーネントを読み込んでループ表示 -->
      <cardList :posts="posts"></cardList>


      <!-- /投稿一覧 -->

    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import Post from '@/components/Post';
import Card from '@/components/Card';

export default {
  name: 'Home',
  components: {
    'cardList': Card,
    'new-post': Post
  },
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
      names: [],
      email: '',
      password: ''
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
        console.log(this.user.uid)
        // localstorageにuserUidを保存
        localStorage.setItem('currentUserUid', this.user.uid);
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

    // signin modal 
    // clearName () {
    // this.name = ''
    // },
    // signIn: function () {
    //   firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
    //     res => {
    //       console.log(res)
    //       alert('ログインしました!')
    //       this.$router.push('/')
    //       this.hideModal();
    //     },
    //     err => {
    //       alert(err.message)
    //     }
    //   )
    // },
    // hideModal() {
    //   this.$refs.modal.hide();
    // }
    // signIn (evt) {
    //   // Prevent modal from closing
    //   evt.preventDefault()
    //   if (!this.name) {
    //     alert('Please enter your name')
    //   } else {
    //     this.handleSubmit()
    //   }
    // },
    // handleSubmit () {
    //   this.names.push(this.name)
    //   this.clearName()
    //   this.$refs.modal.hide()
    // }
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

textarea {
    resize: none;
    width:100%;
    height:100px;
    padding: 10px;
}

/* .card {
    margin: 20px;
} */
</style>

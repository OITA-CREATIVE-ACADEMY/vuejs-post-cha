<template>
  <div class="home">
    <div class="wrappers">
      <!-- 新規投稿用カード -->
      <new-post></new-post>
      <div class="card-list" id="top">
        <cardList :posts="posts"></cardList>
      </div>
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
        // localstorageにuserUidを保存
        localStorage.setItem('currentUserUid', this.user.uid);
      } else {
        this.signedIn = false
      }
    })

    // 投稿一覧を取得する
    this.database = firebase.database()
    this.postsRef = this.database.ref('posts')
    // this.usersRef = this.database.ref('users')
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
        imageUrl: this.imageUrl,
        userUid: this.user.uid,
        userEmail: this.user.email,
        createdAt: Math.round(+new Date()/1000),
      })
      this.newPostBody = "";
      // Post成功時にメッセージを表示する
      this.postMsg = true;
    },
    deletePost: function (key) {
      this.database.ref('posts').child(key).remove();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  margin-top: 100px;
}

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

.card-list {
  padding: 100px 20px 20px;
  margin-top: -80px;
}

</style>

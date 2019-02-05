<template>
  <div class="post">
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
        <!-- 画像追加 -->
        <div>
          <input
          id="files"
          type="file"
          name="file"
          accept="image/*"
          @change="detectFiles($event)" />
          <br>
          <b-progress
          v-if="uploading && !uploadEnd"
          :value="progressUpload"
          show-value
          variant="info">
          </b-progress>
          <br>
          <img
          v-if="uploadEnd"
          :src="downloadURL"
          width="45%"/>
          <div v-if="uploadEnd">
            <button class="m-3" @click="deleteImage()">
              Delete
            </button>
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
  </div>
</div>
</template>
<script>
import firebase from 'firebase';
export default {
  name: 'Post',
  data () {
    return {
      database: null,
      postsRef: null,
      newPostBody: '',
      signedIn: false,
      postMsg: false,
      user: {},
      posts: [],
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: ''
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
        likedCount: 0,
        downloadURL: this.downloadURL
      })
      this.newPostBody = "";
      // Post成功時にメッセージを表示する
      this.postMsg = true;
    },
    detectFiles (e) {
      let fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x])
      })
    },
    upload (file) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = firebase.storage().ref('images/' + file.name).put(file)
    },
    deleteImage () {
        firebase.storage()
        .ref('images/' + this.fileName)
        .delete()
        .then(() => {
          this.uploading = false
          this.uploadEnd = false
          this.downloadURL = ''
        })
        .catch((error) => {
          console.error(`file delete error occured: ${error}`)
        })
    }
  },
  watch: {
    uploadTask: function () {
      this.uploadTask.on('state_changed', sp => {
        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      },
      null,
      () => {
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.uploadEnd = true
          this.downloadURL = downloadURL
          this.$emit('downloadURL', downloadURL)
        })
      })
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.progress-bar {
  margin: 10px 0;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
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

/* タイトルとサブタイトルのサイズを修正 */
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

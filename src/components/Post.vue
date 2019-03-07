<template>
  <div class="post">
    <div class="wrapper text-center">
     <!-- 新規投稿用カード -->
      <div class="jumbotron">
        <h2 class="display-5">POST-cha！へ<br class="d-md-none">ようこそ！！</h2>
        <p class="lead-2">まずはあなたの言葉で、<br class="sp_newPost">気楽にPOSTしてみてください。</p>
        <br class="sp_newPost">
        <p class="lead-2">そこから新たな出会いが<br class="sp_newPost">生まれるかもしれません。</p>
        <hr class="my-4">
        <div v-if="signedIn">

        <div class="input-group mb-3 inputPost">
          <textarea v-model="newPostBody" name="postdata" placeholder="200字まで入力できます" v-bind:class="{ 'text-danger': error.tooLong, 'text-muted': error.require }"></textarea><br>
          <div class="input-group-append" v-bind:class="{ 'text-danger': error.tooLong }">
          </div>
          <div id="lengthCounter" class="text-primary h3" v-bind:class="{ 'text-danger': error.tooLong }">{{this.newPostBody.length}}/200</div>
        </div>

        　　
        <!-- 画像追加 -->
        <div>
          <b-button size="sm" variant="light" class="mb-3" @click="trigger()">画像を添付</b-button>
          <input
            class="d-none"
            id="files"
            type="file"
            ref="fileInput"
            name="file"
            accept="image/*"
            @change="detectFiles($event)" />
            <br>
            <b-progress　class="progress-bar"
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
              <b-button size="sm" variant="light" class="m-3" @click="deleteImage()">
                画像を削除
              </b-button>
            </div>
        </div>



        <p class="lead">
          <button type="submit" v-on:click="createPost()" class="btn btn-primary btn-lg" :disabled="validated == 1">投稿する</button>
        </p>
        <p v-if="postMsg" class="text-success">投稿しました!</p>
      </div>
      <div v-if="!signedIn">
        <b-btn v-b-modal.signin-modalPrevent>始める</b-btn>
      </div>
      <!-- <div v-if="!signedIn">
          <p class="lead">
            <router-link to="/signin" class="btn btn-success btn-lg">始める!</router-link>
          </p>
        </div> -->
    </div>
  </div>
</div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/app'

export default {
  name: 'Post',
  data() {
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
      downloadURL: '',
      error: {
        empty: false,
        require: false,
        tooLong: false
      }
    }
  },
  created: function() {
    // ログイン状態によって投稿ボタンの表示を変更する
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      if (user) {
        this.signedIn = true
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
    allPosts: function() {
      return this.posts
    },
    postLengthCount: function() {
      return 200 - this.newPostBody.length;
    },
    validated: function() {
      // (2 <= this.newPostBody.length) && (this.newPostBody.length <= 200)
      var length = this.newPostBody.length
      if (2 <= length && length <= 200) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    createPost: function() {
      if (this.newPostBody == "") {
        return;
      }
      if (this.user.photoURL == null) {
        var imageUrl = "https://via.placeholder.com/100x100/ff50ac/FFFFFF?text=" + this.user.email.slice(0, 1);
      } else {
        imageUrl = this.user.photoURL;
      }
      this.postsRef.push({
        body: this.newPostBody,
        imageUrl: imageUrl,
        displayName: this.user.displayName,
        userUid: this.user.uid,
        userEmail: this.user.email,
        createdAt: Math.round(+new Date() / 1000),
        likedCount: 0,
        downloadURL: this.downloadURL
      })
      this.newPostBody = ''
      this.uploading = false
      this.uploadEnd = false
      this.downloadURL = ''

      // Post成功時にメッセージを表示する
      this.postMsg = true;
    },
    detectFiles(e) {
      let fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x])
      })
    },
    trigger () {
      this.$refs.fileInput.click()
    },
    upload (file) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = firebase.storage().ref('images/' + file.name).put(file)
    },
    deleteImage() {
      firebase.storage()
        .ref('images/' + this.fileName)
        .delete()
        .then(() => {
          this.uploading = false
          this.uploadEnd = false
          this.downloadURL = ''
          document.getElementById("files").value = "";
        })
        .catch((error) => {
          console.error(`file delete error occured: ${error}`)
        })
    }
  },
  watch: {
    uploadTask: function() {
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
    },
    newPostBody: function(newVal, oldVal) {
      // this.postLength_200 = (2 < newVal.length > 199) ? true : false; // 最低文字数(2文字以上)
      // this.error.empty = (newVal.length == 0) ? true : false; // 最低文字数(2文字以上)
      this.error.require = (newVal.length < 2) ? true : false; // 最低文字数(2文字以上)
      this.error.tooLong = (newVal.length > 200) ? true : false; // 最大文字数(200文字まで)

      if (!this.error.tooLong && !this.error.require) {
        this.postJudge = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 500px;
  height: 500px;
}

.progress-bar {
  margin: 10px 10px;

}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

header {
  width: 100%;
  height: 50px;
  background-color: black;
}

p {
  margin-bottom: 0;
}

p.title {
  color: white;
  font-size: 15px;
}

.display-5 {
  text-align-last: center;
  margin-bottom: 22px;
  font-size: 34px;
}

.lead-2 {
  text-align-last: center;
  font-size: 18px;
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
  width: 100%;
  height: 100px;
  padding: 10px;
}

.inputPost {
  position: relative;
  width: 80vw;
  max-width: 80vw;
  margin-left: auto;
  margin-right: auto;
}

#lengthCounter {
  position: absolute;
  right: 0.5em;
  bottom: 0;
  font-weight: bold;
  pointer-events: none;
  z-index: 2;
  opacity: 0.35;
}

.sp_newPost {
  display: none;
}


@media (max-width: 767px) {
  .inputPost {
    width: 100%;
    max-width: 100%;
  }
}

/* タイトルとサブタイトルのサイズを修正 */
@media (max-width: 540px) {
  .lead-2 {
    text-align-last: center;
    font-size: 13px;
  }

  .display-5 {
    width: 100%;
    text-align-last: center;
    font-size: 24px;
  }

  img {
    margin-top:0px;
    width: 200px;
    height: 200px;
  }
  .sp_newPost {
    display: block;
  }
}
</style>

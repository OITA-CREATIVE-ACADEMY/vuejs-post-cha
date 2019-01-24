<template>
  <div class="post">
    <h1>{{ msg }}</h1>
    <div class="wrapper">
      <!-- 新規投稿用カード -->
      <div class="jumbotron">
        <h2 class="display-5">POST-cha!へようこそ！！！！</h2>
        <p class="lead">まずはあなたの言葉で、気楽にPOSTしてみてください。<br>そこから新たな出会いが生まれるかもしれません。</p>
        <hr class="my-4">
        <p class="attention">入力文字200文字以内</p>
      　<div class="input-group mb-3">
        <textarea name="postdata"></textarea><br>
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



        <!-- 投稿ボタン -->
      　<p class="lead">
        　<a class="btn btn-primary btn-lg" href="#" role="button">POST</a>
        </p>
      </div>
    </div>
　</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Post',
  data () {
    return {
      msg: 'POST-cha!',
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: ''
    }
  },


  methods: {
    selectFile () {
      this.$refs.uploadInput.click()
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

/* .progress-bar {
  margin: 10px,10px;
} */


</style>

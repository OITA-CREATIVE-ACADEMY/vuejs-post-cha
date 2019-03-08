<template>
  <div>
    <b-card-group deck class="d-flex flex-column-reverse w-100">
      <div v-for="(post, key) in posts" v-bind:key="post.id" class="card my-2">
        <div class="card-header">
          <div>
            <b-img v-bind:src="post.imageUrl" rounded="circle" width="30" alt="プロフィール画像" />
            {{ post.displayName || post.userEmail }}
          </div>
          <div v-if="signedIn && !notLike" class="cp_tooltip cp_tooltip_01">
            <b-dropdown id="ddown-sm ddown-left" right size="sm" class="setting" v-if="myPosts(post)"
               variant="primary">
              <b-dropdown-item-button v-b-modal.modalPrevent @click="showModal(key, post)">編集</b-dropdown-item-button>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item-button v-on:click="deletePost(key)">削除</b-dropdown-item-button>
            </b-dropdown>
            <span class="cp_tooltiptext cp_tooltiptext_01">POSTを編集/削除</span>
          </div>
        </div>
        <div class="d-flex flex-row justify-content-between postDetail">
          <div class="postDetail_inner ">
            <div class="bodyText">
              <p class="card-text">{{ post.body }}</p>
            </div>
            <div class="DLurl"
                  v-if="postImg(post)"
                  @click="zoomImg(key, post)"
                  variant="primary">
              <img v-bind:src="post.downloadURL">
            </div>
          </div>
          <div class="likeBtn d-flex flex-column cp_tooltip cp_tooltip_02">
            <button
              type="submit"
              v-on:click="likePost(key, post)"
              class="btn btn-outline-primary btn-lg"
              variant="primary"
              v-if="!like"
            >
              <div class="likeCount">{{ post.likedCount }}</div>
              <i class="far fa-kiss-wink-heart heartIcon"></i>
            </button>
            <span class="cp_tooltiptext cp_tooltiptext_02">かわいいね！</span>
          </div>
        </div>
      </div>
    </b-card-group>
    <div>
      <b-modal ref="myModalRef" hide-footer centered title="編集画面">
        <div class="d-block text-center">
          <b-form-textarea
            id="textarea1"
            v-model="modalPost.body"
            rows="3"
            max-rows="6"
          />
        </div>
        <b-btn class="mt-3" variant="outline-danger" block @click="updatePost()">Update</b-btn>
        <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Cancel</b-btn>
      </b-modal>
    </div>
    <!-- imgModal -->
    <div>
      <b-modal ref="imgZoomModalRef" centered hide-footer>
        <div class="d-block">
          <img v-bind:src="zoomModalPost.downloadURL" class="w-100">
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/app'

export default {
  name: 'Card',
  props: ['posts','like', 'notLike'],
  data () {
    return {
      database: null,
      postsRef: null,
      newPostBody: "",
      signedIn: false,
      postMsg: false,
      user: {},
      postId: null,
      modalPost: {},
      modalPostKey: {},
      likedCount: [],
      zoomModalPost: {},
    };
  },
  created: function() {
    // ログイン状態によって投稿ボタンの表示を変更する
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {};
      if (user) {
        this.signedIn = true;
        // debug
      } else {
        this.signedIn = false;
      }
    });
    // データベースを定義
    this.database = firebase.database();
    this.postsRef = this.database.ref("posts");
    this.userImgRef = this.database.ref("users");
  },
  computed: {
    allPosts: function() {
      return this.posts;
    },
    //自分の投稿にだけ「編集/削除」プルダウンを表示する
    myPosts: function(post) {
      return function(post) {
        let userUid = localStorage.getItem('currentUserUid');
        // 現在ログインしていればuserUidを保存、していなければ何もしない
        if (userUid){
          var postUserUid = post.userUid;
        }
        // ログイン・ログアウトでプルダウン切り替え
        if(userUid === postUserUid) {
          return this.post = true;
        } else {
          return this.post = false;
        }
      }
    },
    // 投稿画像の有無でカード表示を切り替え
    postImg: function(post) {
      return function (post) {
        var imgPost = post.downloadURL;
          if(imgPost === "" || imgPost === undefined) {
          return this.post = false;
        } else {
          return this.post = true;
        }
      }
    },
  },
  methods: {
    updatePost: function() {
      // textareaの値を取得
      this.database
        .ref("posts/" + this.modalPostKey + "/body")
        .set(this.modalPost.body);
      // 編集後、モーダルを閉じる
      this.hideModal();
    },
    // 「編集」押下でモーダルを開く
    showModal(key, post) {
      this.modalPost = post;
      this.modalPostKey = key;
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    deletePost: function(key) {
      this.database
        .ref("posts")
        .child(key)
        .remove();
    },
    //いいねしたときの処理
    likePost: function(key, post) {
      //現在ログインしているユーザーの情報を取得
      var userUid = localStorage.getItem('currentUserUid');

      // users/userUid/likedPostsにデータを追加（独自idが生成される）
      this.database = firebase.database();
      let usersRef = this.database.ref("users/" + userUid + "/likedPostId");
      usersRef.child(key).set(true);

      // いいねされたpostのlikedCountを +1 する
      post.likedCount += 1
      this.database.ref('posts/' + key + '/likedCount').set(post.likedCount);
    },
    zoomImg(key, post) {
      this.zoomModalPost = post;
      this.$refs.imgZoomModalRef.show();
    },
  }
};
</script>
<style scoped>
.DLurl img {
  margin: 1em 0 0;
  object-fit: cover;
  cursor: pointer;
  width: 60%;
  height: 16em;
  border-radius: 0.5em;
  border: 1px solid #FF92CA;
}

b-button {
  text-align: right;
}

.likeBtn {
  margin-right: 10px;
  align-self: flex-end;
}

.likeBtn button {
  width: 100%;
}

.setting {
  font-size: 30px;
}

/* cardのデザイン調整  */
.card-deck {
  margin-left: auto;
  margin-right: auto;
}

.card {
  max-width: 80vw;
  width: 80vw;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-bottom: 2em !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFE4F2;
  font-size: 1.1em;
  line-height: 1em;
  letter-spacing: 0.02em;
}

.card-header img {
 width: 50px;
 height: auto;
 margin-right: 1em;
}

.postDetail {
  padding: 2em 2em 1em;
}

.card-text {
  word-break: break-all;
  line-height: 1.8em;
}

.postDetail {
  display: flex;
  align-items: flex-start;
  padding-bottom: 2em;
}

.postDetail_inner {
  margin-right: 2em;
}

/* アイコン */

.heartIcon {
  font-size: 30px;
  color: #ff50ac;
  cursor: pointer;
}

/* ツールチップ */
.cp_tooltip {
	position: relative;
	display: inline-block;
	cursor: pointer;
}
.cp_tooltip .cp_tooltiptext {
	position: absolute;
	z-index: 1;
	bottom: 0;
	right: 200%;
	visibility: hidden;
	width: auto;
	white-space: nowrap;
	padding: 0.5em 1em;
	transition: opacity 1s;
	text-align: center;
	opacity: 0;
	color: #ffffff;
	border-radius: 6px;
  background-color: #ff50ac;
}

.cp_tooltip:hover .cp_tooltiptext {
	visibility: visible;
	opacity: 1;
}

.cp_tooltip_01 .cp_tooltiptext_01 {
	bottom: 0;
	right: 200%;
}
.cp_tooltip_02 .cp_tooltiptext_02 {
	bottom: 25%;
	right: 130%;
}
@media (max-width: 767px) {
  .icon img, .DLurl img {
    width: 60px;
    height: 60px;
    /* margin: 10px; */
    border-radius: 5%;
  }
  .DLurl {
    margin-right: 0;
    margin-left: auto;
    text-align: center;
  }

  .DLurl img {
    width: 60%;
    height: 10em;
  }

  .card {
    font-size: 0.8rem;
    max-width: 100%;
    min-width: 100%;
  }

  .likeBtn {
    align-self: flex-end;
    margin-right: 0;
    margin-left: auto;
    margin-top: 1em;
  }

  .likeBtn button {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    padding: 0.2em 0.8em;
  }

  .likeBtn button > * {
    padding: 0.2em;
  }

  .setting {
    padding: 5px;
  }

  .heartIcon {
  font-size: 20px;
  }

  .btn-lg {
    padding: 0.5rem;
  }

  .card-header img {
    width: 10vw;
    height: auto;
    margin-right: 0.5em;
  }

  .postDetail {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 2em 1em;
  }

  .postDetail_inner {
    width: 100%;
    margin-right: auto;
  }

  /* ツールチップ */
  .cp_tooltip_01 .cp_tooltiptext_01 {
	bottom: 20%;
	right: 140%;
	padding: 0.5em 1em;
  }

  .cp_tooltip_02 .cp_tooltiptext_02 {
	bottom: 10%;
	right: 120%;
	padding: 0.5em 1em;
  }
}
</style>

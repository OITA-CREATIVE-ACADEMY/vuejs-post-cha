<template>
  <div>
    <b-card-group deck class="d-flex flex-column-reverse w-100">
      <div v-for="(post, key) in posts" v-bind:key="post.id" class="card my-2">
        <div class="card-header">
          {{ post.userEmail }}
          <div v-if="signedIn">
            <b-dropdown id="ddown-sm ddown-left" right size="sm" class="close" v-if="myPosts(post)" v-b-popover.hover.left="'投稿を編集 / 削除'"
               variant="primary">
              <b-dropdown-item-button v-b-modal.modalPrevent @click="showModal(key, post)">編集</b-dropdown-item-button>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item-button v-on:click="deletePost(key)">削除</b-dropdown-item-button>
            </b-dropdown>
          </div>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center">
          <div class="icon">
            <img v-bind:src="post.imageUrl" alt>
          </div>
          <div class="bodyText">
            <p class="card-text">{{ post.body }}</p>
          </div>
          <div class="DLurl"
                v-if="postImg(post)"
                @click="zoomImg(key, post)"
                v-b-popover.hover.left="'Zoom!'"
                variant="primary">
            <img v-bind:src="post.downloadURL">
          </div>
          <div class="likeBtn d-flex flex-column">
            <button
              type="submit"
              v-on:click="likePost(key, post)"
              class="btn btn-outline-primary btn-lg"
              v-b-popover.hover.left="'いいね!'"
              variant="primary"
            >
              <div class="likeCount">{{ post.likedCount }}</div>
              <i class="far fa-kiss-wink-heart heartIcon"></i>
            </button>
          </div>
        </div>
      </div>
    </b-card-group>
    <div>
      <b-modal ref="myModalRef" hide-footer centered title="編集画面">
        <div class="d-block text-center">
          <textarea v-model="modalPost.body" name id cols="50" lows="30"></textarea>
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
import firebase from "firebase";

export default {
  name: 'Card',
  props: {
    posts: Array,
    uid: String
  },
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
        console.log(this.user);
      } else {
        this.signedIn = false;
      }
    });

    // データベースを定義
    this.database = firebase.database();
    // this.postsRef = this.database.ref("posts");
    // var _this = this;
    // this.postsRef.on("value", function(snapshot) {
    //   _this.posts = snapshot.val(); // データに変化が起きたときに再取得する
    // });
  },
  computed: {
    allPosts: function() {
      return this.posts;
    },
    //自分の投稿にだけ「編集/削除」プルダウンを表示する
    myPosts: function(post){
      console.log(post);
      return function(post) {
        // var user = firebase.auth().currentUser; //現在ログインしているユーザーの情報を取得
        // console.log(user);
        // console.log(user.uid);
        let userUid = localStorage.getItem('currentUserUid');

        // 現在ログインしていればuserUidを保存、していなければ何もしない
        if (userUid){
          console.log(post);
          console.log(post.userUid);
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
        console.log(post);
        var imgPost = post.downloadURL;
        console.log(imgPost);

          if(imgPost === "" || imgPost === undefined) {
          return this.post = false;
        } else {
          return this.post = true;
        } 
      }  
    }
  },
  methods: {
    updatePost: function() {
      console.log(this.modalPostKey);
      // textareaの値を取得
      console.log(this.modalPost.body);
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
      console.log(this.modalPostKey);
      console.log(this.modalPost);
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
      console.log(key);
      console.log(post);

      //現在ログインしているユーザーの情報を取得
      var userUid = localStorage.getItem('currentUserUid');
      console.log(userUid);

      // users/userUid/likedPostsにデータを追加（独自idが生成される）
      this.database = firebase.database();
      let usersRef = this.database.ref("users/" + userUid + "/likedPostId");
      usersRef.child(key).set(true);
        
      // 1ユーザーのlikedPost一覧を取得できるか？
      usersRef.on('value', snapshot => {
        console.log(snapshot.val());
      })

      // いいねされたpostのlikedCountを +1 する
      console.log(post.likedCount);
      post.likedCount += 1
      console.log(post.likedCount);
      this.database.ref('posts/' + key + '/likedCount').set(post.likedCount);
    },
    // 画像にマウスオーバーしたとき
    // active: function(key) {
    //   console.log(key);
    //   alert("active");
      
    // }

    zoomImg(key, post) {
      this.zoomModalPost = post;
      console.log(this.zoomModalPost);      
      this.$refs.imgZoomModalRef.show();
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon img, .DLurl img {
  width: 100px;
  height: 100px;
  margin: 20px;
  border-radius: 5%;
}

.DLurl img {
  object-fit: cover;
  cursor: pointer;
}

b-button {
  text-align: right;
}

.likeBtn {
  margin-right: 10px;
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
  font-size: 30px;
  color: #ff50ac;
  cursor: pointer;
}

/* responsive（カードサイズ） */
/* 画面が1020px以上の時 */
@media (min-width: 1050px) {
  /* .card {
    width: 1000px;
    margin: 10px 0;
  } */

}
/* 画面が1019px以下のとき */
@media (max-width: 1049px) {
  /* .card {
    margin: 10px 50px;
  } */
}

@media (max-width: 767px) {
  .icon img, .DLurl img {
    width: 60px;
    height: 60px;
    margin: 10px;
    border-radius: 5%;
  }
  .card-header {
    height: 40px;
  }

  .card {
    font-size: 0.8rem;
  }

  .likeBtn {
    width: 50px;
    height: 70px;
  }

  .close {
  padding: 5px;
  font-size: 20px;
  }

  .heartIcon {
  font-size: 20px;
  }

  .btn-lg {
    padding: 0.5rem;
  }




}
</style>

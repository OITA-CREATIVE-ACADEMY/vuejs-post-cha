<template>
  <div>
    <b-card-group deck class="flexbox01">
      <div v-for="(post, key) in posts" v-bind:key="post.id" class="card">
        <div class="card-header">
          {{ post.userEmail }}
          <div>
            <b-dropdown id="ddown-sm ddown-left" right size="sm" class="close">
              <b-dropdown-item-button v-b-modal.modalPrevent @click="showModal(key, post)">編集</b-dropdown-item-button>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item-button v-on:click="deletePost(key)">削除</b-dropdown-item-button>
            </b-dropdown>
          </div>
        </div>
        <div class="flexbox02">
          <div class="icon">
            <img v-bind:src="post.imageUrl" alt>
          </div>
          <div class="bodyText">
            <p class="card-text">{{ post.body }}</p>
          </div>
          <div class="DLurl">
            <img v-bind:src="post.downloadURL">
          </div>
          <div class="likeBtn flexbox03">
            <button
              type="submit"
              v-on:click="likePost(key, post)"
              class="btn btn-outline-primary btn-lg"
            >
              <div class="likeCount">{{ post.likedCount }}</div>
              <i class="far fa-kiss-wink-heart heartIcon"></i>
            </button>
          </div>
        </div>
      </div>
    </b-card-group>
    <div>
      <b-modal ref="myModalRef" hide-footer title="編集画面">
        <div class="d-block text-center">
          <textarea v-model="modalPost.body" name id cols="50" lows="30"></textarea>
        </div>
        <b-btn class="mt-3" variant="outline-danger" block @click="updatePost()">Update</b-btn>
        <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Cancel</b-btn>
      </b-modal>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'Card',
  props: ['posts'],
  data () {
    return {
      database: null,
      postsRef: null,
      newPostBody: "",
      signedIn: false,
      postMsg: false,
      user: {},
      postId: null,
      activeItem: "",
      selectedItem: "",
      modalPost: {},
      modalPostKey: {},
      likedCount: [],
      likedPostIndex: "",
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
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* マウスオーバー時にCardの背景色を変更 */
.selected {
  background-color: #ff50ac;
  opacity: 0.5;
  cursor: pointer;
}

.inActive {
  display: none;
}

.editText {
  font-size: 30px;
  color: black;
  position: absolute;
  right: 40%;
  top: 40%;
  letter-spacing: 15px;
}

.flexbox01 {
  display: flex;
  flex-direction: column-reverse;
}

.flexbox02 {
  display: flex;
  flex-direction: row;
  /* 両端揃え */
  justify-content: space-between;
  /* 上下中央揃え */
  align-items: center;
}

.flexbox03 {
  display: flex;
  flex-direction: column;
}

header {
  text-align: left;
}

p {
  margin: 20px;
}

.card-text {
  text-align: left;
}

.icon img, .DLurl img {
  width: 100px;
  height: 100px;
  margin: 20px;
  border-radius: 5%;
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
  /* position: absolute;
        bottom: 0;
        right: 0;
        padding: 10px; */
  font-size: 30px;
  color: #ff50ac;
  cursor: pointer;
}

.fa-pencil-alt {
  font-size: 30px;
  color: black;
  cursor: pointer;
}

/* responsive（カードサイズ） */
/* カードサイズを画面サイズに応じて変更 */
/* 画面が1020px以上の時 */
@media (min-width: 1050px) {
  .card {
    width: 1000px;
    margin: 10px 0;
  }

  .flexbox01 {
    /* カードを左右中央揃え */
    align-items: center;
  }
}
/* 画面が1019px以下のとき */
@media (max-width: 1049px) {
  .card {
    margin: 10px 50px;
  }
}
</style>

<template>
    <b-card-group deck class="flexbox01">
        <div v-for="(post, key) in allPosts" v-bind:key="post.id" class="card">
            <div class="card-header">{{ post.userEmail }}
                <!-- <button type="button" class="close" v-on:click="deletePost(key)"> -->
                    <div>
                    <b-dropdown id="ddown-sm ddown-left" right size="sm" class="close">
                        <b-dropdown-item-button v-on:click="updatePost(key)">編集</b-dropdown-item-button>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item-button v-on:click="deletePost(key)">削除</b-dropdown-item-button>
                    </b-dropdown>
                    </div>
                <!-- </button> -->
            </div>
            <!-- <div class="flexbox02"
            v-on:mouseover="activeItem=key"
            v-on:mouseout="activeItem=''" 
            v-on:click="updatePost(key)"
            v-bind:class="{selected:activeItem===key}"> -->
            <div class="flexbox02">
                <div class="icon">
                    <img v-bind:src="post.imageUrl" alt="">
                </div>
                <div class="bodyText">
                        <p class="card-text">{{ post.body }}</p>
                        
                        <!-- activeItem = key　がfalseのとき、inActive はtrue -->
                        <!-- <div class="editText" v-bind:class="{inActive:activeItem!==key}">
                            <p>編集
                                <i class="fas fa-pencil-alt"></i>
                            </p>
                        </div> -->
                </div>
                <div class="likeBtn flexbox03"> 
                    <button type="submit" v-on:click="likePost(key)" class="btn btn-outline-primary btn-lg">
                        <div class="likeCount">
                        111
                        </div>
                        <i class="far fa-kiss-wink-heart heartIcon"></i>
                    </button>
                </div>
            </div>
        </div>
    </b-card-group>
</template>
<script>
import firebase from 'firebase'

// const db = firebase.database()
// const dbPostsRef = db.ref('posts')

export default {
  name: 'Card',
  data () {
    return {
      database: null,
      postsRef: null,
      newPostBody: '',
      signedIn: false,
      postMsg: false,
      user: {},
      posts: [],
      postId: null,
      activeItem: '',
      selectedItem: '',
    //   isActive: true,
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
    // 編集モーダルを出して編集
    updatePost: function (key) {
        alert("編集中！");
        console.log(key);
        // カードのテキスト表示部分をtextareaに切り替え、その中に現在の投稿内容を反映する
            // 該当POSTの投稿内容を取得        


        this.database = firebase.database();
        this.editPostRef = this.database.ref('posts/' + key + '/body/');
        this.editPostRef.on('value', snapshot => {
            console.log('snapshot.val()', snapshot.val())
        });
        
        var BeforeEditText = this.editPostRef;
        console.log(BeforeEditText);
        



        // var nowBody = this.database.ref('posts/key/body');
        // console.log(nowBody);
            
            // カードをtextareaに変更


        // 編集したテキストをfirebaseに上書き（update）する
        // this.database.ref('posts').child(key).update({
        //     body: EditedBody
        // });

        // カードを元の状態に戻す
        


    },
    deletePost: function (key) {
      this.database.ref('posts').child(key).remove();
    },
    //いいねしたときの処理
    likePost: function(key) {
        alert("いいねしました！");
        // いいねした投稿の　likedCount　に+1する
        // likedCountを画面に反映


        console.log(key); //いいねしたpostのuid
        var user = firebase.auth().currentUser; //現在ログインしているユーザーの情報を取得
        console.log(user);
        var userUid = user.uid
        console.log(userUid);
        
        //現在ログインしているユーザーのusersテーブルに　"likedPost" を作成し、押下したカードのidを入れる
        this.database = firebase.database()
        this.usersRef = this.database.ref('users/' + userUid)

        // 現在ログインしているユーザーのusersテーブルの内容を表示
        this.usersRef.on('value', snapshot => {
            console.log('snapshot.val()', snapshot.val())
        })

        // usersテーブルにlikedPostのidを追加していく
        console.log(userUid);
        console.log(key);

        // this.database.ref('users/'.userUid).set({
        //     likedPost : key
        // })





        
        // いいねしたpostレコード配下に　"likedUserId"を作成し、現在ログインしているユーザーのUidを書き込む
        // this.database = firebase.database()
        // this.postsRef = this.database.ref('posts/' + key)
        // this.postsRef.on('value', snapshot => {
        //     console.log('snapshot.val()', snapshot.val())
        // })

        // this.database.ref('posts/' + key + '/likedUser/').set(userUid)



        
    
        // firebase.database().ref('posts/').set({
        //     userUid
        // });


        

    },
  },
}




</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* マウスオーバー時にCardの背景色を変更 */
    .selected {
        background-color: #ff50ac;
        opacity: 0.5;
        cursor: pointer;
    }


    /* 「編集」文字をカード上に表示 */
    /* .selected:after {
        content: "編集";
        z-index: 1;
        display: block;
        text-align: center;
        font-size: 30px;
    } */

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

    .icon img {
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

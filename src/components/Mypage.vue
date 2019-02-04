<template>
  <div class="mypage">
    <div>
      <b-card title="Profile">
        <user-profile></user-profile>
        <!-- 画像アップロード：現在は非表示 -->
        <!-- <image-upload class="image-upload"></image-upload> -->
      </b-card>
    </div>
    <div class="profilePosts_all">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="My Posts" active class="myPosts">
            My Post一覧<br>
            <cardList :posts="myPosts"></cardList>
          </b-tab>
          <b-tab title="Likes♡" class="myLike">
            Like 一覧 <i class="far fa-kiss-wink-heart"></i>
            <cardList :posts="likePosts"></cardList>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase'
import Profile from '@/components/Profile';
import Upload from '@/components/Upload';
import Like from '@/components/Like';
import Card from '@/components/Card';

// var userUid
var currentUserUid;

export default {
  name: 'Mypage',
  components: {
    'user-profile': Profile,
    'image-upload': Upload,
    'cardList': Card,
    // 'like-lists': Like
  },
  data () {
    return {
      database: null,
      postsRef: null,
      msg: 'ここはMYPAGEページです',
      user: {},
      myPosts: [],
      likePosts: [],
    }
  },
  created: function() {
    // ログインユーザーを取得する
    this.user = firebase.auth().currentUser
    if (this.user) {
      this.database = firebase.database();
      this.postsRef = this.database.ref('posts');
      var _this = this;
      console.log(this.user.uid);
      this.postsRef.orderByChild("userUid").equalTo(this.user.uid).on("value", function(posts) {
        console.log(posts.val());
        _this.myPosts = posts.val();
      });
    }
    // いいねしたpostのみを表示
    if (this.user) {
      this.database = firebase.database();
      this.usersRef = this.database.ref('users/' + this.user.uid); //現在ログイン中のユーザID
      
      this.postsRef = this.database.ref('posts');
      var _this = this;
      console.log(this.user.uid);

      // likedPostIdを閲覧
      this.usersRef.child("likedPostId").on("value", function(likePosts) {
        // console.log(likePosts.val());
        var likedPostsData = likePosts.val()
        // console.log(likedPostsData);
         _this.likedPostsData.filter((likedPostsData) =>{
          if (likedPostsData.length == 4){
            return true
          } else {
            return false
          }
        })

        
      });

        // return this.likePostsData.filter((item) =>{
        //   if (item == "true"){
        //     return true
        //   } else {
        //     return false
        //   }
        // })

      // this.database.ref.orderByChild("posts").equalTo("-LXb0tyNAjZmeQl4fvQh").on("value", function(likePosts) {
      //   console.log(likePosts.val());
      //   _this.likePosts = likePosts.val();
      // });
    }
  },
  computed: {
   
  },
  methods: {
    
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
.image-upload {
  display: none;
}
</style>

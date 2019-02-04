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
      console.log(this.postsRef);

      var _this = this;
      console.log(this.user.uid);

      let likedKeys = '';
      // likedPostIdを参照
      this.usersRef.child("likedPostId").on("value", function(likePosts) {
        let likedPostsData = likePosts.val()
        console.log(likedPostsData);

        likedKeys = Object.keys(likedPostsData)
        })
        // 取得したいいね投稿IDに対応するデータをpostsから取得する
        likedKeys.map(id => {
          this.postsRef.child(id).on("value", function(posts){
            // keyを取得して変数に定義する
            // valueを取得して変数に定義
            // myPostsと同様の形に整形する
            _this.likePosts = posts
            console.log(_this.likePosts)
          })

      // console.log(postsPromises)
      // Promise.all(postsPromises)
      //   .then(posts => {
      //     // do something with the data
      //     console.log(posts)
      //   })
      //   .catch(err => {
      //     // handle error
      //   })

        // let likePostsA = Object.keys(likedPostsData).map(function (value){
        //     return likedPostsData[value]
        // })
        // console.log(likePostsA)
        
        // // 変換した配列を変数に定義する

        // // Map the Firebase promises into an array
        // const likedPostsPromises = likePostsA.map(key => {
        //   return _this.postsRef.child(key).on('value', s => s)
        // })
        // const likedPostsPromises = postsRef.children(likePostsA).on('value', s => s)
        // console.log(likedPostsPromises);
        // // Wait for all the async requests mapped into 
        // // the array to complete
        // Promise.all(likedPostsList)
        //   .then(videos => {
        //     // do something with the data
        //   })
        //   .catch(err => {
        //     // handle error
        //   })


        // return likedPostsData;

      //   _this.postsRef.orderByChild("${posts}").equalTo("-LXb0tyNAjZmeQl4fvQh").on("value", function(likePosts) {
      //   console.log(likePosts.val());
      //   _this.likePosts = likePosts.val();
      // });

        //  _this.likedPostsData.filter((likedPostsData) =>{
        //   if (likedPostsData.length == 4){
        //     return true
        //   } else {
        //     return false
        //   }
        // })


        
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

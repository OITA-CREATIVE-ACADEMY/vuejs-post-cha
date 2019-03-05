<template>
  <div class="mypage">
    <div>
      <b-card title="Profile">
        <user-profile></user-profile>
      </b-card>
    </div>
    <div class="profilePosts_all">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="自分の投稿" active class="myPosts">
            <my-post :user="user"></my-post>
          </b-tab>
          <b-tab title="いいねした投稿" class="myLike">
            <liked-post :user="user"></liked-post>
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
import MyPost from '@/components/modules/MyPost';
import LikedPost from '@/components/modules/LikedPost';

export default {
  name: 'Mypage',
  components: {
    'user-profile': Profile,
    'image-upload': Upload,
    'my-post': MyPost,
    'liked-post': LikedPost,
  },
  data () {
    return {
      user: {},
    }
  },
  created: function() {
    // ログインユーザーを取得する
    this.user = firebase.auth().currentUser
    if (!this.user) {
      this.$router.push('/')
    }
  },
}
</script>

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

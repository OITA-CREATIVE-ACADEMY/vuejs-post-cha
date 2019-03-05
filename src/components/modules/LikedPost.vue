<template>
  <card-list :posts="posts.slice().reverse()" :like="true"></card-list>
</template>

<script>
import Vue from 'vue';
import firebase,{ functions } from 'firebase';
import Card from '@/components/Card';

export default {
  name: 'Mypage',
  components: {
    'card-list': Card,
  },
  props: ['user'],
  data () {
    return {
      database: '',
      usersRef: '',
      postsRef: '',
      posts: [],
    }
  },
  created: function() {
    this.database = firebase.database()
    this.usersRef = this.database.ref('users/' + this.user.uid)
    this.postsRef = this.database.ref('posts');

    var _this = this;
    
    // this.todosRef.on("value", (snapshot) => {
    //   this.todos = snapshot.val(); // 再取得してtodosに格納する
    // });

    // データに変更があると実行されるfunction
    // this.postsRef.on("value", (snapshot) => {
    //   this.posts = snapshot.val(); // 再取得してpostsに格納する
    // });

    // comments以下に追加 / 削除 / 変更があった時に発動
    // this.postsRef.on('child_changed', function(snapshot) {
      
    // });

    this.usersRef.child("likedPostId").on("value", function(snapshot) {
      if (snapshot.val()) {
        let likedPostKeys = Object.keys(snapshot.val())
        likedPostKeys.map(key => {
          _this.postsRef.child(key).once("value", function(snapshot){
            // debug
            console.log(snapshot.val())
            if (snapshot.val()) {
              _this.posts.push(snapshot.val())
            }
          })
        })
      }
    })
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

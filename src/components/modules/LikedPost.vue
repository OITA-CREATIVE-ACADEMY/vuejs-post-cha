<template>
  <card-list :posts="posts" :like="true" :notLike="true"></card-list>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/app'
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
    
    this.usersRef.child("likedPostId").on("value", function(snapshot) {
      if (snapshot.val()) {
        let likedPostKeys = Object.keys(snapshot.val())
        likedPostKeys.map(key => {
          _this.postsRef.child(key).once("value", function(snapshot){
            // debug
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

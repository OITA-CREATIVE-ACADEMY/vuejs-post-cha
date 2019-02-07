<template>
  <card-list :posts="posts"></card-list>
</template>

<script>
import Vue from 'vue';
import firebase,{ functions } from 'firebase'
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
      postsRef: '',
      posts: [],
    }
  },
  created: function() {
    this.database = firebase.database()
    this.postsRef = this.database.ref('posts')
    let _this = this
    this.postsRef.orderByChild("userUid").equalTo(this.user.uid).on("value", function(posts) {
      _this.posts = posts.val()
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

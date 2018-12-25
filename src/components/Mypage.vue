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
            My Post一覧
          </b-tab>
          <b-tab title="Likes♡" class="myLike">
            Like 一覧 <i class="far fa-kiss-wink-heart"></i>
            <like-lists></like-lists>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import Profile from '@/components/Profile';
import Upload from '@/components/Upload';
import Like from '@/components/Like';
export default {
  name: 'Mypage',
  data () {
    return {
      msg: 'ここはMYPAGEページです'
    }
  },
  components: {
    'user-profile': Profile,
    'image-upload': Upload,
    'like-lists': Like
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

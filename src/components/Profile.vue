<template>
  <div class="profile">
    <div class="profileWrap bs-component">
      <div class="jumbotron profileSeparate">
        <div class="profile_img bg-dark">
          <!-- ここにプロフィール画像 -->
        </div>
        <div class="profileData" id="profileData">
          <div class="profile_userData profile_userName">
            <h3>{{ user.displayName }}</h3>
            <b-btn v-b-tooltip.hover.right title="編集" class="profile_userName_edit editButton">
              <i class="fas fa-pencil-alt"></i>
            </b-btn>
          </div>
          <div class="profile_userData profile_userMail">
            <h4>{{ user.email }}</h4>
            <b-btn v-b-tooltip.hover.right title="編集" class="profile_userName_edit editButton">
              <i class="fas fa-pencil-alt"></i>
            </b-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
console.log("hoge");

export default {
  name: 'Profile',
  data () {
    return {
      user: {},
    }
  },
  created: function() {
    // ログイン状態によってユーザープロフィールの表示を変更する
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      console.log(user);

      // ニックネーム未設定の場合"ニックネーム未設定"が表示される
      if (user.displayName = "null") {
        user.displayName = "ニックネーム未設定";
      }

    })

    
  },
  methods: {
    userData_return: function () {
      // hoge
    }
  }
}

// window.onload = function(){
//   var uploadIcon = new Vue({
//   el: 'uploadIcon',
//   data: {
//     // hoge
//   },
//   methods: {
//     // hoge
//   }
// })
// }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profileSeparate {
  display: flex;
}

.profile_userData {
  display: flex;
}

.profile_userName {
  text-decoration: underline;
}

.profile_img {
  width: 128px;
  height: 128px;
  margin: 0 1em;
}

.editButton {
  margin-left: 0.5em;
  font-size: 20px;
}
</style>

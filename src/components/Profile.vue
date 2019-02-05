<template>
  <div class="profile">
    <div class="profileWrap bs-component">
      <div class="jumbotron profileSeparate">
        <div class="profile_img bg-dark">
          <!-- ここにプロフィール画像 -->
          {{ iconImage }}
        </div>
        <div class="profileData" id="profileData">
          <div class="profile_userData profile_userName" id="example-3">
            <h3>
              {{ user.displayName || "ニックネーム未設定" }}
            </h3>
            <b-btn v-b-tooltip.hover.right title="名前を変更する！" class="profile_userName_edit editButton" v-on:click="changeName()">
              変更<i class="fas fa-pencil-alt"></i>
            </b-btn>
          </div>
          <div class="profire_userData profile_userName_input">
            <input type="text" v-model="user.displayName">
          </div>
          <div class="profile_userData profile_userMail">
            <h4>{{ user.email }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Vue from 'vue'

console.log("hoge");

export default {
  name: 'Profile',
  data () {
    return {
      user: {},
      iconImage: {},
      edit: {},
      value: {},

    }
  },
  created: function() {
    // ログイン状態によってユーザープロフィールの表示を変更する
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
    })
  },
  mounted: function() {
    console.log('mountedだよー！！！！')
  },
  methods: {
    hoge: function () {
      
    },
    changeName: function (displayName) {
      // ここに名前を変える処理
      var user = firebase.auth().currentUser;

      user.updateProfile({
        get: function() {
          displayName: user.displayName
        },
        set: function() {
          this.displayName = displayName;
        }
      }).then(function() {
        // Update successful.
        console.log(user);
        alert("成功しました！　【ユーザー名：" + user.displayName + "】");
        return;
      }).catch(function(error) {
        // An error happened.
        alert("エラーです！");
        return;
      });
      
      // var user = firebase.auth().currentUser;
      // var name, email, photoUrl, uid, displayName;

      // displayName: user.displayName

      
    }
  }
}
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

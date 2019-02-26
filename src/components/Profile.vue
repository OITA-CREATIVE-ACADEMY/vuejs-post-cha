<template>
  <div class="profile">
    <div class="profileWrap bs-component">
      <div class="jumbotron profileSeparate">
        <div class="profile_img bg-dark">
          <!-- ここにプロフィール画像 -->
          <img :src="profileUrl" alt="">
          <b-btn v-b-modal.iconModal>Change!!</b-btn>
        </div>
        <!-- Modal Component -->
        <b-modal id="iconModal" title="icon change!" size="lg" centered show="true" ref="iconModalRef">
          <p class="my-4">アイコンを選んでください</p>
          <div class="iconList">
            <ul>
              <li v-for="item in iconImages" v-bind:key="item.id">
                <label :for="item.id">
                  <img :src="item.src" alt="">
                  <p>{{ item.name }}</p>
                </label>
                <input type="radio" :id="item.id" v-bind:value="item" v-model="iconSelected" name="iconSelect">
              </li>
            </ul>
          </div>
          <div slot="modal-footer" class="w-100">
            <b-btn size="lg" variant="secondary" @click="hideModal">
              Cansel
            </b-btn>
            <b-btn size="lg" variant="primary"  v-on:click="changeIcon()" @click="hideModal">
              OK!
            </b-btn>
          </div>
        </b-modal>
        <div class="profileData" id="profileData">
          <div class="profile_userData profile_userName" id="example-3">
            <h3>
              {{ user.displayName || "ニックネーム未設定" }}
            </h3>
          </div>
          <div class="profire_userName_editWrap">
            <div class="profire_userData profile_userName_input">
              ニックネームの変更：<input type="text" v-model="user.displayName">
            </div>
            <b-btn v-b-tooltip.hover.right title="名前を変更する！" class="profile_userName_edit editButton" v-on:click="changeName()">
              変更<i class="fas fa-pencil-alt"></i>
            </b-btn>
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
import strage from 'firebase/storage'
import Vue from 'vue'

console.log("hoge");

export default {
  name: 'Profile',
  data () {
    return {
      user: {},
      edit: {},
      value: {},
      icon: [],
      profileUrl: "",
      iconImage_src: [],
      iconSelected: [],
      iconImages: [
        { name: 'てんとうむし', id: 'icon01', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon01.jpg?alt=media&token=9c7581b8-75c8-49c2-973a-ae68d6b74042' },
        { name: 'スイカ', id: 'icon02', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon02.jpg?alt=media&token=b732c5eb-be7c-498a-ac89-488d9f521d1f' },
        { name: 'いちご', id: 'icon03', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon03.jpg?alt=media&token=e0d367bd-82f5-49cc-844e-0bf83ca75339' }
     ]
    }
  },
  created: function() {
    
    // ログイン状態によってユーザープロフィールの表示を変更する
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      if (user) {
        this.profileUrl = user.photoURL
      }
    })

    this.database = firebase.database();
    this.postsRef = this.database.ref("posts");
    this.usersRef = this.database.ref("users");
  },
  methods: {
    showModal () {
      this.$refs.iconModalRef.show()
    },
    hideModal () {
      this.$refs.iconModalRef.hide()
    },
    changeIcon: function () {
      this.profileUrl = this.iconSelected.src

      this.user.updateProfile({
         photoURL: this.iconSelected.src
      }).then(function() {
        console.log("プロフィール画像変更OK")
        // this.postsRef

      }).catch(function(error) {
        console.log(error)
        alert("プロフィール画像の変更に失敗しました")
      })
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

.profire_userName_editWrap {
  display: flex;
}

.profile_userName_input {
  width: 100%;
  text-align: left;
  margin-bottom: 0.5em;
}

.profile_userName_input input {
  min-width: 10vw;
  width: 20em;
  max-width: 30em;
  padding: 0.2em;
  background-color: #E8ECEF;
  border: none;
  border-bottom: 1px solid #000;
}

.profile_img {
  width: 128px;
  height: 128px;
  margin: 0 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile_img button {
  opacity: 0.5;
  position: absolute;
}

.editButton {
  margin-left: 0.5em;
  font-size: 20px;
}

.iconList input {
  display: block;
  margin-top: -1em;
}

.iconList ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.iconList ul li {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>

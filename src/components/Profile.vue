<template>
  <div class="profile">
    <div class="profileWrap bs-component">
      <div class="jumbotron profileSeparate">
        <div class="profile_img bg-dark">
          <!-- ここにプロフィール画像 -->
          <img :src="user.photoURL" alt="">
          <b-btn v-b-modal.iconModal>変更</b-btn>
        </div>
        <!-- Modal Component -->
        <b-modal id="iconModal" title="アイコン画像の変更" size="lg" centered show="true" ref="iconModalRef">
          <p class="my-4">アイコンを選んでください</p>
          <div class="iconList">
            <ul>
              <li v-for="item in iconImages" v-bind:key="item.id">
                <label :for="item.id">
                  <img :src="item.src" alt="">
                </label>
                <input type="radio" :id="item.id" v-bind:value="item" v-model="iconSelected" name="iconSelect">
              </li>
            </ul>
          </div>
          <div slot="modal-footer" class="w-100">
            <b-btn size="lg" variant="secondary" @click="hideModal" class="">
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
              <button class="icobutton icobutton--thumbs-up">
                <span class="fa fa-thumbs-up"></span>
              </button>
            </h3>
            <b-btn v-b-tooltip.hover.right title="名前を変更する！" class="profile_userName_edit editButton icobutton icobutton-3-ccc-red" v-on:click="nameToggleOpen()">
              <i class="fas fa-pencil-alt"></i>
            </b-btn>
          </div>
          <div class="profire_userName_editWrap" v-if="changingName">
            <div class="profire_userData profile_userName_input">
              ニックネームの変更：<br>
              <input type="text" v-model="user.displayName">
            </div>
            <b-btn v-b-tooltip.hover.right title="名前を変更する！" class="profile_userName_edit editButton" v-on:click="changeName()">
              変更
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

export default {
  name: 'Profile',
  data () {
    return {
      user: {},
      edit: {},
      value: {},
      changingName: false,
      icon: [],
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
    })
  },
  methods: {
    showModal () {
      this.$refs.iconModalRef.show()
    },
    hideModal () {
      this.$refs.iconModalRef.hide()
    },
    changeIcon: function () {
      var selectedIcon = this.iconSelected.src;
      var user = firebase.auth().currentUser;
      var currentUserUid = user.uid;
      var photoURL = user.photoURL;

      this.database = firebase.database();
      let usersRef = this.database.ref("users/" + currentUserUid + "/profile");
      usersRef.child("photoURL").set(selectedIcon);

      user.updateProfile({
         photoURL: selectedIcon
      }).then(function() {
        // Update successful.
        return;
      }).catch(function(error) {
        // An error happened.
        alert("エラーです！");
        return;
      });
    },
    nameToggleOpen: function() {
      if (this.changingName) {
        this.changingName = false;
      } else {
        this.changingName = true;
      }

    },
    changeName: function (displayName) {
      // ここに名前を変える処理
      var user = firebase.auth().currentUser;
      var currentUserUid = user.uid;

      this.database = firebase.database();
      let usersRef = this.database.ref("users/" + currentUserUid + "/profile");
      usersRef.child("displayName").set(user.displayName);
      this.changingName = false

      user.updateProfile({
        displayName: user.displayName
      }).then(function() {
        // Update successful.
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

.profile_img button:hover {
  opacity: 0.9;
}

.editButton {
  margin-left: 0.5em;
  font-size: 1.2rem;
}

.iconList input {
  display: block;
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

@media screen and (max-width: 700px) {
  .profileSeparate {
    flex-direction: column;
  }
  .profile_img {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
  }
  .profileData {
    text-align: center;
  }
  .profile_userData {
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .profire_userName_editWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 2em;
    margin-top: 1em;
  }
  .profire_userName_editWrap input {
    width: 100%;
  }

}
</style>

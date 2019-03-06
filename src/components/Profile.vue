<template>
  <div class="profile">
    <div class="profileWrap bs-component">
      <div class="jumbotron profileSeparate">
        <div class="profile_img bg-dark">
          <!-- ここにプロフィール画像 -->
          <img :src="profileUrl" alt="">
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
          <div slot="modal-footer" class="w-100 text-right">
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
            </h3>
            <b-btn v-b-tooltip.hover.right title="名前を変更する！" class="profile_userName_edit editButton icobutton icobutton-3-ccc-red" v-on:click="nameToggleOpen()" v-if="!changingName">
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
// import Card from '@/components/Card';

export default {
  name: 'Profile',
  // props: ['posts'],
  data () {
    return {
      user: {},
      edit: {},
      value: {},
      changingName: false,
      icon: [],
      profileUrl: "",
      displayName: [],
      iconImage_src: [],
      iconSelected: [],
      iconImages: [
        { name: 'てんとうむし', id: 'icon01', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon01.jpg?alt=media&token=9c7581b8-75c8-49c2-973a-ae68d6b74042' },
        { name: 'スイカ', id: 'icon02', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon02.jpg?alt=media&token=b732c5eb-be7c-498a-ac89-488d9f521d1f' },
        { name: 'いちご', id: 'icon03', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon03.jpg?alt=media&token=e0d367bd-82f5-49cc-844e-0bf83ca75339' },
        { name: 'ひつじ１', id: 'icon04', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon04.jpg?alt=media&token=fcf27161-674e-42b2-b414-251de469e541' },
        { name: 'きつね', id: 'icon05', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon05.jpg?alt=media&token=01a2175b-c330-42b8-a18e-986b778c47a4' },
        { name: 'コアラ', id: 'icon07', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon07.jpg?alt=media&token=881306e5-969d-496f-9c57-8da2fdb7046e' },
        { name: 'ハニワ', id: 'icon08', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon08.jpg?alt=media&token=63345d48-763d-4d46-b3f6-62afcee6f32d' },
        { name: 'ペンギン', id: 'icon010', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon10.jpg?alt=media&token=4459fc56-425f-4d0e-83c2-51739579b22c' },
        { name: 'たぬき', id: 'icon011', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon11.jpg?alt=media&token=5f85f7d4-2ff0-47e0-8ff4-670ab5de8d08' },
        { name: 'ゴマちゃん', id: 'icon012', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon12.jpg?alt=media&token=e95ba8e9-9cb2-4c0f-8936-0b30de164b78' }
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

      let usersIconImg = this.profileUrl
      // このユーザーが過去に投稿したPOSTの "imageUrl" を this.profileUrl に変更する      
      // ログインユーザーのuserUidと一致するpostのsnapshotを取得
      this.postsRef
        .orderByChild("userUid")
        .equalTo(this.user.uid)
        .once("value", function(snapshot) {
        // forEachでsnapshotを回しながら、全てのアイコン画像を置換する
        snapshot.forEach(function(child) {
          child.ref.update({
            imageUrl: usersIconImg
          });
        });
      })

      var user = firebase.auth().currentUser;
      var currentUserUid = user.uid;
      this.database = firebase.database();
      let usersRef = this.database.ref("users/" + currentUserUid + "/profile");
      usersRef.child("photoURL").set(this.profileUrl);

      this.user.updateProfile({
         photoURL: this.iconSelected.src
      }).then(function() {
        console.log("プロフィール画像変更OK")
        return;
      }).catch(function(error) {
        console.log(error)
        alert("プロフィール画像の変更に失敗しました")
      })
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

      // このユーザーが過去に投稿したPOSTのdisplayNameを置換
      // ログインユーザーのuserUidと一致するpostのsnapshotを取得
      
      this.postsRef
        .orderByChild("userUid")
        .equalTo(this.user.uid)
        .once("value", function(snapshot) {
        // forEachでsnapshotを回しながら、全てのユーザー名を置換する
        snapshot.forEach(function(child) {
          child.ref.update({
            displayName: user.displayName
          });
        });
      })

      this.database = firebase.database();
      let usersRef = this.database.ref("users/" + currentUserUid + "/profile");
      usersRef.child("displayName").set(user.displayName);
      this.changingName = false

      user.updateProfile({
        displayName: user.displayName
      }).then(function() {
        // Update successful.
        alert("変更しました！");
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
  padding: 1em;
}

.iconList ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1em;
}

.iconList ul li {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
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

  .profile_img button {
    opacity: 0.8;
  }

  .iconList ul {
    padding-left: 0;
  }

  .iconList ul li img {
    width: 34vw;
    height: auto;
  }

}

</style>

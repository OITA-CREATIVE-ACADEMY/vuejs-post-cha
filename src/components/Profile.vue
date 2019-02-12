<template>
  <div class="profile">
    <div class="profileWrap bs-component">
      <div class="jumbotron profileSeparate">
        <div class="profile_img bg-dark">
          <!-- ここにプロフィール画像 -->
          <img :src="user.photoURL" alt="">
          <b-btn v-b-modal.iconModal>Change!!</b-btn>
        </div>
        <!-- Modal Component -->
        <b-modal id="iconModal" title="icon change!" size="lg" centered show="true">
          <p class="my-4">アイコンを選んでください</p>
          <div class="iconList">
            <ul>
              <!-- ここ！！！！！ -->
              <!-- <li v-for="iconImage in iconImages" v-bind:key="">
                {{ iconImages.src }}
              </li> -->
              <li v-for="item in iconImages" v-bind:key="item.id">
                <!-- <label for="{{ item.id }}"> -->
                <img :src="item.src" alt="">
                <p>{{ item.name }}</p>
                <!-- <input type="radio" id="{{ item.id }}" name="iconImage"> -->
              </li>
              <li>
                <label for="icon01">
                <img :src="iconImages[0].src" alt="">
                <p>{{iconImages[0].name}}</p></label>
                <input type="radio" id="icon01" name="iconImage">
              </li>
              <li>
                <label for="icon02">
                <img :src="iconImages[1].src" alt="">
                <p>{{iconImages[1].name}}</p></label>
                <input type="radio" id="icon02" name="iconImage">
              </li>
              <li>
                <div>
                  <b-card title="Card Title"
                          img-src="https://picsum.photos/600/300/?image=25"
                          img-alt="Image"
                          img-top
                          tag="article"
                          style="max-width: 20rem;"
                          class="mb-2">
                    <p class="card-text">
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <b-button href="#" variant="primary">Go somewhere</b-button>
                  </b-card>
                </div>
                <!-- <label for="icon02">
                <img :src="iconImages[1].src" alt="">
                <p>{{iconImages[1].name}}</p></label>
                <input type="radio" id="icon02" name="iconImage"> -->
              </li>
            </ul>
          </div>
          <div slot="modal-footer" class="w-100">
            <b-btn size="lg" variant="secondary" @click="show=false">
              Cansel
            </b-btn>
            <b-btn size="lg" variant="primary"  v-on:click="changeIcon()">
              OK!
            </b-btn>
          </div>
        </b-modal>
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
      iconImage_src: [],
      iconImages: [
        { name: 'てんとうむし', id: 'icon01', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon01.jpg?alt=media&token=9c7581b8-75c8-49c2-973a-ae68d6b74042' },
        { name: 'スイカ', id: 'icon02', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon02.jpg?alt=media&token=b732c5eb-be7c-498a-ac89-488d9f521d1f' },
        { name: 'その他', id: 'icon03', src: 'https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon02.jpg?alt=media&token=b732c5eb-be7c-498a-ac89-488d9f521d1f' }
     ]
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
  // computed: {
  //   iconURL: function () {
  //     if (this.visible) {
  //         return photoURL;
  //     }
  //   }
  // },
  methods: {
    changeIcon: function () {
      var user = firebase.auth().currentUser;
      var photoURL = user.photoURL;
      console.log(user);
      
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var imagesRef = storageRef.child('images');
      var iconsRef = imagesRef.child('icons');
      var icon01 = iconsRef.child('icon01.jpg');
      var selectIcon = "https://firebasestorage.googleapis.com/v0/b/post-cha.appspot.com/o/images%2Ficons%2Ficon01.jpg?alt=media&token=9c7581b8-75c8-49c2-973a-ae68d6b74042";
      // selectIconを動的に変更する、ループでiconImagesの中を回す


      user.updateProfile({
         photoURL: selectIcon
      }).then(function() {
        // Update successful.
        console.log(photoURL);
        alert("成功しました！");
        return;
      }).catch(function(error) {
        // An error happened.
        alert("エラーです！");
        return;
      });
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

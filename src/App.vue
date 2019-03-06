<template>
<div>
  <b-navbar toggleable="md" type="dark" variant="info" class="navbar navbar-expand-lg navbar-light bg-light">
    <b-navbar-brand class="toggle">
      <router-link to="/">
        <img src="./assets/images/logo.gif" alt="ロゴ">
      </router-link>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-dropdown right>
        <template slot="button-content">
          <img v-if="!IsNoimage" :src="profileUrl" class="icon_img" alt="アカウント画像">
          <img v-if="IsNoimage" src="./assets/images/LadyIcon.png" class="icon_img" alt="アカウント画像">
        </template>
        <b-dropdown-item v-if="signedIn">
          <router-link to="/mypage">マイページ</router-link>
        </b-dropdown-item>
        <b-dropdown-item v-if="!signedIn" v-b-modal.signin-modalPrevent>
          ログイン
        </b-dropdown-item>
        <b-dropdown-item v-if="signedIn" @click="signOut">
          ログアウト
        </b-dropdown-item>
        <b-dropdown-item v-if="!signedIn" v-b-modal.signup-modalPrevent>
          新規登録
        </b-dropdown-item>       
      </b-dropdown>
    </b-navbar-nav>
  </b-navbar>

  <!-- signin modal -->
  <b-modal hide-footer id="signin-modalPrevent"
      ref="signinModal"
      title="ログイン">
    <form @submit.stop.prevent="handleSubmit">
    <b-form-input type="text" placeholder="メールアドレス" v-model="email"></b-form-input><br>
    <b-form-input type="password" placeholder="パスワード" v-model="password"></b-form-input><br>
    </form>
    <div class="text-center">
      <p><button @click="signIn" type="button" class="btn btn-primary">ログイン</button></p>
      <p>アカウントをお持ちでない方はこちら 
        <b-btn v-b-modal.signup-modalPrevent>新規登録!!</b-btn>
      </p>
    </div>
  </b-modal>

  <!-- signup modal -->
  <b-modal hide-footer id="signup-modalPrevent"
      ref="signupModal"
      title="新規アカウント登録">
    <form @submit.stop.prevent="handleSubmit">
    <b-form-input type="text" placeholder="メールアドレス" v-model="email"></b-form-input><br>
    <b-form-input type="password" placeholder="パスワード" v-model="password"></b-form-input><br>
    </form>
    <div class="text-center">
      <p><button @click="signUp" type="button" class="btn btn-primary">登録</button></p>
      <p>既にアカウントをお持ちの方はこちら 
        <b-btn v-b-modal.signin-modalPrevent>ログイン!!</b-btn>
      </p>
    </div>
  </b-modal>

  <!-- <template>
  <div class="signup">
    <h2>新規アカウント登録</h2>
    <input type="text" placeholder="メールアドレス" v-model="email">
    <input type="password" placeholder="パスワード" v-model="password">
    <button @click="signUp" class="btn btn-success">登録</button>
    <p>既にアカウントをお持ちの方はこちら 
      <router-link to="/signin">ログイン!!</router-link>
    </p>
  </div>
</template> -->

  <div id="app">
    <router-view/>
  </div>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'App',
  data () {
    return {
      user: {},
      edit: {},
      value: {},
      icon: [],
      IsNoimage: false,
      profileUrl: "",
      email: '',
      password: '',
      signedIn: false,
    }
  },
  // methods: {
  //   signOut: function () {
  //     firebase.auth().signOut().then(() => {
  //       this.$router.push('/')
  //     })
  //   }
  // },

  created: function() {

console.log(this.IsNoimage);


    // ログイン状態によって投稿ボタンの表示を変更する
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      this.IsNoimage = false
      if (user) {
        //alert('aaa')
        this.signedIn = true
        this.profileUrl = user.photoURL
        
        if(this.profileUrl==null){
          //alert('aaa' + this.profileUrl)
          this.IsNoimage = true
        }
        // debug
        // console.log(this.user)
        // console.log(this.user.uid)
        // localstorageにuserUidを保存
        // localStorage.setItem('currentUserUid', this.user.uid);
      } else {
        this.signedIn = false
        this.IsNoimage = true
        
      }
    })
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        res => {
          console.log(res)
          alert('ログインしました!')
          this.$router.push('/')
          console.log("テスト1")
          this.hideModal()
        },
        err => {
          alert(err.message)
        }
      )
    },
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(res => {
          console.log(res)
          alert('登録しました: ' + res.user.email)
          this.$router.push('/')
          this.hideModal()
        })
        .catch(error => {
          alert(error.message)
        })
    },
    hideModal: function () {
      console.log("テスト3");
      console.log(this.$refs);

      this.$refs.signinModal.hide();
      this.$refs.signupModal.hide();
    },

    signOut: function () {
      firebase.auth().signOut().then(() => {
        // localStorageからuserUidを削除
        localStorage.setItem('currentUserUid', "");
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  color: #6c757d !important;
  text-decoration: none!important;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
}

.navbar-light .navbar-toggler {
  color: rgba(0, 0, 0, 0.5);
  border-color: rgba(0, 0, 0, 0.1);
}

.icon_img {
  width: 30px;
}
 
.dropdown-toggle::after {
  color: #6c757d;
}

.navbar-light .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

</style>

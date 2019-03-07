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

  <div id="app">
    <router-view/>
  </div>
  <p id="PageTopBtn" >
    <a href="#" @click="clickSmoothScroll()">
      <i class="fas fa-angle-double-up faa-float animated"></i>
      <p>PAGE TOP</p>  
    </a>
  </p>
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
      position: []
    }
  },
  created: function() {
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
          alert('ログインしました!')
          this.$router.push('/')
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
          alert('登録しました: ' + res.user.email)
          this.$router.push('/')
          this.hideModal()
        })
        .catch(error => {
          alert(error.message)
        })
    },
    hideModal: function () {
      this.$refs.signinModal.hide();
      this.$refs.signupModal.hide();
    },

    signOut: function () {
      firebase.auth().signOut().then(() => {
        // localStorageからuserUidを削除
        localStorage.setItem('currentUserUid', "");
        this.$router.push('/')
      })
    },
    clickSmoothScroll () {
      // ページ内リンクをスクロールさせる
      event.preventDefault()
      this.$SmoothScroll(
        document.querySelector('#top'),
        400,
        null,
        null,
        'y'
      )
    },
  },
}
</script>

<style>
@import "./assets/style/App.css";

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
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 100;
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

#PageTopBtn {
    position: fixed;
    bottom: -10px;
    right: 10px;
    opacity: .7;
    font-size: 15px;

}
#PageTopBtn a {
    display: block;
    text-decoration: none;
    color: white;
    background: #ff92cb;
    text-align: center;
    border-radius: 50%; 
    outline: none;
    width: 100px;
    height: 100px; 
    padding: 24px 0;

}
#PageTopBtn a:hover {
    text-decoration: none; 
    background: #ff50ac;
}

@media (max-width: 767px) {
  #PageTopBtn {
      font-size: 10px;
  }
  #PageTopBtn a {
      width: 70px;
      height: 70px;
      padding: 17px 0;
  }
}

</style>

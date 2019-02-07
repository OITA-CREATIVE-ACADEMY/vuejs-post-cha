<template>
<div>
  <b-navbar toggleable="md" type="dark" variant="info" class="navbar navbar-expand-lg navbar-light bg-light">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand class="toggle">
      <router-link to="/">
        <img src="./assets/images/logo.gif" alt="ロゴ">
      </router-link>
    </b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav>
      <b-nav-item>
        <router-link to="/post">Post</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/like">Like</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/mypage">Mypage</router-link>
      </b-nav-item>
      <b-nav-item data-toggle="modal" data-target="#signin">
        <router-link to="/signin">Signin</router-link>
      </b-nav-item>
      <!-- <b-nav-item>
        <router-link to="/card">Card</router-link>
      </b-nav-item> -->
    </b-navbar-nav>
    <!-- firebaseからログイン中のユーザーを取得し、emailアドレス（HN）を表示する -->
     <!-- <p class="userName">{{post.userEmail}}さん、こんにちは！</p> -->


      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <!-- <em>User</em> -->
            <!-- <img="lib/brand-logo.jpg"> -->
            <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="アカウント画像">

          </template>
          <b-dropdown-item>
            <router-link to="/mypage">Profile</router-link>
          </b-dropdown-item>
          <b-dropdown-item @click="signOut">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <!-- signin modal -->
  <b-modal hide-footer id="modalPrevent"
      ref="modal"
      title="ログイン">
    <form @submit.stop.prevent="handleSubmit">
    <b-form-input type="text" placeholder="メールアドレス" v-model="email"></b-form-input><br>
    <b-form-input type="password" placeholder="パスワード" v-model="password"></b-form-input><br>
    </form>
    <p><button @click="signIn" type="button" class="btn btn-primary">ログイン</button></p>
    <p>アカウントをお持ちでない方はこちら 
      <router-link to="/signup">新規登録!!</router-link>
    </p>
  </b-modal>

  <div id="app">
    <router-view/>
  </div>
</div>
</template>

<script>
import firebase from 'firebase';


export default {
  name: 'App',
  // methods: {
  //   signOut: function () {
  //     firebase.auth().signOut().then(() => {
  //       this.$router.push('/')
  //     })
  //   }
  // },

  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        res => {
          console.log(res)
          alert('ログインしました!')
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
    },
      hideModal() {
      this.$refs.modal.hide();
    },
    signOut: function () {
      firebase.auth().signOut().then(() => {
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  color: #6c757d;
}
p {
  text-align: center;
}

/* navbar が toggleに変化するとき、ロゴを左側、toggleを右側に来るように変更 */
@media (max-width: 767px) {
  .navbar {
    flex-direction: row-reverse;
  }
}
</style>

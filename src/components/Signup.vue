<template>
  <div class="signup">
    <h2>新規アカウント登録</h2>
    <input type="text" placeholder="メールアドレス" v-model="email">
    <input type="password" placeholder="パスワード" v-model="password">
    <button @click="signUp" class="btn btn-success">登録</button>
    <p>既にアカウントをお持ちの方はこちら
      <router-link to="/signin">ログイン!!</router-link>
    </p>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/app'

export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(res => {
          alert('登録しました: ' + res.user.email)
          this.$router.push('/')
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
}
</script>
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
.signup {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>

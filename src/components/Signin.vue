<template>
  <div class="modal fade" id="signin" tabindex="-1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">ログイン</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
        </div>
        <div class="modal-body">
          <p> <input type="text" placeholder="メールアドレス" v-model="email"></p>
          <p><input type="password" placeholder="パスワード" v-model="password"></P>
          <p><button @click="signIn" type="button" class="btn btn-primary">ログイン</button></p>
        </div>
        <p>アカウントをお持ちでない方はこちら 
        <router-link to="/signup">新規登録!!</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/app'

export default {
  name: 'Signin',
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
.signin {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>

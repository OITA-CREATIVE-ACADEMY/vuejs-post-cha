<template>
  <div class="profile">
    <div class="profileWrap bs-component">
      <div class="jumbotron profileSeparate">
        <div class="profile_img bg-dark" v-on:click="uploadIcon">
          <!-- ここにプロフィール画像 -->
        </div>
        <div class="profileData">
          <div class="profile_userData profile_userName">
            <h3>POSTっちゃ太郎(ニックネーム)</h3>
            <b-btn v-b-tooltip.hover.right title="編集" class="profile_userName_edit editButton">
              <i class="fas fa-pencil-alt"></i>
            </b-btn>
          </div>
          <div class="profile_userData profile_userMail">
            <h4>example@oca.com</h4>
            <b-btn v-b-tooltip.hover.right title="編集" class="profile_userName_edit editButton">
              <i class="fas fa-pencil-alt"></i>
            </b-btn>
          </div>
          <div class="profile_userData profile_userPass">
            <h5>PASS: <span>******</span></h5>
            <b-btn v-b-tooltip.hover.right title="編集" class="profile_userName_edit editButton">
              <i class="fas fa-pencil-alt"></i>
            </b-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      msg: 'Profile'
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

<template>
  <div class="home">
    <div class="wrapper">
      <!-- 新規投稿用カード -->
      <div class="jumbotron">
        <h2 class="display-5">POST-cha!へようこそ！！！！</h2>
        <p class="lead">まずはあなたの言葉で、気楽にPOSTしてみてください。そこから新たな出会いが生まれるかもしれません。</p>
        <hr class="my-4">
        <p class="attention">入力文字200文字以内</p>
        <div class="input-group mb-3">
           <textarea name="postdata"></textarea><br>
            <div class="input-group-append">
            </div>
          </div>
        <p class="lead">
          <a class="btn btn-primary btn-lg" href="#" role="button">POST</a>
        </p>
      </div>

      <!-- /新規投稿用カード -->
      <!-- 投稿一覧 -->
      <div class="card">
          <h5 class="card-header">（名前）</h5>
          <div class="card-body">
            <div class="icon">
            </div>
            <p class="card-text">今日はOCAです！頑張ろう♫</p>
            <i class="far fa-kiss-wink-heart heartIcon"></i>
            <div class="btnWrapper">
              <a href="#" class="btn btn-primary">EDIT</a>
              <a href="#" class="btn btn-primary">DELETE</a>
            </div>
          </div>
       </div>

       <div class="card">
          <h5 class="card-header">（名前）</h5>
          <div class="card-body">
            <div class="icon">
            </div>
            <p class="card-text">今日はOCAです！頑張ろう♫</p>
            <div class="btnWrapper">
              <a href="#" class="btn btn-primary">EDIT</a>
              <a href="#" class="btn btn-primary">DELETE</a>
            </div>
          </div>
       </div>
      <!-- /投稿一覧 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
    width: 100%;
    height: 50px;
    background-color: black;
}

p{
    margin-bottom: 0;
}

p.title {
    color: white;
    font-size: 15px;

}

.wrapper {
    padding: 20px;
}

.btnWrapper {
    text-align: right;
}

.icon {
    width: 100px;
    height: 100px;
    background-color: aqua;
    float: left;
}

.card {
    margin: 20px;
}

.heartIcon {
    color: tomato;
    font-size: 30px;
}

.attention{
    padding-bottom: 1px;
}

textarea {
    resize: none;
    width:100%;
    height:100px;
}
</style>

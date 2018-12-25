<template>
  <div class="post">
    <h1>{{ msg }}</h1>
    <div class="wrapper">
     <!-- 新規投稿用カード -->
     <div class="jumbotron">
       <h2 class="display-5">POST-cha!へようこそ！！！！</h2>
       <p class="lead">まずはあなたの言葉で、気楽にPOSTしてみてください。<br>そこから新たな出会いが生まれるかもしれません。</p>
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
    </div>
　</div>
</template>

<script>
export default {
  name: 'Post',
  // data () {
  //   return {
  //     msg: 'ここはPOSTページです！！！'
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

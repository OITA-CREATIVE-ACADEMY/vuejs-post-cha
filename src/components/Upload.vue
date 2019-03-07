<template>
  <div>
    <b-card title="Image_uploader" sub-title="アイコン画像をアップロードしてください">
      <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a file..."></b-form-file>
      <div class="mt-3">Selected file: {{file && file.name}}</div>
      <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
      <div class="mt-3">Selected file: {{file2 && file2.name}}</div>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'Upload',
  data () {
    return {
      file: null,
      file2: null
    }
  }
}
</script>
<style scoped>
</style>

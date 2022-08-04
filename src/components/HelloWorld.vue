<script setup lang="ts">
import { reactive,  ref } from 'vue'
import {UiTextfield} from 'balm-ui'
import {UiEditor} from 'balm-ui-plus'
import { IEditor } from './editor.js';
import {ipcRenderer} from 'electron'
defineProps()
const editor = ref<IEditor|null>(null)
const editingText=ref('')
const title=ref('')
const state=reactive({
  editingText,
  title
})
const handleTitleChange=(e:InputEvent)=>{
  const currentTitle=(e?.target as HTMLInputElement)?.value;
  title.value=currentTitle;
}
ipcRenderer.on('openExistFile', (event, message) => {
  const pageTitle = decodeURIComponent(message[0].title);
  const pageContent = decodeURIComponent(message[0].content);
  title.value=pageTitle
  editingText.value=pageContent
});
</script>

<template>
  <!-- 标题 -->
  <div class="title">
    <ui-textfield v-model="state.title" placeholder="标题" @change="handleTitleChange"></ui-textfield>
  </div>
  <ui-editor ref="editor" v-model="state.editingText" theme="snow"/>
</template>

<style lang="less" scoped>
.title{
  text-align: center;
  margin-bottom: 20px;
}
</style>
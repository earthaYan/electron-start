<script setup lang="ts">
import {  ref } from 'vue'
import {UiTextfield} from 'balm-ui'
import {UiEditor} from 'balm-ui-plus'
import { IEditor } from './editor.js';
import {ipcRenderer} from 'electron'
defineProps()
const editor = ref<IEditor|null>(null)
const editingText=ref('')
const title=ref('')
const handleTitleChange=(currentTitle:string)=>{
  title.value=currentTitle;
}
const handleContentChange=(currentContent:string)=>{
  editingText.value=currentContent
}
ipcRenderer.on('openExistFile', (event, message) => {
  const pageTitle = decodeURIComponent(message[0].title);
  const pageContent = decodeURIComponent(message[0].content);
  handleContentChange(pageContent)
  handleTitleChange(pageTitle)
});
ipcRenderer.on('save',(event,isStartSave)=>{
  if(isStartSave){
    ipcRenderer.invoke('dialog:save',encodeURIComponent(JSON.stringify({title:title.value,editingText:editingText.value})) )
  }
})
</script>

<template>
  <!-- 标题 -->
  <div class="title">
    <ui-textfield v-model="title" placeholder="标题"/>
  </div>
  <ui-editor  v-model="editingText" theme="snow"/>
</template>

<style lang="less" scoped>
.title{
  text-align: center;
  margin-bottom: 20px;
}
</style>
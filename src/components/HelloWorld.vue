<script setup lang="ts">
import {  onMounted, ref } from 'vue'
import {UiTextfield} from 'balm-ui'
import {UiEditor} from 'balm-ui-plus'
import {ipcRenderer} from 'electron'
defineProps()
const editingText=ref('')
const editor=ref()
const title=ref('')
const handleTitleChange=(currentTitle:string)=>{
  title.value=currentTitle;
}
const handleContentChange=(currentContent:string)=>{
  editingText.value=currentContent
}
const  handleCopy=()=>{
  const copyText=window.getSelection()?.toString()??""
  navigator.clipboard.writeText(copyText)
}
const handlePaste=async (quill:any)=>{
  quill.focus()
  const pasteText=await navigator.clipboard.readText()
  const index= quill.getSelection().index
  quill.insertText(index,pasteText)
}
const handleCut=()=>{
  handleCopy()
  window.getSelection()?.deleteFromDocument()
}
const handleDelete=()=>{
  window.getSelection()?.deleteFromDocument()
}
const handleDate= (quill:any)=>{
  quill.focus()
  const date=new Date()
  const pasteText=`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  const index= quill.getSelection().index
  quill.insertText(index,pasteText)
}
const handleSelectAll=(quill:any)=>{
  quill.setSelection(0,editingText.value.length-1)
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
ipcRenderer.on('create_new_file',(_,isCreating)=>{
  if(isCreating){
    title.value='';
    editingText.value=''
  }
})
ipcRenderer.on('edit',(_,type)=>{
    const quill=editor.value.useEditor().quill
    // 处理撤销操作
    switch(type){
      case 'undo':
        quill.history.undo()
        break
      case 'cut':
        handleCut()
        break
      case 'copy':
        handleCopy()
        break
      case 'paste':
        handlePaste(quill)
        break
      case 'delete':
        handleDelete()
        break
      case 'date':
        handleDate(quill)
        break
      case 'selectAll':
        handleSelectAll(quill)
        break
    }
})


</script>

<template>
  <!-- 标题 -->
  <div class="title">
    <ui-textfield v-model="title" placeholder="标题"/>
  </div>
  <ui-editor ref="editor" v-model="editingText" theme="snow" with-counter toolbar="full"/>
</template>

<style lang="less" scoped>
.title{
  text-align: center;
  margin-bottom: 20px;
}
</style>
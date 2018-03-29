<template>
  <div id="qeditor">
    <quill-editor ref="myTextEditor"
                  :config="editorOption"
                  @change="onEditorChange($event)">
    </quill-editor>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default{
    data(){
      return{
        content: '',
        editorOption: {
          modules: {
            toolbar: [
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline','strike'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'color': [] }, { 'background': [] }],
              ['image', 'link','code-block'],
            ]
          },
        }
      }
    },
    methods: {
      onEditorChange({ editor, html, text }) {
        this.content = html
      },
      show({ editor, html, text }){
        console.log("this content  = "+this.content)
      }
    },
    components:{
      quillEditor
    },
    computed:{
      editor() {
        return this.$refs.myTextEditor.quillEditor
      }
    }
  }
</script>

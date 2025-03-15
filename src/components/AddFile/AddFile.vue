<template>
  <div>
    <el-upload
    ref="uploadRef"
    action="#"
    list-type="picture-card"
    :on-change="handleChanges"
    :auto-upload="false"
    :limit="3"
    :class="{hide:showUpload}"
    :file-list="fileList">
    <!-- <span class="file_Span">+</span> -->
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        style="width: 100px; height: 100px"
        class="el-upload-list__item-thumbnail"
        :src="file.urlX" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file,fileList)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>    
  </div>
</template>

<script>
import {uploadPicture} from '../../api/public/faceImg'
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        showUpload:false,
        
        imgObject:{},
        fileList:[],
        files:this.fileInfo,
        typefile: "",
      };
    },
    props:{
      fileInfo:{
        type:Array,
        default:[]
      }
    },
    watch:{
      fileInfo(newVal,oldVal){
        this.files=newVal
      },
      deep:true,
      immediate:true
    },
    methods: {
      handleRemove(file,fileList) {        
            const index = this.$refs.uploadRef.uploadFiles.findIndex(e => e.uid === file.uid);
            this.$refs.uploadRef.uploadFiles.splice(index, 1);
            this.fileList.splice(index, 1);
            this.$emit('zianImgs',this.fileList)
            this.showUpload = fileList.length>=3
      },
      handlePictureCardPreview(file) {
        console.log(file)
        // file.url.indexOf('.pdf')!=-1||file.raw.type == "application/pdf"
        if (this.typefile == "application/pdf") {
          for(let item of this.fileList){
            const index = this.$refs.uploadRef.uploadFiles.findIndex(e => e.uid === file.uid);  
            return window.open(this.fileList[index].showUrl, "_blank")          
          }
        }
        this.dialogImageUrl = file.showUrl;
        this.dialogVisible = true;
      },
	    handleChanges(file, fileList) {
        if(file.raw.type !="image/png" && file.raw.type!="image/jpeg" && file.raw.type!="image/jpg"){          
            this.$message.error("请上传格式为：png、jpg、jpeg的文件！");
            const index = this.$refs.uploadRef.uploadFiles.findIndex(e => e.uid === file.uid);
            this.$refs.uploadRef.uploadFiles.splice(index, 1);            
            return false
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if(!isLt2M) {
            this.$message.error('上传文件大小不能超过 2MB!');
            const index = this.$refs.uploadRef.uploadFiles.findIndex(e => e.uid === file.uid);
            this.$refs.uploadRef.uploadFiles.splice(index, 1);            
            return false
        }

        let formdata = new FormData();
        formdata.append("file", file.raw); 
        uploadPicture(formdata).then(val=>{
          // console.log(file)
            let imgUrl=''
            this.typefile=file.raw.type
            if (this.typefile == "application/pdf") {
              // imgUrl=require("../../assets/img/Reception/Certificate/Car/PDF.jpg");             
            }else{
              imgUrl=val.url 
            }          
            this.fileList.push({
              urlX:imgUrl,
              showUrl:val.url
              
            })
            this.$emit('zianImgs',this.fileList)
        })    
        this.showUpload = fileList.length>=3
	     }      
    }
  }
</script>

<style scoped>
 ::v-deep .el-upload-list__item ,.el-upload-list--picture-card .el-upload-list__item-actions{
  transition: none !important;
}

::v-deep .el-upload--picture-card{
  width:100px;
  height: 100px;
  line-height: 100px;  
  border: 1px dashed #c0ccda
}
::v-deep .el-upload-list--picture-card .el-upload-list__item{
  width:100px;
  height: 100px;
  /* line-height: 100px; */
  margin:0 8px 0 0;
  border: 1px dashed #c0ccda;
}
 .hide ::v-deep .el-upload--picture-card {
  display: none;
}
</style>
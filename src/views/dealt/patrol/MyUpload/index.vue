<!-- 
  @FileDescription:文件图片上传组件
  @params:{}
  @Date:2024-06-03 09:25:31
  @Author:LZW
-->
<template>
  <div>
    <input type="file" ref="imageUpload" @change="imageChange" v-show="false" />
    <div class="upload-box">
      <div v-for="(item, index) in fileList" class="image-box">
        <div class="image-item">
          <!-- <div class="image-mask">
            <div class="icon-box">
              <div @click="showImageView(item,index)">
                <el-icon size="16"><View /></el-icon>
              </div>
              <div @click="deleteImage(item)">
                <el-icon size="16"><Delete /></el-icon>
              </div>
            </div>
          </div> -->
          <div
            @click="deleteImage(item)"
            style="
              width: 20px;
              height: 20px;
              border-radius: 10px;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              right: 0;
              background: rgba(101, 101, 101, 0.3);
              color: #ffffff;
              z-index: 999;
            "
          >
            <el-icon><Close /></el-icon>
          </div>
          <el-image
            ref="imgRef"
            class="image-e"
            style="width: 50px; height: 50px"
            :src="isPdf(item.url) ? pdf : item.url"
            fit="contain"
            @click="openFile(item.url)"
          ></el-image>
          <!-- :preview-teleported="true" -->
          <!-- :preview-src-list="[item.url]" -->
        </div>
      </div>
      <div v-if="fileList.length < limitNum" class="image-uploader" @click="inputClick">
        <!-- @drop.prevent="handleDrop"
      @dragover.prevent="handleDragOver" -->
        <el-icon class="icon"><Plus /></el-icon>
      </div>
      <!-- 上传提示 -->
      <div class="tip" slot="tip" v-if="isShowTip">
        请上传
        <span v-html="sizeText"></span>
        <span>
          格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
        </span>
        的文件
      </div>
    </div>
    <!-- el-image 上自带的图片预览小组件 可以直接调用 -->
    <el-image-viewer
      @close="
        () => {
          dialogVisible = false;
        }
      "
      v-if="dialogVisible"
      :url-list="[showImage]"
    />
  </div>
</template>

<script setup>
  import pdf from '@/assets/images/pdf.jpg';
  import { uploadFile } from '@/api/patrol';
  import { openFile as openFileApi } from '@/api/public';
  const { proxy } = getCurrentInstance();
  const emit = defineEmits();

  const typeArr = [{ type: 'application/pdf', hz: 'pdf', img: pdf }];

  const fileList = ref([]);
  const showImage = ref('');
  const dialogVisible = ref(false);
  const props = defineProps({
    limitNum: {
      type: Number,
      default: 3
    },
    // 大小限制(kB)
    fileSizeMax: {
      type: Number,
      default: 100
    },
    fileSizeMin: {
      type: Number,
      default: 50
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ['png', 'jpg', 'jpeg', 'pdf']
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    },
    // 回显图片
    urlList: {
      type: Array,
      default: () => []
    }
  });

  fileList.value = props.urlList.map((item) => {
    return {
      url: item.fileUrl
    };
  });

  // 判断是否为pdf
  function isPdf(url) {
    let arr = url.split('.');
    let type = arr[arr.length - 1];
    return type === 'pdf' ? true : false;
  }

  const fileType = computed(() => {
    return props.fileType.map((item) => {
      let res = getType(item);
      return res ? res.hz : item;
    });
  });

  const sizeText = computed(() => {
    let text = '';
    let min = props.fileSizeMin >= 1024 ? `${Math.floor(props.fileSizeMin / 1024)}MB` : `${props.fileSizeMin}KB`;
    let max = props.fileSizeMax >= 1024 ? `${Math.floor(props.fileSizeMax / 1024)}MB` : `${props.fileSizeMax}KB`;
    if (min == 0 && max > 0) {
      text = `大小在 ${min} - ${max} 之间`;
    } else {
      text = `大小在 ${max} 以内`;
    }
    return text;
  });
  function inputClick() {
    proxy.$refs.imageUpload.click();
  }

  function getType(type) {
    let res = typeArr.find((item) => {
      return item.type == type;
    });
    return res;
  }

  function checkFile(file) {
    if (!file) return;
    const fileSize = parseInt(file.size / 1024);
    let allowType = false;
    if (props.fileType.length) {
      let fileExtension = '';
      if (file.name.lastIndexOf('.') > -1) {
        fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1);
      }
      allowType = props.fileType.some((type) => {
        if (file.type.indexOf(type) > -1) return true;
        if (fileExtension && fileExtension.indexOf(type) > -1) return true;
        return false;
      });
    } else {
      allowType = false;
    }
    if (!allowType) {
      proxy.$refs.imageUpload.value = null;
      proxy.$modal.msgError(`上传文件格式应该是${props.fileType.join('/')}`);
      return false;
    }
    if (fileSize < props.fileSizeMin || fileSize > props.fileSizeMax) {
      proxy.$refs.imageUpload.value = null;
      proxy.$modal.msgError(`请上传${sizeText.value}的文件!`);
      return false;
    }
    return true;
  }

  function openFile(url) {
    let arr = url.split('.');
    let type = arr[arr.length - 1];
    if (type === 'pdf') {
      openFileApi(url);
    } else {
      let a = window.open('');
      a.document.write(`<!DOCTYPE html><html><body ><img src='${url}'/></body></html>`);
    }
  }

  // function fileToBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     // 创建一个新的 FileReader 对象
  //     const reader = new FileReader();
  //     // 读取 File 对象
  //     reader.readAsDataURL(file);
  //     // 加载完成后
  //     reader.onload = function () {
  //       // 将读取的数据转换为 base64 编码的字符串
  //       const base64String = reader.result.split(',')[1];
  //       // 解析为 Promise 对象，并返回 base64 编码的字符串
  //       resolve(base64String);
  //     };

  //     // 加载失败时
  //     reader.onerror = function () {
  //       reject(new Error('Failed to load file'));
  //     };
  //   });
  // }

  async function imageChange(e) {
    const file = e.target.files[0];
    if (!checkFile(file)) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', 'patrol');
    uploadFile(formData)
      .then((res) => {
        fileList.value.push({ name: file.name, url: res.data });
        uploadChange();
        proxy.$refs.imageUpload.value = null;
      })
      .catch((err) => {});
  }

  // function showImageView(obj, index) {
  //   let arr = obj.url.split('.');
  //   let type = arr[arr.length - 1];
  //   if (type === 'pdf') {
  //   } else {
  //     console.log(proxy.$refs.imgRef[index]);
  //     proxy.$refs.imgRef[index].click;
  //   }
  // }
  function deleteImage(obj) {
    fileList.value.splice(fileList.value.indexOf(obj), 1);
    uploadChange();
  }

  // async function handleDrop(e) {
  //   e.preventDefault();
  //   const file = e.dataTransfer.files[0];
  //   if (!checkFile(file)) return;
  //   let img64 = await fileToBase64(file);
  //   if (file.type.indexOf('image') > -1) {
  //     fileList.value.push({ base: img64, type: 'image', img: 'data:image/png;base64,' + img64 });
  //   } else if (file.type.indexOf('application') > -1) {
  //     let img = getType(file.type).img;
  //     fileList.value.push({ base: img64, type: file.type, img });
  //   }
  //   uploadChange();
  //   proxy.$refs.imageUpload.value = null;
  // }
  // function handleDragOver(e) {
  //   e.preventDefault();
  // }
  function uploadChange() {
    let obj = fileList.value.map((item) => {
      return { fileUrl: item.url };
    });
    emit('uploadChange', obj);
  }
</script>

<style scoped>
  /* @import url(); 引入公共css类 */
  .image-uploader {
    width: 50px;
    height: 50px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .image-uploader:hover {
    border-color: #2c7be5;
  }
  .icon {
    font-size: 24px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    line-height: 100%;
    text-align: center;
  }
  .icon:hover {
    color: #2c7be5;
  }
  .upload-box {
    display: flex;
    align-items: center;
  }
  .image-box {
    margin-right: 10px;
  }
  .image-item {
    width: 50px;
    height: 50px;
    display: block;
    overflow: hidden;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
  }
  .image-item .image-e {
    z-index: 0;
  }
  .image-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background: rgba(101, 101, 101, 0.3);
    color: #ffffff;
    opacity: 0;
    z-index: 999;
  }
  .icon-box {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-box div {
    padding: 10px;
  }
  .image-item:hover .image-mask {
    opacity: 1;
  }
  .tip {
    font-size: 12px;
    margin-left: 30px;
  }
</style>

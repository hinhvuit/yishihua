<!-- 识别对比 -->
<template>
  <div class="app-container">
    <div >
      <div class="flex">
        <div>
          <div class="mr_20 mb_20">
            <div class="mb_20 mt_20">查询状态</div>
            <!-- <div class="mb_10">
              <el-radio-group v-model="type" @change="del()">
                <el-radio :label="0" >单人脸</el-radio>
                <el-radio :label="1" >多人脸</el-radio>
              </el-radio-group>
            </div> -->
            <div>
              <div style="width: 250px;">
                <el-radio-group v-model="jobStatus">
                  <el-radio :label="1">在职</el-radio>
                  <el-radio :label="0">离职</el-radio>
                  <el-radio :label="2">全部</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div >
            <div style="width: 250px;"      
              @dragover.prevent="fileDragover"
              @drop="fileDrop">
              <!-- 缩略图显示-->
              <div class="img-show" v-if="img">
                <img :src="img" class="avatar">
                <span class="actions">
                  <!-- 放大 -->
                  <span class="item">
                    <el-icon><zoom-in @click="enlarge()"/></el-icon>
                    <!-- <i class="el-icon-zoom-in" @click="enlarge()"></i> -->
                  </span>
                  <!-- 删除 -->
                  <span class="item">
                    <el-icon><Delete @click="del()"/></el-icon>
                    <!-- <i class="el-icon-delete" @click="del()"></i> -->
                  </span>
                </span>
              </div>
              <!-- 图片上传 -->
              <el-upload 
                v-else
                :limit="1"
                action="#"
                list-type="picture-card"
                :on-change="imgPreview"
                :auto-upload="false">
                <el-icon><Plus  /></el-icon>
              </el-upload>
              <!-- 图片显示对话框 -->
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogUrl" alt="">
              </el-dialog>
            </div>
            <div  style="width: 250px;">
              <el-button style="margin-top: 20px;" type="primary" @click="identify">识别</el-button>
            </div>
          </div>
        </div>
  
        <div   style="background-color: #f7fbfe; border: #409EFF dashed  1px;padding: 20px 0 20px 20px;flex: 1;"
        v-if="type == 1 && moreFaceData.length != 0" 
        >
          <div class="mb_20">裁剪结果</div>
          <div >
            <div class="flex " style="flex-wrap: wrap">
              <div class="mr_20" v-for="(item,index) in moreFaceData" :key="index">
                <div >
                  <div>
                    <el-image   
                      style="width: 148px; height: 148px"
                      :src="`data:image/jpeg;base64,${item.faceImg}`" 
                      @click="moreFaceIndex = index">
                    </el-image>
                    <div style="width: 100px;">
                      <el-radio v-model="moreFaceIndex" :label=index>
                        <span v-if="moreFaceIndex == index">选中</span>
                        <span v-else>未选中</span>
                      </el-radio>
                  </div>
                </div>
              </div>
              </div>
            </div>     
        </div>
        </div>

      </div>
      <div>
        <div class="mt_20 mb_20">人员信息</div>
        <el-table :data="dataList">
          <el-table-column label="姓名" align="center" prop="emp_name" />
          <el-table-column label="工号" align="center" prop="emp_no" />
          <el-table-column label="性别" align="center" prop="emp_sex" />
          <el-table-column label="在职状态" align="center" prop="job_situation" />
          <el-table-column label="识别照片" align="center" prop="recordTime" >
            <template #default="scope">
              <el-image 
                style="width: 100px; height: 100px"
                :src="imgUrl" 
                @click="twoImg(imgUrl,`data:image/jpeg;base64,${scope.row.image_data}`)">
                <!-- :preview-src-list="[imgUrl]"> -->
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="证件照片" align="center" prop="recordTime" >
            <template #default="scope">
              <el-image 
                style="width: 100px; height: 100px"
                :src="`data:image/jpeg;base64,${scope.row.image_data}`" 
                @click="twoImg(imgUrl,`data:image/jpeg;base64,${scope.row.image_data}`)">
                <!-- :preview-src-list="[`data:image/jpeg;base64,${scope.row.image_data}`]"> -->
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="相似度" align="center" prop="recordTime" >
            <template #default="scope">
              {{ score(scope.row.image_score) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" >
            <template #default="scope">
              <el-button
              type="text"
              @click="check(scope.row, '查看详情')"
              >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
    <el-dialog
      title="详情"
      v-model="isShow"
      width="30%"
      :before-close="handleClose">
      <el-row>
        <el-col :span="12">
          <div class="flex align-items-center mb_20">
            <div>识别照片：</div>
            <el-image 
              style="width: 100px; height: 100px"
              :src="imgUrl" 
              :preview-src-list="[imgUrl]">
            </el-image>
          </div>
          <div class="flex align-items-center mb_20 " style="height: 28px;">
            <div>姓名：</div>
            <div>
              {{ empData.emp_name }}({{ empData.emp_no }})
            </div>
          </div>
          <div class="flex align-items-center mb_20">
            <div>性别：</div>
            <div>
              {{ empData.emp_sex }}
            </div>
          </div>
          <div class="flex align-items-center mb_20">
            <div>园区：</div>
            <div>
              {{ empData.factory_name }}
            </div>
          </div>
          <div class="flex align-items-center mb_20">
            <div>事业群：</div>
            <div>
              {{ empData.bg_name }}
            </div>
          </div>
          <div class="flex align-items-center mb_20">
            <div>部门：</div>
            <div>
              {{ empData.dept_name }}
            </div>
          </div>
          <div class="flex align-items-center mb_20">
            <div>入职时间：</div>
            <div>
              {{ empData.in_date }}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flex align-items-center mb_20">
            <div>证件照片：</div>
            <el-image 
              style="width: 100px; height: 100px"
              :src="`data:image/jpeg;base64,${empData.image_data}`" 
              :preview-src-list="[`data:image/jpeg;base64,${empData.image_data}`]">
            </el-image>
          </div>
          <div class="flex align-items-center mb_20" style="height: 28px;">
            <div>姓名：</div>
            <div>在职状态：</div>
            <div>
              <el-tag v-if="empData.job_situation == '在职'" type="success" >{{ empData.job_situation }}</el-tag>
              <el-tag v-else type="danger" >{{ empData.job_situation }}</el-tag>
            </div>
          </div>
          <div class="flex align-items-center mb_20">
            <div>相似度：</div>
            <div>
              {{ score(empData.image_score) }}
            </div>
          </div>
          <div class="flex align-items-center mb_20">
            <div>电话：</div>
            <div>
              {{ empData.emp_phone }}
            </div>
          </div>
          <div class="flex align-items-center mb_20">
            <div>事业处：</div>
            <div>
              {{ empData.bu_name }}
            </div>
          </div>
          <div class="flex align-items-center mb_20">
            <div>身份证：</div>
            <div>
              {{ maskedIdCard(empData.emp_card) }}
            </div>
          </div>
          <div class="flex align-items-center mb_20">
            <div>离职时间：</div>
            <div>
              {{ empData.lev_date }}
            </div>
          </div>
        </el-col>

      </el-row>
    </el-dialog>

    <el-dialog :visible.sync="twoImgDialogVisible" width="40%" :before-close="handleCloseTwoImg">
      <div class="flex justify-content-between">
        <div>
          <div class="mb_10" style="font-size: 20px;">识别照片</div>
          <img style="width: 295px;height: 413px;" :src="imgUrl" fit="cover">
        </div>
        <div>
          <div class="mb_10" style="font-size: 20px;">证件照片</div>
          <img style="width: 295px;height: 413px;" :src="img2" fit="cover">
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script setup name="FaceRecognitionCompare">
import { IdentifyPersonPC,selectPersonDetailed,faceDetection,selectAuthorityIdentifyTime } from "@/api/faceRecognition/compare";
import useUserStore from '@/store/modules/user';
const { proxy } = getCurrentInstance();
const userStore = useUserStore();
const type = ref(''); // 0单人脸 1多人脸
const jobStatus = ref(1); // 在职状态
const status = ref('');
const img = ref(''); // 上传的压缩显示人脸识别照片
const imgUrl = ref(''); // 列表和对话框的人脸识别照片
const dialogVisible = ref(false);
const dialogUrl = ref('');
const fileUrl = ref(''); //  图片二进制格式
const uuid = ref(''); 
const dataList = ref([]); 
const isShow = ref(false);
const twoImgDialogVisible = ref(false);
const img2 = ref(''); 
const empData = ref([]); 
const isType = ref(''); 
const imgSize = ref(''); 
const moreFaceData = ref([]); // 多人脸识别结果
const moreFaceIndex = ref(0); // 多人脸选中索引
const moreFaceImg = ref(''); // 多人脸选中base64
const time = ref(0); // 倒计时
const isAble = ref(false); // 是否进入倒计时


const fileDragover = (e) => {
  e.preventDefault();
};
const fileDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files
  fileUrl.value = file[0]
  if (file.length === 0) {
    return proxy.$modal.msgError('请选择图片');
  }
  if (file.length > 1) {
    return proxy.$modal.msgError('最多上传一张图片');
  }
  console.log('..',file[0]);
  if (fileUrl.value.type != "image/png" && fileUrl.value.type != "image/jpeg") {
    return proxy.$modal.msgError('图片必须为jpg或png格式');
  }
  getImage(file[0]).then((res) => {
    console.log(res);
    img.value = res;
  });
  imgSize.value = file.size / 1024;
  const loading = proxy.$loading({
    lock: true,
    text: "多人脸裁剪中",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  let moreFace = new FormData();
  moreFace.append("file", fileUrl.value);
  faceDetection(moreFace.value).then((val)=>{
    loading.close();
    moreFaceData.value = val.data.result.detResult;
    console.log('moreFaceData.value.length',moreFaceData.value.length);
    if (moreFaceData.value.length > 1) {
      type.value = 1;
    }else{
      type.value = 0;
    }
  })  
};
//图片解析
const getImage =(file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (ev) {
      let result = ev.target.result;
      resolve(result);
    };
    //读取文件(base64)
    reader.readAsDataURL(file);
  });
};
//图片缩略图
const imgPreview = (files) => {
  console.log(files);
  //生成临时缩略图
  const file = files.raw
  fileUrl.value = files.raw;
  const reader = new FileReader()
  reader.readAsDataURL(file) // 以URL的形式读取文件
  console.log('reader',reader);
  reader.onload = () => {
    img.value = reader.result;  // 读取完成后的base64字符串
  }
  imgSize.value = files.size / 1024;
  isType.value = files.raw.type === "image/jpeg";
  const loading = proxy.$loading({
    lock: true,
    text: "多人脸裁剪中",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  let moreFace = new FormData();
  moreFace.append("file", fileUrl.value);
  console.log("file", fileUrl.value);
  faceDetection(moreFace).then((val)=>{
    console.log('接口....');
    loading.close();
    moreFaceData.value = val.data.result.detResult;
    console.log('moreFaceData.length',moreFaceData.value.length);
    if (moreFaceData.value.length > 1) {
      type.value = 1;
    }else{
      type.value = 0;
    }
  })      
};
const enlarge = () => {
  dialogVisible.value = true;
  dialogUrl.value = img.value;
};
const del = () => {
  img.value = '';
  dialogUrl.value = '';
  fileUrl.value = '';
  moreFaceData.value = [];
  moreFaceIndex.value = 0;
  moreFaceImg.value = '';
};
const twoImg = (imgUrl,image_data) => {
  twoImgDialogVisible.value = true;
  img2.value = image_data;
};
const handleCloseTwoImg = () => {
  twoImgDialogVisible.value = false;
};
// Base64字符串转二进制流
const dataURLtoBlob = (url) => {
  let dataurl = `data:image/jpeg;base64,${url}`;
  let arr = dataurl.split(",");
  console.log('arr',arr);
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
};
const identify = () => {
  if (isAble.value == true) {
    isAble.value = false;
    identifyFace();
    return;
  }
  if (isAble.value == false) {     
    selectAuthorityIdentifyTime({number:userStore.name}).then((val)=>{
      if (val.data != null) {   
        time.value = val.data.time;
      }
      if (time.value != 0 ) {
        isAble.value = true;
        const load = proxy.$loading({
          lock: true,
          text: `重复操作多次，请等待${time.value}秒后继续操作`,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let this_ = proxy;
          var countdownInterval = setInterval(function() {
            this_.time--;
            console.log('this_.time',this_.time);
            if (this_.time <= 0) {
              // 倒计时结束，关闭遮罩层
              load.close();
              clearInterval(countdownInterval);
            }else{
              // 更新遮罩层的文本内容
              load.text = `重复操作多次，请等待${this_.time}秒后继续操作`;
            }
          }, 1000);
      }else{
        isAble.value = false;
        identifyFace();
      }
    })
  }
};
const identifyFace = () => {
  if (type.value == 0) {
    if (fileUrl.value == "") return proxy.$modal.msgError("请选择上传图片！");
    // if (!proxy.isType) {
    //   return proxy.$modal.msgError("上传图片格式应是JPG!");
    // }
    if (imgSize.value > 10240) {
      return proxy.$modal.msgError("上传图片大小应在10M以下!");
    }
    imgUrl.value = img.value;
  }
  if (type.value == 1) {
    if (moreFaceData.value.length == 0) return proxy.$modal.msgError("请选择上传图片！");
    imgUrl.value = `data:image/jpeg;base64,${moreFaceData.value[moreFaceIndex.value].faceImg}`;
    moreFaceImg.value = dataURLtoBlob(moreFaceData.value[moreFaceIndex.value].faceImg);
    console.log('aaa', imgUrl.value);
  }
  const loading = proxy.$loading({
    lock: true,
    text: "识别中",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  if (jobStatus.value == 2) {
    status.value = '';
  } else {
    status.value = jobStatus.value;
  }
  let formData = new FormData();
  formData.append("region", userStore.getNowPark().id);
  formData.append("operatorName", userStore.nickName);
  formData.append("operatorNumber", userStore.name);
  formData.append("jobStatus", status.value);
  if (type.value == 0) {
    formData.append("file", fileUrl.value);
  }
  if (type.value == 1) {
    formData.append("file", moreFaceImg.value);
  }
  dataList.value = [];
  IdentifyPersonPC(formData).then((val) => {
    loading.close();
    if (val.result != "success") return
    proxy.$modal.msgSuccess(val.msg);
    // 去重处理
    let uniqueArr = val.data.list.filter((item, index, self) => self.findIndex(t => t.emp_no === item.emp_no) === index);
    dataList.value = uniqueArr;
    console.log('uniqueArr', uniqueArr);
    if (status.value == '') {
      // 将在职数据排在前面
      dataList.value.sort((a, b) => {
        if (a.job_situation === b.job_situation) return 0;
        if (a.job_situation === '在职') return -1;
        if (b.job_situation === '在职') return 1;
        return 1;
      });
    }
    uuid.value = val.data.uuid;
  });
};

const check = (row) => {
  empData.value = row;
  console.log('row',row);
  const loading = proxy.$loading({
    lock: true,
    text: "查询详情中",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  selectPersonDetailed({uuid:uuid.value,number:row.emp_no}).then((val)=>{
    loading.close();
    if (val.result != "success") return empData.value = [];
    isShow.value = true;
  });
};
const handleClose = () => {
  isShow.value = false;
};
const score = (val) => {
  if (val) {
    return Math.floor(val*100) + "%"
  }
};
const maskedIdCard = (val) => {
  if (val) {
    const firstSix = val.substring(0, 6);
    const lastFour = val.substring(val.length - 4);
    return `${firstSix}******${lastFour}`;
  }
};


</script>

<style scoped>
.flex {
  display: flex;
}
.align-items-center {
  align-items: center;
}
.mt_20{
  margin-top: 20px;
}
.mb_20{
  margin-bottom: 20px;
}

.uploader-avatar>>>.el-upload {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  cursor: pointer;
  line-height: 146px;
  vertical-align: top;
  overflow: hidden;
}

.img-show {
  position: relative;
  /* border: 1px solid #c0ccda; */
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  cursor: pointer;
  overflow: hidden;
}

.uploader-avatar>>>.el-upload:hover {
  border-color: #409EFF;
}

.uploader-avatar>>>i {
  font-size: 28px;
  color: #8c939d;
}

.avatar {
  width: 148px;
  height: 148px;
  display: block;
}

.actions {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 148px;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s;
}

.actions:hover {
  opacity: 1;
}

.actions:hover span {
  display: inline-block;
}

.actions span {
  display: none;
  margin: 0 16px;
  cursor: pointer;
}</style>
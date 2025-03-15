<!-- 
  @FileDescription: 车辆进出记录查询
  @Date:2024-08-07 15:10:56
  @Author:LZW
-->
<template>
  <div class="tab-container">
    <div style="margin-bottom: 10px">园区相关信息</div>
    <el-form label-position="left" :model="formDataParams" ref="formRef" :inline="true">
      <div class="conter">
        <div style="border-radius: 5px">
          <div>
            <div class="titl">概况</div>
            <div class="lineBox">
              <div>
                <el-form-item prop="door" label="园区：">
                  <div class="context-info">{{ formDataParams.parkName }}</div>
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  label-width="80px"
                  prop="area"
                  label="占地面积"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <div style="display: flex">
                    <el-input
                      v-model="formDataParams.area"
                      type="number"
                      placeholder="请输入"
                    /><span style="width: 100px; margin-left: 10px">平方千米</span>
                  </div>
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  label-width="80px"
                  prop="buildType"
                  label="建筑性质"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-select
                    v-model="formDataParams.buildType"
                    placeholder="请选择类型"
                    clearable
                  >
                    <el-option
                      v-for="item in outType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <div>
            <div style="margin-bottom: 10px; display: flex; align-items: center">
              <div class="titl">
                <span>楼栋数量</span>
                <el-icon
                  size="18px"
                  color="#F59A23"
                  style="margin-left: 10px"
                  class="tipBox"
                  @click="tips(1)"
                >
                  <WarningFilled />
                </el-icon>
              </div>
            </div>
            <div class="lineBox">
              <div>
                <el-form-item
                  label-width="80px"
                  prop="buildProduce"
                  label="生产楼栋"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="formDataParams.buildProduce"
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder="请输入"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  label-width="80px"
                  prop="buildDorm"
                  label="宿舍"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="formDataParams.buildDorm"
                    type="number"
                    placeholder="请输入"
                    oninput="value=value.replace(/[^\d]/g,'')"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  prop="buildOther"
                  label-width="80px"
                  label="其他"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="formDataParams.buildOther"
                    type="number"
                    placeholder="请输入"
                    oninput="value=value.replace(/[^\d]/g,'')"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <div>
            <div style="margin-bottom: 10px; display: flex; align-items: center">
              <div class="titl">
                <span>一线出入口类型及数量</span>
                <el-icon
                  size="18px"
                  color="#F59A23"
                  style="margin-left: 10px"
                  class="tipBox"
                  @click="tips(2)"
                >
                  <WarningFilled />
                </el-icon>
              </div>
            </div>
            <div class="lineBox">
              <div>
                <el-form-item
                  prop="gateCustoms"
                  label-width="80px"
                  label="海关闸口"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="formDataParams.gateCustoms"
                    type="number"
                    placeholder="请输入"
                    oninput="value=value.replace(/[^\d]/g,'')"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  prop="gateVehicle"
                  label-width="80px"
                  label="机动车"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="formDataParams.gateVehicle"
                    type="number"
                    placeholder="请输入"
                    oninput="value=value.replace(/[^\d]/g,'')"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  prop="gatePerson"
                  label-width="80px"
                  label="人员"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="formDataParams.gatePerson"
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder="请输入"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  prop="gateMix"
                  label-width="80px"
                  label="混合"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="formDataParams.gateMix"
                    type="number"
                    placeholder="请输入"
                    oninput="value=value.replace(/[^\d]/g,'')"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <div>
            <div style="margin-bottom: 10px; display: flex; align-items: center">
              <div class="titl">
                <span>园区安全管理人力</span>
                <el-icon
                  size="18px"
                  color="#F59A23"
                  style="margin-left: 10px"
                  class="tipBox"
                  @click="tips(3)"
                >
                  <WarningFilled />
                </el-icon>
              </div>
            </div>
            <div class="lineBox">
              <div>
                <el-form-item
                  prop="personPublic"
                  label="公共区域"
                  label-width="80px"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="formDataParams.personPublic"
                    type="number"
                    placeholder="请输入"
                    oninput="value=value.replace(/[^\d]/g,'')"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  prop="personCustoms"
                  label="生产区域"
                  label-width="80px"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="formDataParams.personCustoms"
                    type="number"
                    placeholder="请输入"
                    oninput="value=value.replace(/[^\d]/g,'')"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item label="合计：">
                  <div class="context-info">
                    {{
                      Number(formDataParams.personPublic) +
                      Number(formDataParams.personCustoms)
                    }}
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>
          <div>
            <div
              style="margin-bottom: 10px; display: flex; align-items: center"
              v-if="formDataParams.parkEpibolyList.length != 0"
            >
              <div class="titl">
                <span>保安状况</span>
                <el-icon
                  size="18px"
                  color="#F59A23"
                  style="margin-left: 10px"
                  class="tipBox"
                  @click="tips(4)"
                >
                  <WarningFilled />
                </el-icon>
              </div>
            </div>
            <div
              v-for="(item, index) of formDataParams.parkEpibolyList"
              :key="index"
              style="
                background: #f5f7f9;
                padding: 15px 15px 0px 15px;
                border-radius: 5px;
                margin-bottom: 5px;
              "
            >
              <div
                style="display: flex; justify-content: space-between; margin-bottom: -5px"
              >
                <el-form-item
                  :prop="`parkEpibolyList[${index}].name`"
                  label="公司全称"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                  label-width="120px"
                >
                  <el-input
                    v-model="item.name"
                    style="width: 535px"
                    placeholder="请输入"
                  />
                </el-form-item>
                <div>
                  <el-button type="danger" plain @click="delAb(index)">删除</el-button>
                </div>
              </div>
              <div style="display: flex">
                <el-form-item
                  :prop="`parkEpibolyList[${index}].publicPost`"
                  label-width="120px"
                  label="公共区域岗位数"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="item.publicPost"
                    type="number"
                    placeholder="请输入"
                    oninput="value=value.replace(/[^\d]/g,'')"
                  />
                </el-form-item>
                <el-form-item
                  :prop="`parkEpibolyList[${index}].publicPerson`"
                  label="公共区域人力"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="item.publicPerson"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    type="number"
                    placeholder="请输入"
                  />
                </el-form-item>
                <el-form-item
                  :prop="`parkEpibolyList[${index}].dormPost`"
                  label="宿舍区域岗位数"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input v-model="item.dormPost" oninput="value=value.replace(/[^\d]/g,'')" type="number" placeholder="请输入" />
                </el-form-item>
                <el-form-item
                  :prop="`parkEpibolyList[${index}].dormPerson`"
                  label="宿舍区域人力"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="item.dormPerson"
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder="请输入"
                  />
                </el-form-item>
              </div>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                margin: 10px 0 25px 0;
                cursor: pointer;
                width: 200px;
              "
              @click="addAb"
            >
              <el-icon size="25px" style="margin-right: 10px" color="#457AF6"
                ><CirclePlusFilled /></el-icon
              >添加安保公司
            </div>
          </div>
          <div>
            <div class="titl">
              <span>园区安全主管信息</span>
            </div>
            <div
              class="lineBox"
              style="margin-bottom: -20px"
              v-for="(item, index) of formDataParams.parkManagerList"
              :key="index"
            >
              <div>
                <el-form-item
                  :prop="`parkManagerList[${index}].jobNo`"
                  label-width="60px"
                  label="工号"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input v-model="item.jobNo" :disabled="true" placeholder="请输入" />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  :prop="`parkManagerList[${index}].username`"
                  label-width="60px"
                  label="姓名"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="item.username"
                    :disabled="true"
                    placeholder="请输入"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  :prop="`parkManagerList[${index}].post`"
                  label-width="70px"
                  label="管理职"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input v-model="item.post" :disabled="true" placeholder="请输入" />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  :prop="`parkManagerList[${index}].phone`"
                  label-width="70px"
                  label="手机号"
                >
                  <el-input v-model="item.phone" :disabled="true" placeholder="请输入" />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  :prop="`parkManagerList[${index}].landline`"
                  label-width="60px"
                  label="座机"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input v-model="item.landline" placeholder="请输入" />
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin: 15px 0 10px 0">事业群相关信息</div>
      <div class="conter">
        <div
          style="border-radius: 5px"
          v-for="(item, index) of formDataParams.parkGroupList"
          :key="index"
        >
          <div style="display: flex; justify-content: space-between">
            <div class="oodd">
              事业群{{ index + 1 }}
              <div>
                <el-button type="danger" @click="delSYQ(index)" plain>删除</el-button>
              </div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between">
              <div class="titl">
                <span>概况</span>
              </div>
            </div>
            <div style="display: flex; margin-top: 15px; margin-bottom: -5px">
              <div>
                <el-form-item
                  :prop="`parkGroupList[${index}].groupName`"
                  label-width="64px"
                  label="群名称"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-cascader
                    v-model="item.groupId"
                    :options="Group"
                    placeholder="请选择"
                    clearable
                    style="width: 192px"
                    ref="groupref"
                    @change="handleChange(index)"
                  ></el-cascader>
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  :prop="`parkGroupList[${index}].employ`"
                  label-width="64px"
                  label="正式工"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input v-model="item.employ" oninput="value=value.replace(/[^\d]/g,'')" type="number" placeholder="请输入" />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  :prop="`parkGroupList[${index}].epiboly`"
                  label-width="64px"
                  label="派遣工"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input v-model="item.epiboly" oninput="value=value.replace(/[^\d]/g,'')" type="number" placeholder="请输入" />
                </el-form-item>
              </div>
            </div>
            <div style="display: flex">
              <div>
                <el-form-item
                  :prop="`parkGroupList[${index}].produce`"
                  label-width="64px"
                  label="产品"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input v-model="item.produce" placeholder="请输入" />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  :prop="`parkGroupList[${index}].custom`"
                  label-width="64px"
                  label="客户"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input v-model="item.custom" placeholder="请输入" />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  :prop="`parkGroupList[${index}].process`"
                  label-width="64px"
                  label="制程"
                  :rules="{
                    required: true,
                    message: '该项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-input v-model="item.process" placeholder="请输入" />
                </el-form-item>
              </div>
            </div>
          </div>
          <div>
            <div
              style="margin-bottom: 10px; display: flex; align-items: center"
              v-if="item.parkGroupEpibolyList.length != 0"
            >
              <div class="titl">
                <span>保安状况</span>
                <el-icon
                  size="18px"
                  color="#F59A23"
                  style="margin-left: 10px"
                  class="tipBox"
                  @click="tips(5)"
                >
                  <WarningFilled />
                </el-icon>
              </div>
            </div>
            <div
              style="background: #f5f7f9; padding: 15px 15px 0px 15px; border-radius: 5px"
            >
              <div v-for="(items, indexs) of item.parkGroupEpibolyList" :key="index">
                <div style="display: flex; justify-content: space-between">
                  <div style="display: flex">
                    <div>
                      <el-form-item
                        :prop="`parkGroupList[${index}].parkGroupEpibolyList[${indexs}].name`"
                        label="公司全称"
                        :rules="{
                          required: true,
                          message: '该项不能为空',
                          trigger: 'blur',
                        }"
                      >
                        <el-input
                          v-model="items.name"
                          style="width: 300px"
                          placeholder="请输入"
                        />
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item
                        :prop="`parkGroupList[${index}].parkGroupEpibolyList[${indexs}].post`"
                        label="岗位数"
                        :rules="{
                          required: true,
                          message: '该项不能为空',
                          trigger: 'blur',
                        }"
                      >
                        <el-input
                          v-model="items.post"
                          type="number"
                          oninput="value=value.replace(/[^\d]/g,'')"
                          placeholder="请输入"
                        />
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item
                        :prop="`parkGroupList[${index}].parkGroupEpibolyList[${indexs}].person`"
                        label="人力"
                        :rules="{
                          required: true,
                          message: '该项不能为空',
                          trigger: 'blur',
                        }"
                      >
                        <el-input
                          v-model="items.person"
                          type="number"
                          oninput="value=value.replace(/[^\d]/g,'')"
                          placeholder="请输入"
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div>
                    <el-button type="danger" plain @click="delGroupAb(index, indexs)"
                      >删除</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                margin: 10px 0 25px 0;
                cursor: pointer;
                width: 200px;
              "
              @click="addGroupAb(index)"
            >
              <el-icon size="25px" style="margin-right: 10px" color="#457AF6"
                ><CirclePlusFilled /></el-icon
              >添加安保公司
            </div>
          </div>
          <div style="margin-bottom: -15px">
            <div class="titl">
              <span>生产安全主管信息</span>
            </div>
            <div
              style="
                background: #f5f7f9;
                padding: 15px 15px 0px 15px;
                border-radius: 5px;
                margin-top: 10px;
              "
            >
              <div v-for="(sitem, indexs) of item.parkGroupPersonList" :key="indexs">
                <div v-if="sitem.bizType == 1" style="margin-bottom: -5px">
                  <div style="display: flex; justify-content: space-between">
                    <div style="display: flex">
                      <div>
                        <el-form-item
                          :prop="`parkGroupList[${index}].parkGroupPersonList[${indexs}].jobNo`"
                          label="工号"
                          :rules="{
                            required: true,
                            message: '该项不能为空',
                            trigger: 'blur',
                          }"
                        >
                          <el-input
                            v-model="sitem.jobNo"
                            @blur="findperson(sitem.jobNo, index, indexs)"
                            placeholder="请输入"
                          />
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item
                          :prop="`parkGroupList[${index}].parkGroupPersonList[${indexs}].username`"
                          label="姓名"
                          :rules="{
                            required: true,
                            message: '该项不能为空',
                            trigger: 'blur',
                          }"
                        >
                          <el-input
                            v-model="sitem.username"
                            :disabled="true"
                            placeholder="请输入"
                          />
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item
                          :prop="`parkGroupList[${index}].parkGroupPersonList[${indexs}].post`"
                          label="管理职"
                        >
                          <el-input
                            v-model="sitem.post"
                            :disabled="true"
                            placeholder="请输入"
                          />
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item
                          :prop="`parkGroupList[${index}].parkGroupPersonList[${indexs}].phone`"
                          label="手机号"
                          :rules="{
                            required: true,
                            message: '该项不能为空',
                            trigger: 'blur',
                          }"
                        >
                          <el-input v-model="sitem.phone" placeholder="请输入" />
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item
                          :prop="`parkGroupList[${index}].parkGroupPersonList[${indexs}].landline`"
                          label="座机"
                          :rules="{
                            required: true,
                            message: '该项不能为空',
                            trigger: 'blur',
                          }"
                        >
                          <el-input v-model="sitem.landline" placeholder="请输入" />
                        </el-form-item>
                      </div>
                    </div>
                    <div>
                      <el-button type="danger" plain @click="delSP(index, indexs)"
                        >删除</el-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                margin: 15px 0 40px 0;
                cursor: pointer;
                width: 200px;
              "
              @click="addSP(index)"
            >
              <el-icon size="25px" style="margin-right: 10px" color="#457AF6"
                ><CirclePlusFilled /></el-icon
              >添加生产安全主管
            </div>
          </div>
          <div>
            <div class="titl">
              <span>生产安全窗口信息</span>
            </div>
            <div
              style="
                background: #f5f7f9;
                padding: 15px 15px 0px 15px;
                border-radius: 5px;
                margin-top: 10px;
              "
            >
              <div v-for="(sitem, indexs) of item.parkGroupPersonList" :key="indexs">
                <div v-if="sitem.bizType == 2" style="margin-bottom: -5px">
                  <div style="display: flex; justify-content: space-between">
                    <div style="display: flex">
                      <div>
                        <el-form-item
                          :prop="`parkGroupList[${index}].parkGroupPersonList[${indexs}].jobNo`"
                          label="工号"
                          :rules="{
                            required: true,
                            message: '该项不能为空',
                            trigger: 'blur',
                          }"
                        >
                          <el-input
                            v-model="sitem.jobNo"
                            @blur="findperson(sitem.jobNo, index, indexs)"
                            placeholder="请输入"
                          />
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item
                          :prop="`parkGroupList[${index}].parkGroupPersonList[${indexs}].username`"
                          :rules="{
                            required: true,
                            message: '该项不能为空',
                            trigger: 'blur',
                          }"
                          label="姓名"
                        >
                          <el-input
                            v-model="sitem.username"
                            :disabled="true"
                            placeholder="请输入"
                          />
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item
                          :prop="`parkGroupList[${index}].parkGroupPersonList[${indexs}].post`"
                          label="管理职"
                        >
                          <el-input
                            v-model="sitem.post"
                            :disabled="true"
                            placeholder="请输入"
                          />
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item
                          :prop="`parkGroupList[${index}].parkGroupPersonList[${indexs}].phone`"
                          label="手机号"
                          :rules="{
                            required: true,
                            message: '该项不能为空',
                            trigger: 'blur',
                          }"
                        >
                          <el-input
                            v-model="sitem.phone"
                            type="number"
                            placeholder="请输入"
                          />
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item
                          :prop="`parkGroupList[${index}].parkGroupPersonList[${indexs}].landline`"
                          label="座机"
                          :rules="{
                            required: true,
                            message: '该项不能为空',
                            trigger: 'blur',
                          }"
                        >
                          <el-input v-model="sitem.landline" placeholder="请输入" />
                        </el-form-item>
                      </div>
                    </div>
                    <div>
                      <el-button type="danger" @click="delCK(index, indexs)" plain
                        >删除</el-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                margin: 20px 0 25px 0;
                cursor: pointer;
                width: 200px;
              "
              @click="addCK(index)"
            >
              <el-icon size="25px" style="margin-right: 10px" color="#457AF6"
                ><CirclePlusFilled /></el-icon
              >添加生产安全窗口
            </div>
          </div>
        </div>
        <!-- <div
          style="
            display: flex;
            align-items: center;
            margin: 15px 0;
            cursor: pointer;
            width: 200px;
          "
          @click="addSYQ"
        >
          <el-icon size="25px" style="margin-right: 10px" color="#457AF6"
            ><CirclePlusFilled /></el-icon
          >
        </div> -->
        <el-button type="primary" @click="addSYQ" plain icon="Plus">添加事业群</el-button>
      </div>
    </el-form>
    <el-button type="primary" style="margin-top: 20px" @click="submit">提交</el-button>
    <el-dialog v-model="dialogVisible" :title="Tips" width="500">
      <span>{{ message }}</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="VisitorQueryCar">
import { getCarList } from "@/api/visitor/query";
import { checkParams } from "@/utils";
const router = useRouter();
import MyTitle from "@/components/MyTitle";
const { proxy } = getCurrentInstance();
import useUserstore from "@/store/modules/user";
import {
  updateParkInfo,
  listParkInfo,
  listByParkKey,
  queryPersonInfoByJobNo,
  querySecurityPersonInfoByJobNo,
  groupInfolist,
} from "@/api/park/parkInfo";
import { getEmpInfo } from "@/api/public";
let dialogVisible = ref(false);
let groupref = ref(null);
const route = useRoute();
let Tips = ref();
let Group = ref([]);
let message = ref();
let outType = ref([
  { label: "自建", value: "自建" },
  { label: "租赁", value: "租赁" },
]);
const parkGroupPersonList = ref([
  {
    bizType: 1, // 人员类型 [ 1：生产安全主管、2：生产安全窗口 ]
    username: "", // 名称
    jobNo: "", // 工号
    post: "", // 管理职位
    phone: "", // 手机号
    landline: "", // 座机号
  },
]);
const parkGroupPersonLists = ref([
  {
    bizType: 2, // 人员类型 [ 1：生产安全主管、2：生产安全窗口 ]
    username: "", // 名称
    jobNo: "", // 工号
    post: "", // 管理职位
    phone: "", // 手机号
    landline: "", // 座机号
  },
]);
const formDataParams = ref({
  bizKey: route.params.number, // 表单单号
  parkName: useUserstore().getNowPark().name, // 园区名称
  area: 0, // 占地面积
  buildType: "", // 建筑性质
  buildProduce: 0, // 生产楼栋
  buildDorm: 0, // 宿舍楼栋
  buildOther: 0, // 其他楼栋
  gateCustoms: 0, // 海关闸口出入口数量
  gateVehicle: 0, // 机动车出入口数量
  gatePerson: 0, // 人员出入口数量
  gateMix: 0, // 混合出入口数量
  personPublic: 0, // 公共区域
  personCustoms: 0, // 生产区域 // 园区安全主管人员列表
  parkEpibolyList: [{}],
  parkManagerList: [
    {
      username: "", // 名称
      jobNo: "", // 工号
      post: "", // 管理职位
      phone: "", // 手机号
      landline: "", // 座机号
    },
  ], // 园区事业群列表
  parkGroupList: [
    {
      groupName: "", // 事业群名称
      groupId: "", // 事业群名称
      employ: 0, // 正式工
      epiboly: 0, // 派遣工
      produce: "", // 产品
      custom: "", // 客户
      process: "", // 制程 // 外包公司列表
      parkGroupEpibolyList: [
        {
          name: "", // 公司名称
          post: "", // 岗位数
          person: "", // 人力
        },
      ], // 事业群人员列表
      parkGroupPersonList: [
        {
          bizType: 1, // 人员类型 [ 1：生产安全主管、2：生产安全窗口 ]
          username: "", // 名称
          jobNo: "", // 工号
          post: "", // 管理职位
          phone: "", // 手机号
          landline: "", // 座机号
        },
        {
          bizType: 2, // 人员类型 [ 1：生产安全主管、2：生产安全窗口 ]
          username: "", // 名称
          jobNo: "", // 工号
          post: "", // 管理职位
          phone: "", // 手机号
          landline: "", // 座机号
        },
      ],
    },
  ],
});
function tips(type) {
  dialogVisible.value = true;
  if (type == 1) {
    Tips.value = "楼栋数量——帮助说明";
    message.value =
      "生产楼栋：包含固定厂房、仓库、临时生产楼栋宿舍：园区内辖管宿舍其他：餐厅、综合办公楼等非生产性楼栋注：（如楼栋同时含有餐厅、办公、厂房，则并到生产楼栋作统计";
  }
  if (type == 2) {
    Tips.value = "一线出入口类型及数量——帮助说明";
    message.value =
      "机动车出入口不可走非机动车；人员出入口不可走机动车；混合出入口既可走车，也可走人";
  }
  if (type == 3) {
    Tips.value = "园区安全管理人力——帮助说明";
    message.value =
      "指集团财产安全、交通安全、产品安全及门禁安全管理等师级以上集团员工，不包含工业安全、站岗警卫及外包管理人员；公共/生产均需与事业群相对应，如无相关人力可留空公共区域：负责园区公共区域安全管理的集团员工生产区域：事业群内负责人身、财产及门禁相关安全管理人员";
  }
  if (type == 4) {
    Tips.value = "外包安保状况——帮助说明";
    message.value =
      "需完整列出安保公司全称，如有多家安保物业公司往下新增单元格公共区域：负责一线大门岗、公共区域交通巡逻、应急处突人员。宿舍区域：负责宿舍管控站岗安保人员注：以上人力不包含非警卫段人员，如无外包，自管岗位及人力均需填写";
  }
  if (type == 5) {
    Tips.value = "事业群外包安保状况——帮助说明";
    message.value =
      "负责生产区域的门禁管控、巡逻人员注：需完整列出安保公司全称，如有多家安保物业公司往下新增单元格。如无外包，自管岗位及人力均需填写";
  }
}
function submit() {
  proxy.$refs["formRef"].validate((valid) => {
    if (!valid) return;
    if (formDataParams.value.parkGroupList.length == 0) {
      proxy.$modal.msgError("事业群列表不能为空");
      return;
    }
    updateParkInfo(formDataParams.value).then((res) => {
      proxy.$modal.msgSuccess(res.msg);
      const obj = { path: "/garden/garden" };
      proxy.$tab.closeOpenPage(obj);
    });
  });
}
function addAb() {
  formDataParams.value.parkEpibolyList.push({
    name: "",
    publicPost: 0,
    publicPerson: 0,
    dormPost: 0,
    dormPerson: 0,
  });
}
function delAb(index) {
  formDataParams.value.parkEpibolyList.splice(index, 1);
}
function addGroupAb(index) {
  formDataParams.value.parkGroupList[index].parkGroupEpibolyList.push({
    name: "", // 公司名称
    post: "", // 岗位数
    person: "", // 人力
  });
}
function delGroupAb(index, indexs) {
  formDataParams.value.parkGroupList[index].parkGroupEpibolyList.splice(indexs, 1);
}
function addSP(index) {
  formDataParams.value.parkGroupList[index].parkGroupPersonList.push({
    bizType: 1, // 人员类型 [ 1：生产安全主管、2：生产安全窗口 ]
    username: "", // 名称
    jobNo: "", // 工号
    post: "", // 管理职位
    phone: "", // 手机号
    landline: "", // 座机号
  });
}
function delSP(index, indexs) {
  formDataParams.value.parkGroupList[index].parkGroupPersonList.splice(indexs, 1);
}
function addCK(index) {
  formDataParams.value.parkGroupList[index].parkGroupPersonList.push({
    bizType: 2, // 人员类型 [ 1：生产安全主管、2：生产安全窗口 ]
    username: "", // 名称
    jobNo: "", // 工号
    post: "", // 管理职位
    phone: "", // 手机号
    landline: "", // 座机号
  });
}
function delCK(index, indexs) {
  formDataParams.value.parkGroupList[index].parkGroupPersonList.splice(indexs, 1);
}
function delSYQ(index) {
  formDataParams.value.parkGroupList.splice(index, 1);
}
function addSYQ() {
  formDataParams.value.parkGroupList.push({
    groupName: "", // 事业群名称
    groupId: "",
    employ: "", // 正式工
    epiboly: "", // 派遣工
    produce: "", // 产品
    custom: "", // 客户
    process: "", // 制程 // 外包公司列表
    parkGroupEpibolyList: [], // 事业群人员列表
    parkGroupPersonList: [
      {
        bizType: 1, // 人员类型 [ 1：生产安全主管、2：生产安全窗口 ]
        username: "", // 名称
        jobNo: "", // 工号
        post: "", // 管理职位
        phone: "", // 手机号
        landline: "", // 座机号
      },
      {
        bizType: 2, // 人员类型 [ 1：生产安全主管、2：生产安全窗口 ]
        username: "", // 名称
        jobNo: "", // 工号
        post: "", // 管理职位
        phone: "", // 手机号
        landline: "", // 座机号
      },
    ],
  });
}

function detail(params) {
  listParkInfo({ parkKey: useUserstore().getNowPark().id }).then((res) => {
    formDataParams.value = res.data;
    if (formDataParams.value.parkManagerList.length == 0) {
      querySecurityPersonInfoByJobNo({ parkKey: useUserstore().getNowPark().id }).then(
        (res) => {
          formDataParams.value.parkManagerList = [];
          res.data.forEach((item) => {
            formDataParams.value.parkManagerList.push({
              username: item.empName,
              jobNo: item.empNo, // 工号
              post: item.jobClass == null ? "无" : item.jobClass, // 管理职位
              phone: item.phone, // 手机号
            });
          });
        }
      );
    }
  });
  groupInfolist({ parkKey: useUserstore().getNowPark().id }).then((res) => {
    res.rows.forEach((element) => {
      if (element.sysGroupInfoList != null) {
        for (let index = 0; index < element.sysGroupInfoList.length; index++) {
          Group.value.push({
            label: element.sysGroupInfoList[index].groupName,
            value: element.sysGroupInfoList[index].id,
            children: [],
          });
          if (element.sysGroupInfoList[index].sysGroupInfoList != null) {
            for (
              let indexs = 0;
              indexs < element.sysGroupInfoList[index].sysGroupInfoList.length;
              indexs++
            ) {
              Group.value[index].children.push({
                label: element.sysGroupInfoList[index].sysGroupInfoList[indexs].groupName,
                value: element.sysGroupInfoList[index].sysGroupInfoList[indexs].id,
              });
            }
          }
        }
      }
    });
  });
}
detail();
function findperson(jobNo, index, indexs) {
  queryPersonInfoByJobNo({ jobNo: jobNo }).then((res) => {
    if (res.data != undefined) {
      formDataParams.value.parkGroupList[index].parkGroupPersonList[indexs].username =
        res.data.name;
      formDataParams.value.parkGroupList[index].parkGroupPersonList[indexs].post =
        res.data.jobClass == null ? "无" : res.data.jobClass;
      formDataParams.value.parkGroupList[index].parkGroupPersonList[indexs].phone =
        res.data.phone;
      formDataParams.value.parkGroupList[index].parkGroupPersonList[indexs].username =
        res.data.name;
    }
  });
}
function handleChange(index) {
  formDataParams.value.parkGroupList[index].groupId =
    formDataParams.value.parkGroupList[index].groupId[
      formDataParams.value.parkGroupList[index].groupId.length - 1
    ];
  formDataParams.value.parkGroupList[index].groupName = groupref.value[
    index
  ].getCheckedNodes()[0].text;
  
}
</script>
<style lang="scss" scoped>
.tab-container {
  padding: 15px;
}
.lineBox {
  display: flex;
  margin: 15px 0 0 0;
}
.tipBox {
  cursor: pointer;
}
.title {
  height: 40px;
  width: 100%;
  padding-left: 25px;
  font-weight: 400;
  font-size: 15px;
  color: #222222;
  line-height: 40px;
  border-bottom: 2px solid #ebebeb;
  position: relative;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 13px;
    left: 8px;
    border-bottom: 6px solid #ffffff;
    border-top: 6px solid #ffffff;
    border-left: 10px solid #156cff;
  }
}
.titl {
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  margin-top: 5px;
}
.conter {
  padding: 15px 25px 25px 25px;
  border: 1px solid #ebebeb;
  border-radius: 5px;
  box-shadow: 1px 1px 10px 1px #ebebeb;
}
.oodd {
  margin-top: -10px;
  font-weight: 700;
  height: 50px;
  width: 100%;
  font-size: 15px;
  color: #222222;
  line-height: 50px;
  border-bottom: 1px solid #ebebeb;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 18px;
    left: -15px;
    border-bottom: 6px solid #ffffff;
    border-top: 6px solid #ffffff;
    border-left: 10px solid #156cff;
  }
}
</style>

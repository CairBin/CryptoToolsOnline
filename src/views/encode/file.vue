<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
const upload = ref();

const data = reactive({
    base64Image: "",
    activeName: "toBase64",
    input: ""
})

const handleChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        data.base64Image = e.target.result;
    };
    reader.readAsDataURL(file.raw);
}

const onExceed = () => {
    ElMessage.warning("请先清空当前文件!")
}


const copyToClipboard = () => {
    if (!data.base64Image) {
        ElMessage.info("当前未有图片导入");
        return;
    }

    navigator.clipboard.writeText(data.base64Image)
        .then(() => {
            ElMessage.success('内容已成功复制到剪贴板');
        })
        .catch((err) => {
            ElMessage.error('内容复制失败');
            console.error(err);
        });
}

const onClearBtnClicked = () => {
    data.base64Image = "";
    upload.value.clearFiles();
}

function isBase64(str) {
    // 正则表达式，用于匹配 Base64 编码字符串
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;
    return base64Regex.test(str);
}

const onDownloadBtnClicked = ()=>{
    if(!isBase64(data.input)){
        ElMessage.error("请输入正确的Base64编码");
        return;
    }
    const byteCharacters = atob(data.input);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'downloaded_file.bin';
    a.click();

    // 释放 URL 对象
    window.URL.revokeObjectURL(url);
}

</script>


<template>
    <div style="width:100%;height:100%;">
        <h2>文件转Base64</h2>
        <el-alert title="说明：使用本地计算，您的文件不会上传云端" type="warning" show-icon :closable="false" />
        <el-tabs v-model="data.activeName">
            <el-tab-pane label="文件转Base64" name="toBase64">
                <h3>文件</h3>
                <el-upload ref="upload" :on-exceed="onExceed" :auto-upload="false" drag style="margin-top:1em;"
                    :show-file-list="true" :limit="1" class="upload-demo" :on-change="handleChange">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽文件或<em>点击上传</em>
                    </div>

                    <template #tip>
                        <div class="el-upload__tip">
                            upload files
                        </div>
                    </template>
                </el-upload>

                <div style="margin-top:1em;margin-bottom:1em;">
                    <!-- <el-alert style="margin-bottom:2em;" title="tips：输入内容为编码转图片，拖入图片为转编码" type="success" :closable="false" /> -->
                    <el-button type="primary" @click="copyToClipboard">复制结果</el-button>
                    <el-button @click="onClearBtnClicked">清空</el-button>
                </div>

                <h3>Base64编码</h3>
                <el-input readonly type="textarea" :rows="10" v-model="data.base64Image"></el-input>
            </el-tab-pane>
            <el-tab-pane label="Base64转文件" name="toFile">
                <h3>Base64内容</h3>
                <el-input type="textarea" :rows="10" v-model="data.input"></el-input>
                <div style="margin-top:1em;margin-bottom:1em;">
                    <el-button @click="onDownloadBtnClicked" type="primary" style="width:100px;height:40px;">
                        <el-icon>
                            <Download />
                        </el-icon>&nbsp;下载
                    </el-button>
                    <el-button @click="data.input=''" style="width:100px;height:40px;">清空</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>

<style scoped></style>
<script setup>
import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue';

const upload = ref();

const data = reactive({
    base64Image: "",
    css:'',
    html: ''
})

const handleChange = (file)=>{
    const reader = new FileReader();
    reader.onload = (e) => {
        data.base64Image = e.target.result;
        data.css = `.test{background-image:url("${data.base64Image}");}`
        data.html = `<img src="${data.base64Image}" />`
    };
    reader.readAsDataURL(file.raw);
}

const onBase64Changed = ()=>{
    if(data.base64Image === ''){
        data.css = "";
        data.html = "";
        return;
    }

    data.css = `.test{background-image:url("${data.base64Image}");}`
    data.html = `<img src="${data.base64Image}" />`
}

const copyToClipboard = () => {
    if(!data.base64Image){
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

const onClearBtnClicked = ()=>{
    upload.value.clearFiles();
    data.base64Image = "";
    data.css = "";
    data.html = "";
}

const onExceed = () => {
    ElMessage.warning("请先清空当前文件!")
}

</script>


<template>
    <div style="width:100%;height:100%;">
        <h2>图片转Base64</h2>
        <el-alert title="说明：使用本地计算，您的图片不会上传云端" type="warning" show-icon :closable="false" />
        <h3>图片</h3>
        <el-upload ref="upload" :auto-upload="false" drag style="margin-top:1em;" accept="image/*" :show-file-list="false"
            class="upload-demo" :on-change="handleChange" :limit="1" :on-exceed="onExceed">
            <el-icon class="el-icon--upload" v-if="!data.base64Image"><upload-filled /></el-icon>
            <div v-if="!data.base64Image" class="el-upload__text">
                拖拽文件或<em>点击上传</em>
            </div>

            <div v-if="data.base64Image">
                <img :src="data.base64Image" alt="Uploaded Image" style="width:500px; height:300px; margin-top: 20px;">
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    image files
                </div>
            </template>
        </el-upload>

        <div style="margin-top:1em;margin-bottom:1em;">
            <el-alert style="margin-bottom:2em;" title="tips：输入内容为编码转图片，拖入图片为转编码" type="success" :closable="false" />
            <el-button type="primary" @click="copyToClipboard">复制结果</el-button>
            <el-button @click="onClearBtnClicked">清空</el-button>
        </div>

        <h3>Base64编码</h3>
        <el-input @input="onBase64Changed" type="textarea" :rows="10" v-model="data.base64Image"></el-input>

        <div v-if="data.base64Image">
            <h3>CSS使用</h3>
            <el-input type="textarea" readonly :rows="10" v-model="data.css"></el-input>
        </div>

        <div v-if="data.base64Image">
            <h3>HTML使用</h3>
            <el-input type="textarea" readonly :rows="10" v-model="data.html"></el-input>
        </div>
    </div>
</template>

<style scoped>
</style>
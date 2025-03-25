<script setup>
import { ref, reactive } from "vue";

const data = reactive({
    form: {
        input: "",
        output: "",
    }
})



const encode = () => {
    const tempElement = document.createElement('div');
    tempElement.textContent = data.form.input; 
    data.form.output = tempElement.innerHTML;
}

const decode = () => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = data.form.input; // 设置 HTML 内容
    data.form.output = tempElement.textContent; // 获取解码后的文本
}

</script>

<template>
    <div style="width:100%;height:100%;">
        <h2>HTML编码</h2>
        <el-form label-position="top">
            <el-form-item label="输入:">
                <el-input v-model="data.form.input" type="textarea" :rows="7" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="输出:">
                <el-input readonly v-model="data.form.output" type="textarea" :rows="7" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item>
                <div style="width:100%;display:flex;justify-content: center;">
                    <el-button @click="encode" type="primary" style="width:110px;height:42px;">编码</el-button>
                    <el-button @click="decode" type="warning" style="width:110px;height:42px;">解码</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
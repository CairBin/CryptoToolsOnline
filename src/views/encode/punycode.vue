<script setup>
import {ref, reactive} from 'vue';
import punycode from 'punycode';

const data = reactive({
    input: '',
    output: ''
});

</script>

<template>
    <div style="width:100%;height:100%;">
        <h2>Punycode编码解码</h2>
        <el-form label-position="top">
            <el-form-item label="输入内容">
                <el-input v-model="data.input" type="textarea" :rows="10" placeholder="请输入内容" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="data.output = punycode.encode(data.input)">编码</el-button>
                <el-button type="warning" @click="data.output = punycode.decode(data.input)">解码</el-button>
            </el-form-item>
            <el-form-item label="输出内容">
                <el-input v-model="data.output" type="textarea" :rows="10" readonly />
            </el-form-item>
        </el-form>

    </div>

</template>
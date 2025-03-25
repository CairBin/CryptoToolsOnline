<template>
    <div style="width:100%;height:100%;">
        <h2>Base16(Hex)/Base32/Base64</h2>
        <el-form label-position="top">
            <el-form-item label="输入:">
                <el-input v-model="data.form.input" type="textarea" :rows="7" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="类型:">
                <el-select v-model="data.form.type">
                    <el-option label="Hex" value="hex"></el-option>
                    <el-option label="Base32" value="base32"></el-option>
                    <el-option label="Base64" value="base64"></el-option>
                </el-select>
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

<script setup>
import { ref, reactive } from "vue";
import { Base64 } from 'js-base64';
import * as base32 from 'base32.js';
import iconv from 'iconv-lite';

const data = reactive({
    form: {
        input: "",
        output: "",
        type: "hex",
        charset: "utf-8"
    }
})

const encode = () => {
    const input = data.form.input;
    const type = data.form.type;

    try {
        if (type === "hex") {
            // 将字符串转换为16进制
            data.form.output = Buffer.from(input, 'utf8').toString('hex');
        } else if (type === "base32") {
            // 将字符串转换为Base32
            let buffer = new TextEncoder().encode(input);
            const encoder = new base32.Encoder();
            data.form.output = encoder.write(buffer).finalize();
        } else if (type === "base64") {
            // 将字符串转换为Base64
            data.form.output = Base64.encode(input);
        }
    } catch (error) {
        data.form.output = "编码失败: " + error.message;
    }
};

const decode = () => {
    const input = data.form.input;
    const type = data.form.type;

    try {
        if (type === "hex") {
            // 将16进制字符串解码为普通字符串
            data.form.output = Buffer.from(input, 'hex').toString('utf8');
        } else if (type === "base32") {
            // 将Base32字符串解码为普通字符串
            const decoder = new base32.Decoder();
            const byteArray = decoder.write(input).finalize();
            // 将字节数组转换为字符串
            data.form.output = new TextDecoder('utf-8').decode(new Uint8Array(byteArray));
        } else if (type === "base64") {
            // 将Base64字符串解码为普通字符串
            data.form.output = Base64.decode(input);
        }
    } catch (error) {
        console.error(error);
        data.form.output = "解码失败: " + error.message;
    }
};
</script>
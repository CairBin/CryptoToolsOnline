<script setup>
import {ref, reactive} from 'vue';
import EncodeHelper from '../../utils/encode.js';
import HashHelper from '../../utils/hash.js';
import { ElMessage } from 'element-plus';

const data = reactive({
    input: "",
    outputHex: "",
    outputBase32: "",
    outputBase64: "",
    type: "utf-8",
    algorithm: "sm3",
    showOutput: false,
})

const onClearBtnClicked = ()=>{
    data.input = "";
    data.outputHex = "";
    data.outputBase32 = "";
    data.outputBase64 = "";
    data.showOutput = false;
}

const onCalcBtnClicked = ()=>{
    try{
        let utf8Str = EncodeHelper.switchEncode(data.input, data.type, "utf-8");
        let outputHex = HashHelper.hash(utf8Str, data.algorithm);

        data.outputHex = outputHex;
        data.outputBase32 = EncodeHelper.switchEncode(outputHex, "hex", "base32");
        data.outputBase64 = EncodeHelper.switchEncode(outputHex, "hex", "base64");
        data.showOutput = true;
    }catch(e){
        console.error(e);
        ElMessage.error("发生错误: 错误的格式或算法"); 
    }
}

</script>

<template>
    <div style="width:100%;height:100%;">
        <h2>Hash计算</h2>
        <el-form label-position="top">
            <el-form-item label="输入内容">
                <el-input v-model="data.input" placeholder="请输入内容" type="textarea" :rows="10"></el-input>
            </el-form-item>
            <el-form-item>
                <div style="width:100%;display:flex;justify-content:start;">
                    <el-form-item label="内容格式：" class="selector">
                        <el-select v-model="data.type" style="width:200px;">
                            <el-option label="UTF-8" value="utf-8"></el-option>
                            <el-option label="Hex" value="hex"></el-option>
                            <el-option label="Base64" value="base64"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="算法：" class="selector">
                        <el-select v-model="data.algorithm" style="width:200px;">
                            <el-option label="MD2" value="md2"></el-option>
                            <el-option label="MD4" value="md4"></el-option>
                            <el-option label="MD5" value="md5"></el-option>
                            <el-option label="SHA1" value="sha1"></el-option>
                            <el-option label="SHA224" value="sha224"></el-option>
                            <el-option label="SHA256" value="sha256"></el-option>
                            <el-option label="SHA384" value="sha384"></el-option>
                            <el-option label="SHA512" value="sha512"></el-option>
                            <el-option label="SM3" value="sm3"></el-option>
                            <el-option label="SHA3-224" value="sha3_224"></el-option>
                            <el-option label="SHA3-256" value="sha3_256"></el-option>
                            <el-option label="SHA3-384" value="sha3_384"></el-option>
                            <el-option label="SHA3-512" value="sha3_512"></el-option>
                            <el-option label="KECCAK224" value="keccak224"></el-option>
                            <el-option label="KECCAK256" value="keccak256"></el-option>
                            <el-option label="KECCAK384" value="keccak384"></el-option>
                            <el-option label="KECCAK512" value="keccak512"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" style="width:80px;height:40px;" @click="onCalcBtnClicked">计算</el-button>
                <el-button style="width:80px;height:40px;" @click="onClearBtnClicked">清空</el-button>
            </el-form-item>

            <el-form-item label="输出内容" v-if="data.showOutput" style="margin-top:2em;">
                <el-input class="hash-output" v-model="data.outputHex" readonly placeholder="请输入内容">
                    <template #prepend>Hex</template>
                </el-input>
                <el-input class="hash-output" v-model="data.outputBase32" readonly placeholder="请输入内容">
                    <template #prepend>Base32</template>
                </el-input>
                <el-input class="hash-output" v-model="data.outputBase64" readonly placeholder="请输入内容">
                    <template #prepend>Base64</template>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.selector{
    margin-right:4em;
}

.hash-output{
    margin-bottom:1em;
}
</style>
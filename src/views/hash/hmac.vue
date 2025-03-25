<script setup>
import {ref, reactive} from 'vue';
import EncodeHelper from '../../utils/encode.js';
import HmacHelper from '../../utils/hmac.js';
import { ElMessage } from 'element-plus';

const data = reactive({
    input: "",
    outputHex: "",
    outputBase32: "",
    outputBase64: "",
    type: "utf-8",
    algorithm: "sm3",
    secret: "",
    secretType: "utf-8",
    showOutput: false,
});

const onClearBtnClicked = () => {
    data.input = "";
    data.outputHex = "";
    data.outputBase32 = "";
    data.outputBase64 = "";
    data.showOutput = false;
}

const onCalcBtnClicked = () => {
    try{
        let keyStr = EncodeHelper.switchEncode(data.secret, data.secretType, "utf-8");
        let inputStr = EncodeHelper.switchEncode(data.input, data.type, "utf-8");

        let outputHex = HmacHelper.hmac(inputStr, keyStr, data.algorithm);
        data.outputHex = outputHex;
        data.outputBase32 = EncodeHelper.switchEncode(outputHex, "hex", "base32");
        data.outputBase64 = EncodeHelper.switchEncode(outputHex, "hex", "base64");
        data.showOutput = true;
    }catch(e){
        console.error(e);
        ElMessage.error("发生错误: 错误的输入格式、密钥格式或算法");
    }
}

</script>

<template>
    <div style="width:100%;height:100%;">
        <h2>HMAC计算</h2>
        <el-form label-position="top">
            <el-form-item label="输入内容">
                <el-input v-model="data.input" placeholder="请输入内容" type="textarea" :rows="10"></el-input>
            </el-form-item>

            <el-form-item>
                <el-row justify="start" style="width:100%;" :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="内容格式：">
                            <el-select v-model="data.type">
                                <el-option label="UTF-8" value="utf-8"></el-option>
                                <el-option label="Hex" value="hex"></el-option>
                                <el-option label="Base64" value="base64"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>


                    <el-col :span="6">
                        <el-form-item label="哈希算法：">
                            <el-select v-model="data.algorithm">
                                <el-option label="MD5" value="md5"></el-option>
                                <el-option label="SHA1" value="sha1"></el-option>
                                <el-option label="SHA224" value="sha224"></el-option>
                                <el-option label="SHA256" value="sha256"></el-option>
                                <el-option label="SHA384" value="sha384"></el-option>
                                <el-option label="SHA512" value="sha512"></el-option>
                                <el-option label="SM3" value="sm3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="密钥：">
                            <el-input v-model="data.secret" placeholder="请输入密钥"></el-input>
                        </el-form-item>
                    </el-col>


                    <el-col :span="6">
                        <el-form-item label="密钥格式">
                            <el-select v-model="data.secretType">
                                <el-option label="UTF-8" value="utf-8"></el-option>
                                <el-option label="Hex" value="hex"></el-option>
                                <el-option label="Base64" value="base64"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
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
.hash-output {
    margin-bottom: 1em;
}
</style>
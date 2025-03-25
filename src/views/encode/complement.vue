<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const form = ref({
    inputType: 'integer',
    inputValue: '',
    bits: ''
});

const result = ref(null);
const isOutOfBits = ref(false);

const calculateCodes = () => {
    const inputType = form.value.inputType;
    const inputValue = form.value.inputValue;
    const bits = parseInt(form.value.bits);

    if (isNaN(bits)) {
        ElMessage.error('请输入正确的位数');
        return;
    }
    if(bits <= 0){
        ElMessage.error('请输入大于0的位数');
        return;
    }

    if(inputType === 'integer' && isNaN(parseInt(inputValue))){
        ElMessage.error('请输入正确的整数');
        return;        
    }

    if(inputType !== 'integer' && !/^[01]+$/.test(inputValue)){
        ElMessage.error('请输入正确的二进制字符串');
        return;
    }

    let num;
    if (inputType === 'integer') {
        num = parseInt(inputValue);
        const binaryLength = num < 0 ? num.toString(2).length - 1 : num.toString(2).length;
        if (binaryLength > bits - (num < 0 ? 1 : 0)) {
            isOutOfBits.value = true;
            result.value = null;
            ElMessage.error('输入的整数超出了指定的位数');
            return;
        }
        isOutOfBits.value = false;
    } else if (inputType === 'original') {
        num = parseInt(inputValue.slice(1), 2);
        if (inputValue[0] === '1') {
            num = -num;
        }
    } else if (inputType === 'inverse') {
        if (inputValue[0] === '0') {
            num = parseInt(inputValue, 2);
        } else {
            const original = '1' + inputValue.slice(1).split('').map(bit => bit === '0' ? '1' : '0').join('');
            num = -parseInt(original.slice(1), 2);
        }
    } else if (inputType === 'complement') {
        if (inputValue[0] === '0') {
            num = parseInt(inputValue, 2);
        } else {
            const inverse = (parseInt(inputValue, 2) - 1).toString(2).padStart(bits, '0');
            const original = '1' + inverse.slice(1).split('').map(bit => bit === '0' ? '1' : '0').join('');
            num = -parseInt(original.slice(1), 2);
        }
    }

    const getBinaryString = (num, bits) => {
        let binary = num.toString(2);
        if (num >= 0) {
            while (binary.length < bits) {
                binary = '0' + binary;
            }
        } else {
            binary = binary.slice(1);
            while (binary.length < bits - 1) {
                binary = '0' + binary;
            }
            binary = '1' + binary;
        }
        return binary;
    };

    const originalCode = getBinaryString(num, bits);

    const inverseCode = num < 0
        ? '1' + originalCode.slice(1).split('').map(bit => bit === '0' ? '1' : '0').join('')
        : originalCode;

    const complementCode = num < 0
        ? (parseInt(inverseCode, 2) + 1).toString(2).padStart(bits, '0')
        : originalCode;

    result.value = {
        originalNumber: num,
        originalCode,
        inverseCode,
        complementCode
    };
};
</script>

<template>
    <div style="width:100%;height:100%;">
        <h2>原码/反码/补码计算</h2>
        <div>
            <el-form :model="form" label-width="120px" label-position="top">
                <el-form-item label="输入类型">
                    <el-select v-model="form.inputType">
                        <el-option label="整数" value="integer"></el-option>
                        <el-option label="原码" value="original"></el-option>
                        <el-option label="反码" value="inverse"></el-option>
                        <el-option label="补码" value="complement"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="输入内容">
                    <el-input v-model="form.inputValue" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="输出位数">
                    <el-input v-model="form.bits" placeholder="请输入输出位数"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="calculateCodes" type="primary" style="width:100px;height:40px;">计算</el-button>
                </el-form-item>
            </el-form>

            <el-form label-position="top" v-if="result" style="margin-top:3em;">
                <h3>计算结果</h3>
                <el-form-item>
                    <el-input v-model="result.originalNumber" readonly>
                        <template #prepend>整数</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="result.originalCode" readonly>
                        <template #prepend>原码</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="result.inverseCode" readonly>
                        <template #prepend>反码</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="result.complementCode" readonly>
                        <template #prepend>补码</template>
                    </el-input>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<style scoped>

</style>
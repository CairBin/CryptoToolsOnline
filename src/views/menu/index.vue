<script setup>
import Menus from "./index.js";

const encodeMenu = Menus.encodeMenu;
const hashMenu = Menus.hashMenu;

</script>

<template>
    <div style="width:100%;height:100%">
        <div style="width:100%">
            <h2 class="menu-title">编码/解码</h2>
            <div class="masonry">
                <router-link v-for="item in encodeMenu" :key="item.title" :to="item.link">
                    <el-card class="masonry-item menu-card" shadow="hover">
                        <el-row>
                            <el-avatar shape="square" :size="60" :src="item.logo" />
                            <h4 style="margin-left:0.5em;">{{ item.title }}</h4>
                        </el-row>
                        <el-row style="height:50px;">
                            <p style="font-size:14px; color:#777;text-overflow:ellipsis;overflow:hidden;">
                                {{ item.content }}</p>
                        </el-row>
                        <template #footer>
                            <el-row style="width:100%;font-size:15px;" justify="space-between">
                                <el-col :span="18" style="text-align:left;color:grey;">{{ item.info }}</el-col>
                                <el-col :span="6" style="text-align:right;color:green;">
                                    <el-icon>
                                        <DArrowRight />
                                    </el-icon>
                                </el-col>
                            </el-row>
                        </template>
                    </el-card>
                </router-link>
            </div>

            <h2 class="menu-title">哈希值计算</h2>
            <div class="masonry">
                <router-link v-for="item in hashMenu" :key="item.title" :to="item.link">
                    <el-card class="masonry-item menu-card" shadow="hover">
                        <el-row>
                            <el-avatar shape="square" :size="60" :src="item.logo" />
                            <h4 style="margin-left:0.5em;">{{ item.title }}</h4>
                        </el-row>
                        <el-row style="height:50px;">
                            <p style="font-size:14px; color:#777;text-overflow:ellipsis;overflow:hidden;">
                                {{ item.content }}</p>
                        </el-row>
                        <template #footer>
                            <el-row style="width:100%;font-size:15px;" justify="space-between">
                                <el-col :span="18" style="text-align:left;color:grey;">{{ item.info }}</el-col>
                                <el-col :span="6" style="text-align:right;color:green;">
                                    <el-icon>
                                        <DArrowRight />
                                    </el-icon>
                                </el-col>
                            </el-row>
                        </template>
                    </el-card>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style>
.router-link-active {
    text-decoration: none;
}

a {
    text-decoration: none;
}
</style>
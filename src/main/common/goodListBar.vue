<template>
    <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane label="导入货物">
            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
            </el-upload>
        </el-tab-pane>
        <el-tab-pane label="货物信息">
            <el-form-item label="货物类型" prop="type_goods">
                <el-radio-group v-model="goodsDesc">
                    <el-radio label="家具建材"/>
                    <el-radio label="小商品"/>
                    <el-radio label="家电"/>
                    <el-radio label="农副产品"/>
                    <el-radio label="工业品"/>
                    <el-radio label="其他"/>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="货物体积" prop="volume">
                <el-input v-model="goodsDesc.volume" style="width:100px"/>
                m³
            </el-form-item>
            <el-form-item label="货物重量" prop="weight">
                <el-input v-model="goodsDesc.weight" style="width:100px"/>
                kg
            </el-form-item>
            <el-form-item label="货物数量" prop="Number">
                <el-input v-model="goodsDesc.Number" style="width:100px"/>
                件
            </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="购物车">
            <el-card class="box-card" style="width: 700px">
                <div slot="header" class="clearfix">
                    <span>购物车</span>
                    <el-button style="float: right; padding: 3px 0" type="text">采购商品</el-button>
                </div>
                <div v-for="goods,index in goodsList" :key="index" class="text item">
                    {{'列表内容 ' + index }}
                </div>
            </el-card>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        props:{
            logisticParam:{
                type:Object,
                default:()=>{}
            }
        },
        data() {
            return {
                excelList:[],
                goodsList:[],
                goodsDesc:{
                    type:'',
                    volume:'',
                    weight:'',
                    count:''
                }
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleRemove(file, excelList) {
                console.log(file, excelList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, excelList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + excelList.length} 个文件`);
            },
            beforeRemove(file, excelList) {
                console.log(file, excelList);
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>

<style scoped>

</style>
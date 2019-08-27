<template>
    <div>
        <el-upload
                :multiple="true"
                :auto-upload="false"
                action="javascript:;"
                :list-type="listType"
                :limit="limit"
                :file-list="picList"
                :drag="drag"
                :on-change="handleChange"
                :on-exceed="handleExceed"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
            <slot></slot>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import {message} from "../../assets/js/functionLibrary.js";
    export default {
        name: "uploadBar",
        props:{
            limit: {
                type: Number,
                default: 9
            },
            drag: {
                type: Boolean,
                default: false
            },
            listType: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                picList:[],
                dialogImageUrl: '',
                dialogVisible: false
            };
        },
        methods: {
            handleChange(file, fileList){
                console.log(file, fileList)
                this.picList = fileList;
                let picNameList = [];
                for(var i in this.picList) {
                    var fileName = this.picList[i].name.substring(this.picList[i].name.lastIndexOf("."));
                    var fileName1 = this.picList[i].name.substring(0,this.picList[i].name.lastIndexOf("."));

                    console.log(picNameList.indexOf(fileName1))
                    if(picNameList.indexOf(fileName1) != -1){
                        message(this,'不能上传重复图片！','error');
                        this.picList.splice(i,1);
                        return;
                    }else{
                        picNameList.push(fileName1);
                    }

                    if ((fileName != '.jpg') && (fileName != '.png') && (fileName != '.jpeg')) {
                        this.picList.splice(i,1);
                        message(this,'对不起，系统不支持该格式的文件。','error')
                        return;
                    }
                    var size = 0;
                    var num  = 10;
                    size = this.picList[i].size;//byte
                    size = size / 1024;//kb
                    size = (size / 1024).toFixed(1);//mb
                    if (size > num){
                        this.picList.splice(i,1);
                        message(this,'对不起，您上传的文件大小为'+ size +'文件大小超出10M。上传失败！','error')
                        return;
                    }
                }
                this.$emit('getPicList',this.picList);
            },
            handleExceed(){
                message(this,'上传文件个数超出限制! 最多上传'+this.limit+'张图片!','warning')
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.picList = fileList;
                this.$emit('getPicList',this.picList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }
    }
</script>

<style scoped>

</style>
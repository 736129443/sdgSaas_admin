<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 09:22:31
 * @LastEditTime: 2019-08-14 17:03:02
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="dialogBar">
        <el-dialog
                center
                :title="dialogTitle"
                :visible.sync="editDialogShow"
                :width="dialogWidth"
                :before-close="onCancel"
        >
            <slot></slot>
            <div slot="footer" v-if="footShow" class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "dialogBar",
        props: {
            editDialogShow: {
                type: Boolean,
                default: false
            },
            dialogTitle: {
                type: String,
                default: ""
            },
            dialogWidth: {
                type: String,
                default: "50%"
            },
            footShow: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {};
        },
        methods: {
            onCancel() {
                this.$emit("onCancel", this.editDialogShow);
            },
            onConfirm() {
                this.$emit("onConfirm", this.editDialogShow);
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
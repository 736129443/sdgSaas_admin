<template>
    <div>
        <el-form-item label="是否回单"  prop="Receipt">
            <el-radio-group v-model="receipt">
                <el-radio label="是"/>
                <el-radio label="否"/>
            </el-radio-group>
        </el-form-item>
        <el-row>
            <el-col :span="10">
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="remark"/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="价格" prop="price">
            <el-input v-model="price" style="width:100px"/> 元
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('order')">发布用车</el-button>
        </el-form-item>
    </div>
</template>

<script>
    export default {
        props:{
            order:{
                type:Object,
                default:()=>{}
            }
        },
        data() {
            return {
                receipt:'',
                remark:'',
                price:0.0
            }
        },
        watch:{
            onSubmit(order) {
                order.receipt = '';
                order.remark = '';
                order.price = '';
                this.$emit("onSubmit", order);
            }
        }
    }
</script>

<style scoped>

</style>
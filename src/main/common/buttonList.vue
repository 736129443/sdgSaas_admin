<template>
    <div class="m10">
        <el-button type="primary" size="medium" @click="handleClick(item.method)" v-for="item in buttons">{{item.text}}</el-button>
    </div>
</template>

<script>
    export default {
        props:{
            buttons:{
                type: Array,
                default: ()=>[]
            }
        },
        methods:{
            handleClick (method) {
                this.$emit('onButtonClick',method);
            }
        }
    }
</script>

<style scoped>

</style>
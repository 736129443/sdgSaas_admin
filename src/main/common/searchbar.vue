<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 18:10:30
 * @LastEditTime: 2019-08-13 18:16:34
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="search-bar">
        <el-form
            :inline="inline"
            :model="conditions"
            :rules="rules"
            ref="conditions"
            label-width="auto"
            class="demo-ruleForm clear"
        >
            <el-form-item
                v-for="(item,index) in selectors"
                :label="item.cname"
                :prop="item.name"
                :class="className"
            >
                <!--输入框-->
                <el-input
                    v-model="conditions[item.name]"
                    v-if="item.model == 'input'"
                    @change="inputChange(item.name,conditions[item.name])"
                    :placeholder="item.default"
                ></el-input>

                <!--选择器-->
                <el-select
                    v-model="conditions[item.name]"
                    v-if="item.model == 'select'"
                    :placeholder="item.default"
                    @change="selectChange"
                >
                    <el-option
                        v-for="val in item.dataArr"
                        :key="val.value"
                        :label="val.label"
                        :value="val.value"
                    ></el-option>
                </el-select>

        <!--format="yyyy 年 MM 月 dd 日"-->
        <!--日期选择器-->
        <el-date-picker
          v-if="item.model == 'date'"
          v-model="conditions[item.name]"
          value-format="timestamp"
          :type="item.type"
          :format="item.format"
          :placeholder="item.default"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>

                <!--多选-->
                <el-checkbox-group
                    @change="checkChange"
                    v-model="conditions[item.name]"
                    v-if="item.model == 'checkbox'"
                >
                    <el-checkbox v-for="(vals,index) in item.dataArr" :label="vals"></el-checkbox>
                </el-checkbox-group>

                <!--文本框-->
                <el-input v-if="item.model == 'textarea'" type="textarea" v-model="conditions[item.name]"></el-input>
            </el-form-item>
            <slot name="checkbox"></slot>
            <slot name="addParValue"></slot>
            <slot name="parValue"></slot>
            <slot name="addGrantRule"></slot>
            <slot name="grantRule"></slot>
            <slot name="useRule"></slot>
            <slot name="uploadFile"></slot>
            <slot name="linkage"></slot>
            <slot></slot>

            <el-form-item v-if="!buttons.length&&showButtons">
                <el-button type="primary" @click="submitForm('conditions', 'search')">查询</el-button>
                <el-button type="primary" @click="submitForm('conditions', 'export')">导出</el-button>
                <el-button type="primary" @click="submitForm('conditions', 'add')" v-if="add">新增</el-button>
                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
            </el-form-item>

            <el-form-item v-if="buttons.length">
                <el-button
                    type="primary"
                    @click="submitForm('conditions', button.method)"
                    v-for="button in buttons"
                >{{button.text}}
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {debuglog} from "util";

    export default {
        name: "formPackage",
        props: {
            parValues: {
                type: Array,
                default: () => []
            },
            selectors: {
                type: Array,
                default: () => []
            },
            conditions: {
                type: Object,
                default: () => {
                }
            },
            className: {
                type: String,
                default: ""
            },
            inline: {
                type: Boolean,
                default: true
            },
            rules: {
                type: Object,
                default: () => {
                }
            },
            labelWidth: {
                type: String,
                default: "100px"
            },
            buttons: {
                type: Array,
                default: () => []
            },
            showButtons: {
                type: Boolean,
                default: true
            },
            add:{
                type: Boolean,
                default: false
            },
            needValidator: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                checkArray: []
            };
        },
        mounted() {
            if (this.conditions.businessScope) {
                this.checkArray = this.conditions.businessScope;
            }
        },
        methods: {
            selectChange(val) {
                console.log(val)
            },
            inputChange(key, val) {
                this.conditions[key] = val;
                this.$emit("onInputChange", this.conditions);
            },
            submitForm(formName, type) {
                this.conditions.type = type;
                this.$emit("onConfirm", this.conditions);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            checkChange(val) {
                console.log("变化后的值：" + val);
            },
            validateForm() {
                this.$refs.conditions.validate((bol, obj) => {
                    this.$emit("update:needValidator", false);
                    this.$emit("validateRes", bol);
                });
            }
        },
        watch: {
            needValidator(val) {
                if (val) {
                    console.log("执行验证");
                    this.validateForm();
                    return;
                }
            },
            conditions: {
                handler(val) {
                    this.$emit("update:conditions", val);
                },
                deep: true
            }
        }
    };
</script>

<style scoped lang="scss">
    .search-bar {
        padding: 10px 10px 10px 20px;
        height: auto;
    }
</style>
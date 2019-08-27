<template>
    <div class="table">
        <el-table
            @selection-change="handleSelectionChange"
            :data="tableData"
            border
            highlight-current-row
            :header-cell-style="changeBackgroundColor"
            style="width: 100%; max-width: 1600px"
        >
            <el-table-column
                v-for="(item,index) in columns"
                :type="item.type"
                :prop="item.prop"
                :label="item.label"
                :formatter="item.formatter"
                align="center"
                :fixed="item.fixed"
                :show-overflow-tooltip="true"
                :width="item.width"
            >
                <template v-if="item.isOption" v-slot:default="scope">
                    <el-button
                        v-for="btn in item.getOptionsArray(tableData[scope.$index])"
                        @click="handleClick(scope.row,btn.methods)"
                        type="text"
                        size="small"
                    >{{btn.text}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableOption"
                fixed="right"
                align="center"
                :label="tableOption.label"
                :width="tableOption.width"
            >
                <template slot-scope="scope">
                    <el-button
                        v-if="tableOption.custom"
                        v-for="btn in tableOption.buttons"
                        :disabled="scope.row.recordObjectName==null"
                        @click="handleClick(scope.row,btn.methods)"
                        type="text"
                        size="small"
                    >{{btn.text}}
                    </el-button>
                    <el-button
                        v-if="tableOption.custom===undefined"
                        v-for="btn in tableOption.buttons"
                        @click="handleClick(scope.row,btn.methods)"
                        type="text"
                        size="small"
                    >{{btn.text}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="tc mt10"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>

<script>
    export default {
        name: "tableBar",
        props: {
            tableOption: {
                type: Object,
                default: () => {
                }
            },
            total: {
                type: Number,
                required: true
            },
            pageSize: {
                type: Number,
                default: 10
            },
            currentPage: {
                type: Number,
                default: 1
            },
            pageSizes: {
                type: Array,
                default: () => [10, 20, 30, 40]
            },
            tableData: {
                type: Array,
                default: () => []
            },
            columns: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                selecData: []
            };
        },
        methods: {
            handle(row) {
                console.log(row);
            },
            handleSelectionChange(val) {
                this.selectData = val;
                console.log(this.selectData);
                this.$emit("onSelectionChange", {selectData: this.selectData});
            },
            handleSizeChange(val) {
                this.$emit("onSearch", {pageSize: val, currentPage: this.currentPage});
            },
            handleCurrentChange(val) {
                this.$emit("onSearch", {pageSize: this.pageSize, currentPage: val});
            },
            handleClick(row, methods) {
                console.log(row, methods);
                this.$emit("action", {row: row, methods: methods});
            },
            changeBackgroundColor({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return "background-color: #E2E2E2;";
                }
            }
        }
    };
</script>

<style scoped>
</style>
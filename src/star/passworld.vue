<template>
    <el-container >
        <!-- 头部 -->
        <el-header>
            <img  class="logon" src="../assets/images/header_logo.png" alt="">
            <p class="headerTitle">后台系统</p>
            <div class="-r">
                <router-link to="/"><el-button type="primary">登陆</el-button></router-link>
            </div>
        </el-header>
        <el-main>
            <div class="box">
                <p>修改密码</p>
                <div class="sbox">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
                        <ul>
                            <li>
                                <el-form-item label="用户名" prop="name1" >
                                    <el-input v-model.trim="ruleForm.name1" size="medium" disabled required="false"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="原密码" prop="name2" >
                                    <el-input v-model.trim="ruleForm.name2" size="medium"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="新密码" prop="name3" >
                                    <el-input v-model.trim="ruleForm.name3" onkeyup="this.value=this.value.replace(/\s+/g,'')"  v-on:blur="test()" size="medium" @input="pass">
                                        <template slot="append"><span id="size"></span></template>
                                    </el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="确认密码" prop="name4" >
                                    <el-input v-model.trim="ruleForm.name4"  v-on:blur="test()" size="medium"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item style="text-align: center">
                                    <el-button type="primary" @click="Submission('ruleForm')" :disabled="submit">提交</el-button>
                                </el-form-item>
                            </li>
                        </ul>
                    </el-form>
                </div>
            </div>
        </el-main>
    </el-container>
</template>
<script>
    const sha256 = require("js-sha256").sha256;
    export default {
     data() {
        return{
            //密码唯一校验
            Only:'',
            arr:[],
            ruleForm: {
                name1: '',
                name2: '',
                name3: '',
                name4: '',
                token:'',
                userName:'',
                userType:'',
                message:''
            },
            rules: {
                name2: [
                    {required: true, message: '请输入原密码', trigger: 'blur'},
                    // {pattern:/((?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$)/, message: '格式错误,密码由字母、数字、特殊字符最少2种组合（不能有中文和空格）', trigger: 'blur'},
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                name3: [
                    {required: true, message: '请输入新密码', trigger: 'blur'},
                    {pattern:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$/, message: '密码由大写字母、小写字母加数字组合而成', trigger: 'blur'},
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                name4: [
                    {required: true, message: '请再次输入新密码', trigger: 'blur'},
                    {pattern:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$/, message: '密码由大写字母、小写字母加数字组合而成', trigger: 'blur'},
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
            },
            submit:true
        }
    },
        created(){
            // let user = JSON.parse(sessionStorage.getItem('key'));
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            // console.log(this.token)
            this.userName = user.result.currentUser.userName;

            this.ruleForm.name1 = this.userName;
            // console.log(this.userName)
            this.userType = user.result.currentUser.userType;
            // console.log(this.userType)

        },
    methods: {
        pass(){

            if ( this.ruleForm.name3.length < 5){
                let size = document.getElementById('size');
                size.innerHTML= ' '

            }else if (this.ruleForm.name3.length > 5){
                if (this.ruleForm.name3.match(/^[a-z]*$/) || this.ruleForm.name3.match(/^[0-9]*$/) ||this.ruleForm.name3.match(/^[A-Z]*$/)  ){
                    let size = document.getElementById('size');
                    size.innerHTML= '弱'

                }else if (this.ruleForm.name3.match(/^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、0-9]*$/) || this.ruleForm.name3.match(/^[A-Z`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]*$/) ||this.ruleForm.name3.match(/^[0-9a-z]*$/)||this.ruleForm.name3.match(/^[0-9A-Z]*$/) ||this.ruleForm.name3.match(/^[A-Za-z]*$/)  ||this.ruleForm.name3.match(/^[a-z`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、0-9]*$/) ) {
                    let size = document.getElementById('size');
                    size.innerHTML= '中'
                }else if ( this.ruleForm.name3.match(/^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、0-9a-zA-Z]*$/) && this.ruleForm.name3.length > 9){
                    let size = document.getElementById('size');
                    size.innerHTML= '强'
                    // 长度为9 [`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、0-9a-zA-Z]
                }
            }
        },
        test(){

            if (this.ruleForm.name3 == this.ruleForm.name2){
                this.$message({
                    message: '原密码和新密码一样无需修改！',
                    type: 'warning'
                });
                return false
            }
            if (this.ruleForm.name3 == '123456') {
                this.$message({
                    message: '新密码不能为初始密码',
                    type: 'warning'
                });
            }else if(this.ruleForm.name3 !== this.ruleForm.name4  ){
                this.submit = false ;
                this.$message({
                    message: '请确认密码',
                    type: 'warning'
                });
                this.Only = '';
                this.Only = 1;
            }else if(this.ruleForm.name4 !== '' ){
                // this.$message({
                //     message: '新密码可以使用!',
                //     type: 'success'
                // });
                this.Only = '';
                this.Only = 0;
                console.log(this.token,this.ruleForm.name2,this.ruleForm.name4)
            }
            console.log(this.Only)
        },
        Submission(formName){
            // if (this.ruleForm.name3.match(/^[0-9]*$/) ){
            //     this.$message({
            //         message: '新密码不能为纯数字',
            //         type: 'warning'
            //     });
            // } else {

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.Only == 0) {
                        console.log(this.token);
                        console.log(this.ruleForm.name2);
                        console.log(this.ruleForm.name4);
                        this.$http.post(this.global.lightningUrl + '/companyv1/security/user/changePassword', JSON.stringify({
                            "token": this.token,
                            "password": sha256(this.ruleForm.name2),
                            "newPassword": sha256(this.ruleForm.name4),
                        })).then(run => {
                            this.arr = run;
                            console.log(this.arr);
                            this.message = this.arr.body.message;
                            console.log(123);
                            if (this.arr.body.errcode == 0) {
                                if (this.ruleForm.name2 === this.ruleForm.name4 || this.ruleForm.name4 !== '') {
                                    this.$message({
                                        message: this.message,
                                        type: 'success'
                                    });
                                    setTimeout(() => {
                                        this.$router.push({path: '/'});
                                    }, 1500)
                                }
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: this.message,
                                    type: 'error'
                                });
                            }
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: '密码不一致',
                            type: 'error'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: '密码格式不正确请您核对后在提交！',
                        type: 'error'
                    });
                    return false;
                }
            });
        },
        cancel(){
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            if ( jurisdictions[0].menus[0].choose ){
                this.$router.push({ path : '/area_manage' });
            }else if ( jurisdictions[1].menus[0].choose ){
                this.$router.push({ path : '/organization_manage' });
            }else if (jurisdictions[3].menus[0].choose){
                this.$router.push({ path : '/client_manage' });
            } else if (jurisdictions[3].menus[6].choose) {
                this.$router.push({ path : '/warehouse_manage' });
            }else if ( jurisdictions[5].menus[0].choose ){
                this.$router.push({ path : '/driver_manage' });
            }else if ( jurisdictions[5].menus[3].choose ){
                this.$router.push({ path : '/driverAttestation' });
            }else if ( jurisdictions[6].menus[0].choose ){
                this.$router.push({ path : '/order_manage' });
            }else if ( jurisdictions[6].menus[2].choose ) {
                this.$router.push({ path : '/transport_manage' });
            }else if ( jurisdictions[7].menus[0].choose ){
                this.$router.push({ path : '/driver_bill' });
            }else if (  jurisdictions[7].menus[1].choose ){
                this.$router.push({ path : '/driver_reconciliation' });
            }else if (  jurisdictions[7].menus[5].choose ){
                this.$router.push({ path : '/clientele' });
            } else if (jurisdictions[7].menus[6].choose){
                this.$router.push({ path : '/clientReconciliationeq'});
            }
        },
        addList(){
        }
    },

  }
</script>
<style lang="scss" scoped>
body {
  height:100%;
}
section {
  height: 100%;
  width:100%;
}
input {
    padding-left: 10px;
}
.btn_code_time{
    cursor: pointer;
    display: inline-block;
    width:100px;
    text-align: center;
    font-size: 14px;
    color: #000;
    background: #ddd;
    border-radius:5px;
    box-shadow: 1px 1px 4px #000000;
    border:1px solid #ccc;
    line-height:30px;
    position: relative;
    top:1px;
    left:46px;
  }
 .el-header {
    background-color: #666666;
    color: #333;
    line-height: 60px;
    .logon {
       height: 50px;
       width: 160px;
    }
    .-r {
      float: right;
      padding-right:100px;
    }
    .headerTitle {
        position:absolute;
        left: 189px;
        font-size: 22px;
        margin-bottom: 10px;
        color: #fff;
    }
  }
   .el-main {
    height:889px;
    display: flex;
    justify-content: center;
    align-items: center;
       .el-form-item__content{
           line-height: 0;
       }
    .box{
        width:50%;
        height:80%;
        min-width: 760px;
        border:1px solid #b6b6b6;
        border-radius: 25px 25px 0 0 ;

        p{
            display: block;
            text-align: center;
            line-height:50px;
            border-radius:25px 25px 0 0 ;
            background: #6d6d72;
            color:white;
            font-size:15px;
        }
        .sbox{
            padding-top:60px;
            width:50%;
            margin:0 auto;
            .pass{
                display:inline-block;
                width: 28%;
                height: 5px;
                border: 1px solid #c8c7cc;
                border-radius: 10px;
                margin-right:10px;
            }
        }
        .sp{
            width:90%;
            margin:0 auto;
            color:#b6b6b6;

        }
    }
 }
</style>
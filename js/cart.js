var vm = new Vue({
     el:"#app",//绑定在app里面
    data:{
        totalMoney:0,
        totalPrice:0,
        productList:[],
        checkAllFlag:false,
        delFlag:false,
        curProduct:''
    },//模型，所有的模型改变都会反向作用于我们的DOM
    filters:{
         formMoney:function (value) {
             return "￥"+value.toFixed(2);
         }
    },
    mounted: function () {
         this.$nextTick(function () {
             this.cartView();
         });

    },
    methods:{
        cartView: function () {
            var _this = this;
            this.$http.get("data/cartData.json",{"id":123}).then(function (res) {
                _this.productList =res.data.result.list;
                _this.totalMoney =res.data.result.totalMoney;
            });
            //es6改写
            //let _this = this;
            // this.$http.get("data/cartData.json",{"id":123}).then(res=> {
            //     this.productList =res.data.result.list;
            //     this.totalMoney =res.data.result.totalMoney;
            // });
            //箭头函数好处作用域已经指向了外层，内层this和外层this达到统一等级 语法更简洁，所以可以直接可以用this
        },
        changemoney:function (product,way) {
            if(way>0){
                product.productQuantity++;

            }else{
                product.productQuantity--;
                if(product.productQuantity<1){
                    product.productQuantity=1;
                }
            }
            this.calcTotalPrice();
        },
        selctedProduct:function (item) {
            if(typeof item.checked =="undefined"){
                // Vue.set(item,"checked",true);全局注册
                this.$set(item,"checked",true);//局部注册，局部注册都是this.$开头
            }else{
                item.checked =!item.checked;
            }
            this.calcTotalPrice();//调方法才能实时计算
        },
        checkAll:function (Flag) {
            this.checkAllFlag=!this.checkAllFlag;
            var _this=this;
            this.productList.forEach(function (item,index) {
                if(typeof item.checked =="undefined"){
                    _this.$set(item,"checked",_this.checkAllFlag);//局部注册，局部注册都是this.$开头
                }else{
                    item.checked =_this.checkAllFlag;
                }
            });
        },
        calcTotalPrice:function () {
            var _this=this;
            this.totalPrice=0;
            this.productList.forEach(function (item,index) {//遍历商品列表
                if(item.checked){
                    _this.totalPrice+=item.productQuantity*item.productPrice;

                }

            });
        },
        delConfirm:function (item) {
            this.delFlag=true;
            this.curProduct=item;

        },
        delProduct:function () {
            var index=this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag=false;
        }
    }//事件绑定
});
Vue.filter("money",function (value,type) {
        return "￥"+value.toFixed(2)+type;
    })
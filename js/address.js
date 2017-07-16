new Vue({
    el:".container",
    data:{
        addressList:[],
       limitNum:3,
        currentIndex:0,
        shippingMethod:1
    },
    mounted:function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed:{
        filterAddress:function () {
            return this.addressList.slice(0,this.limitNum);//slice截取数组后返回全新数组，新的不影响原生的数组
            //splice会改变原生的数组
        }
    },
    methods:{
        getAddressList:function () {
            var _this=this;
            this.$http.get("data/address.json").then(function (response) {
                var res=response.data;
                if(res.status=="0"){
                    _this.addressList=res.result;//把数组存起来
                }
            });
        },
        setDefault:function (addressId) {
            this.addressList.forEach(function (address,index) {
                if(address.addressId==addressId){
                    address.isDefault=true;
                }else{
                    address.isDefault=false;
                }
            });
        }
    }

});
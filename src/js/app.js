App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);
    // App.account = web3.eth.accounts[0];
    // web3.eth.defaultAccount = App.account;
    
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('TraceBackContract.json', function(data) {
      App.contracts.noteContract = TruffleContract(data);
      App.contracts.noteContract.setProvider(App.web3Provider);

      App.contracts.noteContract.deployed().then(function(instance) {
        App.noteIntance = instance;
        console.log(instance);
        //return App.getInfos();
        return App.showAllProduct();
      });
    });

    return App.bindEvents();
  },

  //显示所有产品列表
  showAllProduct: function(){
    $("#product_list").html(`<tr>
        <td>珠宝</td>
        <td>ID</td>
      </tr>`);
    App.noteIntance.getInfoLenPro().then(function(len) {
      App.getOneProduct(0,len);
    }).catch(function(err) {
      console.log(err);
    });
  },
  getOneProduct: function(id,len){
    App.noteIntance.productInfo(id).then(function(info) {
      console.log(info);
      $("#product_list").append(
        `<tr>
         <td> `+info[0]+`</td>
         <td>`+id+`</td>
        </tr>`);
      if(id < len -1 ){
        App.getOneProduct(id + 1,len);
      }
    }).catch(function(err) {
      console.log(err);
    });
  },

  bindEvents: function() {
        $("#product_list").html(`<tr>
        <td>珠宝</td>
        <td>ID</td>
      </tr>`);
    App.noteIntance.getInfoLenPro().then(function(len) {
      App.getOneProduct(0,len);
    }).catch(function(err) {
      console.log(err);
    });
  },
  getOneProduct: function(id,len){
    App.noteIntance.productInfo(id).then(function(info) {
      console.log(info);
      $("#product_list").append(
        `<tr>
         <td> `+info[0]+`</td>
         <td>`+id+`</td>
        </tr>`);
      if(id < len -1 ){
        App.getOneProduct(id + 1,len);
      }
    }).catch(function(err) {
      console.log(err);
    });
  },

  //事件绑定
  bindEvents: function() {
    //添加商品外
    $("#add_pro").on('click',function(){
      App.noteIntance.getInfoLenPro().then(function(len) {
        $('#productId').html(len.valueOf());
      }).catch(function(err) {
        console.log(err);
      });

      $("#productModal").modal('show');
    })

    //添加商品内
    $("#add_new").on('click', function() {
      console.log($('#productId').val()+' '+$("#productName").val()+' '
      +$("#productFrom").val()+' '+ $("#productWay").val() + ' '
      +$("#productTime").val());

      App.noteIntance.getInfoLenPro().then(function(len) {
        App.noteIntance.newProduct(len
        ,$("#productName").val(),$("#productFrom").val()
        ,$("#productWay").val()
        ,$("#productTime").val()
        ).then(function(result) {
          console.log(result.tx);
          App.noteIntance.setLastTranshash(len, result.tx).then(function(){
            alert("添加成功");
            $('#productId').html(Number(len.valueOf())+1);
            $("#productName").val("");
            $("#productFrom").val("");
            $("#productWay").val("");
            $("#productTime").val("");
            App.showAllProduct();
          });
          //return App.getInfos();
          
        });
      }).catch(function(err) {
        console.log(err);
      });
      
    });

    //添加处理信息
    $("#add_newProcess").on('click', function() {
      $("#loader").show();

      console.log($("#processId")+' '+
      $("#processName")+' '+
      $("#processWay")+' '+
      $("#processTime"));

      App.noteIntance.addProcess($("#processId").val(),$("#processName").val(),$("#processWay").val(),$("#processTime").val()).then(function(result) {
        console.log(result);
        App.noteIntance.setLastTranshash($("#processId").val(), result.tx).then(function(){
          alert("添加成功");
          $('#processId').val("");
          $("#processName").val("");
          $("#processWay").val("");
          $("#processTime").val("");
          flag=0;
        });
        //return App.getInfos();
      });
    });


    //查看产品信息
    flag = 0;//没更新查询对象时仅查询一次
    preId = $("#search_id").val();
    $("#search_note").on('click', function() {
      var id = $("#search_id").val();
      if(id!=preId){
        flag=0;
        // $("#timeline").html("");
        preId = id;
      }
      if(id==""){
        alert("ID为空！");
      }else{
        // console.log(id);
        if(flag==0){
          App.getInfos(id);
          flag++;
        }
        $("#timeModal").modal('show');
      }
    });
    // $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  // markAdopted: function() {
  //   /*
  //    * Replace me...
  //    */
  // },

  // handleAdopt: function(event) {
  //   event.preventDefault();

  //   var petId = parseInt($(event.target).data('id'));

  //   /*
  //    * Replace me...
  //    */
  // }
  getInfos: function(searchId) {
    $("#timeline").html("");
    App.getInfoProduct(searchId);
    App.noteIntance.getInfoLen(searchId).then(function(len) {
      if(len > 0){
        App.getProcessInfos(0,len,searchId);
      }else{
        App.showHash(searchId);
      }
    }).catch(function(err) {
      console.log(err);
    });
    
  },

  getInfoProduct: function(searchId) {
    App.noteIntance.productInfo(searchId).then(function(info) {
      console.log(info);
      $("#timeline").append(
        `<dt>开始</dt>
        <dd class="pos-left clearfix">
            <div class="circ"></div>
            <div class="time">` + info[3] + `</div>
            <div class="events">
                <div class="events-header">开采信息</div>
                <div class="events-body">
                ` + "珠宝名称：" + info[0]  +`</br>
                ` + "开采地点：" + info[1]  +`</br>
                ` + "珠宝品质：" + info[2]  +`
                </div>
            </div>
        </dd>` );
    } ).catch(function(err) {
      console.log(err);
    });
  },

  getProcessInfos: function(index,len,searchId) {
    // console.log(index)
    App.noteIntance.processInfos(searchId,index).then(function(info) {
      console.log(index);
      //左右显示处理信息
      var leftOrRight = (index%2==1)?"left":"right";
      $("#timeline").append(
      `<dd class="pos-`+leftOrRight+` clearfix">
          <div class="circ"></div>
          <div class="time">` + info[2] + `</div>
          <div class="events">
              <div class="events-header">` + info[0] + `</div>
              <div class="events-body">
              处理方式：` + info[1] + `
              </div>
          </div>
      </dd>` );

      if(index == len-1){
        App.showHash(searchId);
      }
      if (index < len - 1) {
        App.getProcessInfos(index + 1,len,searchId);
      }
    } ).catch(function(err) {
      console.log(err);
    });
  },

  showHash: function(searchId){
    App.noteIntance.productInfo(searchId).then(function(info) {
      $("#timeline").append('<dt id="hash">Hash:'+info[4]+'</dt>')
    } ).catch(function(err) {
      console.log(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

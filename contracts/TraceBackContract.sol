pragma solidity ^0.5.8;
// pragma experimental ABIEncoderV2;

contract TraceBackContract{
    struct ProductInfo{
        string productName;
        string fromName;    //生产商
        string productWay;  //生产方式-生产过程信息
        string productTime;
        string transHash;   //最后一次处理hash
        bool isUsed;
    }
    struct ProcessInfo{
        string processName;
        string processWay;
        string processTime;
    }
    
    //生产信息
    mapping(uint => ProductInfo) public productInfo;
    //处理信息
    mapping(uint => ProcessInfo[]) public processInfos;
    
    //定义event
    event NewProduct(address addre, uint id, string productName,string fromName,string productWay, string time);
    event NewProcess(address addre, uint id, string processname,string processWay, string processtime);

    //添加新产品
    function newProduct(uint id, string memory productName,string memory fromName,string memory productWay, string memory time) public{
        productInfo[id].productName = productName;
        productInfo[id].fromName = fromName;
        productInfo[id].productTime = time;
        productInfo[id].productWay = productWay;
        productInfo[id].isUsed = true;
        emit NewProduct(msg.sender, id, productName, fromName, productWay, time);
    }

    //获取产品个数
    function getInfoLenPro() public view returns(uint){
        for(uint i = 0;i < 1000; i++){
            if(productInfo[i].isUsed == false){
                return i;
            }
        }
    }

    //获取处理信息长度
    function getInfoLen(uint id) public view returns(uint){
        return processInfos[id].length;
    }

    //添加流程处理信息
    function addProcess(uint id, string memory processname, string memory processway, string memory processtime) public {
        // info[id].processinfos.push(ProcessInfo(processname,processtime));
        processInfos[id].push(ProcessInfo(processname,processway,processtime));
        emit NewProcess(msg.sender,id,processname,processway,processtime);
    }

    function setLastTranshash(uint id, string memory transHash) public {
        productInfo[id].transHash = transHash;
    }
}
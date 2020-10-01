pragma solidity ^0.5.0;

contract NoteContract {
    mapping (address => string[]) public notes;

    constructor() public {

    }
    event NewNode(address addre,string note);

    //添加记事
    function addNote(string memory note) public {
        notes[msg.sender].push(note);
        emit NewNode(msg.sender, note);
    }

    function getNoteLen(address own) public view returns(uint) {
        return notes[own].length;
    }

    //修改记事
    event ModifyNote(address, uint index);
    function modifyNote(address own, uint index ,string memory note) public {
        require(own == msg.sender);
        notes[own][index] = note;
        emit ModifyNote(own,index);
    }

}
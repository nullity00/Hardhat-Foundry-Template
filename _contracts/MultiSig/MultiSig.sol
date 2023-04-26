// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 confirmations;
    }

    mapping(uint256 => mapping(address => bool)) confirmation;

    Transaction[] public transactions;

    event SubmittedTransaction(
        uint256 transactionNumber,
        address to,
        uint256 value
    );
    event ApprovedTransaction(uint256 transactionNumber, address approver);
    event ExecutedTransaction(
        uint256 transactionNumber,
        address to,
        uint256 value
    );
    event Deposit(address from, uint256 value, uint256 balance);

    constructor(address[] memory _owners) payable {
        owners = _owners;
        owners.push(msg.sender);
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    modifier onlyOwner() {
        bool isOwner = false;
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                isOwner = true;
            }
        }
        require(isOwner, "You are not an owner");
        _;
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function addOwner(address _owner) public onlyOwner {
        owners.push(_owner);
    }

    function submitTransaction(
        address _to,
        uint256 _value,
        bytes memory _data
    ) public onlyOwner {
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                confirmations: 0
            })
        );
        emit SubmittedTransaction(transactions.length - 1, _to, _value);
    }

    function approveTransaction(uint256 _transactionNumber) public onlyOwner {
        require(
            confirmation[_transactionNumber][msg.sender] == false,
            "You have already confirmed this transaction"
        );
        Transaction memory transaction = transactions[_transactionNumber];
        transaction.confirmations++;
        transactions[_transactionNumber] = transaction;
        confirmation[_transactionNumber][msg.sender] = true;
        emit ApprovedTransaction(_transactionNumber, msg.sender);
    }

    function executeTransaction(uint256 _transactionNumber) public onlyOwner {
        Transaction memory transaction = transactions[_transactionNumber];
        require(
            transaction.executed == false,
            "This transaction has already been executed"
        );
        require(
            transaction.confirmations >= owners.length / 2,
            "This transaction has not been approved by enough owners"
        );
        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "Transaction failed");
        transaction.executed = true;
        transactions[_transactionNumber] = transaction;
        emit ExecutedTransaction(
            _transactionNumber,
            transaction.to,
            transaction.value
        );
    }

    function getTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }

    function getTransaction(uint256 _transactionNumber)
        public
        view
        returns (Transaction memory)
    {
        return transactions[_transactionNumber];
    }

    function revokeApproval(uint256 _transactionNumber) public onlyOwner {
        require(
            confirmation[_transactionNumber][msg.sender] == true,
            "You have not confirmed this transaction"
        );
        Transaction memory transaction = transactions[_transactionNumber];
        transaction.confirmations--;
        transactions[_transactionNumber] = transaction;
        confirmation[_transactionNumber][msg.sender] = false;
    }
}

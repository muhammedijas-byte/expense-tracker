let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];


function saveData()
{
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}


function displayTransactions()
{
    let list =
    document.getElementById("list");

    list.innerHTML = "";

    transactions.forEach(function(transaction, index)
    {
        let li =
        document.createElement("li");

        li.innerHTML =
        `${transaction.text} : ₹${transaction.amount}
        <button onclick="deleteTransaction(${index})">
        Delete
        </button>`;

        list.appendChild(li);
    });
}


function updateSummary()
{
    let income = 0;
    let expense = 0;

    transactions.forEach(function(transaction)
    {
        if(transaction.amount > 0)
        {
            income += transaction.amount;
        }
        else
        {
            expense += transaction.amount;
        }
    });

    document.getElementById("income").innerHTML =
    income;

    document.getElementById("expense").innerHTML =
    Math.abs(expense);

    document.getElementById("balance").innerHTML =
    income + expense;
}


function addTransaction()
{
    let text =
    document.getElementById("text").value;

    let amount =
    Number(document.getElementById("amount").value);

    if(text === "" || amount === 0)
    {
        alert("Please enter valid data");
        return;
    }

    let transaction =
    {
        text: text,
        amount: amount
    };

    transactions.push(transaction);

    saveData();

    displayTransactions();

    updateSummary();

    document.getElementById("text").value = "";

    document.getElementById("amount").value = "";
}


function deleteTransaction(index)
{
    transactions.splice(index, 1);

    saveData();

    displayTransactions();

    updateSummary();
}


displayTransactions();

updateSummary();
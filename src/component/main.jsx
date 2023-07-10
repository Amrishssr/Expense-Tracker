// import { Component, useEffect, useState } from "react";
// import axios from "axios";
// export default function ExpenseTrack() {
//     const [data, setData] = useState({
//         title: "",
//         category: "",
//         date: "",
//         amount: ""

//     })
//     const [arrrayData, setArrayData] = useState([]);
//     const [expense, setExpense] = useState(0);
//     const [income, setIncome] = useState(0);

//     useEffect(() => {
//         getMethod();
//     }, []);
//     getMethod = () => {
//         axios({
//             method: "GET",
//             url: "http://localhost:5001/api/get",
//         }).then((response) =>
//             setData({
//                 Data: response.data,
//                 data: {
//                     title: "",
//                     category: "",
//                     date: "",
//                     amount: ""
//                 },
//                 id: "",
//             }))

//     }
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };
//     handleClick = (e) => {
//         e.preventDefault()
//         if (data.id) {
//             axios({
//                 method: "PUT",
//                 url: `http://localhost:5001/api/put/${data.id}`,
//                 data: data,
//             }).then((response) =>
//                 response.data ? getMethod() : console.log(response.data, "EDIT")
//             )
//         } else if (setData.title) {
//             axios({
//                 method: "POST",
//                 url: "http://localhost:5001/api/create",
//                 data: data,
//             }).then((response) =>
//                 response.data ? getMethod() : console.log(response.data, "POST")
//             )
//         }
//         if (data.category === "income") {
//             setIncome((prevIncome) => prevIncome + parseFloat(data.amount));
//         } else if (data.category === "expense") {
//             setExpense((prevExpense) => prevExpense + parseFloat(data.amount));
//         }
//     }



//     handleDelete = (id) => {
//         axios({
//             method: "DELETE",
//             url: `http://localhost:5001/api/delete/${id}`,
//             data: data,
//         }).then((response) =>
//             response.data ? getMethod() : console.log(response.data, "DELETE")
//         )
//         const updatedArrayData = [...arrayData];
//         const deletedTransaction = updatedArrayData.splice(index, 1)[0];
//         setArrayData(updatedArrayData);

//         if (deletedTransaction.category === "income") {
//             setIncome((prevIncome) => prevIncome - parseFloat(deletedTransaction.amount));

//         } else if (deletedTransaction.category === "expense") {
//             setExpense((prevExpense) => prevExpense - parseFloat(deletedTransaction.amount));
//         }
//     }


//     const calculateBalance = () => {
//         return income - expense;
//     };

//     const balance = calculateBalance();

//     return (
//         <div>
//             <div className="parent">
//                 <div className="income">
//                     <h2>INCOME</h2>
//                     <h2>₹{income}</h2>
//                 </div>
//                 <div className="balance">
//                     <h2 style={{ textAlign: "center" }}>Expense Tracker</h2>
//                     <h2 style={{ textAlign: "center" }}>Balance</h2>
//                     <h1 id="bamnt">₹ {balance}</h1>
//                     <div id="balance">
//                         <table>
//                             <tbody>
//                                 {arrayData.map((transaction, index) => (
//                                     <tr key={index}>
//                                         <td>{transaction.amount}</td>
//                                         <td>{transaction.title}</td>
//                                         <td>{transaction.date}</td>
//                                         <td>
//                                             <button onClick={() => handleDelete(transaction._id)}>
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                     <br />
//                     <select
//                         id="select"
//                         name="category"
//                         value={data.category}
//                         onChange={handleChange}
//                     >
//                         <option value="">--Select--</option>
//                         <option value="income">Income</option>
//                         <option value="expense">Expense</option>
//                     </select>
//                     <br />
//                     <br />
//                     <input
//                         type="text"
//                         name="title"
//                         value={data.title}
//                         onChange={handleChange}
//                         placeholder="Enter the title"
//                         id="title"
//                     />
//                     <br />
//                     <br />
//                     <input
//                         type="number"
//                         name="amount"
//                         value={data.amount}
//                         onChange={handleChange}
//                         placeholder="Enter the amount"
//                         id="amount"
//                     />
//                     <br />
//                     <br />
//                     <input
//                         type="date"
//                         name="date"
//                         value={data.date}
//                         onChange={handleChange}
//                         placeholder="Enter the date"
//                         id="date"
//                     />
//                     <br />
//                     <br />
//                     <div>
//                         <button onClick={handleClick} id="handleClick" >
//                             Add New item
//                         </button>
//                     </div>
//                 </div>
//                 <div className="expense">
//                     <h2>Expense</h2>
//                     <h2>₹{expense}</h2>
//                 </div>
//             </div>
//         </div>
//     );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ExpenseTracker() {
  const [data, setData] = useState({
    title: "",
    category: "",
    date: "",
    amount: ""
  });
  const [arrayData, setArrayData] = useState([]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState();
  useEffect(() => {
    getMethod();
  }, []);




  const getMethod = () => {
    axios({
      method: "GET",
      url: "http://localhost:5001/api/get"
    }).then((response) => {
      setData({
        ...data,
        Data: response.data,
        id: ""
      });
      setArrayData(response.data);
      calculateIncomeExpense(response.data)

    });
  };

  const calculateIncomeExpense = (data) => {
    let inc = 0;
    let exp = 0;
    data.filter((element) => {
      if (element.category === "income") {
        inc = inc + element.amount
      }
      else if (element.category === "expense") {
        exp = exp + element.amount
      }
    })

    setIncome(inc)
    setExpense(exp)
    setBalance(inc-exp)
    setData({
      title: "",
      category: "",
      date: "",
      amount: ""
    });

  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (data.id) {
      axios({
        method: "PUT",
        url: `http://localhost:5001/api/put/${data.id}`,
        data: data
      }).then((response) =>
        response.data ? getMethod() : console.log(response.data, "EDIT")
      );
    } else if (data.title) {
      axios({
        method: "POST",
        url: "http://localhost:5001/api/create",
        data: data
      }).then((response) =>
        response.data ? getMethod() : console.log(response.data, "POST")
      );
    }
    const transaction = { ...data };
    setArrayData((prevArrayData) => [...prevArrayData, transaction]);
    setData({
      title: "",
      category: "",
      date: "",
      amount: ""
    });
      // if (data.category === "income") {
      //   setIncome((prevIncome) => prevIncome + parseFloat(data.amount));
      // } else if (data.category === "expense") {
      //   setExpense((prevExpense) => prevExpense + parseFloat(data.amount));
      // }
  };



  const handleDelete = (index, id) => {
    axios({
      method: "DELETE",
      url: `http://localhost:5001/api/delete/${id}`,
      // data: data
    }).then((response) =>
      response.data ? getMethod() : console.log(response.data, "DELETE")
    );

    const updatedArrayData = [...arrayData];
    const deletedTransaction = updatedArrayData.splice(index, 1)[0];
    setArrayData(updatedArrayData);

    if (deletedTransaction.category === "income") {
      setIncome((prevIncome) => prevIncome - parseFloat(deletedTransaction.amount));
    } else if (deletedTransaction.category === "expense") {
      setExpense((prevExpense) => {
        console.log(deletedTransaction)
        console.log(prevExpense)
        return prevExpense - parseFloat(deletedTransaction.amount)
      });
    }
  };


  // const balance = calculateBalance();

  return (
    <div>
      <div className="parent">
        <div className="income">
          <h2>INCOME</h2>
          <h2>₹{income}</h2>
        </div>
        <div className="balance">
          <h2 style={{ textAlign: "center" }}>Expense Tracker</h2>
          <h2 style={{ textAlign: "center" }}>Balance</h2>
          <h1 id="bamnt">₹ {balance}</h1>

          <div id="balance" >
            <ul >
              {arrayData.map((transaction, index) => (
                <li key={index} id="list" >
                  <ul >{transaction.title}</ul>
                  <ul >{transaction.date}</ul>
                  <ul >₹{transaction.amount}</ul>
                  <ul >
                    <button onClick={() => handleDelete(index, transaction._id)}>
                      Delete
                    </button>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <br />
          <select
            id="select"
            name="category"
            value={data.category}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <br />
          <br />
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Enter the title"
            id="title"
          />
          <br />
          <br />
          <input
            type="number"
            name="amount"
            value={data.amount}
            onChange={handleChange}
            placeholder="Enter the amount"
            id="amount"
          />
          <br />
          <br />
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={handleChange}
            placeholder="Enter the date"
            id="date"
          />
          <br />
          <br />
          <div>
            <button onClick={handleClick} id="handleClick">
              Add New Item
            </button>
          </div>
        </div>
        <div className="expense">
          <h2>Expense</h2>
          <h2>₹{expense}</h2>
        </div>
      </div>
    </div>
  );

}

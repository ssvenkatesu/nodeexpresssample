// const http = require('http'); // Corrected to 'http' instead of 'https'  
// const calc = require("./moduleCalc");  

// // creating a server  
// const server = http.createServer((req, res) => {  
//     // Set the response header  
//     res.writeHead(200, { 'Content-Type': 'text/html' });  

//     // It will Calculate the sum  
//     const sum = calc.add(10, 20);  
//     const responseContent = `  
//         <h1>Variable1: 10</h1>  
//         <h1>Variable2: 20</h1>  
//         <h1>Sum: ${sum}</h1>  
//     `;  

//     // It will Send the response and end it  
//     res.write(responseContent);  
//     res.end()
// });  

// // listening to port 3000  
// server.listen(3000, () => {  
//     console.log('Server running at http://127.0.0.1:3000/');  
// });


// const fs = require('fs');

// fs.readFile('sample.txt',"utf8", (err, data) => {
//     if (err) {
//         console.error(err);
//         return 
//     }
//     console.log(data) 
// });


// const newPerson = {
//     id : 4,
//     name : "john",
//     age : 25,
//     city : "New York",
//     amount : 1200
// }

// fs.readFile('sample.json',"utf8", (err, data) => {
//     if (err) {
//         console.error(err);
//         return
//         }
     
//         const jsonData = JSON.parse(data);
        
//         const newList = jsonData.filter((data)=> data.id !==3)
//         const newJsonData = JSON.stringify(newList);

//         fs.writeFile('sample.json', newJsonData, (err) => {
//             if (err) {
//                 console.error(err);
//                 return
//                 }
//                 console.log("Deleted sucessfully");
//         });
//         });

const fs = require("fs");
const filePath = "sample.json";

function readFile(callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      callback(null, err);
    } else {
      try {
        const json = JSON.parse(data);
        callback(json, null);
      } catch (parseErr) {
        console.error("Error parsing the file:", parseErr);
        callback(null, parseErr);
      }
    }
  });
}

function writeFile(data, callback) {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
      callback(err);
    } else {
      callback(null);
    }
  });
}

function createStudent(newStudent) {
  readFile((students, err) => {
    if (err) return;
    students.push(newStudent);
    writeFile(students, (writeErr) => {
      if (!writeErr) console.log("New student added successfully!");
    });
  });
}

function readStudents() {
  readFile((students, err) => {
    if (err) return;
    console.log("Students List:", students);
  });
}

function updateStudent(rollNo, updatedData) {
  readFile((students, err) => {
    if (err) return;
    const index = students.findIndex((student) => student.rollNo === rollNo);
    if (index === -1) {
      console.error("Student not found!");
      return;
    }
    students[index] = { ...students[index], ...updatedData };
    writeFile(students, (writeErr) => {
      if (!writeErr) console.log("Student updated successfully!");
    });
  });
}

function deleteStudent(rollNo) {
  readFile((students, err) => {
    if (err) return;
    const updatedStudents = students.filter((student) => student.rollNo !== rollNo);
    if (updatedStudents.length === students.length) {
      console.error("Student not found!");
      return;
    }
    writeFile(updatedStudents, (writeErr) => {
      if (!writeErr) console.log("Student deleted successfully!");
    });
  });
}

// Example operations
createStudent({
  studentName: "Dharun",
  rollNo: 104,
  dob: "2002-12-10",
  dept: "IT",
});

readStudents();

updateStudent(103, { studentName: "Alice Walker", dept: "Mechanical" });

deleteStudent(102);

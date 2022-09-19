const api_url = 
      "http://localhost:3000/tests";
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
 
    }
    show(data);
}
// Calling that async function
getapi(api_url);
  

// Function to define innerHTML for HTML table
function show(data) {
    let tab =''; 
        // `<tr>
        //   <th>ID</th>
        //   <th>Name</th>
        //   <th>Age</th>
        //   <th>Address</th>
        //  </tr>`;
    
    // Loop to access all rows 
    for (let row of data) {
        tab += `<tr> 
    <td>${row.id} </td>
    <td>${row.name}</td>
    <td>${row.age}</td> 
    <td>${row.address}</td>          
</tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("data").innerHTML = tab;
}
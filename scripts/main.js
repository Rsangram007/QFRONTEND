document.addEventListener('DOMContentLoaded', () => {
    function updateCountdownTimer() {
            const progressBar = document.querySelector(".CircularProgressbar-text");
            let countdown = 60;
            
            // Update the countdown timer every second
            const interval = setInterval(() => {
                progressBar.textContent = countdown;
                countdown--;
                
                if (countdown < 0) {
                    clearInterval(interval); // Stop the countdown
                    // Refresh the fetched data here
                    fetchData();
                    
                    // Restart the countdown timer after refreshing data
                    setTimeout(() => {
                        updateCountdownTimer();
                    }, 60000); // 60 seconds
                }
            }, 1000);
        }
    let previousValue = null;
    let savingsRupees = 0;
    const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
if (darkModeToggle.checked) {
  body.classList.add('dark-mode');
  body.classList.remove('light-mode');
} else {
  body.classList.add('light-mode');
  body.classList.remove('dark-mode');
}
});
function fetchData() {
    fetch('http://localhost:3000/api/fetch-data ') 
        .then(response => response.json())
        .then(data => {
            // Process the fetched data
             
            console.log(data);
            data.data.sort((a, b) => {
            const differenceA = previousValue
                ? (((a.last - previousValue) / previousValue) * 100)
                : 0;
            const differenceB = previousValue
                ? (((b.last - previousValue) / previousValue) * 100)
                : 0;
            return differenceB - differenceA; // Sort in descending order
        });

            data.data.slice(0, 10).forEach((item, index) => {
                const tableBody = document.getElementsByClassName('table-body')[0];
                const a = document.createElement('a');
                a.setAttribute('value', item.base_unit);
                a.setAttribute('tabindex', '0');
                a.setAttribute('role', 'menuitem');
                a.setAttribute('href', '/');
                a.classList.add("dropdown-item");
                a.textContent = item.base_unit.toUpperCase();
                const nameDropDown = document.getElementById('nameDropDown');
                nameDropDown.appendChild(a);

                const row=document.createElement('tr');

                const s_no=document.createElement('td');
                const h4_s_no=document.createElement('h4');
                h4_s_no.classList.add("table-text");
                s_no.classList.add("align-middle");
                s_no.textContent=index+1;
                s_no.appendChild(h4_s_no);
                row.appendChild(s_no);

                const span=document.createElement('span');
                const name = document.createElement('td');
                const h4_name=document.createElement('h4');
                span.textContent=item.name;
                h4_name.appendChild(span);
                h4_name.classList.add('table-text');
                name.appendChild(h4_name);
                name.classList.add('align-middle');
                row.appendChild(name);
                
                const last = document.createElement('td');
                const h4=document.createElement('h4');
                h4.textContent= '₹ ' + item.last;
                h4.classList.add('table-text');
                last.appendChild(h4);
                last.classList.add('align-middle');
                row.appendChild(last);
                
                const buy_sell = document.createElement('td');
                const h4_buy_sell = document.createElement('h4');
                const span_buy_sell=document.createElement('span');
                span_buy_sell.textContent='₹ ' + item.buy + ' / ₹ ' + item.sell;
                h4_buy_sell.appendChild(span_buy_sell);
                h4_buy_sell.classList.add('table-text');
                buy_sell.appendChild(h4_buy_sell);
                buy_sell.classList.add('align-middle');
                row.appendChild(buy_sell);

                

            
                const  volume= document.createElement('td');
                const h4_volume = document.createElement('h4');
                const span_volume=document.createElement('span');
                span_volume.textContent=item.volume;
                h4_volume.appendChild(span_volume);
                h4_volume.classList.add('table-text');
                volume.appendChild(h4_volume);
                volume.classList.add('align-middle');
                row.appendChild(volume);
               
                tableBody.appendChild(row);
                const differencePercentage = previousValue
                ? (((item.last - previousValue) / previousValue) * 100).toFixed(2)
                : 0;
            previousValue = item.last;

            const buyPrice = item.buy;
            const sellPrice = item.sell;
            const savings = (sellPrice - buyPrice).toFixed(2);
            savingsRupees += parseFloat(savings);

            // Create elements for difference percentage and savings
            const differencePercentageCell = document.createElement('td');
            const h4_differencePercentage = document.createElement('h4');
            h4_differencePercentage.textContent = `${differencePercentage}%`;
            h4_differencePercentage.classList.add('table-text');
            differencePercentageCell.appendChild(h4_differencePercentage);
            differencePercentageCell.classList.add('align-middle');

            const savingsCell = document.createElement('td');
            const h4_savings = document.createElement('h4');
            h4_savings.classList.add('table-text');

            // Check if the difference is positive or negative and set the color accordingly
            if (differencePercentage > 0) {
                h4_differencePercentage.style.color = 'cyan';
                h4_savings.style.color = 'cyan';
            } else if (differencePercentage < 0) {
                h4_differencePercentage.style.color = 'red';
                h4_savings.style.color = 'red';
            }

            h4_savings.textContent = '₹ ' + parseFloat(savings).toFixed(2); // Display savings in rupees
            savingsCell.appendChild(h4_savings);
            savingsCell.classList.add('align-middle');

            // Append the elements to the table row
            row.appendChild(differencePercentageCell);
            row.appendChild(savingsCell);

            // Append the row to the table body
            tableBody.appendChild(row);
            })
        })
                  
      .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    fetchData();
updateCountdownTimer();
    });
    page();




    document.addEventListener('DOMContentLoaded', () => {
        // Fetch the cryptocurrency data from the backend API
        fetch('http://localhost:3000/api/fetch-data')
            .then(response => response.json())
            .then(responseData => {
                console.log("Fetched data:", responseData);  // Log the data to check the structure
    
                const tbody = document.querySelector('#crypto-table .table-body'); // Target the correct tbody element
                tbody.innerHTML = '';  // Clear the table body
    
                const data = responseData.data;  // Assuming your data is in responseData.data
    
                // Now iterate over the array and create table rows
                data.forEach((crypto, index) => {
                    const row = `<tr>
                                    <td>${index + 1}</td>
                                    <td>${crypto.name}</td>
                                    <td>${crypto.last}</td>
                                    <td>${crypto.buy} / ${crypto.sell}</td>
                                
                                   
                                    <td>${crypto.savings}</td>
                                 </tr>`;
                    tbody.innerHTML += row;  // Append the row to the table body
                });
            })
            .catch(err => console.error('Error:', err));
    });
    
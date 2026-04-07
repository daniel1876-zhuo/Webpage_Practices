"use strict";

function DatePicker(id,callback){
    this.id = id;
    this.callback = callback;
}

DatePicker.prototype.render = function(date){
    this.date = date;
    let element = document.getElementById(this.id);
    element.innerHTML = "";
    let table = this.generateTable(date);
    let buttonRow = document.createElement("div");
    buttonRow.setAttribute("class","controlRow");
    let previous = document.createElement("div");
    let next = document.createElement("div");
    previous.addEventListener("click",this.changeMonth.bind(this));
    previous.textContent = "\<";
    previous.className = "previous";
    next.addEventListener("click",this.changeMonth.bind(this));
    next.className = "next";
    next.textContent = "\>";
    element.appendChild(table);
    buttonRow.appendChild(previous);
    buttonRow.appendChild(next);
    element.appendChild(buttonRow);
};
DatePicker.prototype.createDay = function(day,month_type){
    let td = document.createElement("td");
    td.addEventListener('click',this.clickedHandler.bind(this));
    td.innerHTML = `${day}\n`;
    if(month_type === 0){
        td.className = "lastmonth";
    }
    else if(month_type === 1){
        td.className = "rightmonth";
    }
    else if(month_type === 2){
        td.className = "nextmonth";
    }
    else{
        td.className = "chosenday";
        td.id = `chosenday-${this.id}`;
    }
    td.dataset.month_type = month_type;
    td.dataset.day = day;
    td.dataset.month = this.month;
    if(this.month === 0 && month_type === 0){
        td.dataset.year = this.year-1;
    }
    else{
        td.dataset.year = this.year;
    }
    return td;
};
DatePicker.prototype.createWeek = function(maxDayNum){
    
    let tr = document.createElement("tr");
    tr.innerHTML = '\n';
    for(let i = 1;i <= 7;i++){
        // console.log(`the currentDay is: ${this.currentDay}`);
        if(this.currentDay > maxDayNum){
            this.currentDay -= maxDayNum;
            this.MonthOrder++;
            // console.log(`monthOrder has been changed to:${this.MonthOrder}`);
        }
        if(this.MonthOrder === 1 && this.currentDay === this.day){
            tr.appendChild(this.createDay(this.currentDay,3));
        }
        else{
            tr.appendChild(this.createDay(this.currentDay,this.MonthOrder));
        }
        this.currentDay++;

    }
    return tr;
};
function maxDays(month,year){
    if(month===2){
        if((year%4 === 0 && year % 100 !== 0) || (year%400 === 0)){
            return 29;
        }
        else{
            return 28;
        }
    }
    else if([0,1,3,5,7,8,10].includes(month)){
        return 31;
    }
    else{
        return 30;
    }
}
DatePicker.prototype.generateTable = function(date){
    //getDay() = week index, getDate() = exact day number in the month
    this.day = date.getDate();
    this.month = date.getMonth();//from 0-11
    this.year = date.getFullYear();
    const firstday = new Date(this.year,this.month,1).getDay();
    const sundayDate = new Date(this.year,this.month,1-firstday).getDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthString = monthNames[this.month];
    // console.log(this.year,this.month+1,this.day);
    const MonthDays = maxDays(this.month+1,this.year); //month is 0-11, so +1 here
    const LastMonthDays = maxDays(this.month,this.year);
    let is_end = false;
    this.currentDay = sundayDate;
    // console.log(`the first date in the table is:${sundayDate}`);
    // console.log(`the total days for this month is ${MonthDays}`);
    this.MonthOrder = 0;
    if(sundayDate === 1){
        this.MonthOrder = 1;
    }
    let table = document.createElement("table");
     table.innerHTML = `
    <thead>
        <tr>
        <th scope="col">Sun</th>
        <th scope="col">Mon</th>
        <th scope="col">Tue</th>
        <th scope="col">Wed</th>
        <th scope="col">Thu</th>
        <th scope="col">Fri</th>
        <th scope="col">Sat</th>
        </tr>
    </thead>
    `;
    table.className = "calender";
    let caption = table.createCaption();
    caption.className = "title";
    caption.textContent = `${monthString} ${this.year}`;
    let tbody = table.createTBody();

    while(!is_end){

        if(this.MonthOrder === 0){
            const tr = this.createWeek(LastMonthDays);
            // console.log(`week with monthOrder ${this.MonthOrder} has been created`);
            tbody.appendChild(tr);
        }
        else if(this.MonthOrder === 1 && this.currentDay <= MonthDays){
            const tr = this.createWeek(MonthDays);
            // console.log(`week with monthOrder ${this.MonthOrder} has been created`);
            tbody.appendChild(tr);
        }
        else{
            is_end = true;
        }
        if(this.MonthOrder === 1 && this.currentDay > 31 || this.MonthOrder === 2){
            is_end = true;
        }
    }
    // console.log(`the content of the table is: ${table.innerHTML}`)
    return table;
};
DatePicker.prototype.clickedHandler = function(event){
    let target = event.target;
    let lastChosenDay = document.getElementById(`chosenday-${this.id}`);
    lastChosenDay.className = "rightmonth";
    lastChosenDay.removeAttribute("id");
    target.className = "chosenday";
    target.id = `chosenday-${this.id}`;
    // console.log("the date is clicked");
    // console.log(target.dataset.month_type);
    if(target.dataset.month_type === "1" || target.dataset.month_type === "3"){
        this.callback(this.id,{
            month:Number(target.dataset.month)+1,
            year:Number(target.dataset.year),
            day:Number(target.dataset.day)
        });
    }
    return;
};
DatePicker.prototype.changeMonth = function(event){
    // console.log("button has been clicked");
    // console.log(`button:${event.target.className}`);
    
    if(event.target.className === "previous"){
        this.month -= 1;
    }
    else{
        this.month += 1;
    }
    this.date = new Date(this.year,this.month,this.day);
    this.callback(this.id,{
            month:Number(this.month)+1,
            year:Number(this.year),
            day:Number(this.day)
        });
    this.render(this.date);
};
"use strict";
class TableTemplate{
//static means that it can't be accessed on the instances of the class, but is accessed directly on the class
    static fillIn(id,dict,columnName = " "){
        let table = document.getElementById(id);
        table.style = "visibility:visible;";
        let tableContent = table.getElementsByTagName("tbody")[0];
        // console.log(tableContent.innerHTML);
        let FirstRow = tableContent.rows[0];
        // console.log(FirstRow.innerHTML);
        var index = -1;
        for(let i = 0;i < FirstRow.childElementCount;i++){
            let child = FirstRow.cells[i];
            // console.log(child.innerHTML);
            const template = new Cs142TemplateProcessor(child.innerHTML);
            child.innerHTML = template.fillIn(dict);
            if(child.innerHTML === columnName){
                index = i;
            }
        }
        // console.log("columnName is:",columnName,index);
        if(index === -1){
            for(let i = 0;i < FirstRow.childElementCount;i++){
                this.fillInColumn(i,dict,tableContent);
            }
        }
        else{
            this.fillInColumn(index,dict,tableContent);
        }
    }
    static fillInColumn(columnIndex,dict,tableContent){
        for(let i = 1;i < tableContent.rows.length;i++){
            const row = tableContent.rows[i];
            let target = row.getElementsByTagName("td")[columnIndex];
            // console.log("things to be changed:",target.innerHTML);
            const template = new Cs142TemplateProcessor(target.innerHTML);
            target.innerHTML = template.fillIn(dict);
        }
    }
}

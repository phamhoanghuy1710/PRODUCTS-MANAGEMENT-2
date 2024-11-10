


//permissions
const table = document.querySelector("[table-permissions]");
if(table){
    const buttonSubmit = document.querySelector("[button-submit]");
    if (buttonSubmit){
        buttonSubmit.addEventListener("click",()=>{
            let permissions = [];
            const rows = table.querySelectorAll("[data-name]");
            rows.forEach((row)=>{
                const name = row.getAttribute("data-name");
                const inputs = row.querySelectorAll("input");
                if (name == "id"){
                    inputs.forEach((input)=>{
                        const id = input.value;
                        permissions.push({
                            id: id,
                            permissions: [],
                        })
                    })
                }
                else{
                    inputs.forEach((input,index)=>{
                        const checked = input.checked;
                        if (checked == true){
                            permissions[index].permissions.push(name);
                        }
                    })
                }
            })
            // lay from ra va them du lieu 
            if (permissions.length > 0 ){
                const permissionsForm = document.querySelector("#form-change-permissions");
                if(permissionsForm){
                    const permissionsInput = permissionsForm.querySelector("input[name='permissions']");
                    permissionsInput.value = JSON.stringify(permissions);
                    
                    permissionsForm.submit();
                }
            }

        })
    }
}

//end permissions

// load data permissions
const dataRecords = document.querySelector("[data-records]");
if (dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermission = document.querySelector("[table-permissions]");

    records.forEach((record,index)=>{
        const permissions = record.permissions;

        permissions.forEach((permission)=>{
            const rows = tablePermission.querySelector(`[data-name="${permission}"]`);
            const input = rows.querySelectorAll("input")[index];
            input.checked = true;
        })
    })
}




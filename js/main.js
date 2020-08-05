// create DB
import productDb, {
     bulkCreate, getData, createElement
} from './Module.js'

let db = productDb('ProductDb', {
    products: `++id, name, seller, price `
});

// input tags
const userId      = document.getElementById('userid');
const productName = document.getElementById('prodname');
const seller      = document.getElementById('seller');
const price       = document.getElementById('price');

// buttons
const createBtn = document.getElementById('btn-create');
const readBtn  = document.getElementById('btn-read');
const updateBtn = document.getElementById('btn-update');
const deleteBtn = document.getElementById('btn-delete');

//not found
const notFound = document.getElementById('notfound');

// insert values
createBtn.onclick = (event) => {
   let flag = bulkCreate(db.products, {
        name:productName.value,
        seller: seller.value,
        price: price.value
    });

    productName.value, seller.value, price.value = ''; 
    getData(db.products, (data) => {
        userId.value = data.id + 1 || 1;
    });

    table();
    let insertMsg = document.querySelector('.insertmsg');
    getMsg(flag, insertMsg);
};


// create read event
readBtn.onclick = table;

// create update event
updateBtn.onclick = () => {
    const id = parseInt(userId.value) || 0;
    if (id) {
        db.products.update(id, {
            name: productName.value,
            seller: seller.value,
            price: price.value,
        }).then((updated) => {
            let get = updated ? true : false;

            let updateMsg = document.querySelector('.updatemsg');
            getMsg(get, updateMsg);
        });
    }
};


// delete all records
deleteBtn.onclick = () => {
    db.delete();
    db = productDb('ProductDb', {
        products: `++id, name, seller, price`
    });
    db.open();
    table();
    textID(userId);


    let deleteMsg = document.querySelector('.deletemsg');
    getMsg(true, deleteMsg);
};

window.onload = () => {
    textID(userId);
};

function textID(textboxID) {
    getData(db.products, data => {
        textboxID.value = data.id || 1;
    });
}

function table() 
{
   const tbody = document.getElementById('tbody');
   while (tbody.hasChildNodes()) 
   {
    tbody.removeChild(tbody.firstChild);   
   }


   getData(db.products, (data) => {
        if(data){
            createElement('tr', tbody, tr => {
                for (const value in data) {
                    createElement('td', tr, td => {
                        td.textContent = data.price === data[value]? `€${data.price}` : data[value];
                    });
                };
                createElement('td', tr, td =>{
                    createElement('i', td, i =>{
                        i.className +=('fas fa-edit btn-edit');
                        i.setAttribute(`data-id`, data.id)
                        i.onclick = editBtn;
                    });
                });
                createElement('td', tr, td =>{
                    createElement('i', td, i =>{
                        i.className +=('fas fa-trash-alt btn-delete');
                        i.setAttribute(`data-id`, data.id)
                        i.onclick = DeleteBtn;
                    });
                });
            });
        }
        else{
            notFound.textContent = 'No records found'
        }
   });  
};

function editBtn(event) 
{
   let id = parseInt(event.target.dataset.id);
   db.products.get(id, data => {
        userId.value = data.id;
        productName.value = data.name || '';
        seller.value = data.seller || '';
        price.value = data.price || '';
   }); 
};

function DeleteBtn(event) 
{
    let id = parseInt(event.target.dataset.id);
    db.products.delete(id);
    table();
    let deleteMsg = document.querySelector('.deletemsg');
    getMsg(true, deleteMsg);

};

function getMsg(flag, element) {
    if(flag){
        element.classList.add('movedown');

        setTimeout(() => {
            element.classList.forEach(classnames => {
                classnames == 'movedown' ? undefined : element.classList.remove('movedown'); 
            });
        }, 4000);
    }
}



const productDb = (dbname, table) => {

    const db = new Dexie(dbname);
    db.version(1).stores(table)
     db.open();

    // const DB = new Dexie('MyDataBase');
    // DB.version(1).stores({
    //     friends: `name, age`
    // });

    // DB.open();
    return db;
}

// insertfunction
const bulkCreate = (dbTable, data) => {
    let flag = empty(data);
    if (flag) 
    {
        dbTable.bulkAdd([data]);
        console.log('data inserted succsessfully');
    }
    else
    {
        console.log('Please provide data');
    }

    return flag;
};

// check textbox validation

const empty = object => {
    let flag = false;
    for(const value in object)
    {
        if (object[value] !== '' && object.hasOwnProperty(value)) {
            flag = true;
        }
        else {
            flag = false;
        }
    }

    return flag;
}


// get data from database
const getData = (dbtable, fn) => {
    let index = 0;
    let object = {};

    dbtable.count((count) => {
        if (count) {
            dbtable.each(table => {
              object =sortObj(table)  
              fn(object,index++);
            });
        }
        else{
            fn(0);
        }
    });
};


// sorting object
const sortObj = sortobj => {
    let obj = {};
    obj = {
        id: sortobj.id,
        name: sortobj.name,
        seller: sortobj.seller,
        price: sortobj.price
    }

    return obj;
}

// create table element dynamically
const createElement = (tagname, parent, fn) => {
    const element = document.createElement(tagname);
    if (parent) {
        parent.appendChild(element);
    }
    if (fn) {
        fn(element);
    }
}

export default productDb;
export {
    bulkCreate,
    getData,
    createElement
}
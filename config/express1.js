const
    express = require('express'),
    bodyParser = require('body-parser')
    schema = require('./UserAPI.json');


module.exports = function(){
    const app = express();

    const allowCrossOriginRequests = (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authorization, Access-Control-Allow-Headers, Access-Control-Allow-Origin');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
        next();
    };

    const jsonParser = bodyParser.json();

    const parser = (req, res, next) => {
        jsonParser(req, res, next);
    }

    app.use(parser);
    app.use(allowCrossOriginRequests);

    let UserID = [
        {
            "id": 1,
            "name": "Luke",
	    "email": "luke@mmu.uk",
            "pass": "Penguin"
        },
        {
            "id": 2,
            "name": "Clint",
	    "email": "clint@mmu.uk",
            "pass": "GoodBadUgly"
        },
        {
            "id": 3,
            "name": "Quentin",
	    "email": "Quentin@mmu.uk",
            "pass": "Reservoir"
        }
    ];


    app.get('/list/', function(req, res){
        res.status(200).send(UserID);
    });

    app.post('/list/', function(req, res){
        console.log("here", req.body);
        if(!validator.isValidSchema(req.body, 'components.schemas.Item')){
            console.log(JSON.stringify(req.body));
            res.status(400).send('Bad Request');
        }else{
            console.log(req.body);
            UserID.push(req.body);
            res.status(201).send('Created');
        }
    });

    app.get('/list/:id', function(req, res){
        let item_id = parseInt(req.params.id);

        let flag = false;

        for(let item of UserID){
            if(item.id == item_id){
                res.status(200).send(item);
                flag = true;
            }
        }

        if(!flag){
            res.status(404).send('Not found');
        }
    });

    app.patch('/list/:id', function(req, res){
        let item_id = parseInt(req.params.id);

        if (!validator.isValidSchema(req.body, 'components.schemas.Item')) {
            console.log(JSON.stringify(req.body));
            res.status(400).send('Bad Request');
        }else{
            let index = UserID.findIndex(x => x.id === item_id);
            let list_item = UserID[index];

            let temp = {
                "id": null,
                "item_name": null,
                "description": null,
                "unit_price": null,
                "quantity": null
            };

            if(req.body.hasOwnProperty('id')){
                temp['id'] = req.body.id;
            }else{
                temp['id'] = list_item.id;
            }

            if(req.body.hasOwnProperty('item_name')){
                temp['item_name'] = req.body.item_name;
            }else{
                temp['item_name'] = list_item.item_name;
            }

            if(req.body.hasOwnProperty('description')){
                temp['description'] = req.body.description;
            }else{
                temp['description'] = list_item.description;
            }

            if(req.body.hasOwnProperty('unit_price')){
                temp['unit_price'] = req.body.unit_price;
            }else{
                temp['unit_price'] = list_item.unit_price;
            }

            if(req.body.hasOwnProperty('quantity')){
                temp['quantity'] = req.body.quantity;
            }else{
                temp['quantity'] = list_item.quantity;
            }

            shopping_list.splice(index, 1);
            shopping_list.push(temp);

            res.status(201).send('OK');
        }

    });

    app.delete('/list/:id', function(req, res){
        let item_id = parseInt(req.params.id);

        try{
            let index = shopping_list.findIndex(x => x.id === item_id);
            shopping_list.splice(index, 1);
            res.status(200).send('OK');
        }catch{
            res.status(404).send('Not found');
        }
    });






    return app;
};

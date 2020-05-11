const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json('HELOO')
})

server.get('/api/accounts', (req, res) => {
    db.select('*').from('accounts').then(account => {
        res.status(200).json({ data: account })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: error.message });

    });
})

server.get('/api/accounts/:id', (req, res) => {
    db('accounts').where({ id: req.params.id })
        .then(account => {
            res.status(200).json({ data: account })
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: error.message });

        });
})

server.post('/api/accounts', (req, res) => {
    const account = req.body
    if (isValidAccount(account)) {
        db('accounts')
            .insert(account, "id")
            .then(ids => {
                res.status(201).json({ data: ids })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: error.message });
            })
    } else {
        res.status(400).json({ message: 'Please provide a budget and a name' })
    }
})

server.put('/api/accounts/:id', (req, res) => {
    const account = req.body

    if (isValidAccount(account)) {
        db('accounts').where({ id: req.params.id }).update(account)
            .then(newAccount => {
                res.status(201).json(newAccount)
            }).catch(err => {
                console.log(err);
                res.status(500).json({ message: error.message });

            });
    } else {
        res.status(400).json({ message: 'Please provide a budget and a name' })
    }
})

server.delete('/api/accounts/:id', (req, res) => {
    db('accounts').where({ id: req.params.id })
    .delete()
    .then(succsess => {
        res.status(201).json("Account Deleted")
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: error.message });

    });
})



//custom middleware
function isValidAccount(account) {
    return Boolean(account.name && account.budget);
}

module.exports = server;

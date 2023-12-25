const admin =require('firebase-admin');
const db = admin.firestore();
const express = require('express');
const app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.get('/home',async(req,res)=>{
    try {
        const productsSnapshot = await db.collection('products').get();
        const products = productsSnapshot.docs.map((doc)=>{
            const data = doc.data();
            data.id = doc.id;
            return data;
        });
        res.render('home',{arrProduct:products});
    } catch (error) {
        res.status(500).send('Server Error:' +error );
        console.log(error);
    }
});

app.get('/add',async(req,res)=>{
    res.render('add.hbs');
});

app.post('/create',async(req,res)=>{
    try {
        const {search_image, brands_filter_facet, price, product_additional_info} = req.body;
        if(!search_image || !brands_filter_facet || ! price ||! product_additional_info){
            return res.status(400).send('lỗi dữ liệu');
        }
        const productData = {
            search_image,
            brands_filter_facet,
            price,
            product_additional_info,
        };
        await db.collection('products').add(productData);
        res.redirect('/home');

    } catch (error) {
        console.error('lỗi khi thêm dữ liệu:',error);
        res.status(500).send('Server error');
    }
});

app.get('/read/all',async(req,res)=>{
    try {
        const productsSnapshot = await db.collection('products').get();
        const products = productsSnapshot.docs.map((doc)=>{
            const data= doc.data();
            data.styleid = data.id;
            return data;
        });
        const response = {
            products:products
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({error:'Server Error'});
    }
});

app.post('/update/:id',async(req,res)=>{
    try {
        const productId = req.params.id;
        const productRef = db.collection('products').doc(productId);
        const {search_image, brands_filter_facet, price, product_additional_info} = req.body;
        if (!search_image || !brands_filter_facet || !price || !product_additional_info) {
            throw new Error('Lỗi Nhập dữ liệu');
        }

        await productRef.update({
            search_image,
            brands_filter_facet,
            price,
            product_additional_info,
        });
        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
    }
});

app.post('/delete/:id',async(req,res)=>{
    try {
        const productId = req.params.id;
        await db.collection('products').doc(productId).delete();

        res.redirect('/home');
    } catch (error) {
        res.send(error);
    }
});

app.get('/search',async(req,res)=>{
    try {
        const query = req.query.q;
        const productsSnapshot = await db.collection('products').get();

        const products = productsSnapshot.docs.map((doc)=>{
            const data = doc.data();
            data.id = doc.id;
            return data;

        })
        .filter((product)=>product.product_additional_info.includes(query));
        res.render('home', { query: query, arrProduct: products });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = app;
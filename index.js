import express from "express";
import axios from "axios";

const port = 3000;
const app = express()

app.use(express.static("public"));

function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      }
    }
    return obj
}

function getCombinedList(data){
    var combined = [];
    var result = Object.keys(data).map((key) => [key, data[key]])
    let ingredientList = result.splice(17, 15)
    let measures = result.splice(17, 15)

    for(var i=0; i<ingredientList.length; i++){
        if(ingredientList[i][1] != null){
            combined.push([measures[i][1], ingredientList[i][1]])
        }
        else{break;}
    }
    return combined;
}

const categories = ['Ordinary Drink','Cocktail','Shake','Other / Unknown','Cocoa','Shot','Coffee / Tea','Homemade Liqueur','Punch / Party Drink','Beer','Soft Drink']
const glasses = ['Highball glass','Cocktail glass','Old-fashioned glass','Whiskey Glass','Collins glass','Pousse cafe glass','Champagne flute','Whiskey sour glass','Cordial glass','Brandy snifter','White wine glass','Nick and Nora Glass','Hurricane glass','Coffee mug','Shot glass','Jar','Irish coffee cup','Punch bowl','Pitcher','Pint glass','Copper Mug','Wine Glass','Beer mug','Margarita/Coupette glass','Beer pilsner','Beer Glass','Parfait glass','Mason jar','Margarita glass','Martini Glass','Balloon Glass','Coupe Glass']
const ingredients = ['Light rum','Applejack','Gin','Dark rum','Sweet Vermouth','Strawberry schnapps','Scotch','Apricot brandy','Triple sec','Southern Comfort','Orange bitters','Brandy','Lemon vodka',      'Blended whiskey','Dry Vermouth','Amaretto',         'Tea', 'Champagne','Coffee liqueur',   'Bourbon','Tequila','Vodka',            'Añejo rum','Bitters','Sugar',            'Kahlua','demerara Sugar','Dubonnet Rouge',   'Watermelon',        'Lime juice','Irish whiskey',    'Apple brandy',      'Carbonated water','Cherry brandy',    'Creme de Cacao',    'Grenadine','Port',             'Coffee brandy',     'Red wine','Rum',              'Grapefruit juice',  'Ricard','Sherry',           'Cognac',            'Sloe gin','Apple juice',      'Pineapple juice',   'Lemon juice','Sugar syrup',      'Milk',              'Strawberries','Chocolate syrup',  'Yoghurt',           'Mango','Ginger',           'Lime',              'Cantaloupe','Berries','Grapes','Kiwi','Tomato juice','Cocoa powder','Chocolate','Heavy cream','Galliano','Peach Vodka','Ouzo','Coffee','Spiced rum','Water','Espresso', 'Angelica root','Orange','Cranberries','Johnnie Walker','Apple cider','Everclear','Cranberry juice','Egg yolk','Egg','Grape juice','Peach nectar','Lemon','Firewater','Lemonade','Lager','Whiskey','Absolut Citron','Pisco','Irish cream','Ale','Chocolate liqueur', 'Midori melon liqueur','Sambuca','Cider','Sprite','7-Up','Blackberry brandy','Peppermint schnapps','Creme de Cassis']
const alcoholic = [ 'Alcoholic', 'Non alcoholic', 'Optional alcohol' ];

const errorData = {
    strDrink: "Are you so drunk that you didn't even search the right word?"
}

app.get("/", async(req, res) => {
    try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        let data = response.data.drinks;

        let combined = getCombinedList(data[0]);

        res.render("index.ejs", {categories: categories, glasses: glasses, ingredients: ingredients, alcohols: alcoholic,
            data: data, combined: combined
        })
    }catch(error) {
        console.log(error.message)
    }
})

app.get("/random", async(req, res) => {
    try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        let data = response.data.drinks;

        let combined = getCombinedList(data[0]);


        res.render("index.ejs", {categories: categories, glasses: glasses, ingredients: ingredients, alcohols: alcoholic,
            data: data, combined: combined})
    }catch(error) {
        console.log(error.message)
    }
})

app.get("/search", async(req, res) => {
    let query = req.query['request']
    let combinedFinal = []

    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
    let data = response.data.drinks;

    if(data){
        for (var i=0; i<data.length; i++){
            let combined = getCombinedList(data[i]);
            combinedFinal.push(combined);
    
            data[i] = clean(data[i])
        }
    }
    res.render("index.ejs", {categories: categories, glasses: glasses, ingredients: ingredients, alcohols: alcoholic,
        data: data, combined: combinedFinal})

}) 


app.listen(port, () => {
    console.log(`Server online on ${port}`)
})
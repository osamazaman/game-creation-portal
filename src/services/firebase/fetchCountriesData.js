import db from './config';

function getCountries() {       
    db.ref().on('value',async function(data){
        var countries = data.val();
        // console.log(countries);
        var countriesNameList = [];
        countries.forEach(country => {
            countriesNameList.push(country['country_name']);
        });
        // console.log("countriesNameList", countriesNameList);
        return countriesNameList;
        },
        function(error) {
        // console.log(error);
        return error;
        }
    );
}


function setCountriesListLocal() {       
    db.ref().on('value',async function(data){
        var countries = data.val();
        // console.log(countries);
        var countriesNameList = [];
        countries.forEach(country => {
            countriesNameList.push(country['country_name']);
        });
        // console.log("countriesNameList", countriesNameList);
            localStorage.setItem('countriesNameList', JSON.stringify(countriesNameList));
        },
        function(error) {
        console.log(error);
        }
    );
}



async function getStates(countryName) {       
   
}

async function getCities(countryName,stateName) {       
    
}

async function getUniversities(countryName) {       
    
}



export {
    getCountries,
    getStates,
    getCities,
    getUniversities,
    setCountriesListLocal
};

const btnContainer = document.getElementById('btn-container');

const fetchCategories = () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    fetch(url)
        .then(res => res.json())
        .then()
        
}

fetchCategories()

/*
const fetchCategories = () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    fetch(url)
        .then((res) => res.json())
        .then(({data}) => {
            data.forEach((card) => {
                console.log(card);
                const newBtn =  document.createElement('button');
                newBtn.className = 'btn btn-ghost bg-slate-500 text-white min-w-20';
                newBtn.innerText = card.category;
                
                btnContainer.appendChild(newBtn);
            })
        })

}

fetchCategories();
*/

const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container');

let selectedCategory = 1000;

const fetchCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    const res = await fetch(url);
    const data = await res.json();
    const btnData = data.data;

    btnData.forEach((card) => {
        // console.log(card);
        const newBtn = document.createElement('button');
        newBtn.className = 'btn btn-ghost bg-slate-500 text-white min-w-20';
        newBtn.innerText = card.category;

        newBtn.addEventListener('click', () => fetchDataByCategories(card.category_id));

        btnContainer.appendChild(newBtn);
    });
}

const fetchDataByCategories = (categoryID) => {
    selectedCategory = categoryID;
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryID}`;
    fetch(url)
        .then((res) => res.json())
        .then(({ data }) => {
            cardContainer.innerHTML = '';
            data.forEach((video) => {
                // console.log(video);

                let varifiedBadge = '';
                if(video.authors[0].verified){
                    varifiedBadge = `<img class="w-6 h-6" src="images/verify.png" alt="">`
                }


                const newCard = document.createElement('div');
                newCard.innerHTML = `
                <div class="w-full bg-base-100 shadow-xl ">
                    <figure class="overflow-hidden h-72 relative">
                        <img class="w-full h-full" src="${video.thumbnail}" alt="">
                        <h6 class="absolute bottom-[4%] right-8 text-white font-bold">0 hr</h6>
                    </figure>

                    <div class="card-body">
                        <div class="flex space-x-4 justify-start items-start">
                            <div>
                                <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="">
                            </div>
                            <div>
                                <h2 class="card-title">
                                    ${video.title}
                                </h2>
                                <div class="flex mt-3">
                                    <p>${video.authors[0].profile_name}</p>
                                    ${varifiedBadge}
                                </div>
                                <p class="mt-3">${video.others.views}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                cardContainer.appendChild(newCard);

            });
        })

}


fetchCategories();
fetchDataByCategories(selectedCategory);
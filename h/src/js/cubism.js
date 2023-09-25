import { createApi } from 'unsplash-js';

const main = document.querySelector("#main");
const unsplash = createApi ({
  accessKey: '1feLLwj9E7B04fjpr2UWVvW_i4krlV1F7J1ErjI-PtM'
});

unsplash.search.getPhotos ({
  query: 'cubism',
  page: 1,
  perPage: 20,
  orientation: 'portrait',
})
.then(result => {
 if (result.type == 'success'){
  const photos = result.response.results;
  const getUrls = photos.map((i )=>{
    return `<div class=perImage><img src="${i.urls.small}" />
    <a href="${i.urls.small}">Click Me</a>
    </div>`
    
  });

  main.innerHTML = getUrls.join('');
 }
})


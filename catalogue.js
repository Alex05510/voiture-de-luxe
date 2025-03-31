fetch("luxdrive_site_data_full.json")
  .then(function(response) {
    if (!response.ok) {
      throw new Error("Erreur : La page JSON n'a pas pu être chargée");
    }
    return response.json();
  })
  
  
  .then(function(data) {
    // Afficher les voitures 
    let carsContainer = document.getElementById("cars"); 
    for (let i = 0; i < data.cars.length; i++) { 
      let car = data.cars[i];
      let carElement = document.createElement("div"); 
      carElement.classList.add("col-3", "mb-4"); 

      // Trouver le nom de la marque
      let brandName = "";
      for (let j = 0; j < data.brands.length; j++) {
        if (data.brands[j].id === car.brandId) {
          brandName = data.brands[j].name; 
        }
      }

      // carte des voitures
      let card = document.createElement("div");
      card.classList.add("card");

      let img = document.createElement("img");
      img.classList.add("card-img");
      img.src = car.image; 

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let carTitle = document.createElement("h5");
      carTitle.classList.add("card-title");
      carTitle.textContent = car.name; 

      let carPrice = document.createElement("p");
      carPrice.classList.add("card-text");
      carPrice.textContent = car.price + " €"; 

      let carBrand = document.createElement("p");
      carBrand.classList.add("card-text");
      carBrand.textContent = "Marque : " + brandName; 

      let button = document.createElement("button");
      button.classList.add("btn", "btn-primary");
      button.setAttribute("data-bs-toggle", "modal");
      button.setAttribute("data-bs-target", "#carModal"); 
      button.setAttribute("data-car-id", car.id); 
      button.setAttribute("data-car-name", car.name); 
      button.textContent = "Voir détails";

      cardBody.appendChild(carTitle);
      cardBody.appendChild(carPrice);
      cardBody.appendChild(carBrand); 
      cardBody.appendChild(button); 
      card.appendChild(img); 
      card.appendChild(cardBody); 
      carElement.appendChild(card); 
      carsContainer.appendChild(carElement); 
    }//alert("coucou")

    let carModal = document.getElementById("carModal");
    carModal.addEventListener("show.bs.modal", function(event) {
      let button = event.relatedTarget;
      let carId = button.getAttribute("data-car-id");
      let carName = button.getAttribute("data-car-name").toLowerCase().replace(/\s+/g, '-');
      let car;
      let carDetails;

      for (let i = 0; i < data.cars.length; i++) {
        if (data.cars[i].id == carId) {
          car = data.cars[i];
          carDetails = data.pagesContent.carDetails[carName];
        }
      }

      let modalTitle = document.getElementById("carModalLabel");
      let modalBody = document.getElementById("car-modal-body");

      modalTitle.textContent = carDetails.title;

      let modalContent = document.createElement("div");

      let introduction = document.createElement("p");
      introduction.textContent = carDetails.introduction;

      let specsTitle = document.createElement("h5");
      specsTitle.textContent = "Spécifications :";

      let specsList = document.createElement("ul");
      for (let spec in carDetails.specs) {
        let specItem = document.createElement("li");
        specItem.textContent = spec + ": " + carDetails.specs[spec];
        specsList.appendChild(specItem);
      }

      let descriptionLongue = document.createElement("p");
      descriptionLongue.textContent = carDetails.descriptionLongue;

      let galleryTitle = document.createElement("h5");
      galleryTitle.textContent = "Galerie :";

      let gallery = document.createElement("div");
      for (let j = 0; j < carDetails.gallery.length; j++) {
        let img = document.createElement("img");
        img.src = carDetails.gallery[j];
        img.classList.add("img-fluid", "mb-2");
        gallery.appendChild(img);
      }

      modalContent.appendChild(introduction);
      modalContent.appendChild(specsTitle);
      modalContent.appendChild(specsList);
      modalContent.appendChild(descriptionLongue);
      modalContent.appendChild(galleryTitle);
      modalContent.appendChild(gallery);
      
      modalBody.innerHTML = "";
      modalBody.appendChild(modalContent);
      let footerLinksContainer = document.getElementById("footer-links");
      let footerLinks = data.footer.links;


    footerLinksContainer.innerHTML = "";
    footerSocialsContainer.innerHTML = "";
    
    

    for (let k = 0; k < footerLinks.length; k++) {
      let link = footerLinks[k];
      let linkElement = document.createElement("a");
      linkElement.href = link.url;
      linkElement.textContent = link.label;
      linkElement.classList.add("mx-2");
      footerLinksContainer.appendChild(linkElement);
    }


    let footerSocialsContainer = document.getElementById("footer-socials");
    let footerSocials = data.footer.socials;

   
    let instagram = document.createElement("a");
    instagram.href = footerSocials.instagram;
    instagram.classList.add("mx-2");
    instagram.innerHTML = "<img src='https:upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' width='24' height='24' alt='Instagram'>";

    let youtube = document.createElement("a");
    youtube.href = footerSocials.youtube;
    youtube.classList.add("mx-2");
    youtube.innerHTML = "<img src='https:upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png' width='24' height='24' alt='YouTube'>";

    let twitter = document.createElement("a");
    twitter.href = footerSocials.twitter;
    twitter.classList.add("mx-2");
    twitter.innerHTML = "<img src='assets/images/x.webp' width='40' height='40' alt='Twitter'>";

    footerSocialsContainer.appendChild(instagram);
    footerSocialsContainer.appendChild(youtube);
    footerSocialsContainer.appendChild(twitter);
    });
  });


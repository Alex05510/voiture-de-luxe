fetch("luxdrive_site_data_full.json") 
.then(function(response) {
    if(!response.ok){
      throw new Error("Erreur : La page Json n'a pas pu etre charger");
    }
    return response.json();
  })
  .then(function(data) {
    let heroImage = document.getElementById("hero-image");
    let heroTitle = document.getElementById("hero-title");
    let heroSubtitle = document.getElementById("hero-subtitle");
    let heroCta = document.getElementById("hero-cta");
//alert("coucou")
   
    let footerLinksContainer = document.getElementById("footer-links");
    let footerLinks = data.footer.links;


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

fetch("luxdrive_site_data_full.json") 
.then(function(response) {
  if(!response.ok){
    throw new Error("Erreur : La page Json n'a pas pu etre charger");
  }
  return response.json();
})
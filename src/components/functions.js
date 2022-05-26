async function getRequest(URL){
		
		const Data = await fetch(URL)
			.then(response => response.json())
  			.then(data => {
  				
  				return data
  			});
  
		return Data;
	}
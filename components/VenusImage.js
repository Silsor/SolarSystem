  var venusImage;

  function hideVenusImage()
  {
    venusImage.setAttribute('visible', 'false');
  }

AFRAME.registerComponent('venus-img', {
      init: function () 
      {
        venusImage = document.getElementById("venus-img-plane");
        this.el.addEventListener('click', () => 
        {   
            venusImage.setAttribute('visible', 'true');
        });
      }
  });
  document.addEventListener('DOMContentLoaded', function () {
    new Splide('#image-slider', {
      type       : 'loop',
      perPage    : 3,
      perMove    : 3,
      gap        : '1rem',
      autoplay   : true,
      interval   : 9000,
      pauseOnHover: true,
    }).mount();
  });

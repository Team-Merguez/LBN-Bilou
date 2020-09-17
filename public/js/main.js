// jQuery main function
$(function() {

  // Carte.svg hover effect
    // Paris
    $('.list-Paris').hover(
      function() {
        $('.idf').css('fill', 'blue')
    }, function() {
        $('.idf').css('fill', '#86aae0')
    });

    // Lyon
    $('.list-Lyon').hover(
      function() {
        $('.departement69').css('fill', 'blue')
    }, function() {
        $('.departement69').css('fill', '#86aae0')
    });

    // Marseille
    $('.list-Marseille').hover(
      function() {
      $('.departement13').css('fill', 'blue')
  }, function() {
      $('.departement13').css('fill', '#86aae0')
  });

// Main function END
});
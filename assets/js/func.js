$(document).ready(function(){
  $('.tagcheck').click(function(){
    console.log('click');
    $(this).parent('label').toggleClass('tag-checked')
  })
});
